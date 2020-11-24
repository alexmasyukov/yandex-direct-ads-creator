import React, { FC } from 'react'
import { InputNumber } from 'antd'
import { normalize } from 'utils/normalize'

interface Keyword {
  id: string
  text: string
}

const keywords = [{ id: 'id1', text: 'купить цветы мать их' }]

console.log(normalize<Keyword>(keywords))

export const Ads: FC = () => {
  const onChange = (): void => {}

  return (
    <div>
      <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
    </div>
  )
}
