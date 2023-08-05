<script lang="ts" setup>
import { Block, isContainerBlock } from '~/types';

// eslint-disable-next-line func-call-spacing
defineEmits<{
  (e: 'toggle'): void;
}>();
defineProps<{
  block: Block;
  open: boolean;
}>();

const { remove } = useBlocks();
const { setElement } = useSidebar();
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
          />
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
          />
        </svg>
      </template>
      <div v-else style="width: 24px" />

      <span class="text-gray-300">{{ block.name }}</span>
    </div>

    <div class="flex items-center gap-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        @click="() => setElement(block)"
      >
        <path
          d="M15.7279 9.57629L14.3137 8.16207L5 17.4758V18.89H6.41421L15.7279 9.57629ZM17.1421 8.16207L18.5563 6.74786L17.1421 5.33365L15.7279 6.74786L17.1421 8.16207ZM7.24264 20.89H3V16.6474L16.435 3.21233C16.8256 2.8218 17.4587 2.8218 17.8492 3.21233L20.6777 6.04075C21.0682 6.43128 21.0682 7.06444 20.6777 7.45497L7.24264 20.89Z"
        />
      </svg>

      <svg
        class="trash"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        @click="() => remove(block.id)"
      >
        <path
          d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"
        />
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
.sidebar__item path {
  @apply fill-white;
}
.sidebar__item:hover .trash:hover path {
  @apply fill-red;
}

svg {
  width: 16px;
  height: 16px;
}
</style>
