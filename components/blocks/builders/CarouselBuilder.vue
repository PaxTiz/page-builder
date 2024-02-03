<script lang="ts" setup>
import { ZodSchema } from 'zod';
import FormBuilder from './FormBuilder.vue';
import { type CarouselBlock } from '~/types';

const emit = defineEmits<{(e: 'save', block: CarouselBlock): void;}>();
const props = defineProps<{
  block: CarouselBlock;
  validator: ZodSchema;
}>();

const currentBlock = toRef(props, 'block');
const { error, validate } = useBlockValidation<CarouselBlock>(props.validator);

const onSave = () => {
  const response = validate<CarouselBlock>(currentBlock.value);
  if (response) {
    emit('save', response);
  }
};
</script>

<template>
  <FormBuilder v-model="currentBlock.name" @save="onSave">
    <div class="form-group" :class="{ error: error('slidesPerPage') }">
      <label for="slidesPerPage"> Slides per page </label>
      <input
        id="slidesPerPage"
        v-model="currentBlock.slidesPerPage"
        type="number"
      >
      <span>{{ error("slidesPerPage") }}</span>
    </div>

    <div class="form-group" :class="{ error: error('slideHeight') }">
      <label for="slideHeight"> Slide height (in px) </label>
      <input id="slideHeight" v-model="currentBlock.slideHeight" type="number">
      <span>{{ error("slideHeight") }}</span>
    </div>

    <div class="form-group inline" :class="{ error: error('pagination') }">
      <div>
        <input
          id="pagination"
          v-model="currentBlock.pagination"
          type="checkbox"
        >
        <label for="pagination"> Show pagination? </label>
      </div>
      <span>{{ error("pagination") }}</span>
    </div>

    <div class="form-group inline" :class="{ error: error('navigation') }">
      <div>
        <input
          id="navigation"
          v-model="currentBlock.navigation"
          type="checkbox"
        >
        <label for="navigation"> Show navigation? </label>
      </div>
      <span>{{ error("navigation") }}</span>
    </div>
  </FormBuilder>
</template>
