<template>
  <main class="min-h-screen">
    <div
      class="prose dark:prose-invert prose-blockquote:not-italic prose-pre:bg-gray-900 prose-img:ring-1 prose-img:ring-gray-200 dark:prose-img:ring-white/10 prose-img:rounded-lg"
    >
      <ContentDoc v-slot="{ doc }" tag="article">
        <article>
          <h1 class="text-4xl sm:leading-tight md:leading-tight lg:leading-tight sm:text-3xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">{{ doc.title }}</h1>
          <NuxtImg
            :src="doc.image || 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg'"
            :alt="doc.title"
            class="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg mb-8"
          />
          <ContentRenderer :value="doc" />
        </article>
      </ContentDoc>
    </div>
  </main>
</template>
<script setup>
const route = useRoute();
const { slug } = route.params;
useSeoMeta({
  ogImage: `https://fayazahmed.com/articles/${slug}.png`,
  twitterCard: "summary_large_image",
  articleAuthor: "Fayaz Ahmed",
});
</script>
<style>
.prose h2 a,
.prose h3 a {
  @apply no-underline;
}
</style>
