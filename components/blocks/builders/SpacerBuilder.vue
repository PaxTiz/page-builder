<script lang="ts" setup>
import { ZodSchema } from 'zod';
import FormBuilder from './FormBuilder.vue';
import { SpacerBlock } from '~/types';

const emit = defineEmits<{(e: 'save', block: SpacerBlock): void;}>();
const props = defineProps<{
  block: SpacerBlock;
  validator: ZodSchema;
}>();

const currentBlock = toRef(props, 'block');
const { error, validate } = useBlockValidation<SpacerBlock>(props.validator);

const onSave = () => {
  const response = validate<SpacerBlock>(currentBlock.value);
  if (response) {
    emit('save', response);
  }
};
</script>

<template>
  <FormBuilder v-model="currentBlock.name" @save="onSave">
    <div class="form-group" :class="{ error: error('width') }">
      <label for="width"> Width </label>
      <input id="width" v-model="currentBlock.width" type="number">
      <span>{{ error("width") }}</span>
    </div>

    <div class="form-group" :class="{ error: error('height') }">
      <label for="height"> Height </label>
      <input id="height" v-model="currentBlock.height" type="number">
      <span>{{ error("height") }}</span>
    </div>
  </FormBuilder>
</template>
