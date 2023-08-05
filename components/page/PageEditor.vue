<script lang="ts" setup>
import Sidebar from '~/components/layout/Sidebar.vue';
import Topbar from '~/components/layout/Topbar.vue';
import PageRenderer from '~/components/page/PageRenderer.vue';

const { page } = useBlocks();
</script>

<template>
  <div class="bg-gray-800">
    <Sidebar :children="page.blocks" />
    <Topbar />

    <div class="page pt-20 z-0 px-8">
      <div class="shadow-white bg-gray-900 rounded">
        <PageRenderer :children="page.blocks" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  margin-left: 350px;
  width: calc(100% - 350px);
}
</style>
