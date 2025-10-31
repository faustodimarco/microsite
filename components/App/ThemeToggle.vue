<script setup>
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(value) {
    colorMode.preference = value ? "dark" : "light";
  },
});

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>

<template>
  <UTooltip text="Toggle theme" :ui="{ popper: { strategy: 'absolute' } }">
    <button
      @click="toggleTheme"
      aria-label="Toggle theme"
      class="p-3 rounded-full transition-colors duration-200 hover:opacity-70"
    >
      <Icon 
        :name="isDark ? 'heroicons:sun' : 'heroicons:moon'" 
        class="w-5 h-5 text-gray-600 dark:text-gray-300"
      />
    </button>
  </UTooltip>
</template>
