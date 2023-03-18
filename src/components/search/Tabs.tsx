import classNames from 'classnames'
import { useMatch, useParams, useResolvedPath } from 'react-router-dom'
import CustomLink from '../common/CustomLink'

interface TabItemProps {
  to: string
  label: string
}

const TabItem = ({ to, label }: TabItemProps) => {
  const { pathname } = useResolvedPath(to)
  const match = useMatch({
    path: pathname,
    end: true
  })

  return (
    <CustomLink
      to={to}
      aria-current='page'
      className={classNames(
        'inline-block rounded-full px-3 py-[6px] font-normal transition',
        match ? 'bg-white text-black' : 'bg-s-gray-11 text-white hover:bg-s-gray-9 active:bg-s-black-9'
      )}
    >
      {label}
    </CustomLink>
  )
}

const Tabs = () => {
  const { value } = useParams()

  return (
    <ul className='flex flex-wrap gap-3 text-center text-sm font-medium'>
      <li>
        <TabItem to={`/search/${value}`} label='All' />
      </li>
      <li>
        <TabItem to={`/search/${value}/playlists`} label='Playlists' />
      </li>
      <li>
        <TabItem to={`/search/${value}/songs`} label='Songs' />
      </li>
      <li>
        <TabItem to={`/search/${value}/albums`} label='Albums' />
      </li>
      <li>
        <TabItem to={`/search/${value}/artists`} label='Artists' />
      </li>
    </ul>
  )
}

export default Tabs
