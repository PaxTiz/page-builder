<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string,
    variant?: 'primary' | 'secondary' | 'success' | 'danger'
    size?: 'normal' | 'small'
}>(),
  {
    variant: 'primary',
    size: 'normal',
  },
);

const bg = computed(() => {
  switch (props.variant) {
    case 'primary': return 'bg-blue-700';
    case 'secondary': return 'bg-gray-700';
    case 'success': return 'bg-green-700';
    case 'danger': return 'bg-red-700';
  }
});

const size = computed(() => {
  switch (props.size) {
    case 'normal': return 'px-3 py-2 text-sm';
    case 'small': return 'px-2 py-1 text-xs';
  }
});
</script>

<template>
  <button class="flex items-center gap-2 text-white uppercase font-bold rounded" :class="[bg, size]">
    <slot />

    <span>{{ label }}</span>
  </button>
</template>
