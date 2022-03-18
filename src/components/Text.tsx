import React from 'react'

type TextProps = {
  text: string
}

const Text: React.VFC<TextProps> = function ({ text }) {
  return <div>{text}</div>
}

export default Text
