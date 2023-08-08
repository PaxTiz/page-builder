<script lang="ts" setup>
import { TextBlock } from '~/types';

defineProps<{
  block: TextBlock;
}>();

</script>

<template>
  <p class="text-gray-300 m-0 leading-relaxed" v-html="block.text" />
</template>

<style lang="scss" scoped></style>
