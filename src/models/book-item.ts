import CollectionItem from './collection-item'

class BookItem extends CollectionItem {
  constructor(
    public readonly uuid: string,
    public readonly title: string,
    public readonly author: string,
    public readonly imageUrl: string | null,
    public readonly createdAt: Date,
  ) {
    super(uuid, title, imageUrl, createdAt)

    this.description = author
  }
}

export default BookItem
