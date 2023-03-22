import { Fragment } from 'react'
import { matchPath } from 'react-router-dom'
import { paths } from '~/config/routes'

const getFallback = (pathname: string) => {
  const match = Object.values(paths).find((path) => matchPath(!Array.isArray(path.path) ? path.path : '', pathname))

  if (match && 'fallback' in match) return match.fallback
  return Fragment
}

export default getFallback
