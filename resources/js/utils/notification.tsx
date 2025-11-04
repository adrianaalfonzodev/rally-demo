import toast, { Toaster } from 'react-hot-toast';


const notification = {
    success: (message: string) => {
        toast.success(message, {
            position: "top-right",
            duration: 3000,
            style: {
                borderRadius: '8px',
                background: '#4BB543',
                color: '#fff',
            },
        });
    },
    error: (message: string) => {
        toast.error(message, {
            position: "top-right",
            duration: 5000,
            style: {
                borderRadius: '8px',
                background: '#FF3333',
                color: '#fff',
            },
        });
    },
    info: (message: string) => {
        toast(message, {
            position: "top-right",
            duration: 4000,
            style: {
                borderRadius: '8px',
                background: '#3333FF',
                color: '#fff',
            },
        });
    },
    confirm: (message: string, onConfirm: () => void) => {
        toast((t) => (
            <div>
                <p>{message}</p>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        className="rounded bg-gray-300 px-4 py-2 text-sm text-gray-800 hover:bg-gray-400"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Cancelar
                    </button>
                    <button
                        className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                        onClick={() => {
                            onConfirm();
                            toast.dismiss(t.id);
                        }}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        ), {
            position: "top-center",
            duration: Infinity,
            style: {
                borderRadius: '8px',
                background: '#fff',
                color: '#000',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            },
        });
    }
};

export const NotificationContainer = () => <Toaster />;

export default notification;