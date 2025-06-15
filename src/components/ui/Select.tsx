import { SelectHTMLAttributes, forwardRef } from 'react'
import { LucideIcon } from 'lucide-react'

interface Option {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  icon?: LucideIcon
  options: Option[]
  className?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, icon: Icon, options, className = '', ...props }, ref) => {
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
          <select
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
              appearance-none
              ${error ? 'border-red-500 dark:border-red-500' : ''}
              ${className}
            `}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {error && (
          <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select 