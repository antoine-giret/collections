import CollectionItem from './collection-item'

class MusicItem extends CollectionItem {
  constructor(
    public readonly uuid: string,
    public readonly title: string,
    public readonly artist: string,
    public readonly imageUrl: string | null,
    public readonly createdAt: Date,
  ) {
    super(uuid, title, imageUrl, createdAt)

    this.description = artist
  }
}

export default MusicItem
