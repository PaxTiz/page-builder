<script lang="ts" setup>
import { ZodSchema } from "zod";
import { CarouselBlock } from "~/types";
import FormBuilder from "./FormBuilder.vue";

const emit = defineEmits<{
  (e: "update:modelValue", block: CarouselBlock): void;
  (e: "save", block: CarouselBlock): void;
}>();
const props = defineProps<{
  modelValue: CarouselBlock;
  validator: ZodSchema;
}>();

const { error, validate } = useBlockValidation<CarouselBlock>(props.validator);

const onSave = () => {
  const response = validate<CarouselBlock>(props.modelValue);
  if (response) {
    emit("save", response);
  }
};
</script>

<template>
  <FormBuilder v-model="modelValue.name" @save="onSave">
    <div class="form-group" :class="{ error: error('slidesPerPage') }">
      <label for="slidesPerPage"> Slides per page </label>
      <input
        v-model="modelValue.slidesPerPage"
        id="slidesPerPage"
        type="number"
      />
      <span>{{ error("slidesPerPage") }}</span>
    </div>

    <div class="form-group" :class="{ error: error('slideHeight') }">
      <label for="slideHeight"> Slide height (in px) </label>
      <input v-model="modelValue.slideHeight" id="slideHeight" type="number" />
      <span>{{ error("slideHeight") }}</span>
    </div>

    <div class="form-group inline" :class="{ error: error('pagination') }">
      <div>
        <input
          v-model="modelValue.pagination"
          id="pagination"
          type="checkbox"
        />
        <label for="pagination"> Show pagination? </label>
      </div>
      <span>{{ error("pagination") }}</span>
    </div>

    <div class="form-group inline" :class="{ error: error('navigation') }">
      <div>
        <input
          v-model="modelValue.navigation"
          id="navigation"
          type="checkbox"
        />
        <label for="navigation"> Show navigation? </label>
      </div>
      <span>{{ error("navigation") }}</span>
    </div>
  </FormBuilder>
</template>
