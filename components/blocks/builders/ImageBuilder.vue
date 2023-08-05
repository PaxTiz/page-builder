<script lang="ts" setup>
import { ZodSchema } from 'zod';
import FormBuilder from './FormBuilder.vue';
import { ImageBlock } from '~/types';

const emit = defineEmits<{(e: 'save', block: ImageBlock): void;}>();
const props = defineProps<{
  block: ImageBlock;
  validator: ZodSchema;
}>();

const currentBlock = toRef(props, 'block');
const { error, validate } = useBlockValidation<ImageBlock>(props.validator);

const onSave = () => {
  const response = validate<ImageBlock>(currentBlock.value);
  if (response) {
    emit('save', response);
  }
};

const onUpdateImage = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files?.length === 1) {
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      currentBlock.value.url = base64;
    };
    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <FormBuilder v-model="currentBlock.name" @save="onSave">
    <div class="form-group" :class="{ error: error('url') }">
      <label for="url"> Image </label>
      <input id="url" type="file" @change="onUpdateImage">
      <span>{{ error("url") }}</span>

      <img class="block w-full h-auto mt-2 rounded" :src="currentBlock.url">
    </div>

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

    <div class="form-group" :class="{ error: error('title') }">
      <label for="text"> Title </label>
      <input id="text" v-model="currentBlock.title" type="text">
      <span>{{ error("title") }}</span>
    </div>
  </FormBuilder>
</template>
