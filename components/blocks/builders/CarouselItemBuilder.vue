<script lang="ts" setup>
import { ZodSchema } from "zod";
import { CarouselItemBlock } from "~/types";
import FormBuilder from "./FormBuilder.vue";

const emit = defineEmits<{
  (e: "update:modelValue", block: CarouselItemBlock): void;
  (e: "save", block: CarouselItemBlock): void;
}>();
const props = defineProps<{
  modelValue: CarouselItemBlock;
  validator: ZodSchema;
}>();

const { error, validate } = useBlockValidation<CarouselItemBlock>(
  props.validator
);

const onSave = () => {
  const response = validate<CarouselItemBlock>(props.modelValue);
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
      emit("update:modelValue", { ...props.modelValue, image: base64 });
    };
    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <FormBuilder v-model="modelValue.name" @save="onSave">
    <div class="form-group" :class="{ error: error('title') }">
      <label for="title"> Title </label>
      <input v-model="modelValue.title" id="title" type="text" />
      <span>{{ error("title") }}</span>
    </div>

    <div class="form-group" :class="{ error: error('description') }">
      <label for="description"> Description </label>
      <input v-model="modelValue.description" id="description" type="text" />
      <span>{{ error("description") }}</span>
    </div>

    <div class="form-group" :class="{ error: error('url') }">
      <label for="url"> URL </label>
      <input v-model="modelValue.url" id="url" type="text" />
      <span>{{ error("url") }}</span>
    </div>

    <div class="form-group" :class="{ error: error('image') }">
      <label for="image"> Image </label>
      <small class="text-xs italic ml-2">
        — You must save in order to update the page
      </small>
      <input id="image" type="file" @change="onUpdateImage" />
      <span>{{ error("image") }}</span>

      <img class="block w-full h-auto mt-2 rounded" :src="modelValue.image" />
    </div>
  </FormBuilder>
</template>
