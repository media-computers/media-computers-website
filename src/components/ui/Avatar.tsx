import Image from 'next/image'
import { User } from 'lucide-react'

interface AvatarProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Avatar({ src, alt = 'Avatar', size = 'md', className = '' }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  if (src) {
    return (
      <div className={`relative rounded-full overflow-hidden ${sizes[size]} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    )
  }

  return (
    <div
      className={`
        flex
        items-center
        justify-center
        rounded-full
        bg-gray-100
        dark:bg-gray-800
        text-gray-600
        dark:text-gray-400
        ${sizes[size]}
        ${className}
      `}
    >
      <User className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8'}`} />
    </div>
  )
} 