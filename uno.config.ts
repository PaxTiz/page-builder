import transformerDirectives from "@unocss/transformer-directives";
import { defineConfig } from "unocss";

export default defineConfig({
  transformers: [transformerDirectives()],

  rules: [["shadow-white", { "box-shadow": "0 0 3px rgba(255,255,255,0.8)" }]],
});
