---
title: '최적화를 고려하며 useState 사용하기'
date: '2021-04-18'
category: 'React'
summary: '벨로퍼트와 함께하는 모던 리액트의 "useState 를 통해 컴포넌트에서 바뀌는 값 관리하기"를 읽고 정리한 글입니다.'
thumbnail: './images/use-state.png'
---

# 💡 들어가며

> [벨로퍼트와 함께하는 모던 리액트](https://react.vlpt.us/)의 [useState 를 통해 컴포넌트에서 바뀌는 값 관리하기](https://react.vlpt.us/basic/07-useState.html)를 읽고 정리한 글입니다.
>
> 이벤트 함수를 호출할 때 차이, 배열 비구조화 할당 및 **최적화를 고려한 useState 사용 방법**에 대해 정리했습니다.
>
> +1 버튼과 -1 버튼이 있는 Counter 예제를 사용했습니다.

<hr>

# 📝 useState의 개념

> 컴포넌트에서 보여줘야 하는 내용이 사용자 인터랙션에 따라 바뀌어야 할 때 useState 를 사용할 수 있습니다.
>
> Hooks 라는 기능이 도입되면서 함수형 컴포넌트에서도 상태를 관리할 수 있게 되었습니다.
>
> useState 는 리액트의 Hooks 중 하나입니다.

<hr>

## 🎯 이벤트 설정할 때 함수 호출 방법의 차이

> 리액트에서 엘리먼트에게 이벤트를 설정해줄 때에는 on이벤트이름={실행하고 싶은 함수} 형태로 설정해주어야 합니다.
>
> 주의해야 하는 점은, 함수 형태를 넣어주어야 하지, 함수를 다음과 같이 실행하면 안 됩니다.

```jsx
onClick={onIncrease}       // ( O )
onClick={onIncrease()}     // ( X )
```

> 이렇게 하면 렌더링 되는 시점에서 함수가 호출돼버리기 때문입니다.

## 🎯 배열 비구조화 할당을 적용한 useState

> useState 를 사용 할 때는 상태의 기본값을 파라미터로 넣어서 호출해줍니다.
>
> 이 함수를 호출해주면 배열이 반환되는데요, 여기서 첫 번째 원소는 현재 상태, 두 번째 원소는 Setter 함수입니다.
>
> 원래는 아래 코드와 같이 useState 함수를 사용해야 하지만

```jsx
const numberState = useState(0)
const number = numberState[0]
const setNumber = numberState[1]
```

> 배열 비구조화 할당을 통해 각 원소를 추출하여 아래 코드와 같이 useState를 사용할 수 있습니다.

```jsx
const [number, setNumber] = useState(0)
```

## 🎯 함수형 업데이트로 최적화 고려하기

> Setter 함수를 사용할 때, 기존 값을 어떻게 업데이트할지에 대한 함수를 등록하는 방식으로 값을 업데이트할 수 있습니다.

```jsx
setNumber(prevNumber => prevNumber + 1)
```

```jsx
setNumber(prevNumber => prevNumber - 1)
```

> setNumber 를 사용할 때 그다음 상태를 파라미터로 넣어준 것이 아니라, 값을 업데이트하는 함수를 파라미터로 넣어주었습니다.
>
> 함수형 업데이트는 주로 나중에 컴포넌트를 최적화를 하게 될 때 사용하게 됩니다.

### 🔎 Counter.js Code

> button의 onClick으로 각 함수를 연결해주었습니다.

```jsx
import React, { useState } from 'react'

function Counter() {
  const [number, setNumber] = useState(0)

  const onIncrease = () => {
    setNumber(prevNumber => prevNumber + 1)
  }

  const onDecrease = () => {
    setNumber(prevNumber => prevNumber - 1)
  }

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  )
}

export default Counter
```

### 💻 실행 결과

![img](https://images.velog.io/images/mnz/post/cc0f7897-99bb-489e-a038-41691c92be39/%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202021-04-18%20150005.png)

<hr>

# 👏 마치며

> 이벤트 함수를 호출할 때 차이, 배열 비구조화 할당 및 최적화를 고려한 useState 사용 방법에 대해 정리했습니다.
>
> 함수형 업데이트를 주로 컴포넌트 최적화할 때 사용하는 이유에 대해서는 최적화 포스팅에서 다루겠습니다.
>
> useState 를 통해 컴포넌트에서 바뀌는 값 관리하기 관련 추가 내용은 [useState 를 통해 컴포넌트에서 바뀌는 값 관리하기](https://react.vlpt.us/basic/07-useState.html) 링크에서 확인하실 수 있습니다.

<hr>

### 참고 자료 📩

- [useState 를 통해 컴포넌트에서 바뀌는 값 관리하기](https://react.vlpt.us/basic/07-useState.html)
