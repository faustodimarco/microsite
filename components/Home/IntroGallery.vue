<template>
  <section class="overflow-hidden">
    <div class="container flex flex-col items-center gap-10">
      <Transition name="fade" appear>
        <div v-if="domLoaded" class="relative w-full">
          <div class="mySwiper19" ref="swiperContainer"></div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Swiper } from 'swiper'
import { EffectCards, Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/pagination'

const domLoaded = ref(false)
const swiperContainer = ref<HTMLElement | null>(null)

const images = [
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
    alt: "Portrait of Joanna Doe in urban setting",
    name: "Joanna Doe",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    link: "https://www.google.com",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random6.jpeg",
    alt: "Portrait of Joan Doe in natural lighting",
    name: "Joan Doe",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    link: "https://www.google.com",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
    alt: "Portrait of Sarah Chen in studio setting",
    name: "Sarah Chen",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    link: "https://www.google.com",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
    alt: "Portrait of Michael Park in outdoor setting",
    name: "Michael Park",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    link: "https://www.google.com",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
    alt: "Portrait of Emma Wilson in urban setting",
    name: "Emma Wilson",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    link: "https://www.google.com",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random6.jpeg",
    alt: "Portrait of David Kim in natural lighting",
    name: "David Kim",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    link: "https://www.google.com",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
    alt: "Portrait of Lisa Martinez in studio setting",
    name: "Lisa Martinez",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    link: "https://www.google.com",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
    alt: "Portrait of James Thompson in outdoor setting",
    name: "James Thompson",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    link: "https://www.google.com",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random11.jpeg",
    alt: "Portrait of Sophia Lee in urban setting",
    name: "Sophia Lee",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    link: "https://www.google.com",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random6.jpeg",
    alt: "Portrait of Alex Rodriguez in natural lighting",
    name: "Alex Rodriguez",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    link: "https://www.google.com",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
    alt: "Portrait of Maya Patel in studio setting",
    name: "Maya Patel",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    link: "https://www.google.com",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
    alt: "Portrait of Noah Johnson in outdoor setting",
    name: "Noah Johnson",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    link: "https://www.google.com",
  },
]

onMounted(() => {
  domLoaded.value = true
  
  nextTick(() => {
    if (swiperContainer.value) {
      // Create wrapper div for swiper
      const swiperWrapper = document.createElement('div')
      swiperWrapper.className = 'swiper-wrapper'
      
      // Create slides
      images.forEach((image) => {
        const slide = document.createElement('div')
        slide.className = 'swiper-slide'
        
        const img = document.createElement('img')
        img.className = 'h-full w-full overflow-hidden rounded-3xl object-cover'
        img.src = image.src
        img.alt = image.alt
        
        const gradient = document.createElement('div')
        gradient.className = 'absolute h-full w-full bg-gradient-to-t from-black/80 to-transparent'
        
        const content = document.createElement('div')
        content.className = 'absolute flex h-full w-full flex-col justify-end p-4'
        
        const title = document.createElement('h3')
        title.className = 'text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-2'
        const firstName = document.createElement('span')
        firstName.textContent = image.name.split(' ')[0]
        const lastName = document.createElement('span')
        lastName.className = 'font-playfair italic'
        lastName.textContent = ' ' + image.name.split(' ')[1]
        title.appendChild(firstName)
        title.appendChild(lastName)
        
        const description = document.createElement('p')
        description.className = 'text-left text-md text-white/50'
        description.textContent = image.description
        
        const buttonContainer = document.createElement('div')
        buttonContainer.className = 'mt-6'
        
        // Create button using Vue component approach would be complex in DOM manipulation
        // Keep the direct DOM approach but use consistent styling
        const button = document.createElement('a')
        button.href = image.link
        button.className = 'inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium text-white rounded-full bg-white/20 backdrop-blur-sm border border-white/20 hover:bg-white/30 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-[0.98]'
        button.innerHTML = 'Know More <svg class="h-4 w-4 -rotate-45 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7-7 7"/></svg>'
        
        buttonContainer.appendChild(button)
        content.appendChild(title)
        content.appendChild(description)
        content.appendChild(buttonContainer)
        
        slide.appendChild(img)
        slide.appendChild(gradient)
        slide.appendChild(content)
        
        swiperWrapper.appendChild(slide)
      })
      
      // Create pagination
      const pagination = document.createElement('div')
      pagination.className = 'swiper-pagination'
      
      swiperContainer.value.appendChild(swiperWrapper)
      swiperContainer.value.appendChild(pagination)
      
      // Initialize Swiper with exact same settings as React
      new Swiper(swiperContainer.value, {
        effect: 'cards',
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
        },
        loop: true,
        grabCursor: true,
        modules: [EffectCards, Autoplay, Pagination],
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      })
    }
  })
})
</script>

<style>
.mySwiper19 {
  width: 240px;
  height: 320px;
  margin: 0 auto;
}

@media (min-width: 640px) {
  .mySwiper19 {
    width: 320px;
    height: 420px;
  }
}

@media (min-width: 768px) {
  .mySwiper19 {
    width: 390px;
    height: 510px;
  }
}

.mySwiper19 .swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
}

.mySwiper19 .swiper-pagination {
  bottom: -40px !important;
}

.mySwiper19 .swiper-pagination-bullet-active {
  background-color: rgb(var(--color-primary-500));
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.font-playfair {
  font-family: 'Playfair Display', serif;
}
</style>