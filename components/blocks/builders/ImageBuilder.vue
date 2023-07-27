<script lang="ts" setup>
import { ZodSchema } from "zod";
import { ImageBlock } from "~/types";
import FormBuilder from "./FormBuilder.vue";

const emit = defineEmits<{
  (e: "update:modelValue", block: ImageBlock): void;
  (e: "save", block: ImageBlock): void;
}>();
const props = defineProps<{
  modelValue: ImageBlock;
  validator: ZodSchema;
}>();

const { error, validate } = useBlockValidation<ImageBlock>(props.validator);

const onSave = () => {
  const response = validate<ImageBlock>(props.modelValue);
  if (response) {
    emit("save", response);
  }
};

const onUpdateImage = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files?.length === 1) {
    const file = files[0];
    var reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      emit("update:modelValue", { ...props.modelValue, url: base64 });
    };
    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <FormBuilder v-model="modelValue.name" @save="onSave">
    <div class="form-group" :class="{ error: error('url') }">
      <label for="url"> Image </label>
      <small class="text-xs italic ml-2">
        — You must save in order to update the page
      </small>
      <input id="url" type="file" @change="onUpdateImage" />
      <span>{{ error("url") }}</span>

      <img class="block w-full h-auto mt-2 rounded" :src="modelValue.url" />
    </div>

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

    <div class="form-group" :class="{ error: error('title') }">
      <label for="text"> Title </label>
      <input v-model="modelValue.title" id="text" type="text" />
      <span>{{ error("title") }}</span>
    </div>
  </FormBuilder>
</template>
