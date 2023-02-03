import { Tag } from '@/utils'
import api from '@/utils/api'
import http from '@/utils/http'
import Prisma from '@/utils/prisma'
import { Input } from '@nextui-org/react'
import '@uiw/react-markdown-preview/markdown.css'
import '@uiw/react-md-editor/markdown-editor.css'
import { Select } from 'antd'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SendButton } from './icon/SendButton'
import { SendIcon } from './icon/SendIcon'
const prisma = new Prisma()

/**
 * SSR 渲染 控制台输出
 * @param params
 * @returns
 */
export async function getServerSideProps() {
  // 获取文章
  let tags = await prisma.tag.findMany()
  //   返回个 props 在下面可以用
  return {
    props: {
      tags,
    },
  }
}

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

const NewEditor = ({ tags }: { tags: Tag[] }) => {
  const { push } = useRouter()
  // 文章内容
  const [value, setValue] = useState('**Hello world!!!**')
  // 标题
  const [title, setTitle] = useState('')
  // 标签
  const [allTags, setAllTags] = useState(tags || [])
  const [tagIds, setTagIds] = useState([])
  // 发布
  const handlePublish = async () => {
    if (!title) {
      alert('标题为空')
      return
    }
    let res = await http.post(api.publish, { title, content: value, tagIds })
    console.log(res)
    push('/')
  }
  // 标签
  const handleTagChange = (value: []) => {
    setTagIds(value)
  }

  return (
    <div>
      {/* <Button
        color="primary"
        auto
        css={{
          margin: '10px 0',
        }}
      >
        添加文章
      </Button> */}

      <Input
        fullWidth
        clearable
        contentRightStyling={false}
        label="文章标题"
        placeholder="Type your title..."
        onChange={(e) => setTitle(e.target.value)}
        onContentClick={handlePublish}
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
      <Select
        style={{ width: '100%', padding: '10px 0' }}
        onChange={handleTagChange}
        mode="tags"
        allowClear
        placeholder="请选择标签"
      >
        {allTags.map((item) => (
          <Select.Option key={item.id} value={item.id}>
            {item.title}
          </Select.Option>
        ))}
      </Select>
      <MDEditor height={600} value={value} onChange={setValue} />
    </div>
  )
}
// TODO NewEditor.layout
// 配置为 null 不显示header footer 在_app里判断
// NewEditor.layout = null
export default NewEditor
