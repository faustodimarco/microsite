<template>
  <div>
    <h1
      class="text-4xl sm:leading-tight md:leading-tight lg:leading-tight sm:text-4xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100"
    >
      {{ title }}
    </h1>
    <p class="mt-6 text-base text-gray-600 dark:text-gray-400">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
