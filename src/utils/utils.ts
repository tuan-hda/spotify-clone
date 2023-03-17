import sectionMap from '~/config/sectionMap'

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

export function hexWithOpacityToRgba(hexWithOpacity: string, opacity?: number) {
  const hex = hexWithOpacity.length > 6 ? hexWithOpacity.slice(0, 7) : hexWithOpacity

  let c
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('')
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = '0x' + c.join('')

    let res = 'rgba(' + [(Number(c) >> 16) & 255, (Number(c) >> 8) & 255, Number(c) & 255].join(',')
    if (typeof opacity === 'number') {
      res += ',' + opacity + ')'
    } else {
      res += ')'
    }

    return res
  }
  return '#000'
}

export const extractId = (uri: string) => {
  return uri.split(':').at(2)
}

export const convertMsToTime = (ms: number) => {
  const minutes = Math.floor((ms / (1000 * 60)) % 60)
  let seconds: string | number = Math.floor((ms / 1000) % 60)

  seconds = seconds < 10 ? '0' + seconds : seconds

  return minutes + ':' + seconds
}

export const convertToC = (a = 0, b = 1, d = 1) => {
  return (a / b) * d
}

export function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !('nodeType' in e)) {
    throw new Error(`Node expected`)
  }
}

export function assertIsValidSection(
  section: string | undefined
): asserts section is keyof ReturnType<typeof sectionMap> {
  if (!section || !(section in sectionMap())) throw new Error('Wrong section')
}
