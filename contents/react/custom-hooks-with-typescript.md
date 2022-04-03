---
title: '커스텀 Hooks 생성 후 TypeScript 타입 지정하기'
date: '2021-09-13'
category: 'React'
summary: 'React 프로젝트에서 사용자의 입력값을 받는 커스텀 Hooks를 생성하고 TypeScript 타입을 지정하는 과정입니다.'
thumbnail: ''
# thumbnail: './images/custom-hooks-with-typescript.png'
---

# 💡 들어가며

> React 프로젝트에서 사용자의 입력값을 받는 **커스텀 Hooks를 생성하고 TypeScript 타입을 지정하는 과정**입니다.
>
> `hooks` 디렉터리를 만들고, 그 안에 `useInput.ts` 파일을 만들었습니다.
>
> 커스텀 Hooks 를 만들 때는 보통 이렇게 `use` 라는 키워드로 시작하는 파일을 만들고 그 안에 함수를 작성한다고 합니다.
>
> 해당 코드를 작성한 [GitHub Repository](https://github.com/mnxmnz/Twitter-Clone-Frontend/blob/main/hooks/useInput.ts) 링크입니다.

<hr>

## [1] 중복 코드 파악하기

커스텀 Hooks 를 생성하기 전, 중복 코드를 먼저 파악했습니다.

로그인 페이지와 회원가입 페이지에서 중복 코드가 발생했습니다.

아래는 로그인 페이지에서 사용자의 아이디와 비밀번호를 입력값을 저장하는 코드입니다.

state 값인 id, password 만 다르고 `setValue(e.target.value)` 로직이 반복되고 있습니다.

**components/LoginForm.tsx**

```tsx
const [id, setId] = useState('')
const [password, setPassword] = useState('')

const onChangeId = useCallback(e => {
  setId(e.target.value)
}, [])

const onChangePassword = useCallback(e => {
  setPassword(e.target.value)
}, [])
```

<hr>

## [2] 원하는 기능을 구현한 커스텀 Hooks 만들기

state 초기값을 `initialValue` 에 저장했습니다.

onChangeForm 함수는 반복 로직인 `setValue(e.target.value)` 기능을 구현한 함수입니다.

**hooks/useInput.ts**

```tsx
import { useState, useCallback } from 'react'

const useInput = initialValue => {
  const [userFormInput, setUserFormInput] = useState(initialValue)

  const onChangeForm = useCallback(e => {
    setUserFormInput(e.target.value)
  }, [])

  return [userFormInput, onChangeForm]
}

export default useInput
```

로그인 페이지에서 `useInput` 을 적용하면 아래와 같이 코드 수를 줄일 수 있습니다. 👍

**components/LoginForm.tsx**

```tsx
const [id, onChangeId] = useInput('')
const [password, onChangePassword] = useInput('')
```

<hr>

## [3] TypeScript 타입 지정하기

커스텀 Hooks 생성 후 타입을 지정하려고 하면 다음과 같은 TS 에러가 발생합니다.

`TS 2488 typescript 반복기를 반환하는 '[Symbol.iterator]()' 메서드가 있어야 합니다.`

> return 값에 해당하는 `[userFormInput, onChangeForm]` 타입을 지정하면 해결할 수 있습니다.

state 의 초깃값을 ("")으로 지정하고 사용할 것이기 때문에 `string` 으로 설정했습니다.

**hooks/useInput.ts**

```ts
import { useState, useCallback, ChangeEvent } from 'react'

type UserInputProps = [string, (e: ChangeEvent) => void]

const useInput = (initialValue: string): UserInputProps => {
  const [userFormInput, setUserFormInput] = useState(initialValue)

  const onChangeForm = useCallback(e => {
    setUserFormInput(e.target.value)
  }, [])

  return [userFormInput, onChangeForm]
}

export default useInput
```

<hr>

# 👏 마치며

> 커스텀 Hooks 생성 후 TypeScript 타입 지정하는 방법에 대해 알아봤습니다. 🤗
>
> 로그인과 회원가입 구현이 처음이라면 직접 하시는 것을 추천하지만, 그렇지 않다면 [React Hook Form](https://react-hook-form.com/) 라이브러리를 사용하시는 것도 괜찮을 거 같다고 생각합니다. 📚

<hr>

### 참고 자료 📩

- [[리뉴얼] React로 NodeBird SNS 만들기](https://www.inflearn.com/course/%EB%85%B8%EB%93%9C%EB%B2%84%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%A6%AC%EB%89%B4%EC%96%BC)

- [21. 커스텀 Hooks 만들기](https://react.vlpt.us/basic/21-custom-hook.html)

- [TypeScript + React: Typing custom hooks with tuple types](https://fettblog.eu/typescript-react-typeing-custom-hooks/)

- [React Custom Hook & TypeScript](https://velog.io/@ghkstmd00/React-Custom-Hook-TypeScript)
