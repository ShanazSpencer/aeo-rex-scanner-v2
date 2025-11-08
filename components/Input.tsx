interface InputProps {
  id?: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  required?: boolean
  name?: string
  style?: React.CSSProperties
}

export default function Input({
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  required = false,
  name,
  style
}: InputProps) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 bg-dark border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white placeholder-gray-500 ${className}`}
      required={required}
      name={name}
      style={style}
    />
  )
}
