import { InputHTMLAttributes, forwardRef } from 'react'
import { LucideIcon } from 'lucide-react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: LucideIcon
  className?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-bold text-gray-700 dark:text-white">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          )}
          <input
            ref={ref}
            className={`
              w-full
              ${Icon ? 'pl-10' : 'pl-4'}
              pr-4
              py-2
              border
              border-gray-300
              dark:border-gray-700
              rounded-full
              focus:outline-none
              focus:ring-2
              focus:ring-primary
              focus:border-transparent
              bg-white
              dark:bg-gray-900
              text-gray-900
              dark:text-white
              ${error ? 'border-red-500 dark:border-red-500' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input 