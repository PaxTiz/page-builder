<script lang="ts" setup>
import BlockEditor from './BlockEditor.vue';
import OverlayButton from './OverlayButton.vue';
import SidebarTree from './SidebarTree.vue';
import { Block } from '~/types';

defineProps<{
  children: Array<Block>;
}>();

const { element } = useSidebar();
const { canUndo, undo, move } = useBlocks();

const onMove = (blocks: Array<Block>) => {
  move(blocks);
};
</script>

<template>
  <div
    class="sidebar fixed h-screen overflow-scroll bg-gray-900 shadow-white z-10"
  >
    <div v-if="element" class="mt-16 mb-8">
      <BlockEditor :block="element" />
    </div>

    <template v-else>
      <div class="mt-16 mb-8">
        <SidebarTree :model-value="children" @update:model-value="onMove" />
      </div>

      <OverlayButton v-if="canUndo" text="Undo" @click="() => undo()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style="width: 12px; height: 12px"
        >
          <path
            d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"
            fill="#fff"
          />
        </svg>
      </OverlayButton>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 350px;
}
</style>
