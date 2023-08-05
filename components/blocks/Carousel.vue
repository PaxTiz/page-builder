<script lang="ts" setup>
import { CarouselBlock } from '~/types';

defineProps<{
  block: CarouselBlock;
}>();
</script>

<template>
  <div class="__block">
    <Swiper
      :modules="[SwiperPagination, SwiperNavigation, SwiperAutoplay]"
      :slides-per-view="block.slidesPerPage"
      :space-between="16"
      :pagination="{ enabled: block.pagination, clickable: true }"
      :navigation="block.navigation"
      loop
    >
      <SwiperSlide v-for="slide in block.children" :key="slide.id">
        <a
          class="__block block w-full relative"
          :href="slide.url"
          :style="{ height: `${block.slideHeight}px` }"
        >
          <img class="block object-cover rounded" :src="slide.image">
        </a>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss" scoped>
:deep(.swiper) {
  width: 1024px;
  --swiper-navigation-color: #fff;
  --swiper-pagination-color: #fff;

  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 30px;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
