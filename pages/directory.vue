<template>
  <main class="min-h-screen">
    <AppHeader class="mb-12" title="Software Directory" :description="description" />
    <div class="space-y-24">
      <!-- Software Stacks Section -->
      <div v-if="stacks && stacks.length > 0" class="space-y-8">
        <AppUsesHeader title="SOFTWARE STACKS" />
        <div class="space-y-4">
          <AppProductsStack
            v-for="stack in stacks"
            :key="stack._path"
            :stack="stack"
          />
        </div>
      </div>
      <!-- Individual Products Section -->
      <div v-if="softwares && softwares.length > 0" class="space-y-8">
        <AppUsesHeader title="SOFTWARES" />
        <div class="space-y-4">
          <AppProductCard
            v-for="(software, id) in softwares"
            :key="id"
            :project="software"
            :use-software-link="true"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const description =
  "Discover curated software stacks and individual softwares. From comprehensive development toolkits to standalone applications, find the perfect tools for your workflow.";

useSeoMeta({
  title: "Software Directory | Stacks & Softwares",
  description,
});

// Fetch softwares
const { data: softwares } = await useAsyncData("softwares-all", () =>
  queryContent("/softwares").find()
);

// Fetch software stacks
const { data: stacks } = await useAsyncData("stacks-all", () =>
  queryContent("/stacks").where({ status: "active" }).find()
);
</script>
