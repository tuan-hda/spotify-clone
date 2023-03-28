import { useSpotifyStore } from './../store/spotify'
import { getCurrentPath } from './../utils/getFallback'
import { useLocation } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
const useTitle = () => {
  const { pathname } = useLocation()
  const playbackState = useSpotifyStore((state) => state.playbackState)
  const path = getCurrentPath(pathname)

  const changeTitle = useCallback((state: Spotify.PlaybackState) => {
    if (state && !state.paused) {
      document.title =
        state.track_window.current_track.name +
        ' • ' +
        state.track_window.current_track.artists.map((artist) => artist.name).join(', ')
    } else {
      document.title = 'Spotify Clone - Web Player'
    }
  }, [])

  useEffect(() => {
    if (path && path.getTitle) {
      document.title = path.getTitle()
    }
    if (playbackState) changeTitle(playbackState)
  }, [path, changeTitle, playbackState])
}

export default useTitle
