import { Link } from '@inertiajs/react'
import { FunctionComponent, useEffect, useState } from 'react'
import { MenuItem, MenuSection, MenuIcons, Menu, Icons } from '@/Components/Menu'
import ApplicationLogo from './ApplicationLogo'


const Sidebar: FunctionComponent = () => {
  const sections: MenuSection[] = Menu

  const STORAGE_KEY = 'sidebar.openSections.v1'

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => {
      try {
        if (typeof window === 'undefined') return {}
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return {}
        const parsed = JSON.parse(raw)
        if (parsed && typeof parsed === 'object') return parsed
        return {}
      } catch (e) {
        return {}
      }
    }
  )

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(openSections))
    } catch (e) {
      // ignore
    }
  }, [openSections])

  const toggle = (name: string) => {
    setOpenSections((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const hasNamedRoute = (name: string) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ziggy = (window as any)?.Ziggy
      const named = ziggy?.routes || ziggy?.namedRoutes
      return !!(named && named[name])
    } catch (e) {
      return false
    }
  }
  const isZiggyAvailable = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return !!(typeof window !== 'undefined' && (window as any).Ziggy)
  }

  const sectionIcons: MenuIcons = Icons

  const anyChildActive = (items: MenuItem[]) => {
    return items.some((it) => {
      try {
        if (route().current(it.routeName)) return true

        const parts = it.routeName.split('.')
        if (parts.length > 1) {
          const baseWildcard = parts.slice(0, -1).join('.') + '.*'
          try {
            if (route().current(baseWildcard)) return true
          } catch (e) {
            // ignore
          }
        }

        return false
      } catch (e) {
        return false
      }
    })
  }

  return (
    <aside className="hidden sm:fixed sm:inset-y-0 sm:flex sm:w-64 sm:flex-col bg-[#F6F6F6] shadow-inner">
      <div className="flex h-16 flex-shrink-0 items-center px-5 pt-4">
        <Link href="/">
          <ApplicationLogo className="h-12 fill-current pl-4" />
        </Link>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 px-6 py-4">
          {sections.map((section) => {
            const ziggyPresent = isZiggyAvailable()
            const visibleItems = section.items.filter(
              (it) => hasNamedRoute(it.routeName) || !ziggyPresent
            )
            if (visibleItems.length === 0) return null

            const isActive = anyChildActive(visibleItems)

            if (
              visibleItems.length === 1 &&
              visibleItems[0].routeName === 'dashboard'
            ) {
              const item = visibleItems[0]
              let href = '#'
              let active = false
              try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const candidate = (route as any)(item.routeName)
                if (candidate) href = candidate
                try {
                  active = route().current(item.routeName)
                } catch (e) {
                  active = false
                }
              } catch (e) {
                href = '#'
                active = false
              }

              const baseVertical =
                'block rounded-md px-3 py-2 font-medium transition duration-150 ease-in-out focus:outline-none text-sm'
              const activeClass = 'bg-[EEEEEE] text-[#333333]'
              const inactiveClass =
                'text-[#585858] hover:bg-[#EEEEEE] hover:text-gray-900'
              const classNames =
                baseVertical +
                ' ' +
                (active ? activeClass : inactiveClass) +
                ' ' +
                'w-full'

              return (
                <div
                  key={section.name}
                  className="py-1"
                >
                  {!href || href === '#' ? (
                    <a
                      href={href}
                      className={classNames}
                      onClick={(e: any) => {
                        e.preventDefault()
                      }}
                    >
                      <span className="flex items-center gap-2">
                        {sectionIcons[section.name]}
                        <span>{item.name}</span>
                      </span>
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className={classNames}
                    >
                      <span className="flex items-center gap-2">
                        {sectionIcons[section.name]}
                        <span>{item.name}</span>
                      </span>
                    </Link>
                  )}
                </div>
              )
            }

            const isOpen = !!openSections[section.name] || isActive

            return (
              <div key={section.name}>
                <button
                  onClick={() => toggle(section.name)}
                  className={
                    'w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md ' +
                    (isActive
                      ? 'text-[#F2731A]'
                      : 'text-[#585858] hover:bg-[#EEEEEE] hover:text-black')
                  }
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2">
                    {sectionIcons[section.name]}
                    <span className="text-sm font-medium">{section.name}</span>
                  </span>
                  <svg
                    className={`h-4 w-4 transform ${isOpen ? 'rotate-90' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <div
                  className={`${
                    isOpen ? 'block' : 'hidden'
                  } mt-1 space-y-1 px-2`}
                >
                  {visibleItems.map((item) => {
                    let href = '#'
                    let active = false
                    try {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const candidate = (route as any)(item.routeName)
                      if (candidate) href = candidate
                      try {
                        active = route().current(item.routeName)
                      } catch (e) {
                        active = false
                      }
                    } catch (e) {
                      href = '#'
                      active = false
                    }

                    const baseVertical =
                      'block rounded-md px-3 py-2 text-sm font-medium transition duration-150 ease-in-out focus:outline-none'
                    const activeClass = 'bg-[#EEEEEE] text-[#333333]'
                    const inactiveClass = 'text-[#585858] hover:text-gray-900'
                    const classNames =
                      baseVertical +
                      ' ' +
                      (active ? activeClass : inactiveClass) +
                      ' ' +
                      'ms-2'

                    return !href || href === '#' ? (
                      <a
                        key={item.name}
                        href={href}
                        className={classNames}
                        onClick={(e: any) => {
                          e.preventDefault()
                        }}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        key={item.name}
                        href={href}
                        className={classNames}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </nav>

        <div className="border-t border-gray-200 px-4 py-4">
          <div className="p-3 text-gray-300 text-sm">En desarrollo</div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
