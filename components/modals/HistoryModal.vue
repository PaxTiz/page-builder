<script lang="ts" setup>
import Modal from './Modal.vue';
import Button from '~/components/internal/Button.vue';
import Pagination from '~/components/layout/Pagination.vue';
import Tabs from '~/components/layout/Tabs.vue';
import type { BlockHistoryAction, BlockHistoryItem } from '~/types';

const emit = defineEmits<{(e: 'close'): void;}>();

const { setBlocks } = useBlocks();
const { setState } = useApplication();
const { sorted } = usePageHistory();
const page = ref(1);

const paginatedHistory = computed(() => {
  const start = page.value === 1 ? 0 : (page.value - 1) * 5;
  const end = page.value === 1 ? 5 : page.value * 5;
  return sorted.value.slice(start, end);
});

const tabs = [
  {
    key: 'local',
    title: 'My history',
  },
  {
    key: 'remote',
    title: 'All versions',
  },
];

const formattedAction = (action: BlockHistoryAction) => {
  switch (action) {
    case 'automatic':
      return 'Auto Save';
    case 'save':
      return 'Manual Save';
    case 'publish':
      return 'Publish';
    case 'addBlock':
      return 'Add Block';
    case 'deleteBlock':
      return 'Delete Block';
    case 'moveBlock':
      return 'Move Block';
    default:
      return action;
  }
};

const onPreview = (item: BlockHistoryItem) => {
  setState('preview', item.blocks);
};

const onRestore = (item: BlockHistoryItem) => {
  setBlocks(item.blocks);
  emit('close');
};
</script>

<template>
  <Modal title="Page History">
    <template #footer>
      <Button label="Close" variant="danger" @click="emit('close')" />
    </template>

    <div class="h-96 overflow-scroll">
      <Tabs :tabs="tabs">
        <template #local>
          <div class="w-21rem">
            <table
              class="border-collapse w-full text-sm text-left text-neutral-400 border-2 border-neutral-700 rounded"
            >
              <thead class="text-xs uppercase bg-neutral-700 text-neutral-400">
                <tr>
                  <th>Action</th>
                  <th>Saved At</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="history in paginatedHistory"
                  :key="history.timestamp"
                >
                  <td class="capitalize">
                    {{ formattedAction(history.action) }}
                  </td>
                  <td>{{ new Date(history.timestamp).toLocaleString() }}</td>
                  <td class="flex gap-2">
                    <Button
                      label="Preview"
                      variant="secondary"
                      size="small"
                      @click="() => onPreview(history)"
                    />
                    <Button
                      label="Restore"
                      size="small"
                      @click="() => onRestore(history)"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="mt-4">
              <Pagination
                v-model="page"
                :total="Math.floor(sorted.length / 5)"
              />
            </div>
          </div>
        </template>
      </Tabs>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
table {
  th {
    @apply px-4 py-2;
  }

  td {
    @apply px-4 py-2;
  }

  tbody {
    tr {
      @apply bg-neutral-800 hover:bg-neutral-900;
    }

    tr:last-of-type td:first-of-type {
      @apply rounded-bl;
    }
    tr:last-of-type td:last-of-type {
      @apply rounded-br;
    }

    tr:not(:last-of-type) {
      @apply border-solid border-0 border-b border-neutral-700;
    }
  }

  th:first-of-type {
    @apply rounded-tl;
  }
  th:last-of-type {
    @apply rounded-tr;
  }
}
</style>
