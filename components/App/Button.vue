<!--
  Unified Glass Morphism Button Component System
  
  All button variants now use elegant glass morphism styling with backdrop blur effects,
  rounded corners, and adaptive opacity backgrounds. Colors and contrast adapt to 
  light/dark themes while maintaining the consistent glass aesthetic.
  
  Usage Examples:
  
  1. Primary CTA Button (glass morphism with dark accent):
  <AppButton label="Get Started" variant="primary" size="lg" />
  
  2. Secondary Button (glass morphism with light accent):
  <AppButton label="Learn More" variant="secondary" />
  
  3. Link Button with Icon (minimal glass effect):
  <AppButton 
    label="View All Articles" 
    to="/articles" 
    variant="link" 
    right-icon="heroicons:arrow-right" 
  />
  
  4. External Link Button (glass morphism secondary):
  <AppButton 
    label="Visit Website" 
    href="https://example.com" 
    external 
    variant="secondary"
    right-icon="heroicons:arrow-top-right-on-square"
  />
  
  5. Loading State (maintains glass effect):
  <AppButton label="Saving..." :loading="isLoading" variant="primary" />
  
  6. Form Submit Button (glass morphism primary):
  <AppButton label="Submit" type="submit" variant="primary" />
  
  7. Ghost Button with Icon (subtle glass):
  <AppButton 
    left-icon="heroicons:plus" 
    label="Add Item" 
    variant="ghost" 
  />
  
  8. Pure Glass (for overlays/hero sections):
  <AppButton label="Know More" variant="glass" />
  
  Button Variants (all with glass morphism):
  - primary: Main CTA with dark glass (light theme) / light glass (dark theme)
  - secondary: Alternative action with light glass effect
  - ghost: Subtle glass for minimal interactions
  - link: Text-based with minimal glass backdrop on hover
  - glass: Pure white glass morphism for overlays and hero sections
  
  Sizes (all rounded-full for glass aesthetic):
  - sm: Small (text-sm, compact padding)
  - md: Medium (default, text-sm)  
  - lg: Large (text-base, generous padding)
  
  Features:
  - Consistent backdrop-blur-sm across all variants
  - Adaptive colors for light/dark themes
  - Smooth hover transitions with opacity changes
  - Full rounded corners (rounded-full) for modern glass look
  - Focus rings with matching glass opacity
  - Active scale animation (scale-[0.98]) for tactile feedback
-->

<template>
  <component
    :is="componentType"
    :to="to"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :type="htmlType"
    :disabled="disabled || loading"
    :class="buttonClasses"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <span v-if="loading" class="absolute inset-0 flex items-center justify-center">
      <svg
        class="animate-spin h-4 w-4 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>

    <span :class="contentClasses">
      <Icon
        v-if="leftIcon && !loading"
        :name="leftIcon"
        :class="iconClasses"
      />
      
      <span v-if="$slots.default || label" class="truncate">
        <slot>{{ label }}</slot>
      </span>
      
      <Icon
        v-if="rightIcon && !loading"
        :name="rightIcon"
        :class="iconClasses"
      />
    </span>
  </component>
</template>

<script setup lang="ts">
interface Props {
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

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  loading: false,
  disabled: false,
  external: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Determine component type
const componentType = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

// HTML type for button elements
const htmlType = computed(() => {
  if (componentType.value === 'button') return props.type
  return undefined
})

// Base classes with glass morphism foundation
const baseClasses = [
  'relative inline-flex items-center justify-center',
  'font-medium transition-all duration-200 ease-in-out',
  'focus:outline-none focus:ring-2',
  'disabled:opacity-60 disabled:cursor-not-allowed',
  'active:scale-[0.98]',
  'backdrop-blur-sm border'
]

// Size variants with rounded corners for glass morphism
const sizeClasses = {
  sm: [
    'px-3 py-1.5 text-sm',
    'rounded-full'
  ],
  md: [
    'px-5 py-2 text-sm',
    'rounded-full'
  ],
  lg: [
    'px-6 py-3 text-base',
    'rounded-full'
  ]
}

// Variant classes - all with glass morphism aesthetic
const variantClasses = {
  primary: [
    // Dark glass for primary actions - works on light backgrounds
    'bg-gray-900/20 text-gray-900 border-gray-900/20',
    'hover:bg-gray-900/30',
    'focus:ring-gray-900/50',
    // On dark backgrounds, use light glass
    'dark:bg-white/20 dark:text-white dark:border-white/20',
    'dark:hover:bg-white/30',
    'dark:focus:ring-white/50'
  ],
  secondary: [
    // Light glass for secondary actions
    'bg-white/20 text-gray-700 border-white/30',
    'hover:bg-white/30',
    'focus:ring-white/50',
    // On dark backgrounds, use subtle dark glass
    'dark:bg-gray-800/20 dark:text-gray-200 dark:border-gray-700/30',
    'dark:hover:bg-gray-800/30',
    'dark:focus:ring-gray-700/50'
  ],
  ghost: [
    // Minimal glass effect for subtle interactions
    'bg-gray-100/20 text-gray-700 border-gray-200/30',
    'hover:bg-gray-100/40 hover:text-gray-900',
    'focus:ring-gray-300/50',
    'dark:bg-gray-700/20 dark:text-gray-300 dark:border-gray-600/30',
    'dark:hover:bg-gray-700/30 dark:hover:text-white',
    'dark:focus:ring-gray-600/50'
  ],
  link: [
    // Minimal glass for link-style buttons
    'bg-transparent text-gray-600 border-transparent underline-offset-4 hover:underline',
    'hover:bg-gray-50/20 hover:text-primary-600',
    'focus:ring-primary-500/30',
    'dark:text-gray-400 dark:hover:text-primary-400 dark:hover:bg-gray-800/20',
    'dark:focus:ring-primary-400/30'
  ],
  glass: [
    // Pure glass morphism - for overlays and hero sections
    'bg-white/20 text-white border-white/20',
    'hover:bg-white/30',
    'focus:ring-white/50'
  ]
}

// Compute final classes
const buttonClasses = computed(() => [
  ...baseClasses,
  ...sizeClasses[props.size],
  ...variantClasses[props.variant],
  {
    'pointer-events-none': props.loading
  }
])

// Content classes for loading state
const contentClasses = computed(() => [
  'flex items-center gap-2',
  {
    'opacity-0': props.loading
  }
])

// Icon classes
const iconClasses = computed(() => {
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }
  return [sizeMap[props.size], 'flex-shrink-0']
})

// Handle click events
const handleClick = (event: MouseEvent) => {
  if (props.loading || props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>