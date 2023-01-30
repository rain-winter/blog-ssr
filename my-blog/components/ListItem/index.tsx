import Link from 'next/link'
import { IArticle } from '@/utils'
interface IProps {
  article: IArticle
}

const ListItem = (props: IProps) => {
  const { article } = props
//   console.log(article)
  return <div>
    {article.id}
  </div>
}

export default ListItem
