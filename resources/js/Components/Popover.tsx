import { Popover as HPopover, Transition } from '@headlessui/react'
import React from 'react'

type Props = {
  trigger?: React.ReactNode
  triggerClassName?: string
  panelClassName?: string
  align?: 'left' | 'right' | 'center'
  triggerOnHover?: boolean
  hoverDelay?: number // ms delay before opening on hover
  children: React.ReactNode
}

export default function Popover({
  trigger,
  triggerClassName = '',
  panelClassName = '',
  align = 'right',
  triggerOnHover = false,
  hoverDelay = 80,
  children
}: Props) {
  let positionClass = 'right-0'
  if (align === 'left') positionClass = 'left-0'
  if (align === 'center') positionClass = 'left-1/2 -translate-x-1/2'

  // If hover behavior is requested, manage open state manually
  const [open, setOpen] = React.useState(false)
  const enterTimer = React.useRef<number | null>(null)
  const leaveTimer = React.useRef<number | null>(null)

  React.useEffect(() => {
    return () => {
      if (enterTimer.current) window.clearTimeout(enterTimer.current)
      if (leaveTimer.current) window.clearTimeout(leaveTimer.current)
    }
  }, [])

  if (triggerOnHover) {
    const onMouseEnter = () => {
      if (leaveTimer.current) {
        window.clearTimeout(leaveTimer.current)
        leaveTimer.current = null
      }
      if (!open) {
        enterTimer.current = window.setTimeout(() => setOpen(true), hoverDelay)
      }
    }

    const onMouseLeave = () => {
      if (enterTimer.current) {
        window.clearTimeout(enterTimer.current)
        enterTimer.current = null
      }
      // small delay to allow moving into the panel without immediate close
      leaveTimer.current = window.setTimeout(() => setOpen(false), 120)
    }

    return (
      <div
        className="relative inline-block"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <button
          type="button"
          className={triggerClassName}
        >
          {trigger}
        </button>

        <Transition
          show={open}
          as={React.Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <div
            className={`absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${positionClass} ${panelClassName}`}
          >
            {children}
          </div>
        </Transition>
      </div>
    )
  }

  // default: click/toggle behavior via Headless UI Popover
  return (
    <HPopover className="relative inline-block">
      <HPopover.Button className={triggerClassName}>{trigger}</HPopover.Button>

      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <HPopover.Panel
          className={`absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${positionClass} ${panelClassName}`}
        >
          {children}
        </HPopover.Panel>
      </Transition>
    </HPopover>
  )
}
