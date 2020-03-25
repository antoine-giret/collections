import CollectionItem from './collection-item'
import MusicItem from './music-item'
import BookItem from './book-item'

export enum CollectionTypes {
  MUSIC = 'MUSIC',
  BOOK = 'BOOK',
  OTHER = 'OTHER',
}

function getIcon(type: CollectionTypes) {
  if (type === CollectionTypes.MUSIC) return 'music' // TODO: use record-vinyl or compact-disc when available
  if (type === CollectionTypes.BOOK) return 'book'

  return 'star'
}

class Collection {
  public readonly icon: string

  constructor(
    public readonly uuid: string,
    public readonly title: string,
    public readonly type: CollectionTypes,
    public readonly items: (CollectionItem | MusicItem | BookItem)[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {
    this.icon = getIcon(type)
  }
}

export default Collection
