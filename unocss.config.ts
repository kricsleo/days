import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  // transformerDirectives,
  // transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  theme: {
    colors: {
      dark: '#121212'
    }
  },
  shortcuts: [
    [/^border(.*)$/, ([, position]) => `border-gray-200/50 border${position}`],
    [/^wh-(.*)$/, ([, size]) => `w-${size} h-${size}`],
  ]
  // transformers: [
  //   transformerDirectives(),
  //   transformerVariantGroup(),
  // ],
})
