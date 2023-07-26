<script lang="ts" setup>
import { BlockHistoryAction } from "types";
import Tabs from "~/components/layout/Tabs.vue";
import Modal from "./Modal.vue";

const emit = defineEmits<{
  (e: "close"): void;
}>();

const { sorted } = usePageHistory();

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

const formattedAction = (action: BlockHistoryAction) => {
  switch (action) {
    case "automatic":
      return "Auto Save";
    case "save":
      return "Manual Save";
    case "publish":
      return "Publish";
    case "addBlock":
      return "Add Block";
    case "deleteBlock":
      return "Delete Block";
    case "moveBlock":
      return "Move Block";
    default:
      return action;
  }
};
</script>

<template>
  <Modal title="Page History">
    <template #footer>
      <button class="button-red" @click="emit('close')">close</button>
    </template>

    <div class="h-90 overflow-scroll">
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
                <th>Action</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="history in sorted" :key="history.timestamp">
                <td>{{ history.id }}</td>
                <td>{{ new Date(history.timestamp).toLocaleString() }}</td>
                <td class="capitalize">{{ history.saveMode }}</td>
                <td class="capitalize">
                  {{ formattedAction(history.action) }}
                </td>
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
