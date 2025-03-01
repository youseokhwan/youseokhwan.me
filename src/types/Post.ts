export default interface Post
  extends Pick<
    Queries.MarkdownRemarkFrontmatter,
    "title" | "desc" | "date" | "category"
  > {
    id: string
    slug: Queries.MarkdownRemarkFields["slug"]
    thumbnail?: string
    timeToRead: number
  }
  