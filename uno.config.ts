import {
  defineConfig,
  presetTypography,
  presetWebFonts,
  presetWind3,
  presetIcons,
} from "unocss";

export default defineConfig({
  presets: [
    presetWind3(),
    presetTypography(),
    presetWebFonts(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/',
    }),
  ],
});
