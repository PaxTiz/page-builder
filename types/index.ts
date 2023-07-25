export interface BaseBlock {
  id: string;
  name: string;
  type: string;
}

export type SizedBlock = BaseBlock & {
  width?: number;
  height?: number;
};

export type BlockWithChildren = BaseBlock & {
  children: Array<Block>;
};

export type ContainerBlock = BlockWithChildren & {
  type: "container";
};

export type ButtonBlock = BaseBlock & {
  type: "button";
  text: string;
  url: string;
  target?: "_blank" | "_self";
};

export type CallToActionBlock = BaseBlock & {
  type: "cta";
  title: string;
  subtitle: string;
  url: string;
  buttonText: string;
};

export type ImageBlock = SizedBlock & {
  type: "image";
  title: string;
  url: string;
};

export type CarouselItemBlock = BaseBlock & {
  type: "carouselItem";
  title: string;
  description: string;
  url: string;
  image: string;
};

export type CarouselBlock = BlockWithChildren & {
  type: "carousel";
  children: Array<CarouselItemBlock>;
  slidesPerPage: number;
  slideHeight: number;
  pagination: boolean;
  navigation: boolean;
};

export type SpacerBlock = SizedBlock & {
  type: "spacer";
};

export type Block =
  | BlockWithChildren
  | ContainerBlock
  | ButtonBlock
  | CallToActionBlock
  | ImageBlock
  | CarouselBlock
  | CarouselItemBlock
  | SpacerBlock;

export const isContainerBlock = (
  object: Block
): object is BlockWithChildren => {
  return object.type === "container" || object.type === "carousel";
};
