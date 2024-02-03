<script lang="ts" setup>
import { ZodSchema } from 'zod';
import FormBuilder from './FormBuilder.vue';
import { type ButtonBlock } from '~/types';

const emit = defineEmits<{(e: 'save', block: ButtonBlock): void; }>();
const props = defineProps<{
  block: ButtonBlock,
  validator: ZodSchema;
}>();

const currentBlock = toRef(props, 'block');
const { error, validate } = useBlockValidation<ButtonBlock>(props.validator);

const onSave = () => {
  const response = validate<ButtonBlock>(currentBlock.value);
  if (response) {
    emit('save', response);
  }
};
</script>

<template>
  <FormBuilder v-model="currentBlock.name" @save="onSave">
    <div class="form-group" :class="{ error: error('text') }">
      <label for="text"> Text </label>
      <input id="text" v-model="currentBlock.text" type="text">
      <span>{{ error("text") }}</span>
    </div>

    <div class="form-group" :class="{ error: error('url') }">
      <label for="text"> URL </label>
      <input id="text" v-model="currentBlock.url" type="text">
      <span>{{ error("url") }}</span>
    </div>

    <div class="form-group" :class="{ error: error('target') }">
      <label for="target"> Target </label>
      <select id="target" v-model="currentBlock.target">
        <option value="_self">
          _self
        </option>
        <option value="_blank">
          _blank
        </option>
      </select>
      <span>{{ error("target") }}</span>
    </div>
  </FormBuilder>
</template>
