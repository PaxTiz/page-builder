<script lang="ts" setup>
const props = defineProps<{
  tabs: Array<{ key: string; title: string }>;
}>();

const tabs = toRef(props, 'tabs');
const currentTab = ref(tabs.value[0].key);

const onSelectTab = (key: string) => {
  if (currentTab.value !== key) {
    currentTab.value = key;
  }
};
</script>

<template>
  <div class="tabs">
    <div class="">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="px-8 py-4 bg-transparent cursor-pointer uppercase"
        :class="{
          'border-b border-blue-500 text-blue-500 font-bold': currentTab === tab.key,
          'border-none text-gray-300': currentTab !== tab.key,
        }"
        @click="() => onSelectTab(tab.key)"
      >
        {{ tab.title }}
      </button>
    </div>
    <div class="w-full bg-neutral-700" style="height: 1px; margin-top: -1px" />

    <div class="p-8">
      <slot :name="currentTab" />
    </div>
  </div>
</template>
