<template>
  <AppButton
    :to="to"
    :href="href"
    :external="external"
    :disabled="disabled"
    :loading="loading"
    :aria-label="ariaLabel"
    variant="glass"
    :size="size"
    :right-icon="showArrow ? 'heroicons:arrow-top-right-on-square' : undefined"
    class="rounded-full border-white/20"
    @click="$emit('click', $event)"
  >
    <slot>{{ label }}</slot>
  </AppButton>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  to?: string
  href?: string
  external?: boolean
  showArrow?: boolean
  ariaLabel?: string
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  loading: false,
  disabled: false,
  external: false,
  showArrow: true
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>