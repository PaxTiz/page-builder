<script lang="ts" setup>
import Button from '~/components/internal/Button.vue';

// eslint-disable-next-line func-call-spacing
defineEmits<{
  (e: 'click'): void;
}>();

defineProps<{
  text: string;
}>();

defineSlots<{
  default:() => VNode;
}>();
</script>

<template>
  <div
    class="w-[350px] fixed flex items-center justify-center bottom-4 left-0"
  >
    <Button :label="text" @click="() => $emit('click')">
      <slot />
    </Button>
  </div>
</template>
