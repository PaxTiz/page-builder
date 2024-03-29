<script lang="ts" setup>
import { nanoid } from 'nanoid';
import Button from '~/components/internal/Button.vue';
import AddBlockModal from '~/components/modals/AddBlockModal.vue';
import HistoryModal from '~/components/modals/HistoryModal.vue';
import type { BlockHistoryAction } from '~/types';

const { set } = useToast();
const { isActive, toggle } = useModal('modal_add_block');
const { isActive: isHistoryModalActive, toggle: toggleHistoryModal } =
  useModal('modal_history');

const { page } = useBlocks();
const { save } = usePageHistory();

const saveInterval: Ref<NodeJS.Timer | undefined> = ref();

const onSave = async (action: BlockHistoryAction, manualSave = true) => {
  /**
   * TODO: Validate blocks before saving on backend
   *
   * A validation before saving is required to avoid broken blocks
   * in case the user has saved or restored invalid configuration.
   *
   * For example, it can happens if the user refresh the page without
   * saving after editing a block but is invalid, and restore it from
   * it's local history.
   */

  set({
    type: 'spin',
    message: 'The page is being saved...',
  });

  await save(page.value.id, {
    id: nanoid(10),
    timestamp: new Date().getTime(),
    blocks: page.value.blocks,
    action,
  }, page.value);

  set({
    type: 'success',
    duration: 2000,
    message: manualSave
      ? 'The page has been saved!'
      : 'The page has been auto-saved!',
  });
};

const onPublish = () => {
  onSave('publish');
};

onMounted(() => {
  saveInterval.value = setInterval(() => {
    onSave('automatic', false);
  }, 1000 * 60);
});

onBeforeUnmount(() => {
  if (saveInterval.value) {
    clearInterval(saveInterval.value);
  }

  saveInterval.value = undefined;
});
</script>

<template>
  <AddBlockModal v-if="isActive" @close="toggle" />
  <HistoryModal v-if="isHistoryModalActive" @close="toggleHistoryModal" />

  <div
    class="topbar fixed bg-neutral-900 border-b-2 border-neutral-700 flex items-center px-4 py-3"
  >
    <Button label="New block" @click="toggle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
      </svg>
    </Button>

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4 ml-4">
        <div>
          <span class="text-gray-300 text-sm font-bold">Page name :</span>
          <input
            v-model="page.name"
            type="text"
            class="bg-transparent text-gray-300 border-none focus:outline-none p-2"
            oninput="this.style.width = `${this.value.length}ch`"
          >
        </div>
        <div>
          <span class="text-gray-300 text-sm font-bold">Page URL :</span>
          <input

            type="text"
            class="bg-transparent text-gray-500 border-none focus:outline-none p-2 pr-0"
            value="http://localhost:3000/"
            disabled
          >
          <input
            v-model="page.slug"
            type="text"
            class="bg-transparent text-gray-300 border-none focus:outline-none p-2 pl-0 -ml-1"
            oninput="this.style.width = `${this.value.length}ch`"
          >
        </div>
      </div>

      <div class="flex items-center gap-4">
        <Button label="History" variant="secondary" @click="toggleHistoryModal">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"
            />
          </svg>
        </Button>

        <Button label="Save" @click="() => onSave('save')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z"
            />
          </svg>
        </Button>

        <Button label="Publish" variant="success" @click="onPublish">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M1.94631 9.31555C1.42377 9.14137 1.41965 8.86034 1.95706 8.6812L21.0433 2.31913C21.5717 2.14297 21.8748 2.43878 21.7268 2.95706L16.2736 22.0433C16.1226 22.5718 15.8179 22.5901 15.5946 22.0877L12.0002 14.0002L18.0002 6.00017L10.0002 12.0002L1.94631 9.31555Z"
            />
          </svg>
        </Button>
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

  svg {
    width: 14px;
    height: 14px;
    fill: currentColor;
  }
}
</style>
