import {
  ButtonBlock,
  CallToActionBlock,
  CarouselBlock,
  CarouselItemBlock,
  ContainerBlock,
  ImageBlock,
  SpacerBlock,
} from "~/types";

export default [
  {
    categoryId: 1,
    name: "Container",
    default: {
      id: "-1",
      name: "Container",
      type: "container",
    } as ContainerBlock,
  },
  {
    categoryId: 2,
    name: "Button",
    default: {
      id: "-1",
      name: "Button",
      type: "button",
      text: "Click me!",
      url: "https://search.brave.com",
      target: "_self",
    } as ButtonBlock,
  },
  {
    categoryId: 2,
    name: "Call To Action",
    default: {
      id: "-1",
      name: "Call To Action",
      type: "cta",
      title: "You just won an iPhonne 15!",
      subtitle: "Discover how to get your price in the best delay possible",
      url: "https://search.brave.com",
      buttonText: "Click me!",
    } as CallToActionBlock,
  },
  {
    categoryId: 2,
    name: "Image",
    default: {
      id: "-1",
      name: "Image",
      type: "image",
      title: "A cute bird",
      url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Pagodroma_nivea_in_ross_sea1.jpg",
    } as ImageBlock,
  },
  {
    categoryId: 1,
    name: "Carousel",
    default: {
      id: "-1",
      name: "Carousel",
      type: "carousel",
      children: [
        {
          id: "-1",
          name: "Container Item",
          type: "carouselItem",
          title: "A new slide",
          description: "This is a default slide for your carousel",
          url: "https://fr.wikipedia.org/wiki/Oiseau",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/e/e1/Pagodroma_nivea_in_ross_sea1.jpg",
        },
      ],
      slidesPerPage: 1,
      slideHeight: 200,
      pagination: true,
      navigation: true,
    } as CarouselBlock,
  },
  {
    categoryId: 2,
    name: "Carousel Item",
    default: {
      id: "-1",
      name: "Container Item",
      type: "carouselItem",
      title: "A new slide",
      description: "This is a default slide for your carousel",
      url: "https://fr.wikipedia.org/wiki/Oiseau",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/e/e1/Pagodroma_nivea_in_ross_sea1.jpg",
    } as CarouselItemBlock,
  },
  {
    categoryId: 2,
    name: "Spacer",
    default: {
      id: "-1",
      name: "Spacer",
      type: "spacer",
      width: 100,
      height: 100,
    } as SpacerBlock,
  },
];
