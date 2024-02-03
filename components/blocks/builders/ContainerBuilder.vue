<script lang="ts" setup>
import { ZodSchema } from 'zod';
import FormBuilder from './FormBuilder.vue';
import { type ContainerBlock } from '~/types';

const emit = defineEmits<{(e: 'save', block: ContainerBlock): void;}>();
const props = defineProps<{
  block: ContainerBlock;
  validator: ZodSchema;
}>();

const currentblock = toRef(props, 'block');
const onSave = () => {
  emit('save', currentblock.value);
};
</script>

<template>
  <FormBuilder v-model="currentblock.name" @save="onSave" />
</template>
