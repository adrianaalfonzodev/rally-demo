import { FunctionComponent, useEffect, useRef, useState } from 'react'
import {
  ChevronDownIcon,
  BellIcon
} from '@heroicons/react/24/outline'
import { Link } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import Dropdown from './Dropdown'

type Props = {
  onToggleSidebar?: () => void
  title?: string
  user?: {
    FullName?: string
    email?: string
  }
  onLogout?: () => void
}

const Topbar: FunctionComponent<Props> = ({
  onToggleSidebar,
  title,
  user,
  onLogout
}) => {
  const { urlAsset } = usePage().props
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])
  return (
    <div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center">
            {title && (
              <div className="hidden sm:block">
                <div className="text-lg font-semibold text-gray-800">
                  {title}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {/* <div className="hidden sm:block">
                <div className="flex items-center px-3 py-1 bg-white rounded-lg shadow">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <input
                    className="ms-2 w-64 bg-transparent text-sm placeholder-gray-400 border-0 focus:outline-none focus:ring-0 focus:border-transparent"
                    placeholder="Search..."
                  />
                </div>
              </div> */}

              <Dropdown>
                <Dropdown.Trigger>
                  <button
                    type="button"
                    className="flex items-center bg-white rounded-lg shadow px-3 py-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F2731A] h-8"
                  >
                    <BellIcon className="w-5 h-5" />
                  </button>
                </Dropdown.Trigger>

                <Dropdown.Content
                  align="right"
                  width="48"
                  contentClasses="p-3 bg-white"
                >
                  <div className="py-1">
                    <span className="text-sm">
                      Esta función está en desarrollo
                    </span>
                  </div>
                </Dropdown.Content>
              </Dropdown>
              <div
                className="relative"
                ref={ref}
              >
                <button
                  type="button"
                  onClick={() => setOpen((s) => !s)}
                  className="flex items-center bg-white rounded-lg shadow px-3 py-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F2731A] h-8"
                >
                  <div className="flex items-center">
                    <div
                      className="h-6 w-6 rounded-full bg-gray-200"
                      style={{
                        background:
                          `url(${urlAsset}/images/Portrait_Placeholder.png) no-repeat center center`,
                        backgroundSize: 'cover'
                      }}
                    />
                    <ChevronDownIcon
                      className="h-4 w-4 ms-2 text-gray-500"
                      aria-hidden="true"
                    />
                  </div>
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <div className="px-4 py-2">
                        <div className="text-sm font-medium text-gray-800">
                          {user?.FullName ?? 'Usuario'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user?.email ?? 'admin@erp.test'}
                        </div>
                      </div>
                      <Link href={route('logout')} method="post" as="button"
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Cerrar sesión
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
