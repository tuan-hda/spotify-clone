import React, { ChangeEvent, useEffect, useState } from 'react'
import { Divider } from '../common'
import TextInput from '../common/TextInput'
import { BiSearch } from 'react-icons/bi'
import { IoIosClose } from 'react-icons/io'
import { useSearch } from '~/hooks'
import { useDebouncedCallback } from 'use-debounce'
import Song from '../search/Song'

type Props = {
  totalTracks?: number
}

const FindSong = ({ totalTracks = 0 }: Props) => {
  const [value, setValue] = useState('')
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState('')
  const { data } = useSearch(search)
  const [selected, setSelected] = useState(-1)

  useEffect(() => {
    if (totalTracks === 0) {
      setShow(true)
    } else {
      setShow(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = useDebouncedCallback((value: string) => {
    setSearch(value)
  }, 300)

  return (
    <div className='z-100 relative mt-10 w-full'>
      {show ? (
        <>
          <Divider />
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='mt-6 text-2xl font-semibold'>Let{"'"}s find something for your playlist</h2>
              <TextInput
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                  setValue(e.target.value)
                  handleChange(e.target.value)
                }}
                leftIcon={<BiSearch className='mr-2 h-6 w-6 bg-transparent text-white/60 ' />}
                rightIcon={
                  <IoIosClose
                    onClick={() => setValue('')}
                    className='h-10 w-10 bg-transparent text-white/60 hover:text-white'
                  />
                }
                className='h-10'
                containerClassName='max-w-[365px] mt-6'
                placeholder='Search for songs'
              />
            </div>

            <IoIosClose
              onClick={() => setShow(false)}
              className='h-12 w-12 bg-transparent text-white/60 hover:text-white'
            />
          </div>

          <div className='h-6' />

          {data?.body.tracks?.items.map((track, index) => (
            <Song
              find
              selected={selected}
              setSelected={setSelected}
              paddingLeft='14px'
              paddingRight='14px'
              key={track.id + index}
              index={index}
              track={track}
              isSongTab
            />
          ))}
        </>
      ) : (
        <button onClick={() => setShow(true)} className='w-full pr-4 text-right font-semibold'>
          Find more
        </button>
      )}
    </div>
  )
}

export default FindSong
