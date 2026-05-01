import { TableCell, TableRow } from '@/components/ui/table'

interface TableSkeletonRowProps {
  columns?: number
}

export function TableSkeletonRow({ columns = 5 }: TableSkeletonRowProps) {
  return (
    <TableRow>
      {Array.from({ length: columns }).map((_, i) => (
        <TableCell key={i}>
          <div className="h-8 rounded bg-slate-100 animate-pulse" style={{ width: `${60 + Math.random() * 30}%` }} />
        </TableCell>
      ))}
    </TableRow>
  )
}
