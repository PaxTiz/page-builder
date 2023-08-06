<script lang="ts" setup>
import Toast from '~/components/layout/Toast.vue';
import PageEditor from '~/components/page/PageEditor.vue';
import PagePreview from '~/components/page/PagePreview.vue';

const { state } = useApplication();
const { loadHistory } = usePageHistory();
const { load } = useBlocks();

const route = useRoute();
const pageId = route.query.id as string;

await load(pageId);
await loadHistory(pageId);
</script>

<template>
  <div>
    <Toast />

    <div class="application">
      <PageEditor v-if="state === 'editor'" />
      <PagePreview v-if="state === 'preview'" />
    </div>

    <div class="unsupported">
      <h1 class="mt-0">
        Your device is not supported
      </h1>
      <p class="m-0">
        The page editor is only available on desktop.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.unsupported {
  display: none;
}

@media screen and (max-width: 1120px) {
  .application {
    display: none;
  }

  .unsupported {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #fff;
    text-align: center;
    margin: 0 2em;
  }
}
</style>
