<script lang="ts" setup>
import { ZodSchema } from "zod";
import { ContainerBlock } from "~/types";
import FormBuilder from "./FormBuilder.vue";

const emit = defineEmits<{
  (e: "update:modelValue", block: ContainerBlock): void;
  (e: "save", block: ContainerBlock): void;
}>();
const props = defineProps<{
  modelValue: ContainerBlock;
  validator: ZodSchema;
}>();

const onSave = () => {
  emit("save", props.modelValue);
};
</script>

<template>
  <FormBuilder v-model="modelValue.name" @save="onSave" />
</template>
