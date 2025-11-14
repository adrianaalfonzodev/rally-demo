import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

import { usePage } from '@inertiajs/react';

export default function Guest({ children }: PropsWithChildren) {
    const { urlAsset } = usePage().props;
    
    return (
        <div
            className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0"
            style={{
                background:
                    `url(${urlAsset}/images/background_erp.jpg) no-repeat center center fixed`,
                backgroundSize: "cover",
            }}
        >
            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                <div className="w-full flex justify-center mb-2">
                    <Link href="/">
                        <ApplicationLogo className="h-20 fill-current" />
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
