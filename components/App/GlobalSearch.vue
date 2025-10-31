<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4"
        style="background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(8px)"
        @click="closeSearch"
      >
        <div
          class="w-full max-w-xl mx-auto"
          @click.stop
        >
          <div class="relative flex flex-col justify-start items-center min-h-[300px]">
            <div class="w-full max-w-sm sticky top-0 bg-white dark:bg-gray-900 rounded-full shadow-lg z-10 p-3 mb-2 ring-1 ring-gray-200 dark:ring-gray-700">
              <div class="relative">
                <input
                  ref="searchInput"
                  v-model="query"
                  type="text"
                  placeholder="Search articles, stacks, softwares, coupons..."
                  class="w-full px-3 py-2 pr-10 text-sm bg-transparent border-0 ring-0 outline-none placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:ring-0 focus:border-0 focus:outline-none"
                  @input="handleInputChange"
                  @focus="handleFocus"
                />
                <div class="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 flex flex-col">
                  <Transition
                    enter-active-class="transition-all duration-200"
                    enter-from-class="opacity-0 translate-y-[-20px]"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition-all duration-200"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 translate-y-[20px]"
                    mode="out-in"
                  >
                    <Icon
                      v-if="query.length > 0"
                      key="send"
                      name="solar:arrow-right-linear"
                      class="w-4 h-4 text-gray-400 dark:text-gray-500"
                    />
                    <Icon
                      v-else
                      key="search"
                      name="solar:magnifer-linear"
                      class="w-4 h-4 text-gray-400 dark:text-gray-500"
                    />
                  </Transition>
                </div>
              </div>
            </div>

            <div class="w-full max-w-[22rem]">
              <Transition
                enter-active-class="transition-all duration-400"
                enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition-all duration-300"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
              >
                <div
                  v-if="isFocused && filteredActions.length > 0 && !selectedAction"
                  class="w-full border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-900"
                >
                  <TransitionGroup
                    enter-active-class="transition-all duration-300"
                    enter-from-class="opacity-0 translate-y-[20px]"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition-all duration-200"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 translate-y-[-10px]"
                    tag="ul"
                    class="max-h-80 overflow-y-auto custom-scrollbar"
                  >
                    <li
                      v-for="action in filteredActions"
                      :key="action.id"
                      class="px-4 py-3 flex items-center justify-between gap-8 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-150"
                      @click="selectAction(action)"
                    >
                      <div class="flex items-center gap-3">
                        <div class="w-6 h-6 flex-shrink-0 rounded overflow-hidden">
                          <img 
                            :src="action.image" 
                            :alt="action.label"
                            class="w-full h-full object-contain"
                          />
                        </div>
                        <div class="flex items-center gap-2">
                          <span class="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {{ action.label }}
                          </span>
                          <AppDiscountBadge 
                            v-if="action.discountPercentage" 
                            :percentage="action.discountPercentage"
                            size="xs"
                          />
                        </div>
                      </div>
                      <div class="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                        <span 
                          class="text-right px-2 py-1 rounded-full text-xs"
                          :class="{
                            'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300': action.category === 'Article',
                            'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300': action.category === 'Stack',
                            'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300': action.category === 'Software',
                            'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300': action.category === 'Coupon',
                            'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300': !['Article', 'Stack', 'Software', 'Coupon'].includes(action.category)
                          }"
                        >
                          {{ action.category }}
                        </span>
                      </div>
                    </li>
                  </TransitionGroup>
                  <div class="px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                    <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Press ⌘K to open search</span>
                      <span>ESC to close</span>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'

const emit = defineEmits(['close'])

const isOpen = defineModel('open', { default: false })
const query = ref('')
const isFocused = ref(false)
const isTyping = ref(false)
const selectedAction = ref(null)
const searchInput = ref(null)

// Fetch dynamic content
const { data: articles } = await useAsyncData('search-articles', () =>
  queryContent('/articles').find()
)

const { data: stacks } = await useAsyncData('search-stacks', () =>
  queryContent('/stacks').where({ status: 'active' }).find()
)

const { data: softwares } = await useAsyncData('search-softwares', () =>
  queryContent('/softwares').find()
)

const { data: coupons } = await useAsyncData('search-coupons', () =>
  queryContent('/coupons').where({ status: 'active' }).find()
)

// Create slug function
const createSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Dynamic actions from content
const allActions = computed(() => {
  const actions = []

  // Add articles
  if (articles.value) {
    articles.value.forEach(article => {
      actions.push({
        id: `article-${article._path}`,
        label: article.title || article.name,
        image: article.thumbnail || '/default-article.png',
        category: 'Article',
        type: 'article',
        url: article._path,
        description: article.description
      })
    })
  }

  // Add stacks
  if (stacks.value) {
    stacks.value.forEach(stack => {
      actions.push({
        id: `stack-${stack._path}`,
        label: stack.name,
        image: stack.thumbnail || '/default-stack.png',
        category: 'Stack',
        type: 'stack',
        url: `/stacks/${createSlug(stack.name)}`,
        description: stack.description
      })
    })
  }

  // Add softwares
  if (softwares.value) {
    softwares.value.forEach(software => {
      actions.push({
        id: `software-${software._path}`,
        label: software.name,
        image: software.thumbnail || '/default-software.png',
        category: 'Software',
        type: 'software',
        url: software.url,
        description: software.description,
        external: true
      })
    })
  }

  // Add coupons
  if (coupons.value) {
    coupons.value.forEach(coupon => {
      actions.push({
        id: `coupon-${coupon._path}`,
        label: coupon.name,
        image: coupon.thumbnail || '/default-coupon.png',
        category: 'Coupon',
        type: 'coupon',
        url: `/coupons/${createSlug(coupon.name)}`,
        description: coupon.description,
        discountPercentage: coupon.discountPercentage
      })
    })
  }

  return actions
})

// Debounced search functionality
const debouncedQuery = ref('')
let debounceTimeout = null

const filteredActions = computed(() => {
  if (!debouncedQuery.value.trim()) {
    return allActions.value
  }
  
  const normalizedQuery = debouncedQuery.value.toLowerCase().trim()
  return allActions.value.filter(action => {
    const searchableText = `${action.label} ${action.description} ${action.category}`.toLowerCase()
    return searchableText.includes(normalizedQuery)
  })
})

const handleInputChange = () => {
  isTyping.value = true
  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    debouncedQuery.value = query.value
    isTyping.value = false
  }, 200)
}

const handleFocus = () => {
  selectedAction.value = null
  isFocused.value = true
}

const selectAction = (action) => {
  selectedAction.value = action
  
  // Navigate based on action type
  if (action.external) {
    // External links (projects)
    window.open(action.url, '_blank')
  } else {
    // Internal navigation
    navigateTo(action.url)
  }
  
  closeSearch()
}

const closeSearch = () => {
  isOpen.value = false
  emit('close')
}

// Keyboard shortcuts
const handleKeyDown = (event) => {
  if (event.metaKey && event.key === 'k') {
    event.preventDefault()
    isOpen.value = !isOpen.value
  }
  
  if (event.key === 'Escape' && isOpen.value) {
    event.preventDefault()
    closeSearch()
  }
}

// Focus search input when opened
watch(isOpen, async (newVal) => {
  if (newVal) {
    // Disable page scrolling
    document.body.style.overflow = 'hidden'
    
    await nextTick()
    if (searchInput.value) {
      searchInput.value.focus()
    }
    isFocused.value = true
  } else {
    // Re-enable page scrolling
    document.body.style.overflow = ''
    
    query.value = ''
    debouncedQuery.value = ''
    isFocused.value = false
    selectedAction.value = null
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
  clearTimeout(debounceTimeout)
})
</script>

<style scoped>
.custom-scrollbar {
  /* Hide scrollbar for Chrome, Safari and Opera */
  -webkit-scrollbar: none;
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>