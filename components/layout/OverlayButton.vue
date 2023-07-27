<script lang="ts" setup>
defineEmits<{
  (e: "click"): void;
}>();

defineProps<{
  text: string;
}>();

defineSlots<{
  default: () => VNode;
}>();
</script>

<template>
  <div
    class="overlay-button fixed flex items-center justify-center bottom-4 left-0 w-full"
  >
    <div
      class="flex items-center gap-2 bg-black hover:opacity-80 hover:shadow-white transition-all duration-300 text-gray-300 text-xs rounded-3xl px-8 py-2 cursor-pointer select-none"
      @click="() => $emit('click')"
    >
      <slot />
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overlay-button {
  width: 350px;

  button {
    @apply border-none cursor-pointer;
  }
}
</style>
