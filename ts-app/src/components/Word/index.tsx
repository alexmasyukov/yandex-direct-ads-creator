import React, { FC } from 'react'

interface WordProps {
  disabled: boolean
  value: string
  onClick?: React.MouseEventHandler<HTMLSpanElement>
}

export const Word: FC<WordProps> = ({
  disabled = false,
  value = '',
  onClick
}) => {
  const style = { cursor: 'pointer' }
  const disabledStyle = disabled
    ? { ...style, textDecoration: 'line-through' }
    : style
  return (
    <div>
      <span style={disabledStyle} onClick={onClick}>
        {value}
      </span>
    </div>
  )
}
