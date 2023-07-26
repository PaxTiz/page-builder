<script lang="ts" setup>
import categories from "~/constants/block_categories";
import allBlocks from "~/constants/blocks";

const emit = defineEmits<{
  (e: "close"): void;
}>();

const { add } = useBlocks();
const searchQuery = ref("");
const selectedCategory = ref(0);
const selectedBlock: Ref<string | null> = ref(null);

const blocks = computed(() => {
  let _blocks = allBlocks;
  if (selectedCategory.value !== 0) {
    _blocks = allBlocks.filter((e) => e.categoryId === selectedCategory.value);
  }

  const query = searchQuery.value.toLowerCase();
  return _blocks.filter((e) => e.name.toLowerCase().includes(query));
});

const insertNewBlock = () => {
  if (selectedBlock.value) {
    const block = allBlocks.find((e) => e.default.type === selectedBlock.value);
    add(block!.default);
  }

  emit("close");
};
</script>

<template>
  <div class="modal-wrapper fixed w-full h-full top-0 left-0">
    <div class="bg-gray-900 shadow-white rounded">
      <div
        class="flex justify-between items-center bg-gray-900 p-4 border-solid border-0 border-b border-gray-700 rounded-t"
      >
        <h2 class="text-white m-0">Blocks Library</h2>

        <input
          v-model="searchQuery"
          class="px-4 py-2 text-white bg-gray-800 border-solid border-1 border-gray focus:outline-blue-500 rounded"
          type="text"
          placeholder="Search..."
        />
      </div>

      <div class="library bg-gray-900 rounded-b">
        <div
          class="overflow-scroll flex flex-col border-solid border-0 border-r border-gray-700"
        >
          <div
            v-for="category in categories"
            :key="category.id"
            class="px-4 py-2 cursor-pointer hover:bg-gray-800"
            :class="{ 'bg-gray-800': selectedCategory === category.id }"
            @click="() => (selectedCategory = category.id)"
          >
            <span class="text-white">{{ category.name }}</span>
          </div>
        </div>

        <div>
          <div class="h-70 overflow-scroll p-8">
            <div class="grid grid-cols-3 gap-4">
              <template v-if="blocks.length > 1">
                <div
                  v-for="block in blocks"
                  :key="block.default.type"
                  class="px-4 py-3 border rounded cursor-pointer transition-colors duration-100"
                  :class="
                    selectedBlock === block.default.type
                      ? 'border-dashed border-blue'
                      : 'border-solid border-gray bg-gray-800'
                  "
                  @click="() => (selectedBlock = block.default.type)"
                >
                  <p class="text-white m-0">{{ block.name }}</p>
                </div>
              </template>
              <p class="text-white m-0" v-else>No blocks found.</p>
            </div>
          </div>

          <div
            class="flex justify-end gap-4 px-8 py-4 border-solid border-0 border-t border-gray-700"
          >
            <button class="button-red" @click="emit('close')">Cancel</button>
            <button
              class="button-blue"
              :disabled="selectedBlock === null"
              @click="insertNewBlock"
            >
              Add block
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-wrapper {
  z-index: 150;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(1px);
}

.library {
  display: grid;
  grid-template-columns: 200px 490px;
}
</style>
