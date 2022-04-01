---
title: 'Next 프로젝트에서 Google Analytics 적용하기'
date: '2021-08-31'
category: 'Next'
summary: 'Next 프로젝트에서 react-ga 라이브러리 없이 Google Analytics를 적용하고 웹 사이트 조회수를 알아보는 방법에 대해 정리했습니다.'
thumbnail: './images/google-analytics.png'
---

# 💡 들어가며

> Next 프로젝트에서 react-ga 라이브러리 없이 **Google Analytics를 적용하고 웹 사이트 조회수를 알아보는 방법**에 대해 정리했습니다.
>
> React 프로젝트에서 GA를 적용할 때 `react-ga` 라이브러리를 가장 많이 사용한다고 합니다.
>
> 그런데 GA 추적 코드 형식이 `UA-XXXXXXXXX-X`에서 `G-XXXXXXXXXX`으로 변경된 후 `react-ga`에서 최신 추적 코드 형식을 지원하지 않고 있습니다.
>
> 따라서 라이브러리 없이 GA를 적용하고 총 5단계로 정리했습니다.
>
> `Next` 프로젝트이며 `TypeScript`를 사용했습니다. 배포 환경은 `Vercel`입니다.
>
> 이번에 릴리즈한 colfume에 대해서도 많은 관심 부탁드립니다. 😊
>
> - [colfume :: 색으로 찾는 나만의 향기](https://www.colfume.co.kr/)
>
> - [colfume GitHub Repository](https://github.com/mnxmnz/colfume-frontend)

<hr>

## [1] .env.local 파일에 Google Analytics 추적 코드 작성하기

`.env.local` 파일에 GA 추적 코드를 작성하기 전, 주의하실 점이 있습니다.

> 바로 `.gitignore` 파일에 `.env.local` 파일이 적혀있는지 확인하는 것입니다.

`.gitignore` 파일에 기본적으로 `.env.local` 파일이 적혀있지만, 실수로 `.env.local` 파일을 commit 할 일 없도록 다시 한번 확인하시는 것을 추천합니다.

GA 추적 코드를 "code"라고 할 때, **.env.local** 파일에 다음과 같이 작성해주시면 됩니다.

```text
NEXT_PUBLIC_GOOGLE_ANALYTICS="code"
```

<hr>

## [2] \_document.tsx 파일에 Google Analytics Code 추가하기

`pages` 폴더 `_document.tsx` 파일에 다음과 같이 코드를 추가하면 GA 추적 코드를 설정할 수 있습니다.

JavaScript 프로젝트에서도 같은 코드를 작성해주시면 됩니다.

**pages/\_document.tsx**

```tsx
return (
  <Html>
    <Head>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
        });
      `,
        }}
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)
```

<hr>

## [3] 조회수를 측정하는 함수 생성하기

`lib/ga` 폴더 `index.ts` 파일에 함수를 생성합니다.

TypeScript에서 `window` 객체에 `property`를 추가할 때 타입을 정의하지 않으면 에러가 발생합니다.

다양한 방법으로 에러를 해결할 수 있지만, 그중 전역 타입을 확장해서 해결하는 방법을 사용했습니다.

**lib/ga/index.ts**

```ts
declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void
  }
}

export const pageview = url => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  })
}
```

JavaScript 프로젝트에서는 타입 정의 부분을 제외하고 다음과 같이 작성하시면 됩니다.

**lib/ga/index.js**

```js
export const pageview = url => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  })
}
```

<hr>

## [4] 조회수 측정하기

`pages` 폴더 `_app.tsx` 파일에 다음과 같이 코드를 추가하면 페이지 조회수를 측정할 수 있습니다.

**pages/\_app.tsx**

```tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'

import * as ga from '../lib/ga'

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = url => {
      ga.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}

export default App
```

JavaScript 프로젝트에서는 AppProps 부분을 제외하고 다음과 같이 작성하시면 됩니다.

**pages/\_app.jsx**

```js
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import * as ga from '../lib/ga'

function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = url => {
      ga.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}

export default App
```

<hr>

## [5] 배포 설정에서 환경 변수 추가하기

`.env.local` 파일에 작성한 GA 추적 코드를 배포 환경에 추가해야 합니다.

vercel 배포 환경에서는 `Settings > Environment Variables` 항목 중 NAME, VALUE를 작성해야 합니다.

NAME에는 `NEXT_PUBLIC_GOOGLE_ANALYTICS`를, VALUE에는 `GA 추적 코드`를 작성하시면 됩니다.

1번 NEXT_PUBLIC_GOOGLE_ANALYTICS="code"에서 작성한 "code" 값과 같습니다.

![vercel](https://images.velog.io/images/mnz/post/22c0a310-86d8-44db-b544-9eb623a56be9/image.png)

<hr>

# 👏 마치며

> 이렇게 5단계까지 완료하면 Google Analytics에서 사이트 조회수를 측정할 수 있습니다. 🤗
>
> 사용자가 입력한 검색어와 같은 이벤트 측정 기능 생성 방법이 궁금하시다면 [Add Google Analytics to your Next.js application in 5 easy steps](https://mariestarck.com/add-google-analytics-to-your-next-js-application-in-5-easy-steps/)에서 상세 내용을 확인하시는 걸 추천합니다!

<hr>

### 참고 자료 📩

- [Add Google Analytics to your Next.js application in 5 easy steps](https://mariestarck.com/add-google-analytics-to-your-next-js-application-in-5-easy-steps/)

- [Typescript에서 window 객체에 property 추가하기](https://velog.io/@kineo2k/Typescript에서-window-객체에-property-추가하기)
