import { useOneLineGrid } from '~/hooks'
import { ListItem } from '../list'

interface Props {
  data:
    | SpotifyApi.PagingObject<SpotifyApi.ArtistObjectFull>
    | SpotifyApi.PagingObject<SpotifyApi.AlbumObjectSimplified>
    | SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>
    | undefined
  name: string
}

const OneLineList = ({ data, name }: Props) => {
  const { ref, setRef, setMaxHeight, Wrapper } = useOneLineGrid()

  return (
    <>
      <h2 className='mb-4 text-2xl font-bold tracking-tight'>{name}</h2>
      <Wrapper>
        {data?.items.map((item, index) => {
          if (item)
            return (
              <ListItem
                key={item.id}
                item={item}
                itemRef={ref}
                setRef={index === 0 ? setRef : undefined}
                setMaxHeight={index === 0 ? setMaxHeight : undefined}
              />
            )
        })}
      </Wrapper>
    </>
  )
}

export default OneLineList
