<script lang="ts" setup>
import ButtonBuilder from '~/components/blocks/builders/ButtonBuilder.vue';
import CallToActionBuilder from '~/components/blocks/builders/CallToActionBuilder.vue';
import CarouselBuilder from '~/components/blocks/builders/CarouselBuilder.vue';
import CarouselItemBuilder from '~/components/blocks/builders/CarouselItemBuilder.vue';
import ContainerBuilder from '~/components/blocks/builders/ContainerBuilder.vue';
import ImageBuilder from '~/components/blocks/builders/ImageBuilder.vue';
import SpacerBuilder from '~/components/blocks/builders/SpacerBuilder.vue';
import { getBlockByType } from '~/constants/blocks';
import {
  Block,
  ButtonBlock,
  CallToActionBlock,
  CarouselBlock,
  CarouselItemBlock,
  ContainerBlock,
  ImageBlock,
  SpacerBlock,
} from '~/types';

const props = defineProps<{
  block: Block;
}>();

const { update } = useBlocks();
const { setElement } = useSidebar();
const editingBlock = toRef(props, 'block');

const editingBlockValidator = getBlockByType(editingBlock.value.type).validator;

const onSave = (block: Block) => {
  update(block);
  setElement(null);
};
</script>

<template>
  <div class="p-4">
    <ContainerBuilder
      v-if="block.type === 'container'"
      :block="(editingBlock as ContainerBlock)"
      :validator="editingBlockValidator"
      @save="onSave"
    />

    <CarouselBuilder
      v-if="block.type === 'carousel'"
      :block="(editingBlock as CarouselBlock)"
      :validator="editingBlockValidator"
      @save="onSave"
    />

    <CarouselItemBuilder
      v-if="block.type === 'carouselItem'"
      :block="(editingBlock as CarouselItemBlock)"
      :validator="editingBlockValidator"
      @save="onSave"
    />

    <SpacerBuilder
      v-if="block.type === 'spacer'"
      :block="(editingBlock as SpacerBlock)"
      :validator="editingBlockValidator"
      @save="onSave"
    />

    <ButtonBuilder
      v-if="block.type === 'button'"
      :block="(editingBlock as ButtonBlock)"
      :validator="editingBlockValidator"
      @save="onSave"
    />

    <CallToActionBuilder
      v-if="block.type === 'cta'"
      :block="(editingBlock as CallToActionBlock)"
      :validator="editingBlockValidator"
      @save="onSave"
    />

    <ImageBuilder
      v-if="block.type === 'image'"
      :block="(editingBlock as ImageBlock)"
      :validator="editingBlockValidator"
      @save="onSave"
    />
  </div>
</template>
