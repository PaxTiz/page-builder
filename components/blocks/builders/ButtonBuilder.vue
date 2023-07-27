<script lang="ts" setup>
import { ZodSchema } from "zod";
import { ButtonBlock } from "~/types";
import FormBuilder from "./FormBuilder.vue";

const emit = defineEmits<{
  (e: "update:modelValue", block: ButtonBlock): void;
  (e: "save", block: ButtonBlock): void;
}>();
const props = defineProps<{
  modelValue: ButtonBlock;
  validator: ZodSchema;
}>();

const { error, validate } = useBlockValidation<ButtonBlock>(props.validator);

const onSave = () => {
  const response = validate<ButtonBlock>(props.modelValue);
  if (response) {
    emit("save", response);
  }
};
</script>

<template>
  <FormBuilder v-model="modelValue.name" @save="onSave">
    <div class="form-group" :class="{ error: error('text') }">
      <label for="text"> Text </label>
      <input v-model="modelValue.text" id="text" type="text" />
      <span>{{ error("text") }}</span>
    </div>

    <div class="form-group" :class="{ error: error('url') }">
      <label for="text"> URL </label>
      <input v-model="modelValue.url" id="text" type="text" />
      <span>{{ error("url") }}</span>
    </div>

    <div class="form-group" :class="{ error: error('target') }">
      <label for="target"> Target </label>
      <select v-model="modelValue.target" id="target">
        <option value="_self">_self</option>
        <option value="_blank">_blank</option>
      </select>
      <span>{{ error("target") }}</span>
    </div>
  </FormBuilder>
</template>
