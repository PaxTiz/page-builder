import transformerDirectives from "@unocss/transformer-directives";
import { defineConfig } from "unocss";

export default defineConfig({
  transformers: [transformerDirectives()],

  rules: [["shadow-white", { "box-shadow": "0 0 3px rgba(255,255,255,0.8)" }]],

  shortcuts: [
    [
      /^button-(.*)$/,
      ([, c]) =>
        `border-none rounded text-white bg-${c}-700 hover:bg-${c}-600 disabled:bg-${c}-400 transition-colors duration-300 font-bold uppercase px-4 flex items-center gap-2 h-[32px] cursor-pointer`,
    ],
    {
      "button-small": "text-xs px-2 h-[24px]",
    },
  ],
});
