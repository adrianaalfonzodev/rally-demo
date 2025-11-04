import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="ERP Rally" />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center p-8">
                    <h1 className="text-5xl font-extrabold mb-8 text-gray-900 dark:text-white">ERP Rally</h1>

                    <div className="mt-6">
                        <Link
                            href={route('login')}
                            className="inline-block rounded-md bg-indigo-600 px-6 py-3 text-white text-lg hover:bg-indigo-700"
                        >
                            Iniciar sesión
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
