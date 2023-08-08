export type BlockType =
  | 'button'
  | 'cta'
  | 'container'
  | 'carousel'
  | 'carouselItem'
  | 'image'
  | 'spacer'
  | 'text';

export type BaseBlock = {
  id: string;
  name: string;
  type: BlockType;
}

export type SizedBlock = BaseBlock & {
  width?: number;
  height?: number;
};

export type BlockWithChildren = BaseBlock & {
  // eslint-disable-next-line no-use-before-define
  children: Array<Block>;
};

export type ContainerBlock = BlockWithChildren & {
  type: 'container';
};

export type ButtonBlock = BaseBlock & {
  type: 'button';
  text: string;
  url: string;
  target: '_blank' | '_self';
};

export type CallToActionBlock = BaseBlock & {
  type: 'cta';
  title: string;
  subtitle: string;
  url: string;
  buttonText: string;
};

export type ImageBlock = SizedBlock & {
  type: 'image';
  title: string;
  url: string;
};

export type CarouselItemBlock = BaseBlock & {
  type: 'carouselItem';
  title: string;
  description: string;
  url: string;
  image: string;
};

export type CarouselBlock = BlockWithChildren & {
  type: 'carousel';
  children: Array<CarouselItemBlock>;
  slidesPerPage: number;
  slideHeight: number;
  pagination: boolean;
  navigation: boolean;
};

export type SpacerBlock = SizedBlock & {
  type: 'spacer';
};

export type TextBlock = BaseBlock & {
  text: string
}

export type Block =
  | BlockWithChildren
  | ContainerBlock
  | ButtonBlock
  | CallToActionBlock
  | ImageBlock
  | CarouselBlock
  | CarouselItemBlock
  | SpacerBlock
  | TextBlock;

export const isContainerBlock = (
  object: Block,
): object is BlockWithChildren => {
  return object.type === 'container' || object.type === 'carousel';
};
