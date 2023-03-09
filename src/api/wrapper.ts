/**
 * Wrap function from spotifyApi. Automatically get new token if the current expired
 */

interface Response<T> {
  body: T
  headers: Record<string, string>
  statusCode: number
}

const wrapper = async <T>(fn: () => Promise<Response<T>>) => {
  try {
    return await fn()
  } catch (error) {
    console.log(error)
  }
}

export default wrapper
