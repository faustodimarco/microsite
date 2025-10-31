<template>
  <main class="min-h-screen">
    <div v-if="stack" class="space-y-16">
      <!-- Header Section -->
      <div class="flex flex-col lg:flex-row lg:items-start gap-8">
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-4 mb-6">
            <h1 class="text-4xl sm:leading-tight md:leading-tight lg:leading-tight sm:text-4xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
              {{ stack.name }}
            </h1>
          </div>
          
          <p class="mt-6 text-base text-gray-600 dark:text-gray-400">
            {{ stack.description }}
          </p>
          
          <!-- Stack Info -->
          <div v-if="stack.category || stack.tags" class="mt-8 flex flex-wrap gap-6 text-sm">
            <div v-if="stack.category" class="flex items-center gap-2">
              <span class="text-gray-500 dark:text-gray-400">Category:</span>
              <span class="font-medium text-gray-900 dark:text-gray-100 capitalize">{{ stack.category }}</span>
            </div>
            <div v-if="stack.tags && stack.tags.length > 0" class="flex items-center gap-2">
              <span class="text-gray-500 dark:text-gray-400">Tags:</span>
              <div class="flex gap-2">
                <span 
                  v-for="tag in stack.tags" 
                  :key="tag"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-950 rounded-full"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-500 dark:text-gray-400">Products:</span>
              <span class="font-medium text-gray-900 dark:text-gray-100">{{ stackSoftware?.length || 0 }}</span>
            </div>
          </div>
        </div>
        
        <!-- Thumbnail -->
        <div v-if="stack.thumbnail" class="flex-shrink-0">
          <img 
            :src="stack.thumbnail" 
            :alt="stack.name"
            class="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg shadow-sm"
          />
        </div>
      </div>

      <!-- Description -->
      <div v-if="stack.longDescription" class="space-y-4">
        <h2 class="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          About This Stack
        </h2>
        <div class="prose dark:prose-invert prose-gray max-w-none">
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ stack.longDescription }}
          </p>
        </div>
      </div>

      <!-- Products in Stack -->
      <div v-if="stackSoftware && stackSoftware.length > 0" class="space-y-8">
        <h2 class="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          Products in this Stack
        </h2>
        <div class="space-y-4">
          <AppProductCard
            v-for="(software, index) in stackSoftware"
            :key="index"
            :project="software"
          />
        </div>
      </div>

      <!-- Share Stack -->
      <div class="flex flex-col sm:flex-row gap-4 max-w-md">
        <AppButton
          @click="copyPageUrl"
          :disabled="isCopyingUrl"
          :label="isCopyingUrl ? 'Link Copied!' : 'Share Stack'"
          right-icon="heroicons:share"
          variant="primary"
          size="lg"
        />
        <AppButton
          to="/stacks"
          label="Browse All Stacks"
          variant="secondary"
          size="lg"
        />
      </div>
    </div>
    
    <!-- 404 State -->
    <div v-else class="text-center py-20">
      <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <h1 class="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Stack Not Found</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        The stack you're looking for doesn't exist or has been removed.
      </p>
      <AppButton 
        to="/stacks" 
        label="Browse All Stacks"
        variant="primary"
        size="lg"
      />
    </div>
  </main>
</template>

<script setup>
const route = useRoute()
const { $toast } = useNuxtApp()

const isCopyingUrl = ref(false)

// Fetch stack using content system
const { data: stack } = await useAsyncData(`stack-${route.params.slug}`, () =>
  queryContent(`/stacks/${route.params.slug}`).findOne()
)

// Handle 404
if (!stack.value) {
  throw createError({ statusCode: 404, statusMessage: 'Stack Not Found' })
}

// Load software dynamically based on softwareIds
const { data: stackSoftware } = await useAsyncData(`stack-software-${route.params.slug}`, async () => {
  if (!stack.value?.softwareIds || stack.value.softwareIds.length === 0) {
    return []
  }
  
  // Fetch all software referenced in the stack
  const softwarePromises = stack.value.softwareIds.map(async (softwareId) => {
    try {
      return await queryContent(`/softwares/${softwareId}`).findOne()
    } catch (error) {
      console.warn(`Software ${softwareId} not found`)
      return null
    }
  })
  
  const software = await Promise.all(softwarePromises)
  return software.filter(s => s !== null)
})

// SEO Meta
useSeoMeta({
  title: computed(() => 
    `${stack.value.name} - Software Stack`
  ),
  description: computed(() => 
    stack.value.description || `Discover the ${stack.value.name} software stack with ${stackSoftware.value?.length || 0} curated tools and products.`
  ),
  ogTitle: computed(() => 
    `${stack.value.name} - Software Stack`
  ),
  ogDescription: computed(() => 
    stack.value.description
  ),
  ogImage: computed(() => stack.value.thumbnail || '/preview.jpg'),
})

// Copy page URL functionality
const copyPageUrl = async () => {
  isCopyingUrl.value = true
  
  try {
    await navigator.clipboard.writeText(window.location.href)
    
    if ($toast) {
      $toast.add({
        title: 'Link Copied!',
        description: 'Stack URL copied to clipboard',
        color: 'green',
        timeout: 2000
      })
    }
  } catch (error) {
    console.error('Failed to copy URL:', error)
  } finally {
    setTimeout(() => {
      isCopyingUrl.value = false
    }, 1000)
  }
}
</script>