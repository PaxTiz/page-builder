<script lang="ts" setup>
import { ZodSchema } from 'zod';
import FormBuilder from './FormBuilder.vue';
import { CarouselItemBlock } from '~/types';

const emit = defineEmits<{(e: 'save', block: CarouselItemBlock): void;}>();
const props = defineProps<{
  block: CarouselItemBlock;
  validator: ZodSchema;
}>();

const currentBlock = toRef(props, 'block');
const { error, validate } = useBlockValidation<CarouselItemBlock>(
  props.validator,
);

const onSave = () => {
  const response = validate<CarouselItemBlock>(currentBlock.value);
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
      currentBlock.value.image = base64;
    };
    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <FormBuilder v-model="currentBlock.name" @save="onSave">
    <div class="form-group" :class="{ error: error('title') }">
      <label for="title"> Title </label>
      <input id="title" v-model="currentBlock.title" type="text">
      <span>{{ error("title") }}</span>
    </div>

    <div class="form-group" :class="{ error: error('description') }">
      <label for="description"> Description </label>
      <input id="description" v-model="currentBlock.description" type="text">
      <span>{{ error("description") }}</span>
    </div>

    <div class="form-group" :class="{ error: error('url') }">
      <label for="url"> URL </label>
      <input id="url" v-model="currentBlock.url" type="text">
      <span>{{ error("url") }}</span>
    </div>

    <div class="form-group" :class="{ error: error('image') }">
      <label for="image"> Image </label>
      <input id="image" type="file" @change="onUpdateImage">
      <span>{{ error("image") }}</span>

      <img class="block w-full h-auto mt-2 rounded" :src="currentBlock.image">
    </div>
  </FormBuilder>
</template>
