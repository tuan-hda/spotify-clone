export const getCodeFromUrl = () => {
  const code = new URLSearchParams(window.location.search).get('code')

  return code
}

function componentToHex(c: number) {
  const hex = c.toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

export function rgbToHex(r: number, g: number, b: number) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

export function hexWithOpacityToRgba(hexWithOpacity: string, opacity: number) {
  const hex = hexWithOpacity.length > 6 ? hexWithOpacity.slice(0, 7) : hexWithOpacity

  let c
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('')
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = '0x' + c.join('')
    return 'rgba(' + [(Number(c) >> 16) & 255, (Number(c) >> 8) & 255, Number(c) & 255].join(',') + ',' + opacity + ')'
  }
  return '#000'
}
