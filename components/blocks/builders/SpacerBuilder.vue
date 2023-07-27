<script lang="ts" setup>
import { ZodSchema } from "zod";
import { SpacerBlock } from "~/types";
import FormBuilder from "./FormBuilder.vue";

const emit = defineEmits<{
  (e: "update:modelValue", block: SpacerBlock): void;
  (e: "save", block: SpacerBlock): void;
}>();
const props = defineProps<{
  modelValue: SpacerBlock;
  validator: ZodSchema;
}>();

const { error, validate } = useBlockValidation<SpacerBlock>(props.validator);

const onSave = () => {
  const response = validate<SpacerBlock>(props.modelValue);
  if (response) {
    emit("save", response);
  }
};
</script>

<template>
  <FormBuilder v-model="modelValue.name" @save="onSave">
    <div class="form-group" :class="{ error: error('width') }">
      <label for="width"> Width </label>
      <input v-model="modelValue.width" id="width" type="number" />
      <span>{{ error("width") }}</span>
    </div>

    <div class="form-group" :class="{ error: error('height') }">
      <label for="height"> Height </label>
      <input v-model="modelValue.height" id="height" type="number" />
      <span>{{ error("height") }}</span>
    </div>
  </FormBuilder>
</template>
