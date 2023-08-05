<script lang="ts" setup>
import PageRenderer from './PageRenderer.vue';

const { preview } = usePreview();
const { setState } = useApplication();

const closePreview = () => {
  setState('editor');
};
</script>

<template>
  <div class="min-h-screen">
    <PageRenderer :children="preview" />

    <div
      class="toast fixed bottom-4 w-full flex justify-center items-center cursor-pointer"
      @click="closePreview"
    >
      <div
        class="flex items-center gap-2 bg-gray-900 shadow-white text-gray-300 text-sm px-4 py-2 rounded-lg"
      >
        <div class="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
            />
          </svg>
        </div>

        <span>Close preview</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toast {
  z-index: 200;

  .indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    @apply rounded;
  }

  svg {
    width: 16px;
    height: 16px;
    fill: #fff;
  }
}
</style>
