import { ZodSchema, z } from 'zod';
import { Block, BlockType } from '~/types';

const blocks: Array<{
  categoryId: number;
  name: string;
  default: Block;
  validator: ZodSchema;
}> = [
  {
    categoryId: 1,
    name: 'Container',
    default: {
      id: '-1',
      name: 'Container',
      type: 'container',
      children: [],
    },
    validator: z.object({}),
  },
  {
    categoryId: 2,
    name: 'Button',
    default: {
      id: '-1',
      name: 'Button',
      type: 'button',
      text: 'Click me!',
      url: 'https://search.brave.com',
      target: '_self',
    },
    validator: z.object({
      name: z.string().nonempty('Name is required'),
      text: z.string().nonempty('Text is required'),
      url: z.string().url(),
      target: z.enum(['_self', '_blank'], {
        required_error: 'Invalid target',
      }),
    }),
  },
  {
    categoryId: 2,
    name: 'Call To Action',
    default: {
      id: '-1',
      name: 'Call To Action',
      type: 'cta',
      title: 'You just won an iPhonne 15!',
      subtitle: 'Discover how to get your price in the best delay possible',
      url: 'https://search.brave.com',
      buttonText: 'Click me!',
    },
    validator: z.object({
      title: z.string().nonempty('Title is required'),
      subtitle: z.string().nonempty('Subtitle is required'),
      buttonText: z.string().nonempty('Button text is required'),
      url: z.string().url(),
    }),
  },
  {
    categoryId: 2,
    name: 'Image',
    default: {
      id: '-1',
      name: 'Image',
      type: 'image',
      title: 'A cute bird',
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Pagodroma_nivea_in_ross_sea1.jpg',
    },
    validator: z.object({
      title: z.string().min(1, 'Title is required'),
      url: z.string().min(1, 'You must choose a file'),
      width: z.coerce
        .number()
        .positive('Width must be superior to 0')
        .or(z.literal('').transform(() => undefined))
        .optional(),
      height: z.coerce
        .number()
        .positive('Height must be superior to 0')
        .or(z.literal('').transform(() => undefined))
        .optional(),
    }),
  },
  {
    categoryId: 1,
    name: 'Carousel',
    default: {
      id: '-1',
      name: 'Carousel',
      type: 'carousel',
      children: [
        {
          id: '-1',
          name: 'Container Item',
          type: 'carouselItem',
          title: 'A new slide',
          description: 'This is a default slide for your carousel',
          url: 'https://fr.wikipedia.org/wiki/Oiseau',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/e/e1/Pagodroma_nivea_in_ross_sea1.jpg',
        },
      ],
      slidesPerPage: 1,
      slideHeight: 200,
      pagination: true,
      navigation: true,
    },
    validator: z.object({
      slidesPerPage: z.coerce
        .number()
        .min(1, 'You must have at least one slide per page'),
      slideHeight: z.coerce
        .number()
        .positive('You must specify a height for the slides'),
      pagination: z.coerce.boolean(),
      navigation: z.coerce.boolean(),
    }),
  },
  {
    categoryId: 2,
    name: 'Carousel Item',
    default: {
      id: '-1',
      name: 'Container Item',
      type: 'carouselItem',
      title: 'A new slide',
      description: 'This is a default slide for your carousel',
      url: 'https://fr.wikipedia.org/wiki/Oiseau',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/e/e1/Pagodroma_nivea_in_ross_sea1.jpg',
    },
    validator: z.object({
      title: z.string().nonempty('Title is required'),
      description: z.string().nonempty('Description is required'),
      url: z.string().url(),
      image: z.string(),
    }),
  },
  {
    categoryId: 2,
    name: 'Spacer',
    default: {
      id: '-1',
      name: 'Spacer',
      type: 'spacer',
      width: 100,
      height: 100,
    },
    validator: z
      .object({
        width: z.coerce
          .number()
          .positive('Width must be superior to 0')
          .or(z.literal('').transform(() => undefined))
          .optional()
          .transform(x => x ?? undefined),
        height: z.coerce
          .number()
          .positive('Height must be superior to 0')
          .or(z.literal('').transform(() => undefined))
          .optional()
          .transform(x => x ?? undefined),
      })
      .refine(schema => schema.width || schema.height, {
        message: 'Either width or width is required',
        path: ['width'],
      }),
  },
  {
    categoryId: 2,
    name: 'Text',
    default: {
      id: '-1',
      name: 'Text',
      type: 'text',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget velit at felis porttitor pharetra. Maecenas nec risus aliquet, pretium velit id, ullamcorper eros.',
    },
    validator: z.object({
      text: z.string(),
    }),
  },
];

export const getBlockByType = (type: BlockType) => {
  return blocks.find(e => e.default.type === type)!;
};

export default blocks;
