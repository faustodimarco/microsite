<template>
  <NuxtLink
    class="flex items-end gap-4 group p-2 -m-2 rounded-lg"
    :to="`/stacks/${createSlug(stack.name)}`"
  >
    <div class="max-w-sm">
      <h3 class="text-xl font-medium group-hover:text-primary-600 mb-1">
        {{ stack.name }}
      </h3>
      <p class="text-gray-400 text-sm">{{ stack.description }}</p>
      <div v-if="stackSoftware && stackSoftware.length > 3" class="mt-2">
        <span class="text-xs text-gray-500 dark:text-gray-400">
          +{{ stackSoftware.length - 3 }} more products
        </span>
      </div>
    </div>
    <div
      class="flex-1 border-b border-dashed border-gray-300 dark:border-gray-800 group-hover:border-gray-700"
    ></div>
    <div class="flex items-center -space-x-2">
      <UAvatar
        v-for="(product, index) in displayedProducts"
        :key="index"
        :src="product.thumbnail"
        :ui="{ rounded: 'rounded-full z-10 relative bg-white dark:bg-black' }"
        size="md"
        :alt="product.name"
        :style="{ zIndex: displayedProducts.length - index }"
      />
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  stack: {
    type: Object,
    required: true,
  },
});

// Create slug function for stack URLs
const createSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Load software dynamically based on softwareIds
const stackSoftware = ref([]);

onMounted(async () => {
  if (props.stack.softwareIds && props.stack.softwareIds.length > 0) {
    // Fetch all software referenced in the stack
    const softwarePromises = props.stack.softwareIds.map(async (softwareId) => {
      try {
        return await queryContent(`/softwares/${softwareId}`).findOne()
      } catch (error) {
        console.warn(`Software ${softwareId} not found`)
        return null
      }
    })
    
    const software = await Promise.all(softwarePromises)
    stackSoftware.value = software.filter(s => s !== null)
  } else if (props.stack.products) {
    // Fallback for old format with embedded products
    stackSoftware.value = props.stack.products
  }
});

// Show only first 3 products for the icon display
const displayedProducts = computed(() => {
  return stackSoftware.value?.slice(0, 3) || [];
});
</script>