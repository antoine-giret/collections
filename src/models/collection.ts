import CollectionItem from './collection-item'

export enum CollectionTypes {
  MUSIC,
  BOOK,
  OTHER,
}

function getIcon(type: CollectionTypes) {
  if (type === CollectionTypes.MUSIC) return 'music-note'
  if (type === CollectionTypes.BOOK) return 'book'

  return 'collections'
}

class Collection {
  public readonly icon: string

  constructor(
    public readonly uuid: string,
    public readonly title: string,
    public readonly type: CollectionTypes,
    public readonly items: CollectionItem[],
    public readonly updatedAt: Date,
  ) {
    this.icon = getIcon(type)
  }
}

export default Collection