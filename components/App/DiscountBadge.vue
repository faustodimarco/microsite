<template>
  <span 
    :class="[
      'inline-flex items-center font-medium rounded-full',
      sizeClasses,
      colorClasses
    ]"
  >
    -{{ percentage }}%{{ showOff ? ' OFF' : '' }}
  </span>
</template>

<script setup>
const props = defineProps({
  percentage: {
    type: [Number, String],
    required: true,
  },
  size: {
    type: String,
    default: 'sm',
    validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value)
  },
  showOff: {
    type: Boolean,
    default: false,
  },
})

const sizeClasses = computed(() => {
  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-sm', 
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }
  return sizes[props.size] || sizes.sm
})

const colorClasses = 'text-pink-700 bg-pink-100 dark:text-pink-300 dark:bg-pink-950'
</script>