import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {
  MagnifyingGlassIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

type Props = {
  onToggleSidebar?: () => void
  title?: string
  user?: {
    name?: string
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
        <div className="flex h-16 items-center justify-between">
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
              <div className="hidden sm:block">
                {/* <div className="flex items-center px-3 py-1 bg-white rounded-lg shadow">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <input
                    className="ms-2 w-64 bg-transparent text-sm placeholder-gray-400 border-0 focus:outline-none focus:ring-0 focus:border-transparent"
                    placeholder="Search..."
                  />
                </div> */}
              </div>
              <div
                className="relative"
                ref={ref}
              >
                <button
                  type="button"
                  onClick={() => setOpen((s) => !s)}
                  className="flex items-center bg-white rounded-lg shadow px-3 py-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F2731A]"
                >
                  <div className="flex items-center">
                    <div
                      className="h-8 w-8 rounded-full bg-gray-200"
                      style={{
                        background:
                          'url(/images/Portrait_Placeholder.png) no-repeat center center',
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
                          {user?.name ?? 'Usuario'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user?.email ?? 'admin@erp.test'}
                        </div>
                      </div>
                      {/* <button
                        type="button"
                        onClick={() => {
                          setOpen(false)
                          // Aquí puede navegar al perfil si es necesario
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Ver perfil
                      </button> */}
                      <button
                        type="button"
                        onClick={async () => {
                          setOpen(false)
                          if (onLogout) {
                            try {
                              await onLogout()
                            } catch (e) {
                              console.error('onLogout handler failed', e)
                            }
                            return
                          }

                          try {
                            await axios.post('/logout')
                            window.location.href = '/login'
                          } catch (e) {
                            console.error('Logout failed', e)
                            window.location.reload()
                          }
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Cerrar sesión
                      </button>
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
