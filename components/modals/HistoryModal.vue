<script lang="ts" setup>
import Tabs from "~/components/layout/Tabs.vue";
import { BlockHistory } from "~/types";

const emit = defineEmits<{
  (e: "close"): void;
}>();

const storage: Ref<BlockHistory> = useSessionStorage("blocks_history", []);

const tabs = [
  {
    key: "local",
    title: "Local History",
  },
  {
    key: "remote",
    title: "Remote versions",
  },
];
</script>

<template>
  <div class="modal-wrapper fixed w-full h-full top-0 left-0">
    <div class="w-2/5 bg-gray-900 shadow-white rounded">
      <div
        class="flex justify-between items-center bg-gray-900 p-4 border-solid border-0 border-b border-gray-700 rounded-t"
      >
        <h2 class="text-white m-0">Page History</h2>
      </div>

      <div class="bg-gray-900 rounded-b">
        <div class="h-70 overflow-scroll">
          <Tabs :tabs="tabs">
            <template #local>
              <table
                class="border-collapse w-full text-sm text-left text-gray-400 shadow-white rounded"
              >
                <thead class="text-xs uppercase bg-gray-700 text-gray-400">
                  <tr>
                    <th>#</th>
                    <th>Saved At</th>
                    <th>Save Mode</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="history in storage" :key="history.timestamp">
                    <td>{{ history.id }}</td>
                    <td>{{ new Date(history.timestamp).toLocaleString() }}</td>
                    <td class="capitalize">{{ history.saveMode }}</td>
                    <td>
                      <button
                        class="button-blue button-small"
                        @click="emit('close')"
                      >
                        Restore
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </template>
          </Tabs>
        </div>

        <div
          class="flex justify-end gap-4 px-8 py-4 border-solid border-0 border-t border-gray-700"
        >
          <button class="button-red" @click="emit('close')">close</button>
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
