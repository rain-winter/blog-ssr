import { IronSession } from 'iron-session'

export type ISession = IronSession & Record<string, any>

export type IArticle = {
  id: number
  title: string
  content: string
  createdAt: DateTime
  updatedAt: DateTime
  is_delete: number
  User: []
}
