export const convertDuration = (duration: number): number | string => {
  const seconds = Math.floor((duration / 1000) % 60)
  const minutes = Math.floor((duration / (1000 * 60)) % 60)
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  const hoursText = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : ''
  const minutesText = minutes > 0 ? `${minutes} min${minutes > 1 ? 's' : ''}` : ''
  const secondsText = seconds > 0 ? `${seconds} sec${seconds > 1 ? 's' : ''}` : ''

  return `${hoursText} ${minutesText} ${secondsText}`.trim()
}
