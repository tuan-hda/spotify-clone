import https from "utils/https"

interface AccessToken {
  accessToken: string
}

export const getTokens = (code: string) =>
  https.post<AccessToken>("/login", {
    code,
  })

export const getNewAccessToken = () => https.post<AccessToken>("/refresh")
