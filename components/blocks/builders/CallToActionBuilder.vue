<script lang="ts" setup>
import { ZodSchema } from "zod";
import { CallToActionBlock } from "~/types";
import FormBuilder from "./FormBuilder.vue";

const emit = defineEmits<{
  (e: "update:modelValue", block: CallToActionBlock): void;
  (e: "save", block: CallToActionBlock): void;
}>();
const props = defineProps<{
  modelValue: CallToActionBlock;
  validator: ZodSchema;
}>();

const { error, validate } = useBlockValidation<CallToActionBlock>(
  props.validator
);

const onSave = () => {
  const response = validate<CallToActionBlock>(props.modelValue);
  if (response) {
    emit("save", response);
  }
};
</script>

<template>
  <FormBuilder v-model="modelValue.name" @save="onSave">
    <div class="form-group" :class="{ error: error('title') }">
      <label for="text"> Title </label>
      <input v-model="modelValue.title" id="title" type="text" />
      <span>{{ error("title") }}</span>
    </div>

    <div class="form-group" :class="{ error: error('subtitle') }">
      <label for="subtitle"> Subtitle </label>
      <input v-model="modelValue.subtitle" id="subtitle" type="text" />
      <span>{{ error("subtitle") }}</span>
    </div>

    <div class="form-group" :class="{ error: error('buttonText') }">
      <label for="buttonText"> Button text </label>
      <input v-model="modelValue.buttonText" id="buttonText" type="text" />
      <span>{{ error("buttonText") }}</span>
    </div>

    <div class="form-group" :class="{ error: error('url') }">
      <label for="text"> URL </label>
      <input v-model="modelValue.url" id="text" type="text" />
      <span>{{ error("url") }}</span>
    </div>
  </FormBuilder>
</template>
