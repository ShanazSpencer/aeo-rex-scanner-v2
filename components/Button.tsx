interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline'
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  style
}: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-primary text-background hover:bg-primary/90 shadow-lg shadow-primary/50',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/50',
    outline: 'border-2 border-primary text-primary hover:bg-primary/10'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={style}
    >
      {children}
    </button>
  )
}
