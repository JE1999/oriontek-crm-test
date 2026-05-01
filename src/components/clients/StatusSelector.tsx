import { CLIENT_STATUS } from '@/constants'

interface StatusSelectorProps {
  value: 'active' | 'inactive'
  onChange: (value: 'active' | 'inactive') => void
  size?: 'sm' | 'md'
}

export function StatusSelector({ value, onChange, size = 'md' }: StatusSelectorProps) {
  return (
    <div className="flex gap-2">
      {([CLIENT_STATUS.ACTIVE, CLIENT_STATUS.INACTIVE] as const).map((s) => (
        <label
          key={s}
          className={`flex cursor-pointer items-center transition-colors border ${
            size === 'md' ? 'gap-2 rounded-lg px-4 py-2.5 text-sm' : 'gap-1.5 rounded-lg px-3 py-1.5 text-xs'
          } font-medium ${
            value === s
              ? 'border-primary bg-primary/5 text-primary'
              : 'border-border bg-white text-muted-foreground hover:bg-slate-50'
          }`}
        >
          <input
            type="radio"
            className="sr-only"
            value={s}
            checked={value === s}
            onChange={() => onChange(s)}
          />
          <span
            className={`rounded-full ${
              size === 'md' ? 'h-2 w-2' : 'h-1.5 w-1.5'
            } ${s === CLIENT_STATUS.ACTIVE ? 'bg-emerald-500' : 'bg-slate-400'}`}
          />
          {s === CLIENT_STATUS.ACTIVE ? 'Activo' : 'Inactivo'}
        </label>
      ))}
    </div>
  )
}
