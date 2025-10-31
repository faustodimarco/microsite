<template>
  <div>
    <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">
      FEATURED DEALS
    </h2>
    <div class="space-y-4">
      <AppProductCard
        v-for="(coupon, id) in coupons"
        :key="id"
        :project="coupon"
        :use-software-link="true"
      />
    </div>
    <div class="flex items-center justify-center mt-6 text-sm">
      <AppButton
        label="All Coupons"
        to="/coupons"
        variant="link"
        right-icon="heroicons:arrow-right"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: coupons } = await useAsyncData("coupons-home", () =>
  queryContent("/softwares").where({ hasCoupon: true, status: "active" }).limit(3).find()
);
</script>