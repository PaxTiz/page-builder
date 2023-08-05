<script lang="ts" setup>
import { SpacerBlock } from '~/types';

const props = defineProps<{
  block: SpacerBlock;
}>();

const styles = computed(() => {
  const classes = {} as Record<string, string>;
  if (props.block.width) {
    classes.width = `${props.block.width}px`;
  } else {
    classes.width = '100%';
  }

  const height = props.block.height ?? 16;
  classes.height = `${height}px`;

  return classes;
});
</script>

<template>
  <div class="__block" :style="styles" />
</template>

<style lang="scss" scoped></style>
