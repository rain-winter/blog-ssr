import { IArticle } from '@/utils'
import api from '@/utils/api'
import http from '@/utils/http'
import Prisma from '@/utils/prisma'
import { Input } from '@nextui-org/react'
import '@uiw/react-markdown-preview/markdown.css'
import '@uiw/react-md-editor/markdown-editor.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SendButton } from './icon/SendButton'
import { SendIcon } from './icon/SendIcon'
const prisma = new Prisma()

interface IProps {
  article: IArticle
}
/**
 * SSR 渲染 控制台输出
 * @param params 接受动态参数 params:{ id: 2 }
 * @returns
 */
export async function getServerSideProps({ params }: { params: any }) {
  // 获取文章
  let article = await prisma.article.findFirst({
    where: {
      id: +params.id,
    },
    include: {
      User: true,
    },
  })

  //   返回个 props 在下面可以用
  return {
    props: {
      article: JSON.parse(JSON.stringify(article)),
    },
  }
}

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

const ModifyEditor: { ({ article }: IProps): JSX.Element; layout: any } = ({
  article,
}: IProps) => {
  const { push, query } = useRouter()
  const articleId = query.id
  //  这里的id 是 articleId
  // TODO 从query里拿到 {id: '1'}
  // 文章内容
  // TODO 直接赋值
  const [value, setValue] = useState(article.content || 'hello')
  // 标题
  console.log(article.title)
  const [title, setTitle] = useState(article.title || '')
  // 发布
  const handleUpdate = async () => {
    if (!title) {
      alert('标题为空')
    }

    let res = await http.post(api.update, { articleId, title, content: value })
    console.log(res)
    articleId ? push(`/article/${articleId}`) : push('/')
  }

  const handleContentChange = (content:any) => {
    setValue(content)
  }

  return (
    <div>
      <Input
        fullWidth
        clearable
        contentRightStyling={false}
        label="文章标题"
        placeholder="Type your title..."
        onChange={(e) => setTitle(e.target.value)}
        onContentClick={handleUpdate}
        value={title}
        contentRight={
          <SendButton>
            <SendIcon
              filled={undefined}
              size={undefined}
              height={undefined}
              width={undefined}
              label={undefined}
              className={undefined}
            />
          </SendButton>
        }
      />
      <MDEditor height={600} value={value} onChange={handleContentChange} />
    </div>
  )
}
// 配置为 null 不显示header footer 在_app里判断
ModifyEditor.layout = null
export default ModifyEditor
