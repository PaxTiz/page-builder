<script lang="ts" setup>
import { Draggable } from "@he-tree/vue";
import "@he-tree/vue/style/default.css";
import { Block, isContainerBlock } from "~/types";
import SidebarTreeItem from "./SidebarTreeItem.vue";

defineEmits<{
  (e: "update:modelValue"): void;
}>();
defineProps<{
  modelValue: Array<Block>;
}>();
</script>

<template>
  <div class="flex flex-col cursor-pointer">
    <Draggable
      :watermark="false"
      :model-value="modelValue"
      :each-droppable="(stat) => isContainerBlock(stat.data)"
      @update:modelValue="(value) => $emit('update:modelValue', value)"
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
