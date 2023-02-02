import { useStore } from '@/store'
import api from '@/utils/api'
import http from '@/utils/http'
// 用于渲染图标
// import * as ANTD_ICONS from '@ant-design/icons'
import { createFromIconfontCN } from '@ant-design/icons'
import { Button, Tabs, TabsProps } from 'antd'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'

// TODO 使用iconfont字体库图标
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3221129_um5wbhqwt3.js',
});

const TabContent = (row: any) => {
  const { data } = row
  const followOrAll = data.followTags ? data.followTags : data.allTags
  const store = useStore()
  const { id: userId } = JSON.parse(store?.user?.userInfo)
  /**
   * 取关
   * @param id
   */
  function handleUnFollow(id: number): void {
    throw new Error('Function not implemented.')
  }

  /**
   * 关注
   * @param id
   */
  function handleFollow(id: number): void {
    console.log(id)
    http.post('')
  }
  return (
    <div className={styles.tags}>
      {followOrAll?.map((tag: any) => (
        <div key={tag?.title} className={styles.tagWrapper}>
          {/* TODO 渲染 图标 */}
          {/* <div>{(ANTD_ICONS as any)[tag?.icon]?.render()}</div> */}
          <IconFont type={tag?.icon} />
          <div className={styles.title}>{tag.title}</div>
          <div>
            {tag?.follow_count} 有 {tag?.article_count || 0} 篇文章
          </div>

          {tag?.users?.find(
            (user: any) => Number(user?.id) === Number(userId)
          ) ? (
            <Button onClick={() => handleUnFollow(tag?.id)}>已关注</Button>
          ) : (
            <Button
              type="primary"
              color="primary"
              onClick={() => handleFollow(tag?.id)}
            >
              关注
            </Button>
          )}

          {/* 此行报错 find改成map会有小bug */}
          {/* {tag.users.map((u:any) => (u?.id === userId ? <Button>已关注</Button> : <Button>+关注</Button>))} */}
        </div>
      ))}
    </div>
  )
}

const Tag: NextPage = () => {
  const store = useStore()
  const [items, setItems] = useState<any[] | TabsProps[]>([])

  // TODO CSR 客户端渲染
  useEffect(() => {
    http.get(api.getTag).then((res) => {
      const { followTags = [], allTags = [] } = res.data
      setItems([
        { label: '已关注', followTags },
        { label: '全部', allTags },
      ])
    })
  }, [])

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={items.map((item, index) => {
          return {
            label: `${item.label}`,
            key: String(index),
            children: <TabContent data={item} />,
          }
        })}
      />
    </div>
  )
}

// http://localhost:3000/tag
export default Tag
