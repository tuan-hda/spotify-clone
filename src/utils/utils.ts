export const getCodeFromUrl = () => {
  const code = new URLSearchParams(window.location.search).get('code')

  return code
}

function componentToHex(c: number) {
  const hex = c.toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

export function rgbToHexWithOpacity(r: number, g: number, b: number) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b) + '70'
}
