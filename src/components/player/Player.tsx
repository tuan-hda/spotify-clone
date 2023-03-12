import { useState, useEffect } from 'react'
import Control from './Control'
import Track from './Track'
import Utils from './Utils'

interface Props {
  accessToken: string
}

const Player = ({ accessToken }: Props) => {
  const [player, setPlayer] = useState()

  return (
    <div className='grid h-[90px] grid-cols-10 items-center border-t border-s-gray-2 bg-s-black-5 px-4'>
      <Track />
      <Control />
      <Utils />
    </div>
  )
}

export default Player
