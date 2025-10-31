<template>
  <div class="space-y-8 p-6 bg-white dark:bg-gray-900 rounded-xl">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Button Component Showcase</h3>
    
    <div class="space-y-6">
      <!-- Variants -->
      <div>
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Variants</h4>
        <div class="flex flex-wrap gap-3">
          <AppButton label="Primary" variant="primary" />
          <AppButton label="Secondary" variant="secondary" />
          <AppButton label="Ghost" variant="ghost" />
          <AppButton label="Link" variant="link" />
          <div class="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg">
            <AppButton label="Glass" variant="glass" />
          </div>
        </div>
      </div>

      <!-- Sizes -->
      <div>
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Sizes</h4>
        <div class="flex flex-wrap items-center gap-3">
          <AppButton label="Small" variant="primary" size="sm" />
          <AppButton label="Medium" variant="primary" size="md" />
          <AppButton label="Large" variant="primary" size="lg" />
        </div>
      </div>

      <!-- With Icons -->
      <div>
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">With Icons</h4>
        <div class="flex flex-wrap gap-3">
          <AppButton 
            label="Download" 
            variant="primary" 
            left-icon="heroicons:arrow-down-tray" 
          />
          <AppButton 
            label="External Link" 
            variant="secondary" 
            right-icon="heroicons:arrow-top-right-on-square" 
          />
          <AppButton 
            left-icon="heroicons:plus" 
            variant="ghost" 
            aria-label="Add item"
          />
        </div>
      </div>

      <!-- States -->
      <div>
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">States</h4>
        <div class="flex flex-wrap gap-3">
          <AppButton label="Loading..." variant="primary" :loading="true" />
          <AppButton label="Disabled" variant="secondary" :disabled="true" />
        </div>
      </div>

      <!-- Navigation -->
      <div>
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Navigation</h4>
        <div class="flex flex-wrap gap-3">
          <AppButton 
            label="Internal Link" 
            to="/articles" 
            variant="link" 
            right-icon="heroicons:arrow-right"
          />
          <AppButton 
            label="External Link" 
            href="https://nuxt.com" 
            external 
            variant="secondary"
            right-icon="heroicons:arrow-top-right-on-square"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// This component serves as a visual reference for all button variations
// It can be used for testing and documentation purposes
</script>