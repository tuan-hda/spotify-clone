import sectionRecord from '~/config/sectionRecord'

export const isAlbumObjectSimplified = (item?: SpotifyApi.ContextObject): item is SpotifyApi.AlbumObjectSimplified =>
  item?.type === 'album'

export function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !('nodeType' in e)) {
    throw new Error(`Node expected`)
  }
}

export function assertIsValidSection(
  section: string | undefined
): asserts section is keyof ReturnType<typeof sectionRecord> {
  if (!section || !(section in sectionRecord())) throw new Error('Wrong section')
}
