const getTitle = (path: string | undefined) => {
  if (!path) return ''
  let title = path.split('-').join(' ')
  title = title[0].toUpperCase() + title.slice(1).toLowerCase()
  return title
}

export default getTitle
