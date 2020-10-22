import CollectionItem from './collection-item'

class BoardGameItem extends CollectionItem {
  constructor(
    public readonly uuid: string,
    public readonly title: string,
    public readonly editor: string,
    public readonly minPlayers: number,
    public readonly maxPlayers: number,
    public readonly duration: number,
    public readonly imageUrl: string | null,
    public readonly createdAt: Date,
  ) {
    super(uuid, title, imageUrl, createdAt)

    this.description = editor
  }
}

export default BoardGameItem
