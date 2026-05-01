import { cn } from '@/utils/cn'
import { getInitials } from '@/utils/string'

interface ClientAvatarProps {
  firstName: string
  lastName: string
  size?: 'sm' | 'lg'
  shape?: 'circle' | 'square'
}

export function ClientAvatar({
  firstName,
  lastName,
  size = 'sm',
  shape = 'circle',
}: ClientAvatarProps) {
  const initials = getInitials(firstName, lastName)

  return (
    <div
      className={cn(
        'flex flex-shrink-0 items-center justify-center bg-primary/10 text-primary font-semibold',
        {
          'h-8 w-8 text-xs': size === 'sm',
          'h-16 w-16 text-xl': size === 'lg',
          'rounded-full': shape === 'circle',
          'rounded-2xl': shape === 'square',
        }
      )}
    >
      {initials}
    </div>
  )
}
