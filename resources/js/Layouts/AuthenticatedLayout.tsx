import ApplicationLogo from "@/Components/ApplicationLogo";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Sidebar from "@/Components/Sidebar";
import Topbar from "@/Components/Topbar";
import { NotificationContainer } from "@/utils/notification";
import { PropsWithChildren, ReactNode, useState } from "react";
import { usePage } from '@inertiajs/react';

export default function Authenticated({
    header,
    title,
    children,
}: PropsWithChildren<{ header?: ReactNode; title?: string }>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const user = usePage().props.auth?.user;
    
    return (
        <div className="min-h-screen bg-[#fafafa]">
            <NotificationContainer />

            <Sidebar />

            <div className="sm:pl-64">
                <Topbar
                    user={user}
                    onToggleSidebar={() => setSidebarOpen((s) => !s)}
                    title={title}
                />

                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main className="sm:px-6 lg:px-8 space-y-6 mx-auto">
                    {children}
                </main>
            </div>

            {sidebarOpen && (
                <div className="fixed inset-0 z-40 flex sm:hidden">
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-75"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <svg
                                    className="h-6 w-6 text-white"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                            <div className="px-4">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                            </div>
                            <nav className="mt-5 px-2 space-y-1">
                                <ResponsiveNavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("roles.index")}
                                    active={route().current("roles")}
                                >
                                    Roles
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("users.index")}
                                    active={route().current("users")}
                                >
                                    Usuarios
                                </ResponsiveNavLink>
                            </nav>
                        </div> */}
                    </div>
                </div>
            )}
        </div>
    );
}
