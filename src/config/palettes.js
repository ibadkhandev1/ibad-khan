// The hero's `palette` prop. Each palette is four fills (--c1…--c4) that every
// Memphis shape, sticker and colour field on the site reads, so switching one
// re-skins the whole page. All fills are light enough that ink text on them
// clears WCAG AA (≥ 4.5:1), so any palette is safe behind copy.
export const PALETTES = [
  {
    id: 'bel-air',
    label: 'Bel Air',
    note: 'Peter Shire, 1982',
    colors: ['#22b8a6', '#ff6a45', '#b7a2ff', '#ffcf3f'],
  },
  {
    id: 'arcade',
    label: 'Arcade',
    note: 'Cabinet art, 1981',
    colors: ['#54c6ff', '#ff73b5', '#a6e35a', '#ff9a2e'],
  },
  {
    id: 'sorbet',
    label: 'Sorbet',
    note: 'Ice-cream counter, 1986',
    colors: ['#8fe3c4', '#ffb199', '#a9b8ff', '#ffe680'],
  },
]

export const DEFAULT_PALETTE = PALETTES[0].id
export const PALETTE_STORAGE_KEY = 'ik-palette'

// Runs inline in <head> before paint so a returning visitor never sees a flash
// of the default palette.
export const PALETTE_BOOT_SCRIPT = `try{var p=localStorage.getItem('${PALETTE_STORAGE_KEY}');`
  + `if(${JSON.stringify(PALETTES.map(({ id }) => id))}.indexOf(p)>-1)`
  + 'document.documentElement.dataset.palette=p}catch(e){}'
