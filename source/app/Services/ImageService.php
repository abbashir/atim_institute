<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;

class ImageService
{
  /**
   * Process and upload an image.
   *
   * @param UploadedFile $file The uploaded file from request
   * @param string $folder The sub-folder (e.g., 'students', 'donors')
   * @param string|null $oldPath Optional old path to delete
   * @param int $width
   * @param int $height
   * @return string The stored path
   */
  public function upload(UploadedFile $file, string $folder, ?string $oldPath = null, int $width = 400, int $height = 400): string
  {
    // 1. Delete old file if provided
    if ($oldPath && Storage::disk('public')->exists($oldPath)) {
      Storage::disk('public')->delete($oldPath);
    }

    // 2. Generate unique name
    $fileName = Str::uuid() . '.webp';
    $path = "{$folder}/{$fileName}";

    // 3. Process image with Intervention
    $processedImage = Image::read($file)
      ->cover($width, $height)
      ->toWebp(80);

    // 4. Save to disk
    Storage::disk('public')->put($path, (string) $processedImage);

    return $path;
  }


  /**
   * Handle conditional image update for a validated data array.
   *
   * @param array $validated The validated data array from the request
   * @param \Illuminate\Http\Request $request
   * @param string $key The field name (e.g., 'photo')
   * @param string $folder Destination folder
   * @param string|null $oldPath Current path to delete if new one uploaded
   * @return array The modified validated array
   */
  public function handleUpdate(array $validated, $request, string $key, string $folder, ?string $oldPath = null): array
  {
    // Remove it from the array first so it doesn't overwrite with null
    unset($validated[$key]);

    if ($request->hasFile($key)) {
      $validated[$key] = $this->upload(
        $request->file($key),
        $folder,
        $oldPath
      );
    }

    return $validated;
  }


  /**
   * Delete an image from storage.
   */
  public function delete(?string $path): void
  {
    if ($path && Storage::disk('public')->exists($path)) {
      Storage::disk('public')->delete($path);
    }
  }
}