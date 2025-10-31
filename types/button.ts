export interface ButtonProps {
  // Content
  label?: string
  leftIcon?: string
  rightIcon?: string
  
  // Variants
  variant?: 'primary' | 'secondary' | 'ghost' | 'link' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  
  // State
  loading?: boolean
  disabled?: boolean
  
  // Navigation
  to?: string
  href?: string
  external?: boolean
  
  // Button attributes
  type?: 'button' | 'submit' | 'reset'
  
  // Accessibility
  ariaLabel?: string
}

export interface ButtonEmits {
  click: [event: MouseEvent]
}

export type ButtonVariant = ButtonProps['variant']
export type ButtonSize = ButtonProps['size']