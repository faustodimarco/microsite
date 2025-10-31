<template>
  <main class="min-h-screen">
    <div v-if="software" class="space-y-16">
      <!-- Header Section -->
      <div class="flex flex-col lg:flex-row lg:items-start gap-8">
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-4 mb-6">
            <h1 class="text-4xl sm:leading-tight md:leading-tight lg:leading-tight sm:text-4xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
              {{ software.name }}
            </h1>
            <AppDiscountBadge 
              v-if="software.hasCoupon && software.discountPercentage" 
              :percentage="software.discountPercentage"
              size="md"
              show-off
            />
          </div>
          
          <p class="mt-6 text-base text-gray-600 dark:text-gray-400">
            {{ software.description }}
          </p>
          
          <!-- Software Info -->
          <div v-if="software.category || software.tags || software.opensource !== undefined" class="mt-8 flex flex-wrap gap-6 text-sm">
            <div v-if="software.category" class="flex items-center gap-2">
              <span class="text-gray-500 dark:text-gray-400">Category:</span>
              <span class="font-medium text-gray-900 dark:text-gray-100 capitalize">{{ software.category }}</span>
            </div>
            <div v-if="software.opensource !== undefined" class="flex items-center gap-2">
              <span class="text-gray-500 dark:text-gray-400">Type:</span>
              <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full"
                :class="software.opensource ? 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-950' : 'text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-950'">
                {{ software.opensource ? 'Open Source' : 'Commercial' }}
              </span>
            </div>
            <div v-if="software.tags && software.tags.length > 0" class="flex items-center gap-2">
              <span class="text-gray-500 dark:text-gray-400">Tags:</span>
              <div class="flex gap-2">
                <span 
                  v-for="tag in software.tags" 
                  :key="tag"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-800 rounded-full"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div v-if="software.hasCoupon && software.validUntil" class="flex items-center gap-2">
              <span class="text-gray-500 dark:text-gray-400">Deal Valid Until:</span>
              <span class="font-medium text-gray-900 dark:text-gray-100">{{ formatDate(software.validUntil) }}</span>
            </div>
          </div>
        </div>
        
        <!-- Logo/Thumbnail -->
        <div v-if="software.thumbnail" class="flex-shrink-0">
          <img 
            :src="software.thumbnail" 
            :alt="software.name"
            class="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg shadow-sm"
          />
        </div>
      </div>

      <!-- Coupon Code Section (only if hasCoupon) -->
      <div v-if="software.hasCoupon && software.couponCode" class="space-y-4">
        <h2 class="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          Your Exclusive Coupon Code
        </h2>
        <div class="flex flex-col sm:flex-row gap-3 max-w-md">
          <div class="flex-1 px-4 py-3 font-mono text-center sm:text-left text-lg font-medium bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            {{ software.couponCode }}
          </div>
          <AppButton
            @click="copyCouponCode"
            :disabled="isCopying"
            :label="isCopying ? 'Copied!' : 'Copy Code'"
            variant="primary"
            size="lg"
          />
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Click "Copy Code" and paste it at checkout to get your discount
        </p>
      </div>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 max-w-md">
        <AppButton
          v-if="software.hasCoupon && software.redeemUrl"
          :href="software.redeemUrl"
          external
          label="Get This Deal"
          right-icon="heroicons:arrow-top-right-on-square"
          variant="primary"
          size="lg"
        />
        <AppButton
          v-else-if="software.url"
          :href="software.url"
          external
          :label="`Visit ${software.name}`"
          right-icon="heroicons:arrow-top-right-on-square"
          variant="primary"
          size="lg"
        />
        <AppButton
          @click="copyPageUrl"
          :disabled="isCopyingUrl"
          :label="isCopyingUrl ? 'Link Copied!' : 'Share'"
          right-icon="heroicons:share"
          variant="secondary"
          size="lg"
        />
      </div>

      <!-- Long Description -->
      <div v-if="software.longDescription" class="space-y-4">
        <h2 class="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          {{ software.hasCoupon ? 'About This Deal' : 'About This Software' }}
        </h2>
        <div class="prose dark:prose-invert prose-gray max-w-none">
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ software.longDescription }}
          </p>
        </div>
      </div>

      <!-- Features (shown if available, especially for coupon mode) -->
      <div v-if="software.features && software.features.length > 0" class="space-y-4">
        <h2 class="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          {{ software.hasCoupon ? "What's Included" : 'Key Features' }}
        </h2>
        <ul class="space-y-3">
          <li v-for="feature in software.features" :key="feature" class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-gray-600 dark:text-gray-400">{{ feature }}</span>
          </li>
        </ul>
      </div>

      <!-- Terms & Conditions (only if hasCoupon) -->
      <div v-if="software.hasCoupon && software.terms && software.terms.length > 0" class="space-y-4">
        <h2 class="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          Terms & Conditions
        </h2>
        <ul class="space-y-2">
          <li v-for="term in software.terms" :key="term" class="flex items-start gap-3 text-sm">
            <span class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
            <span class="text-gray-500 dark:text-gray-400">{{ term }}</span>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- 404 State -->
    <div v-else class="text-center py-20">
      <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <h1 class="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Software Not Found</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        The software you're looking for doesn't exist or has been removed.
      </p>
      <AppButton 
        to="/directory" 
        label="Browse All Software"
        variant="primary"
        size="lg"
      />
    </div>
  </main>
</template>

<script setup>
const route = useRoute()
const { $toast } = useNuxtApp()

const isCopying = ref(false)
const isCopyingUrl = ref(false)

// Fetch software using content system
const { data: software } = await useAsyncData(`software-${route.params.slug}`, () =>
  queryContent(`/softwares/${route.params.slug}`).findOne()
)

// Handle 404
if (!software.value) {
  throw createError({ statusCode: 404, statusMessage: 'Software Not Found' })
}

// SEO Meta - dynamic based on coupon mode
useSeoMeta({
  title: computed(() => {
    if (software.value.hasCoupon && software.value.discountPercentage) {
      return `${software.value.name} - ${software.value.discountPercentage}% OFF Coupon Code`
    }
    return `${software.value.name} - Software Details`
  }),
  description: computed(() => {
    if (software.value.hasCoupon && software.value.discountPercentage) {
      return `Save ${software.value.discountPercentage}% on ${software.value.name}. ${software.value.description} Get your exclusive coupon code now!`
    }
    return software.value.longDescription || software.value.description
  }),
  ogTitle: computed(() => {
    if (software.value.hasCoupon && software.value.discountPercentage) {
      return `${software.value.name} - ${software.value.discountPercentage}% OFF`
    }
    return software.value.name
  }),
  ogDescription: computed(() => software.value.description),
  ogImage: computed(() => software.value.thumbnail || '/preview.jpg'),
})

// Copy coupon code functionality
const copyCouponCode = async () => {
  if (!software.value?.couponCode) return
  
  isCopying.value = true
  
  try {
    await navigator.clipboard.writeText(software.value.couponCode)
    
    if ($toast) {
      $toast.add({
        title: 'Copied!',
        description: 'Coupon code copied to clipboard',
        color: 'green',
        timeout: 2000
      })
    }
  } catch (error) {
    console.error('Failed to copy code:', error)
  } finally {
    setTimeout(() => {
      isCopying.value = false
    }, 1000)
  }
}

// Copy page URL functionality
const copyPageUrl = async () => {
  isCopyingUrl.value = true
  
  try {
    await navigator.clipboard.writeText(window.location.href)
    
    if ($toast) {
      $toast.add({
        title: 'Link Copied!',
        description: 'Page URL copied to clipboard',
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

// Format date utility
const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}
</script>


