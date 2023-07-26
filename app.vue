<script lang="ts" setup>
import Toast from "~/components/layout/Toast.vue";
import PageEditor from "~/components/page/PageEditor.vue";
import PagePreview from "~/components/page/PagePreview.vue";

const { state } = useApplication();
</script>

<template>
  <div>
    <Toast />

    <PageEditor v-if="state === 'editor'" />
    <PagePreview v-if="state === 'preview'" />
  </div>
</template>
