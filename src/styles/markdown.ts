import { css } from '@emotion/react'

import { colors, mobileMediaQuery } from 'styles'

export const markdownStyle = css`
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  width: 100%;
  word-wrap: break-word;

  // Markdown Style
  line-height: 1.8;
  font-weight: 400;
  color: ${colors.black};

  h1,
  h2,
  h3 {
    font-weight: 700;
    line-height: 1.2;
  }

  h1 {
    margin-top: 5rem;
    margin-bottom: 2.5rem;

    ${mobileMediaQuery} {
      margin-top: 3rem;
      margin-bottom: 1.5rem;
    }
  }

  h2 {
    margin-top: 4.4rem;
    margin-bottom: 2.2rem;

    ${mobileMediaQuery} {
      margin-top: 2.6rem;
      margin-bottom: 1.3rem;
    }
  }

  h3 {
    margin-top: 3.6rem;
    margin-bottom: 1.8rem;

    ${mobileMediaQuery} {
      margin-top: 2.2rem;
      margin-bottom: 1.1rem;
    }
  }

  hr + h1,
  hr + h2,
  hr + h3 {
    margin-top: 0;
  }

  h1 {
    font-size: 3rem;

    ${mobileMediaQuery} {
      font-size: 2rem;
    }
  }

  h2 {
    font-size: 2.4rem;

    ${mobileMediaQuery} {
      font-size: 1.6rem;
    }
  }

  h3 {
    font-size: 1.8rem;

    ${mobileMediaQuery} {
      font-size: 1.4rem;
    }
  }

  p,
  ul,
  ol,
  li,
  em,
  strong,
  u,
  del,
  a {
    font-size: 1.6rem;

    ${mobileMediaQuery} {
      font-size: 1.4rem;
    }
  }

  blockquote {
    margin: 2.7rem 0;
    padding: 0.5rem 1.5rem;
    border-left: 0.4rem solid ${colors.blue100};
    background-color: ${colors.gray50};

    strong {
      font-weight: 700;
    }

    ${mobileMediaQuery} {
      margin: 2rem 0;
      padding: 0.3rem 1.2rem;
    }
  }

  ol,
  ul {
    margin-top: 0;
    margin-bottom: 0;
    padding: 0 0 0 3rem;

    ${mobileMediaQuery} {
      padding: 0 0 0 2.4rem;
    }
  }

  ul {
    list-style-type: disc;
  }

  ul ul {
    list-style-type: circle;
  }

  ul ul ul {
    list-style-type: square;
  }

  ol {
    list-style-type: decimal;
  }

  hr {
    border: 0.1rem solid ${colors.gray400};
    margin: 3rem 0;

    ${mobileMediaQuery} {
      border: 0.05rem solid ${colors.gray400};
      margin: 2.4rem 0;
    }
  }

  a {
    font-weight: 700;
    color: ${colors.blue100};
  }

  strong {
    font-weight: 700;
  }

  img {
    width: 100%;
    margin: 1rem 0;
    border-radius: 1rem;
  }

  table {
    margin: 1rem 0;
  }

  thead {
    border-bottom: 0.4rem solid ${colors.gray700};

    ${mobileMediaQuery} {
      border-bottom: 0.2rem solid ${colors.gray700};
    }
  }

  tr {
    /*  */
  }

  th,
  td {
    padding: 1.2rem;
    border: 0.2rem solid ${colors.gray700};
    font-size: 1.6rem;

    ${mobileMediaQuery} {
      padding: 0.8rem;
      border: 0.1rem solid ${colors.gray700};
      font-size: 1.4rem;
    }
  }

  .deckgo-highlight-code-carbon {
    margin: 1.6rem 0;
    border-radius: 0.8rem;
    font-size: 1.6rem;

    ${mobileMediaQuery} {
      font-size: 1.4rem;
    }
  }

  code {
    padding: 0.2rem 0.6rem;
    border-radius: 0.4rem;
    font-size: 80%;
    font-weight: 600;
    color: ${colors.red100};
    background: ${colors.gray200};
  }
`
