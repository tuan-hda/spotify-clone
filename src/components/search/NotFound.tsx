import classNames from 'classnames'
import { useParams } from 'react-router-dom'
import { SEARCH_CONTENT_HEIGHT } from '~/config/variables'

const NotFound = () => {
  const { value } = useParams()

  return (
    <div className={classNames('flex', SEARCH_CONTENT_HEIGHT)}>
      <div className='m-auto'>
        <h1 className='text-center text-2xl font-bold'>No results found for &quot;{value}&quot;</h1>
        <p className='mt-4 text-center text-base'>
          Please make sure your words are spelled correctly or use less or different keywords.
        </p>
      </div>
    </div>
  )
}

export default NotFound
