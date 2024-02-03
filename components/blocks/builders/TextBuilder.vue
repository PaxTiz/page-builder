<script lang="ts" setup>
import { ZodSchema } from 'zod';
import FormBuilder from './FormBuilder.vue';
import HTMLEditor from '~/components/internal/HTMLEditor.vue';
import { type TextBlock } from '~/types';

const emit = defineEmits<{(e: 'save', block: TextBlock): void;}>();
const props = defineProps<{
  block: TextBlock;
  validator: ZodSchema;
}>();

const currentBlock = toRef(props, 'block');
const { error, validate } = useBlockValidation<TextBlock>(props.validator);

const onSave = () => {
  const response = validate<TextBlock>(currentBlock.value);
  if (response) {
    emit('save', response);
  }
};
</script>

<template>
  <FormBuilder v-model="currentBlock.name" @save="onSave">
    <div class="form-group" :class="{ error: error('text') }">
      <label for="text"> Text </label>
      <HTMLEditor v-model="currentBlock.text" />
      <span>{{ error("text") }}</span>
    </div>
  </FormBuilder>
</template>
