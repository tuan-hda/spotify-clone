import { Fragment } from 'react'
import { matchPath } from 'react-router-dom'
import { paths } from '~/config/routes'

const getFallback = (pathname: string) => {
  const match = Object.values(paths).find((path) => matchPath(path.path, pathname))

  return match?.fallback || Fragment
}

export default getFallback
