import {
  ChartBarIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  CircleStackIcon
} from '@heroicons/react/24/outline'

export type MenuItem = { name: string; routeName: string }
export type MenuSection = { name: string; items: MenuItem[] }
export type MenuIcons = { [key: string]: JSX.Element }


export const Menu: MenuSection[] = [
    {
      name: 'Principal',
      items: [{ name: 'Dashboard', routeName: 'dashboard' }]
    },
    {
      name: 'Administración',
      items: [
        { name: 'Roles', routeName: 'administration.roles.index' },
        { name: 'Usuarios', routeName: 'administration.users.index' }
      ]
    },
    {
      name: 'Inventario',
      items: [
        { name: 'Productos', routeName: 'inventory.products.index' }
      ]
    },
    {
      name: 'Cuenta',
      items: [{ name: 'Perfil', routeName: 'profile.edit' }]
    }
]

export const Icons: MenuIcons = {
    Principal: (
      <ChartBarIcon
        className="h-5 w-5 flex-shrink-0"
        aria-hidden
      />
    ),
    'Administración': (
      <ShieldCheckIcon
        className="h-5 w-5 flex-shrink-0"
        aria-hidden
      />
    ),
    'Cuenta': (
      <UserCircleIcon
        className="h-5 w-5 flex-shrink-0"
        aria-hidden
      />
    ),
    'Inventario': (
      <CircleStackIcon
        className="h-5 w-5 flex-shrink-0"
        aria-hidden
      />
    )
}