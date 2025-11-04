import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    vertical = false,
    ...props
}: InertiaLinkProps & { active: boolean; vertical?: boolean }) {
    const baseHorizontal =
        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none';

    const baseVertical =
        'block rounded-md px-3 py-2 text-base font-medium transition duration-150 ease-in-out focus:outline-none';

    const activeClass = vertical
        ? 'bg-indigo-50 text-indigo-700'
        : 'border-indigo-400 text-gray-900 focus:border-indigo-700';

    const inactiveClass = vertical
        ? 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700';

    return (
        <Link
            {...props}
            className={
                (vertical ? baseVertical : baseHorizontal) +
                ' ' +
                (active ? activeClass : inactiveClass) +
                ' ' +
                className
            }
        >
            {children}
        </Link>
    );
}
