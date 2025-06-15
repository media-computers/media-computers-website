import { ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TooltipProps {
  children: ReactNode
  content: ReactNode
  position?: 'top' | 'right' | 'bottom' | 'left'
  className?: string
}

export default function Tooltip({ children, content, position = 'top', className = '' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 -translate-y-2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 translate-x-2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 translate-y-2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 -translate-x-2 mr-2'
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`
              absolute
              z-50
              ${positions[position]}
              px-3
              py-2
              text-sm
              font-medium
              text-white
              bg-gray-900
              dark:bg-gray-800
              rounded-lg
              shadow-lg
              whitespace-nowrap
              ${className}
            `}
          >
            {content}
            <div
              className={`
                absolute
                w-2
                h-2
                bg-gray-900
                dark:bg-gray-800
                transform
                rotate-45
                ${
                  position === 'top'
                    ? 'bottom-[-4px] left-1/2 -translate-x-1/2'
                    : position === 'right'
                    ? 'left-[-4px] top-1/2 -translate-y-1/2'
                    : position === 'bottom'
                    ? 'top-[-4px] left-1/2 -translate-x-1/2'
                    : 'right-[-4px] top-1/2 -translate-y-1/2'
                }
              `}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 