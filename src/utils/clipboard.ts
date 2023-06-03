import { toast } from 'react-toastify'

export const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast('Copy to clipboard!')
    })
    .catch((error) => {
      console.error('Failed to copy text:', error)
    })
}
