<script lang="ts" setup>
const { toast } = useToast();
</script>

<template>
  <div
    v-if="toast"
    class="toast fixed bottom-4 w-full flex justify-center items-center"
  >
    <div
      class="flex items-center gap-2 bg-gray-900 shadow-white text-white text-sm px-4 py-2 rounded-lg"
    >
      <div class="indicator" :class="toast.type">
        <svg
          v-if="toast.type === 'success'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M10.0007 15.1709L19.1931 5.97852L20.6073 7.39273L10.0007 17.9993L3.63672 11.6354L5.05093 10.2212L10.0007 15.1709Z"
          ></path>
        </svg>

        <svg
          v-if="toast.type === 'error'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
          ></path>
        </svg>

        <svg
          v-if="toast.type === 'warning'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"
          ></path>
        </svg>
      </div>

      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<sryle lang="scss" scoped>
.toast {
  z-index: 200;

  .indicator {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    @apply rounded;

    &.success {
      @apply bg-green-800;
    }
    &.error {
      @apply bg-red-800;
    }
    &.warning {
      @apply bg-yellow-600;
    }
  }

  svg {
    width: 16px;
    height: 16px;
    fill: #fff;
  }
}
</sryle>
