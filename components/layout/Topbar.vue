<script lang="ts" setup>
import AddBlockModal from "./AddBlockModal.vue";

const { isActive, toggle } = useModal("modal_add_block");
</script>

<template>
  <AddBlockModal v-if="isActive" @close="toggle" />

  <div
    class="topbar fixed bg-gray-900 shadow-white flex items-center px-4 py-3"
  >
    <button class="button-blue" @click="toggle">New block</button>

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4 ml-4">
        <div>
          <span class="text-white text-sm font-bold">Page name :</span>
          <input
            type="text"
            class="bg-transparent text-white border-none focus:outline-none p-2"
            value="My new page"
            oninput="this.style.width = `${this.value.length}ch`"
          />
        </div>
        <div>
          <span class="text-white text-sm font-bold">Page URL :</span>
          <input
            type="text"
            class="bg-transparent text-gray border-none focus:outline-none p-2 pr-0"
            value="http://localhost:3000/"
            disabled
          />
          <input
            type="text"
            class="bg-transparent text-white border-none focus:outline-none p-2 pl-0 -ml-1"
            value="my-new-page"
            oninput="this.style.width = `${this.value.length}ch`"
          />
        </div>
      </div>

      <div class="flex gap-4">
        <button class="button-blue">save</button>
        <button class="button-green">publish</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scope>
.topbar {
  display: flex;
  justify-content: space-between;
  z-index: 100;
  width: 100%;
}
</style>
