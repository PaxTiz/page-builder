<script lang="ts" setup>
defineProps<{
  title: string;
}>();

// eslint-disable-next-line func-call-spacing
defineEmits<{
  (e: 'ok'): void;
  (e: 'cancel'): void;
}>();

const slots = defineSlots<{
  header?:() => VNode;
  sidebar?: () => VNode;
  default: () => VNode;
  footer: () => VNode;
}>();
</script>

<template>
  <div class="modal-wrapper fixed w-full h-full top-0 left-0">
    <div class="bg-gray-900 shadow-white rounded">
      <div
        class="flex justify-between items-center bg-gray-900 p-4 border-solid border-0 border-b border-gray-700 rounded-t"
      >
        <h2 class="text-gray-300 m-0">
          {{ title }}
        </h2>

        <slot name="header" />
      </div>

      <div
        class="modal__body bg-gray-900 rounded-b"
        :class="{ sidebar: slots.sidebar }"
      >
        <slot name="sidebar" />

        <div>
          <slot />

          <div
            class="flex justify-end gap-4 px-8 py-4 border-solid border-0 border-t border-gray-700"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-wrapper {
  z-index: 150;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(1px);
}

.modal__body.sidebar {
  display: grid;
  grid-template-columns: 200px 490px;
}
</style>
