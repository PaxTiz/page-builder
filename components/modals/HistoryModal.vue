<script lang="ts" setup>
import Modal from './Modal.vue';
import Pagination from '~/components/layout/Pagination.vue';
import Tabs from '~/components/layout/Tabs.vue';
import { BlockHistoryAction, BlockHistoryItem } from '~/types';

const emit = defineEmits<{(e: 'close'): void;}>();

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

const onRestore = (_item: BlockHistoryItem) => {
  emit('close');
};
</script>

<template>
  <Modal title="Page History">
    <template #footer>
      <button class="button-red" @click="emit('close')">
        close
      </button>
    </template>

    <div class="h-98 overflow-scroll">
      <Tabs :tabs="tabs">
        <template #local>
          <div class="w-120">
            <table
              class="border-collapse w-full text-sm text-left text-gray-400 shadow-white rounded"
            >
              <thead class="text-xs uppercase bg-gray-700 text-gray-400">
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
                    <button
                      class="button-gray button-small"
                      @click="() => onPreview(history)"
                    >
                      Preview
                    </button>
                    <button
                      class="button-blue button-small"
                      @click="() => onRestore(history)"
                    >
                      Restore
                    </button>
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
      @apply bg-gray-800 hover:bg-gray-900;
    }

    tr:last-of-type td:first-of-type {
      @apply rounded-bl;
    }
    tr:last-of-type td:last-of-type {
      @apply rounded-br;
    }

    tr:not(:last-of-type) {
      @apply border-solid border-0 border-b border-gray-700;
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
