import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({ scale: 1.2, warn: true, }),
  ],
  shortcuts: [
    [/^border(.*)$/, ([, position]) => `border-#3a3e41 border${position}`],
    [/^wh-(.*)$/, ([, size]) => `w-${size} h-${size}`],
    ['center', 'flex justify-center items-center'],
    ['x-center', 'flex justify-center'],
    ['x-between', 'flex justify-between'],
    ['y-center', 'flex items-center'],
  ]
})
