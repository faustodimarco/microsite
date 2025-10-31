<template>
  <main class="min-h-screen">
    <AppHeader
      class="mb-12"
      title="Enjoy discounts on your favorite softwares"
      :description="description"
    />
    <div class="space-y-24">
      <template v-for="category in categories" :key="category.title">
        <ul v-if="category.coupons.length > 0" class="space-y-8">
          <AppUsesHeader :title="category.title" />
          <AppProductCard 
            v-for="coupon in category.coupons" 
            :key="coupon._path" 
            :project="coupon"
            :use-software-link="true"
          />
        </ul>
      </template>
    </div>
  </main>
</template>

<script setup>
const description = "Get exclusive discounts on premium software and tools. Save money on your favorite development, design, and productivity applications.";

useSeoMeta({
  title: "Exclusive Software Coupons & Discounts",
  description,
});

// Fetch all active software with coupons
const { data: allCoupons } = await useAsyncData("all-coupons", () =>
  queryContent("/softwares").where({ hasCoupon: true, status: "active" }).find()
);

// Group coupons by category
const categories = computed(() => {
  const grouped = {};
  
  allCoupons.value?.forEach(coupon => {
    const category = coupon.category || 'other';
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(coupon);
  });
  
  // Define category order and titles
  const categoryMap = {
    development: 'Development Tools',
    design: 'Design Software', 
    productivity: 'Productivity',
    cloud: 'Cloud Services',
    other: 'Other'
  };
  
  return Object.entries(categoryMap).map(([key, title]) => ({
    title,
    coupons: grouped[key] || []
  })).filter(cat => cat.coupons.length > 0);
});
</script>