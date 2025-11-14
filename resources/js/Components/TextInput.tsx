import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  ReactNode
} from 'react'

export default forwardRef(function TextInput(
  {
    type = 'text',
    className = '',
    isFocused = false,
    icon,
    iconClassName = '',
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & {
    isFocused?: boolean
    icon?: ReactNode
    iconClassName?: string
  },
  ref
) {
  const localRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus()
  }))

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus()
    }
  }, [isFocused])

  return (
    <div className="relative">
      <input
        {...props}
        type={type}
        className={
          'w-full pr-10 rounded-md border-gray-300 shadow-sm focus:border-[#F2731A] focus:ring-[#F2731A] ' +
          className
        }
        ref={localRef}
      />

      {icon && (
        <span
          className={
            'absolute right-2 top-1/2 -translate-y-1/2 flex items-center text-gray-500 h-5 w-5' +
            iconClassName
          }
        >
          {icon}
        </span>
      )}
    </div>
  )
})
