<script lang="ts" setup></script>

<template>
  <div
    class="topbar fixed bg-gray-900 shadow flex items-center justify-between"
  >
    <div class="flex items-center gap-4 ml-4">
      <div>
        <span class="text-white text-sm font-bold">Page name :</span>
        <input
          type="text"
          class="bg-transparent text-white border-none focus:outline-none p-2"
          value="My new page"
        />
      </div>
      <div>
        <span class="text-white text-sm font-bold">Page URL :</span>
        <input
          type="text"
          class="bg-transparent text-white border-none focus:outline-none p-2"
          value="/my-new-page"
        />
      </div>
    </div>

    <div>
      <button
        class="border-none text-white bg-blue-700 hover:bg-blue-600 transition-colors duration-300 font-bold uppercase p-4 cursor-pointer"
      >
        save
      </button>
      <button
        class="border-none text-white bg-green-700 hover:bg-green-600 transition-colors duration-300 font-bold uppercase p-4 cursor-pointer"
      >
        publish
      </button>
    </div>
  </div>
</template>

<style lang="scss" scope>
.topbar {
  z-index: 100;
  width: calc(100% - 350px);
}
</style>
