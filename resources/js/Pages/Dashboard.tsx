import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            title={"Dashboard"}
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Próximamente
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
