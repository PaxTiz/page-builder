<script lang="ts" setup>
import type { CallToActionBlock } from '~/types';

defineProps<{
  block: CallToActionBlock;
}>();
</script>

<template>
  <div
    class="__block flex justify-between items-center rounded w-full bg-blue-500 px-12 py-8"
  >
    <div>
      <h2 class="text-white mt-0">
        {{ block.title }}
      </h2>
      <p class="text-white mb-0">
        {{ block.subtitle }}
      </p>
    </div>

    <a
      class="px-8 py-2 bg-gray-900 hover:bg-gray-50 text-blue-500 no-underline rounded cursor-pointer transition-colors duration-300 shadow-xl"
      :href="block.url"
    >{{ block.buttonText }}</a>
  </div>
</template>

<style lang="scss" scoped></style>
