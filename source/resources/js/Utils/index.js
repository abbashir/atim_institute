/**
 * Compresses an image file using canvas.
 * @param {File} file - The original image file
 * @param {number} maxSizeKB - Target max size in KB (default: 50)
 * @param {number} maxDim - Max width/height in pixels (default: 800)
 * @returns {Promise<File>} - Compressed image as a File object
 */
const compressImage = (file, maxSizeKB = 50, maxDim = 800) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onerror = () => reject(new Error('Failed to read file'));

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onerror = () => reject(new Error('Failed to load image'));

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Scale down dimensions if needed
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = (height / width) * maxDim;
            width = maxDim;
          } else {
            width = (width / height) * maxDim;
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);

        let quality = 0.9;

        const compress = () => {
          canvas.toBlob((blob) => {
            if (!blob) return reject(new Error('Canvas toBlob failed'));

            if (blob.size / 1024 > maxSizeKB && quality > 0.1) {
              quality = parseFloat((quality - 0.1).toFixed(1));
              compress();
            } else {
              const compressedFile = new File([blob], file.name, { type: 'image/jpeg' });
              resolve(compressedFile);
            }
          }, 'image/jpeg', quality);
        };

        compress();
      };
    };
  });
};

export default compressImage;