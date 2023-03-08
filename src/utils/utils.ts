export const getCodeFromUrl = () => {
  const code = new URLSearchParams(window.location.search).get("code")

  return code
}
