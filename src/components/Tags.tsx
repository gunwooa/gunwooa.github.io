import React from 'react'

import { css } from '@emotion/react'

import { colors } from 'styles'

type TagsProps = {
  tags: string[]
  size?: 'small' | 'medium' | 'large'
}

const SIZE = {
  margin: {
    small: '0 0.4rem 0.4rem 0',
    medium: '0 0.6rem 0.6rem 0',
    large: '0 0.8rem 0.8rem 0',
  },
  padding: {
    small: '0.4rem 0.8rem',
    medium: '0.6rem 1.2rem',
    large: '0.8rem 1.6rem',
  },
  borderRadius: {
    small: '1.2',
    medium: '1.4',
    large: '1.6',
  },
  fontSize: {
    small: '1.2',
    medium: '1.4',
    large: '1.6',
  },
}

const Tags: React.VFC<TagsProps> = ({ tags, size = 'small' }) => {
  if (tags.length === 0) return null

  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
      `}
    >
      {tags.map(tag => (
        <span
          key={tag}
          className="tag"
          css={css`
            margin: ${SIZE.margin[size]};
            padding: ${SIZE.padding[size]};
            border-radius: ${SIZE.borderRadius[size]}rem;
            font-size: ${SIZE.fontSize[size]}rem;
            font-weight: 600;
            color: ${colors.white};
          `}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

export default Tags
