<script lang="ts" setup>
import { ZodSchema } from 'zod';
import FormBuilder from './FormBuilder.vue';
import { type CallToActionBlock } from '~/types';

const emit = defineEmits<{(e: 'save', block: CallToActionBlock): void;}>();
const props = defineProps<{
  block: CallToActionBlock;
  validator: ZodSchema;
}>();

const currentBlock = toRef(props, 'block');
const { error, validate } = useBlockValidation<CallToActionBlock>(
  props.validator,
);

const onSave = () => {
  const response = validate<CallToActionBlock>(currentBlock.value);
  if (response) {
    emit('save', response);
  }
};
</script>

<template>
  <FormBuilder v-model="currentBlock.name" @save="onSave">
    <div class="form-group" :class="{ error: error('title') }">
      <label for="text"> Title </label>
      <input id="title" v-model="currentBlock.title" type="text">
      <span>{{ error("title") }}</span>
    </div>

    <div class="form-group" :class="{ error: error('subtitle') }">
      <label for="subtitle"> Subtitle </label>
      <input id="subtitle" v-model="currentBlock.subtitle" type="text">
      <span>{{ error("subtitle") }}</span>
    </div>

    <div class="form-group" :class="{ error: error('buttonText') }">
      <label for="buttonText"> Button text </label>
      <input id="buttonText" v-model="currentBlock.buttonText" type="text">
      <span>{{ error("buttonText") }}</span>
    </div>

    <div class="form-group" :class="{ error: error('url') }">
      <label for="text"> URL </label>
      <input id="text" v-model="currentBlock.url" type="text">
      <span>{{ error("url") }}</span>
    </div>
  </FormBuilder>
</template>
