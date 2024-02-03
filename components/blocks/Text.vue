<script lang="ts" setup>
import type { TextBlock } from '~/types';

defineProps<{
  block: TextBlock;
}>();

</script>

<template>
  <div class="__block m-0 leading-relaxed" v-html="block.text" />
</template>

<style lang="scss" scoped></style>
