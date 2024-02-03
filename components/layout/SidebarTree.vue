<script lang="ts" setup>
import { Draggable } from '@he-tree/vue';
import '@he-tree/vue/style/default.css';
import SidebarTreeItem from './SidebarTreeItem.vue';
import { isContainerBlock, type Block } from '~/types';

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'update:modelValue', blocks: Array<Block>): void;
}>();
defineProps<{
  modelValue: Array<Block>;
}>();

const onMove = (blocks: Array<Block>) => {
  emit('update:modelValue', blocks);
};
</script>

<template>
  <div class="flex flex-col cursor-pointer">
    <Draggable
      :watermark="false"
      :model-value="modelValue"
      :each-droppable="(stat) => isContainerBlock(stat.data)"
      @update:model-value="onMove"
    >
      <template #default="{ node, stat }">
        <SidebarTreeItem
          :block="node"
          :open="stat.open"
          @toggle="stat.open = !stat.open"
        />
      </template>
    </Draggable>
  </div>
</template>

<style lang="scss" scoped></style>
