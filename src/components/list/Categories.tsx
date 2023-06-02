import useImmutableSWR from 'swr/immutable'
import { categoryColors } from '~/config/categoryColors'
import { useSpotifyStore } from '~/store/spotify'
import { CustomLink } from '../common'

const Categories = () => {
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const { data } = useImmutableSWR('/get-categories', async () =>
    spotifyApi.getCategories({
      limit: 50
    })
  )

  return (
    <div className='autofill mt-5 gap-6 overflow-hidden'>
      {data?.body.categories.items.map((category, index) => (
        <CustomLink
          key={category.id}
          to='#'
          draggable='false'
          className='relative block aspect-square select-none overflow-hidden rounded-md p-4'
          style={{
            backgroundColor: categoryColors[index % categoryColors.length]
          }}
        >
          <h3 className='text-2xl font-bold'>{category.name}</h3>
          <img
            loading='lazy'
            draggable='false'
            className='absolute right-[-10%] bottom-[-2%] aspect-square w-[50%] rotate-[23deg] shadow-s-3'
            src={category.icons[0].url}
            alt='category'
          />
        </CustomLink>
      ))}
    </div>
  )
}

export default Categories
