<script lang="ts" setup>
defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();
defineProps<{
  total: number;
  modelValue: number;
}>();
</script>

<template>
  <div class="flex justify-center gap-3">
    <button
      class="pagination__item"
      :disabled="modelValue === 1"
      @click="$emit('update:modelValue', modelValue - 1)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"
        ></path>
      </svg>
    </button>
    <button
      v-for="i in total"
      :key="i"
      class="pagination__item"
      :class="{ active: i === modelValue }"
      @click="$emit('update:modelValue', i)"
    >
      {{ i }}
    </button>
    <button
      class="pagination__item"
      :disabled="modelValue === total"
      @click="$emit('update:modelValue', modelValue + 1)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"
        ></path>
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pagination__item {
  user-select: none;
  @apply flex justify-center items-center w-[24px] h-[24px] text-gray-300 hover:text-white text-xs border-none bg-gray-800 hover:bg-gray-900 shadow-white-small rounded cursor-pointer;

  svg {
    @apply fill-gray-300 w-[16px] h-[16px];
  }

  &[disabled] {
    @apply bg-gray-700 cursor-not-allowed;

    svg {
      @apply fill-gray-500;
    }
  }
}

.active {
  @apply bg-gray-900 shadow-blue text-white font-bold;
}
</style>
