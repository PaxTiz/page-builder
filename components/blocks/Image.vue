<script lang="ts" setup>
import { ImageBlock } from "~/types";

const props = defineProps<{
  block: ImageBlock;
}>();

const styles = computed(() => {
  const classes = {} as Record<string, string>;
  if (props.block.width) {
    classes.width = `${props.block.width}px`;
  } else {
    classes.width = "100%";
  }

  if (props.block.height) {
    classes.height = `${props.block.height}px`;
  } else {
    classes.height = "auto";
  }

  return classes;
});
</script>

<template>
  <img
    class="__block block w-full h-auto object-cover"
    :style="styles"
    :src="block.url"
    :alt="block.title"
  />
</template>

<style lang="scss" scoped></style>
