import { CheckCircle } from 'lucide-react'

interface SuccessMessageProps {
  message: string
  className?: string
}

export default function SuccessMessage({ message, className = '' }: SuccessMessageProps) {
  return (
    <div className={`flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg ${className}`}>
      <CheckCircle className="h-5 w-5 flex-shrink-0" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
} 