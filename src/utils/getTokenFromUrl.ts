interface IToken {
  access_token?: string
}

const getTokenFromUrl: () => IToken = () => {
  const hash = window.location.hash.slice(1)
  if (!hash) return {}
  return JSON.parse(
    '{"' + decodeURIComponent(hash).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
  )
}

export default getTokenFromUrl
