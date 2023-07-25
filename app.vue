<script lang="ts" setup>
import { nanoid } from "nanoid";
import Sidebar from "~/components/layout/Sidebar.vue";
import Topbar from "~/components/layout/Topbar.vue";
import PageRenderer from "~/components/page/PageRenderer.vue";

const { blocks, setBlocks } = useBlocks();
setBlocks([
  {
    id: nanoid(),
    type: "spacer",
    name: "Spacer",
    height: 64,
  },
  {
    id: nanoid(),
    name: "Container",
    type: "container",
    children: [
      {
        id: nanoid(),
        type: "button",
        name: "Button",
        text: "Contact me",
        url: "https://google.fr",
      },
      {
        id: nanoid(),
        type: "spacer",
        name: "Spacer",
        height: 16,
      },
      {
        id: nanoid(),
        name: "Carousel",
        type: "carousel",
        slidesPerPage: 2,
        slideHeight: 200,
        navigation: true,
        pagination: true,
        children: [
          {
            id: nanoid(),
            name: "Slide #1",
            type: "carouselItem",
            title: "My slide",
            description: "This is a slide description",
            image:
              "https://img.freepik.com/free-vector/realistic-horizontal-cinema-movie-time-poster-with-3d-glasses-snacks-tickets-clapper-reel-blue-background-with-bokeh-vector-illustration_1284-77013.jpg",
            url: "",
          },
          {
            id: nanoid(),
            name: "Slide #2",
            type: "carouselItem",
            title: "My slide",
            description: "This is a slide description",
            image:
              "https://img.freepik.com/free-vector/realistic-horizontal-cinema-movie-time-poster-with-3d-glasses-snacks-tickets-clapper-reel-blue-background-with-bokeh-vector-illustration_1284-77013.jpg",
            url: "",
          },
          {
            id: nanoid(),
            name: "Slide #3",
            type: "carouselItem",
            title: "My slide",
            description: "This is a slide description",
            image:
              "https://img.freepik.com/free-vector/realistic-horizontal-cinema-movie-time-poster-with-3d-glasses-snacks-tickets-clapper-reel-blue-background-with-bokeh-vector-illustration_1284-77013.jpg",
            url: "",
          },
          {
            id: nanoid(),
            name: "Slide #4",
            type: "carouselItem",
            title: "My slide",
            description: "This is a slide description",
            image:
              "https://img.freepik.com/free-vector/realistic-horizontal-cinema-movie-time-poster-with-3d-glasses-snacks-tickets-clapper-reel-blue-background-with-bokeh-vector-illustration_1284-77013.jpg",
            url: "",
          },
        ],
      },
      {
        id: nanoid(),
        type: "spacer",
        name: "Spacer",
        height: 16,
      },
      {
        id: nanoid(),
        type: "cta",
        name: "Call to action",
        title: "Interested by our services ?",
        subtitle: "Contact us to discover what we can do for you",
        buttonText: "Contact Us",
        url: "",
      },
    ],
  },
]);
</script>

<template>
  <div class="app bg-gray-100">
    <Sidebar :children="blocks" />

    <div class="w-full">
      <Topbar />

      <div class="w-full z-0 px-8 mt-20">
        <div class="border shadow-lg bg-white rounded">
          <PageRenderer :children="blocks" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  display: grid;
  grid-template-columns: 350px 1fr;
}
</style>
