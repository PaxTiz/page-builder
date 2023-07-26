<script lang="ts" setup>
import { Block, isContainerBlock } from "~/types";

defineEmits<{
  (e: "toggle"): void;
}>();
defineProps<{
  block: Block;
  open: boolean;
}>();

const { remove } = useBlocks();
</script>

<template>
  <div
    class="sidebar__item flex items-center justify-between px-4 py-3 hover:bg-gray-800 rounded-l"
  >
    <div class="flex items-center gap-2">
      <template v-if="isContainerBlock(block)">
        <!-- Up arrow -->
        <svg
          v-if="open"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="arrow"
          @click="$emit('toggle')"
        >
          <path
            d="M11.9997 10.8284L7.04996 15.7782L5.63574 14.364L11.9997 8L18.3637 14.364L16.9495 15.7782L11.9997 10.8284Z"
          ></path>
        </svg>

        <!-- Down arrow -->
        <svg
          v-if="!open"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="arrow"
          @click="$emit('toggle')"
        >
          <path
            d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"
          ></path>
        </svg>
      </template>
      <div style="width: 24px" v-else></div>

      <span class="text-gray-300">{{ block.name }}</span>
    </div>

    <div class="flex items-center gap-2">
      <svg
        class="trash"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        @click="() => remove(block.id)"
      >
        <path
          d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.arrow {
  width: 24px;
  height: 24px;
  fill: #fff;
}
.sidebar__item .trash path {
  @apply fill-white;
}
.sidebar__item:hover .trash path {
  @apply fill-red;
}

svg {
  width: 16px;
  height: 16px;
}
</style>
