<template>
  <main class="min-h-screen">
    <AppHeader
      class="mb-12"
      title="Software Stacks"
      :description="description"
    />
    <div class="space-y-24">
      <template v-for="category in categories" :key="category.title">
        <ul v-if="category.stacks.length > 0" class="space-y-8">
          <AppUsesHeader :title="category.title" />
          <AppProductsStack 
            v-for="stack in category.stacks" 
            :key="stack._path" 
            :stack="stack" 
          />
        </ul>
      </template>
    </div>
  </main>
</template>

<script setup>
const description = "Discover curated software stacks for different development needs. From frontend to full-stack, find the perfect combination of tools and technologies.";

useSeoMeta({
  title: "Software Stacks & Tool Collections",
  description,
});

// Fetch all stacks using content system
const { data: allStacks } = await useAsyncData("all-stacks", () =>
  queryContent("/stacks").where({ status: "active" }).find()
);

// Group stacks by category
const categories = computed(() => {
  const grouped = {};
  
  allStacks.value?.forEach(stack => {
    const category = stack.category || 'other';
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(stack);
  });
  
  // Define category order and titles
  const categoryMap = {
    development: 'Development Stacks',
    design: 'Design & Creative', 
    productivity: 'Productivity Suites',
    cloud: 'Cloud & Infrastructure',
    other: 'Other Stacks'
  };
  
  return Object.entries(categoryMap).map(([key, title]) => ({
    title,
    stacks: grouped[key] || []
  })).filter(cat => cat.stacks.length > 0);
});
</script>