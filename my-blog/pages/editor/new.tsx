import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import { useState } from 'react'
import { Container, Input } from '@nextui-org/react'
import { SendIcon } from './icon/SendIcon'
import { SendButton } from './icon/SendButton'
import http from '@/utils/http'
import api from '@/utils/api'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

const NewEditor: { (): JSX.Element; layout: any } = () => {
  // 文章内容
  const [value, setValue] = useState('**Hello world!!!**')
  // 标题
  const [title, setTitle] = useState('')
  // 发布
  const handlePublish = async () => {
    if (!title) {
      alert('标题为空')
    }
    let res = await http.post(api.publish, { title, content: value })
    
  }

  return (
    <Container fluid>
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
      <MDEditor height={600}  value={value} onChange={setValue} />
    </Container>
  )
}
// 配置为 null 不显示header footer 在_app里判断
NewEditor.layout = null
export default NewEditor
