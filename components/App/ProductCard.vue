<template>
  <NuxtLink
    class="flex items-end gap-4 group p-2 -m-2 rounded-lg"
    :to="linkUrl"
    :target="linkTarget"
    :external="isExternal"
  >
    <div class="max-w-sm">
      <div class="flex items-center gap-3 mb-1">
        <h3 class="text-xl font-medium group-hover:text-primary-600">
          {{ itemName }}
        </h3>
        <AppDiscountBadge 
          v-if="discountPercentage" 
          :percentage="discountPercentage"
          size="sm"
        />
      </div>
      <p class="text-gray-400 text-sm">{{ itemDescription }}</p>
    </div>
    <div
      class="flex-1 border-b border-dashed border-gray-300 dark:border-gray-800 group-hover:border-gray-700"
    ></div>
    <UAvatar
      :src="itemThumbnail"
      :ui="{ rounded: 'rounded z-10 relative' }"
      size="md"
      :alt="itemName"
    />
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: false,
  },
  promo: {
    type: Object,
    required: false,
  },
  useSoftwareLink: {
    type: Boolean,
    default: false,
  },
});

// Create slug function for promo cards
const createSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Computed properties to handle both project and promo data
const item = computed(() => props.promo || props.project);
const itemName = computed(() => item.value?.name || '');
const itemDescription = computed(() => item.value?.description || '');
const itemThumbnail = computed(() => item.value?.thumbnail || '');
const discountPercentage = computed(() => item.value?.discountPercentage || null);

const linkUrl = computed(() => {
  if (props.promo) {
    return `/coupons/${createSlug(props.promo.name)}`;
  }
  if (props.useSoftwareLink && props.project) {
    // Extract slug from _path or create from filename
    const slug = props.project._path?.split('/').pop() || createSlug(props.project.name);
    return `/software/${slug}`;
  }
  return props.project?.url || '#';
});

const linkTarget = computed(() => {
  return (props.promo || props.useSoftwareLink) ? '_self' : '_blank';
});

const isExternal = computed(() => {
  return !props.promo && !props.useSoftwareLink;
});
</script>
