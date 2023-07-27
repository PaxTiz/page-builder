<script lang="ts" setup>
import OverlayButton from "~/components/layout/OverlayButton.vue";

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "save"): void;
}>();
const props = defineProps<{
  modelValue: string;
}>();

const nameError: Ref<string | undefined> = ref();

const onInput = (e: Event) => {
  emit("update:modelValue", (e.target! as HTMLInputElement).value);
};

const onSave = () => {
  if (!props.modelValue || props.modelValue.length < 1) {
    nameError.value = "Block name is required";
  } else {
    emit("save");
  }
};
</script>

<template>
  <div class="builder">
    <div class="form-group" :class="{ error: nameError }">
      <label for="name"> Block name </label>
      <input :value="modelValue" id="name" type="text" @input="onInput" />
      <span>{{ nameError }}</span>
    </div>

    <slot />

    <OverlayButton text="Save" @click="onSave">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style="width: 12px; height: 12px"
      >
        <path
          d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z"
          fill="#fff"
        ></path>
      </svg>
    </OverlayButton>
  </div>
</template>

<style lang="scss" scoped></style>
