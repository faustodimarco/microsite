<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">
      LATEST RELEASES
    </h2>
    <div class="space-y-4">
      <AppProductCard
        v-for="(software, id) in softwares"
        :key="id"
        :project="software"
        :use-software-link="true"
      />
    </div>
    <div class="flex items-center justify-center mt-6 text-sm">
      <AppButton
        label="All Softwares"
        to="/directory"
        variant="link"
        right-icon="heroicons:arrow-right"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: softwares } = await useAsyncData("softwares-home", () =>
  queryContent("/softwares").limit(3).find()
);
</script>
