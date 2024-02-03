<script lang="ts" setup>
import PageRenderer from '~/components/page/PageRenderer.vue';
import type { Block } from '~/types';

defineProps<{
  children: Array<Block>;
}>();
</script>

<template>
  <div class="__block container mx-auto">
    <PageRenderer :children="children" />
  </div>
</template>
