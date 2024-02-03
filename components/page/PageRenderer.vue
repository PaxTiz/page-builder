<script lang="ts" setup>
import Button from '~/components/blocks/Button.vue';
import CallToAction from '~/components/blocks/CallToAction.vue';
import Carousel from '~/components/blocks/Carousel.vue';
import Container from '~/components/blocks/Container.vue';
import Image from '~/components/blocks/Image.vue';
import Spacer from '~/components/blocks/Spacer.vue';
import Text from '~/components/blocks/Text.vue';
import { type Block } from '~/types';

defineProps<{
  children: Array<Block>;
}>();
</script>

<template>
  <div class="w-full">
    <template v-for="block in children" :key="block.id">
      <Container v-if="block.type === 'container'" :children="block.children" />
      <Button v-if="block.type === 'button'" :block="block" />
      <CallToAction v-if="block.type === 'cta'" :block="block" />
      <Spacer v-if="block.type === 'spacer'" :block="block" />
      <Carousel v-if="block.type === 'carousel'" :block="block" />
      <Image v-if="block.type === 'image'" :block="block" />
      <Text v-if="block.type === 'text'" :block="block" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.page {
  width: 100%;
}
</style>
