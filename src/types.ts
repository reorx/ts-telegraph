
export interface Account {
  access_token: string
  short_name: string
  author_name: string
  author_url: string
  auth_url: string
  page_count: string
}

export interface Page {
  path: string
  url: string
  title: string
  description: string
  author_name: string
  author_url: string
  image_url: string
  content: Array<any>
  views: number
  can_edit: boolean
}

export interface PageList {
  total_count: number
  pages: Array<Page>
}
