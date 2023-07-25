<script lang="ts" setup>
import { Block } from "~/types";

import SidebarTree from "./SidebarTree.vue";

const props = defineProps<{
  children: Array<Block>;
}>();

const { canUndo, undo, setBlocks } = useBlocks();

const childrenTree = toRef(props, "children");

watch(childrenTree, (newBlocks) => setBlocks(newBlocks));
</script>

<template>
  <div
    class="sidebar fixed h-screen overflow-scroll bg-gray-900 shadow-white z-10"
  >
    <div class="mt-16 mb-8">
      <SidebarTree v-model="childrenTree" />
    </div>

    <div
      v-if="canUndo"
      class="undo fixed flex items-center justify-center bottom-4 left-0 w-full"
    >
      <div
        class="flex items-center gap-2 bg-black hover:opacity-80 transition-all duration-300 text-white text-xs rounded-3xl px-8 py-2 cursor-pointer select-none"
        @click="() => undo()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style="width: 12px; height: 12px"
        >
          <path
            d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"
            fill="#fff"
          ></path>
        </svg>
        <span>Undo</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar,
.undo {
  width: 350px;

  button {
    @apply border-none cursor-pointer;
  }
}
</style>
