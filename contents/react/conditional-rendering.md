---
title: '조건부 렌더링에서 삼항 연산자와 && 연산자 모두 활용하는 방법'
date: '2021-04-18'
category: 'React'
summary: '벨로퍼트와 함께하는 모던 리액트의 "조건부 렌더링"를 읽고 정리한 글입니다.'
thumbnail: './images/conditional-rendering.png'
---

# 💡 들어가며

> [벨로퍼트와 함께하는 모던 리액트](https://react.vlpt.us/)의 [조건부 렌더링](https://react.vlpt.us/basic/06-conditional-rendering.html)을 읽고 정리한 글입니다.
>
> 조건부 렌더링 관련 내용 중 **삼항 연산자**와 **&& 연산자** 적용 코드에 대해 정리했습니다.

<hr>

# 📝 조건부 렌더링의 개념

> 특정 조건에 따라 다른 결과물을 렌더링하는 것을 의미합니다.

<hr>

## 🎯 props 값에 따라 다른 뷰 설정하기

> props 값에 조건부 렌더링을 설정할 때 크게 두 가지로 나눌 수 있습니다.
>
> 1. 특정 뷰를 보여주거나 아예 숨기기
>
> 2. 여러 뷰 중 하나의 뷰를 보여주기
>
> 1번 경우에는 && 연산자를 사용하는 것이, 2번 경우에는 삼항 연산자를 사용하는 것이 바람직합니다.
>
> 예시 코드를 통해 알아보겠습니다.

### 🔎 App.js Code

> App 컴포넌트에서 Hello 컴포넌트로 isSpecial true 값을 보냈습니다.
>
> 첫 번째 Hello 컴포넌트만 isSpecial 값을 true 로 설정하고, 두 번째 컴포넌트는 설정하지 않았습니다.
>
> 참고: props 로 true 값을 줄 때 ={true} 부분은 생략하고 isSpecial 처럼 props 이름만 적어도 같은 결과를 확인할 수 있습니다.

```jsx
import React from 'react'
import Hello from './Hello'
import Wrapper from './Wrapper'

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red" isSpecial={true} />
      <Hello color="pink" />
    </Wrapper>
  )
}

export default App
```

### 🔎 Hello.js Code

> isSpecial 값이 true 라면 <b>\*</b> 를, 그렇지 않다면 null 을 보여줍니다.
>
> 삼항 연산자를 활용했습니다.
>
> 참고: JSX 에서 null, false, undefined 를 렌더링하게 된다면 아무것도 나타나지 않습니다.

```jsx
import React from 'react'

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      {isSpecial ? <b>*</b> : null}
      안녕하세요 {name}
    </div>
  )
}

Hello.defaultProps = {
  name: '이름없음',
}

export default Hello
```

### 💻 실행 결과

> 첫 번째 Hello 컴포넌트는 isSpecial 값이 true 라서 \* 이 보이고
>
> 두 번째 Hello 컴포넌트는 \* 이 없는 것을 확인할 수 있습니다.

![img](https://images.velog.io/images/mnz/post/63f5371f-e48b-456a-bb08-a50584ba5233/%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202021-04-18%20042802.png)

<hr>

## 🎯 && 연산자로 변경하기

> 보통 삼항연산자를 사용한 조건부 렌더링을 주로 특정 조건에 따라 보여줘야 하는 내용이 다를 때 사용합니다.
>
> 지금은 내용이 달라지는 게 아니라, 단순히 특정 조건이 true 이면 보여주고, 그렇지 않다면 숨겨주고 있는데요, 이러한 상황에서는 && 연산자를 사용해서 처리하는 것이 더 간편합니다.

### 🔎 수정 후 Hello.js Code

> 삼항 연산자를 && 연산자로 변경했습니다.

```jsx
import React from 'react'

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      {isSpecial && <b>*</b>}
      안녕하세요 {name}
    </div>
  )
}

Hello.defaultProps = {
  name: '이름없음',
}

export default Hello
```

### 💻 실행 결과

> 간단한 코드로 같은 결과를 확인할 수 있습니다.

![img](https://images.velog.io/images/mnz/post/63f5371f-e48b-456a-bb08-a50584ba5233/%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202021-04-18%20042802.png)

<hr>

# 👏 마치며

> 조건부 렌더링 관련 내용 중 삼항 연산자와 && 연산자 모두 활용하는 방법에 대해 알아봤습니다.
>
> 그동안 주로 조건부 렌더링을 사용했는데, 앞으로는 && 연산자도 적극적으로 활용하여 코드를 간결하게 작성하려고 합니다.
>
> 조건부 렌더링 관련 추가 내용은 [조건부 렌더링](https://react.vlpt.us/basic/06-conditional-rendering.html) 링크에서 확인하실 수 있습니다.

<hr>

### 참고 자료 📩

- [조건부 렌더링](https://react.vlpt.us/basic/06-conditional-rendering.html)
