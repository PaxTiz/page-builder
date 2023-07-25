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
  <div class="modal-wrapper absolute w-full h-full top-0 left-0 z-36">
    <div class="bg-white shadow-lg rounded">
      <div
        class="flex justify-between items-center bg-white p-4 border-solid border-0 border-b border-gray rounded-t"
      >
        <h2 class="m-0">Blocks Library</h2>

        <input
          v-model="searchQuery"
          class="px-4 py-2 border-solid border-1 border-gray focus:outline-blue-500 rounded"
          type="text"
          placeholder="Search..."
        />
      </div>

      <div class="library bg-white rounded-b">
        <div
          class="overflow-scroll flex flex-col border-solid border-0 border-r border-gray"
        >
          <div
            v-for="category in categories"
            :key="category.id"
            class="px-4 py-2 cursor-pointer hover:bg-gray-100"
            :class="{ 'bg-gray-200': selectedCategory === category.id }"
            @click="() => (selectedCategory = category.id)"
          >
            {{ category.name }}
          </div>
        </div>

        <div>
          <div class="h-70 overflow-scroll p-8">
            <div class="grid grid-cols-3 gap-4">
              <template v-if="blocks.length > 1">
                <div
                  v-for="block in blocks"
                  :key="block.default.type"
                  class="px-4 py-3 border rounded cursor-pointer"
                  :class="
                    selectedBlock === block.default.type
                      ? 'border-dashed border-blue bg-blue-100'
                      : 'border-solid border-gray'
                  "
                  @click="() => (selectedBlock = block.default.type)"
                >
                  <p class="m-0">{{ block.name }}</p>
                </div>
              </template>
              <p class="m-0" v-else>No blocks found.</p>
            </div>
          </div>

          <div
            class="flex justify-end gap-4 px-8 py-4 border-solid border-0 border-t border-gray"
          >
            <button
              class="flex w-fit px-8 py-2 border-none bg-red-600 hover:bg-red-500 text-white no-underline rounded cursor-pointer transition-colors duration-300"
              @click="emit('close')"
            >
              Cancel
            </button>
            <button
              class="flex w-fit px-8 py-2 border-none bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white no-underline rounded cursor-pointer transition-colors duration-300"
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
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(1px);
}

.library {
  display: grid;
  grid-template-columns: 200px 490px;
}
</style>
