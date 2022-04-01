---
title: 'input 값 불변성 지키며 객체로 관리하기'
date: '2021-04-20'
category: 'React'
summary: '벨로퍼트와 함께하는 모던 리액트의 "input 상태 관리하기"와 "여러개의 input 상태 관리하기"를 읽고 정리한 글입니다.'
thumbnail: './images/input-immutable.png'
---

# 💡 들어가며

> [벨로퍼트와 함께하는 모던 리액트](https://react.vlpt.us/)의 [input 상태 관리하기](https://react.vlpt.us/basic/08-manage-input.html)와 [여러개의 input 상태 관리하기](https://react.vlpt.us/basic/09-multiple-inputs.html)를 읽고 정리한 글입니다.
>
> **input 관리하는 방법**, **불변성을 지키며 여러 개의 input 객체로 관리하는 방법**에 대해 정리했습니다.
>
> 사용자에게 이름과 닉네임을 입력받는 예제를 사용했습니다.

<hr>

# 📝 useState의 개념

> 컴포넌트에서 보여줘야 하는 내용이 사용자 인터랙션에 따라 바뀌어야 할 때 useState 를 사용할 수 있습니다.
>
> Hooks 라는 기능이 도입되면서 함수형 컴포넌트에서도 상태를 관리할 수 있게 되었습니다.
>
> useState 는 리액트의 Hooks 중 하나입니다.

<hr>

## 🎯 이벤트 등록하기

> 이벤트에 등록하는 함수에서는 이벤트 객체 e 를 파라미터로 받아와서 사용할 수 있습니다.
>
> 이 객체의 e.target 은 이벤트가 발생한 DOM 인 input DOM 을 가리키게 됩니다.
>
> 이 DOM 의 value 값, 즉 e.target.value 를 조회하면 현재 input 에 입력한 값이 무엇인지 알 수 있습니다.
>
> 값 하나를 입력받는 InputSample 컴포넌트를 통해 알아보겠습니다.

### 🔎 InputSample.js Code

> e.target.value 로 input 값에 접근한 후 setText 를 통해 text 값을 업데이트했습니다.

```jsx
import React, { useState } from 'react'

function InputSample() {
  const [text, setText] = useState('')

  const onChange = e => {
    setText(e.target.value)
  }

  const onReset = () => {
    setText('')
  }

  return (
    <div>
      <input onChange={onChange} value={text} />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: {text}</b>
      </div>
    </div>
  )
}

export default InputSample
```

### 💻 실행 결과

> 입력한 값을 값: {text} 부분에서 확인할 수 있습니다.

![img](https://images.velog.io/images/mnz/post/587039a7-c908-4675-bba9-ecb8a04843f1/image.png)

<hr>

# 📖 여러 개의 input 관리하는 방법

> input 의 개수가 여러 개가 됐을 때는, useState 를 여러 번 사용하고 onChange 도 여러 개 만들어서 구현할 수 있습니다.
>
> 이 글에서 소개할 더 좋은 방법은, input 에 name 을 설정하고 이벤트가 발생했을 때 이 값을 참조하는 것입니다.
>
> 또한, useState 에서는 문자열이 아니라 객체 형태의 상태를 관리해주어야 합니다.

<hr>

## 📢 초깃값을 객체로 선언하기

> useState 함수를 사용하며 초깃값을 선언할 때, 객체로 선언하여 사용합니다.

```jsx
const [inputs, setInputs] = useState({
  name: '',
  nickname: '',
})
```

## ✨ 비구조화 할당으로 값 추출해서 사용하기

> name 값과 nickname 값을 비구조화 할당을 통해 inputs 에서 추출해서 사용할 수 있습니다.
>
> 필수적인 과정은 아니지만, 추후 name 과 nickname 값에 편하게 접근하기 위해 작성한 코드입니다.
>
> 이 과정을 생략하고 name 값과 nickname 값에 접근하려면 inputs.name inputs.nickname 과 같이 접근할 수 있습니다.

```jsx
const { name, nickname } = inputs
```

> 같은 방법으로 e.target.name 과 e.target.value 를 추출했습니다.

```jsx
const { name, value } = e.target
```

## ✍ 리액트 상태에서 불변성 지키며 객체 수정하기

> 리액트 상태에서 객체를 수정해야 할 때는

```jsx
inputs[name] = value
```

> 이런 식으로 직접 수정하지 않고, 새로운 객체를 생성합니다.
>
> 새로운 객체에 변화를 주고, 이를 상태로 사용합니다.
>
> 이러한 작업을, "불변성을 지킨다." 라고 부릅니다.

```jsx
setInputs({
  ...inputs,
  [name]: value,
})
```

> ...inputs 를 통해 기존의 inputs 객체를 복사한 후 [name]: value 에서 name 키를 가진 값을 value 로 설정했습니다.

## 🧐 새로운 객체를 생성한 코드에 대해 자세히 알아보기

> 위 코드에서 사용한 name 과 value 는 위에서 비구조화 할당을 통해 추출한 e.target.name 과 e.target.value 입니다.

```jsx
const { name, value } = e.target
```

> e.target.name 에 해당하는 값은 input name="name" 또는 input name="nickname" 을 판단할 수 있습니다.

```jsx
<input name="name" placeholder="이름" onChange={onChange} value={name} />
<input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname} />
```

> 따라서 name 값을 key 값으로 사용하고 해당하는 value 값을 onChange 함수 setInputs 에 사용합니다.

## ⭐ 리액트에서 불변성을 지키는 이유

> 불변성을 지켜주어야만 리액트 컴포넌트에서 상태가 업데이트됐음을 감지할 수 있고 이에 따라 필요한 리렌더링이 진행됩니다.
>
> 기존 상태를 직접 수정하게 되면, 값을 바꿔도 리렌더링이 되지 않습니다.
>
> 리액트에서는 불변성을 지켜주어야만 컴포넌트 업데이트 성능 최적화를 제대로 할 수 있습니다.

### 🔎 InputSample.js Code

```jsx
import React, { useState } from 'react'

function InputSample() {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: '',
  })

  const { name, nickname } = inputs

  const onChange = e => {
    const { name, value } = e.target

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
  }

  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} />
      <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname} />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>{name} </b>({nickname})
      </div>
    </div>
  )
}

export default InputSample
```

### 💻 실행 결과

![img](https://images.velog.io/images/mnz/post/a5a7d597-ac76-4e2f-bc5e-7eb8fc5e6257/image.png)

<hr>

# 👏 마치며

> 불변성을 지키며 여러 개의 input 객체로 관리하는 방법에 대해 정리했습니다.
>
> 그 과정에서 초깃값을 객체로 선언하는 방법, 비구조화 할당으로 값 추출해서 사용하는 방법, 리액트 상태에서 불변성 지키며 객체 수정하는 방법 및 리액트에서 불변성을 지키는 이유에 대해 알아봤습니다.
>
> input 관련 추가 내용은 [input 상태 관리하기](https://react.vlpt.us/basic/08-manage-input.html)와 [여러개의 input 상태 관리하기](https://react.vlpt.us/basic/09-multiple-inputs.html) 링크에서 확인하실 수 있습니다.

<hr>

### 참고 자료 📩

- [input 상태 관리하기](https://react.vlpt.us/basic/08-manage-input.html)

- [여러개의 input 상태 관리하기](https://react.vlpt.us/basic/09-multiple-inputs.html)
