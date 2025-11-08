interface CardProps {
  children: React.ReactNode
  className?: string
  glow?: boolean
  style?: React.CSSProperties
}

export default function Card({ children, className = '', glow = false, style }: CardProps) {
  return (
    <div
      className={`bg-dark-light rounded-xl p-6 ${
        glow ? 'border border-primary/30 shadow-lg shadow-primary/20' : 'border border-gray-800'
      } ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
