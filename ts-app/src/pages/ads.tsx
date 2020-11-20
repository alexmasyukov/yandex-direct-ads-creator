import React, { FC } from 'react'
import { InputNumber } from 'antd'

export const Ads: FC = () => {
  const onChange = (): void => {}

  return (
    <div>
      <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
    </div>
  )
}
