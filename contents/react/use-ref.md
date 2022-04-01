---
title: 'useRef로 DOM 선택하고 변수 관리하기'
date: '2021-04-21'
category: 'React'
summary: '벨로퍼트와 함께하는 모던 리액트의 "useRef 로 특정 DOM 선택하기", "useRef 로 컴포넌트 안의 변수 만들기"와 "배열에 항목 추가하기"를 읽고 정리한 글입니다.'
thumbnail: './images/use-ref.png'
---

# 💡 들어가며

> [벨로퍼트와 함께하는 모던 리액트](https://react.vlpt.us/)의 [useRef 로 특정 DOM 선택하기](https://react.vlpt.us/basic/10-useRef.html), [useRef 로 컴포넌트 안의 변수 만들기](https://react.vlpt.us/basic/12-variable-with-useRef.html)와 [배열에 항목 추가하기](https://react.vlpt.us/basic/13-array-insert.html)를 읽고 정리한 글입니다.
>
> 사용자에게 이름과 이메일을 입력받는 예제를 사용했습니다.
>
> 이 포스팅에서 다루지 않은 상세 설명은 [input 값 불변성 지키며 객체로 관리하기](https://mnxmnz.github.io/react/input-immutable/)에서 확인하실 수 있습니다.

<hr>

# 📝 React에서 DOM 선택하는 방법

> JavaScript 를 사용할 때는, 특정 DOM 을 선택해야 하는 상황에 getElementById, querySelector 같은 DOM Selector 함수를 사용해서 DOM 을 선택합니다.
>
> 리액트에서는 DOM 을 선택할 때 ref 를 사용합니다.
>
> 함수형 컴포넌트에서 ref 를 사용할 때는 useRef 라는 Hook 함수를 사용하고 클래스형 컴포넌트에서는 콜백 함수를 사용하거나 React.createRef 라는 함수를 사용합니다.
>
> 이 포스팅에서는 함수형 컴포넌트의 useRef 를 사용합니다.

<hr>

## 🎯 useRef로 DOM 선택하는 방법

> useRef() 를 사용하여 Ref 객체를 만들고, 이 객체를 선택하고 싶은 DOM 에 ref 값으로 설정합니다.
>
> 그러면, Ref 객체의 .current 값은 DOM 을 가리키게 됩니다.
>
> 이 포스팅에서 다룰 예제에서는 onReset 함수에서 input 에 포커스를 하는 focus() DOM API 를 호출해주었습니다.
>
> 초기화 버튼을 클릭했을 때 이름 input 에 포커스가 잡히도록 useRef 를 사용하여 기능을 구현했습니다.

## ✨ 객체 생성하기

> useRef 를 통해 nameInput 이라는 객체를 생성했습니다.

```jsx
const nameInput = useRef()
```

## 📑 DOM API 사용 방법

> current 가 DOM을 가리키고 있으므로 DOM API 중 하나인 focus 를 사용했습니다.

```jsx
nameInput.current.focus()
```

## 📲 DOM 설정을 통해 DOM에 직접 접근하기

> nameInput 객체를 선택하고 싶은 DOM 에 설정하여 직접 접근할 수 있습니다.

```jsx
<input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput} />
```

### 🔎 InputSample.js Code

```jsx
import React, { useState, useRef } from 'react'

function InputSample() {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: '',
  })

  const nameInput = useRef()

  const { name, nickname } = inputs

  const onChange = e => {
    const { value, name } = e.target

    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const onReset = () => {
    setInputs({
      name: '',
      nickname: '',
    })

    nameInput.current.focus()
  }

  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput} />
      <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname} />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  )
}

export default InputSample
```

### 💻 실행 결과

> 초기화 버튼을 클릭했을 때 이름 input 에 포커스가 잡힙니다.

![img](https://images.velog.io/images/mnz/post/88cd8d00-fd6a-40cc-af74-54422073ce6b/image.png)

<hr>

# 🔢 useRef로 컴포넌트 안에서 변수 관리하기

> useRef Hook 은 DOM 을 선택하는 용도 외에도, 다른 용도가 한 가지 더 있습니다.
>
> 컴포넌트 안에서 조회 및 수정할 수 있는 변수를 관리하는 것입니다.
>
> useRef 로 관리하는 변수는 값이 바뀐다고 해서 컴포넌트가 리렌더링되지 않습니다.
>
> 리액트 컴포넌트에서의 상태는 상태를 바꾸는 함수를 호출하고 나서 그다음 렌더링 이후로 업데이트된 상태를 조회할 수 있지만, useRef 로 관리하는 변수는 설정 후 바로 조회할 수 있습니다.
>
> 이 변수를 사용하여 다음과 같은 값을 관리할 수 있습니다.
>
> - setTimeout, setInterval 을 통해서 만들어진 id
> - 외부 라이브러리를 사용하여 생성된 인스턴스
> - scroll 위치
>
> 새로운 값을 입력받아 배열에 추가하는 예제를 통해 알아보겠습니다.

<hr>

## 💭 useRef의 파라미터

> useRef() 를 사용할 때 파라미터를 넣어주면, 이 값이 .current 값의 기본값이 됩니다.
>
> 그리고 이 값을 수정할 때는 .current 값을 수정하면 되고 조회할 때는 .current 를 조회하면 됩니다.

```jsx
const nextId = useRef(4)
```

<hr>

# 💫 배열 값 변경하기

> 배열 값을 변경할 때에는 객체와 마찬가지로, 불변성을 지켜주어야 합니다.
>
> 배열의 push, splice, sort 등의 함수를 사용하면 안 됩니다.
>
> 만약에 사용해야 한다면, 기존의 배열을 한번 복사하고 나서 사용해야 합니다.
>
> 불변성을 지키면서 배열에 새 항목을 추가하는 방법은 두 가지가 있습니다.
>
> 첫 번째는 spread 연산자를 사용하는 것입니다.
>
> 두 번째는 concat 함수를 사용하는 것입니다.

<hr>

## 🐥 spread 연산자를 사용하기

> 기존의 배열을 수정하지 않고, 새로운 원소가 추가된 새로운 배열을 만들어줍니다.
>
> ...users 를 통해 기존 배열을 복사해서 새 배열을 생성했습니다.
>
> user 는 복사한 배열에 새 항목을 추가하기 위해 작성했습니다.

```jsx
setUsers([...users, user])
```

## 🔗 concat 함수 사용하기

> concat 에서도 기존의 배열을 수정하지 않고, 새로운 원소가 추가된 새로운 배열을 만들어줍니다.
>
> 여러 개의 배열을 하나의 배열로 합칠 때 사용합니다.
>
> concat 뒤에 값은 배열이 아닌 값도 넣을 수 있습니다.
>
> 새로운 배열을 만든 후 맨 뒤에 user 항목을 추가하는 코드입니다.

```jsx
setUsers(users.concat(user))
```

### 🔎 App.js Code

> 배열에 새 항목을 추가할 때, 새 항목에서 사용할 고유 id 를 관리하는 용도로 useRef 를 사용했습니다.

```jsx
import React, { useRef, useState } from 'react'
import UserList from './UserList'
import CreateUser from './CreateUser'

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  })

  const { username, email } = inputs

  const onChange = e => {
    const { name, value } = e.target

    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
    },
  ])

  const nextId = useRef(4)

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    }

    setUsers(users.concat(user))

    setInputs({
      username: '',
      email: '',
    })

    nextId.current += 1
  }

  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} />
    </>
  )
}

export default App
```

### 🔎 CreateUser.js Code

```jsx
import React from 'react'

function CreateUser({ username, email, onChange, onCreate }) {
  return (
    <div>
      <input name="username" placeholder="계정명" onChange={onChange} value={username} />
      <input name="email" placeholder="이메일" onChange={onChange} value={email} />
      <button onClick={onCreate}>등록</button>
    </div>
  )
}

export default CreateUser
```

### 💻 실행 결과

![img](https://images.velog.io/images/mnz/post/974b8460-a0bc-4680-9ed7-353b056c8adc/%EB%85%B9%ED%99%94_2021_04_22_21_28_08_421.gif)

<hr>

# 👏 마치며

> useRef로 DOM 선택하고 변수 관리하는 방법에 대해 정리했습니다.
>
> 추가로 배열의 값을 변경할 때 사용하는 spread 연산자와 concat 함수에 대해서도 알아봤습니다.
>
> useRef 관련 추가 내용은 [useRef 로 특정 DOM 선택하기](https://react.vlpt.us/basic/10-useRef.html), [useRef 로 컴포넌트 안의 변수 만들기](https://react.vlpt.us/basic/12-variable-with-useRef.html)와 [배열에 항목 추가하기](https://react.vlpt.us/basic/13-array-insert.html) 링크에서 확인하실 수 있습니다.

<hr>

### 참고 자료 📩

- [useRef 로 특정 DOM 선택하기](https://react.vlpt.us/basic/10-useRef.html)

- [useRef 로 컴포넌트 안의 변수 만들기](https://react.vlpt.us/basic/12-variable-with-useRef.html)

- [배열에 항목 추가하기](https://react.vlpt.us/basic/13-array-insert.html)
