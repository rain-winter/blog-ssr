import { IronSession } from 'iron-session'

export type ISession = IronSession & Record<string, any>

export type User = {
  id?: number
  nickname?: string
  avatar?: string
  avatar?: string
}

export type IArticle = {
  id: number
  title: string
  content: string
  views: number
  createdAt: DateTime
  updatedAt: DateTime
  is_delete: number
  User: User
}
