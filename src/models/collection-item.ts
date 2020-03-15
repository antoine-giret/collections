class CollectionItem {
  public description

  constructor(
    public readonly uuid: string,
    public readonly title: string,
    public readonly imageUrl: string | null,
    public readonly createdAt: Date,
  ) {
    this.description = ''
  }
}

export default CollectionItem
