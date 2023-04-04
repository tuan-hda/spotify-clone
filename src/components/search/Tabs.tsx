import classNames from 'classnames'
import { useMatch, useParams, useResolvedPath } from 'react-router-dom'
import { useSpotifyStore } from '~/store/spotify'
import CustomLink from '../common/CustomLink'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { Response } from '~/types/index.type'

interface TabItemProps {
  to: string
  label: string
}

const TabItem = ({ to, label }: TabItemProps) => {
  const { pathname } = useResolvedPath(to)
  const match = useMatch({
    path: encodeURI(pathname),
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
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const { data } = useSWR(
    value ? ['/search', value] : null,
    async ([, value]) => spotifyApi.search(value, ['album', 'artist', 'playlist', 'track']),
    { suspense: false }
  )

  const [previousData, setPreviousData] = useState<Response<SpotifyApi.SearchResponse>>()

  useEffect(() => {
    if (data) setPreviousData(data)
  }, [data])

  return (
    <ul className='flex flex-wrap gap-3 text-center text-sm font-medium'>
      {previousData && (
        <li>
          <TabItem to={`/search/${value}`} label='All' />
        </li>
      )}
      {previousData?.body.playlists?.total && previousData.body.playlists.total > 0 ? (
        <li>
          <TabItem to={`/search/${value}/playlists`} label='Playlists' />
        </li>
      ) : null}
      {previousData?.body.tracks?.total && previousData.body.tracks.total > 0 ? (
        <li>
          <TabItem to={`/search/${value}/songs`} label='Songs' />
        </li>
      ) : null}
      {previousData?.body.albums?.total && previousData.body.albums.total > 0 ? (
        <li>
          <TabItem to={`/search/${value}/albums`} label='Albums' />
        </li>
      ) : null}
      {previousData?.body.artists?.total && previousData.body.artists.total > 0 ? (
        <li>
          <TabItem to={`/search/${value}/artists`} label='Artists' />
        </li>
      ) : null}
    </ul>
  )
}

export default Tabs
