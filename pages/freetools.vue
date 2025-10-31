<template>
  <main class="min-h-screen">
    <AppHeader class="mb-8" title="Free Tools" :description="description" />
    <ul class="space-y-2">
      <li v-for="bookmark in bookmarks" :key="bookmark.id">
        <a
          :href="bookmark.url"
          target="_blank"
          class="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-white/10 p-2 rounded-lg -m-2 text-sm min-w-0"
        >
          <UAvatar
            :src="getThumbnail(bookmark.url)"
            :alt="bookmark.label"
            :ui="{ rounded: 'rounded-md' }"
          />
          <p class="truncate text-gray-700 dark:text-gray-200">
            {{ bookmark.label }}
          </p>
          <span class="flex-1"></span>
          <span class="text-xs font-medium text-gray-400 dark:text-gray-600">
            {{ getHost(bookmark.url) }}
          </span>
        </a>
      </li>
    </ul>
  </main>
</template>

<script setup>
const description =
  "Awesome things I've found on the internet. This page is still WIP, I want to add search like bmrks.com";
useSeoMeta({
  title: "Bookmarks | Fayaz Ahmed",
  description,
});

// Fetch free tools from content system
const { data: freetools } = await useAsyncData("freetools-all", () =>
  queryContent("/freetools").find()
);

// Map to legacy format for compatibility with existing template
const bookmarks = computed(() => {
  return freetools.value?.map((tool, index) => ({
    id: index + 1,
    label: tool.name,
    url: tool.url
  })) || []
});

function getHost(url) {
  const parsedUrl = new URL(url);
  let host = parsedUrl.host;
  if (host.startsWith("www.")) {
    host = host.substring(4);
  }
  return host;
}

function getThumbnail(url) {
  const host = getHost(url);
  return `https://logo.clearbit.com/${host}`;
}
</script>
