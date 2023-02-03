import { Text, useSSR } from '@nextui-org/react'
import { useEffect, useState } from 'react'

interface Props {
  time: number
  onEnd: Function
}
const CountDown = ({ time, onEnd }: Props) => {
  const [count, setCount] = useState(time || 60)
  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => {
        if (count === 0) {
          clearInterval(id)
          // 调用onEnd告诉父组件
          onEnd && onEnd()
          return count
        }
        return count - 1
      })
      return () => {
        // 页面卸载时 清空定时器，防止内存泄漏
        clearInterval(id)
      }
    }, 1000)
  }, [time, onEnd])
  return <Text color='primary' css={{paddingRight:'20px'}}>{count}</Text>
}

export default CountDown
