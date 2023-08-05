<script lang="ts" setup>
import { ButtonBlock } from '~/types';

defineProps<{
  block: ButtonBlock;
}>();
</script>

<template>
  <a
    class="__block flex w-fit px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white no-underline rounded cursor-pointer transition-colors duration-300"
    :href="block.url"
    :target="block.target"
  >
    {{ block.text }}
  </a>
</template>

<style lang="scss" scoped></style>
