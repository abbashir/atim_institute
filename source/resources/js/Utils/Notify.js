import { toast } from 'react-hot-toast';

export const success = (message) => {
    toast.success(message, {
        duration: 4000,
        position: 'top-right',
        style: {
            background: '#ecfdf5',
            color: '#065f46',
            fontWeight: '600',
            border: '1px solid #10b981'
        },
    });
};

export const error = (message) => {
    toast.error(message, {
        duration: 5000,
        position: 'top-right',
        style: {
            background: '#fff1f2',
            color: '#9f1239',
            fontWeight: '600',
            border: '1px solid #fda4af'
        },
    });
};