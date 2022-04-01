---
title: '객체 생성할 때 동적으로 key 값 할당하는 방법'
date: '2021-07-23'
category: 'JavaScript'
summary: 'JavaScript 객체를 생성할 때 동적으로 key 값을 할당하는 방법입니다. TypeScript를 사용한 Next 프로젝트에서의 과정을 정리했습니다.'
thumbnail: './images/object-key-dynamic-allocation.png'
---

# 💡 들어가며

> JavaScript 객체를 생성할 때 **동적으로 key 값을 할당하는 방법**입니다.
>
> 서버에 객체를 전송할 때 (post) 사용자가 입력한 값을 객체의 value 로 저장하고 동적으로 key 값을 할당했습니다.
>
> TypeScript 를 사용한 Next 프로젝트에서의 과정을 정리했습니다.

<hr>

# 1. 동적으로 key 값 설정하는 방법 🚀

## 1-1. 객체 생성과 동시에 동적인 key 값 설정하기 ✨

answer 객체를 생성하면서 동시에 progress 변수를 객체의 동적인 key 값 설정에 사용했습니다.

`` [`answer${progress + 1}`] `` 가 객체의 key 값을 할당하는 코드입니다.

`data` 는 value 값을 할당하는 코드입니다.

```ts
const [progress, setProgress] = useState(0);

let answer = {
    [`answer${progress + 1}`] : data;
};
```

## 1-2. 객체 생성 후 동적인 key 값 설정하기 🔥

answer 객체를 미리 생성한 후 value 값을 할당할 때 동적으로 key 값을 설정했습니다.

`` answer[`answer${progress + 1}`] `` 가 객체의 key 값을 할당하는 코드입니다.

`data` 는 value 값을 할당하는 코드입니다.

```ts
const [progress, setProgress] = useState(0)

let answer = {}

answer[`answer${progress + 1}`] = data
```

<hr>

# 2. 프로젝트 적용 코드 💻

[Github 링크 😺](https://github.com/mnxmnz/colfume-frontend/blob/develop/components/test/questions/AnswerList.tsx)

> answer 객체를 미리 생성한 코드입니다.
>
> 사용자가 입력한 값 순서대로 answer1, answer2, answer3 ... key 값을 생성했습니다.
>
> answer 뒤 숫자는 현재 진행 상황인 progress 변수를 사용했습니다.
>
> value 에 사용자가 입력한 값을 담은 data 변수를 할당했습니다.

```ts
const [progress, setProgress] = useState(0)

const onClickAnswer = async data => {
  answer[`answer${progress + 1}`] = data
  setProgress(progress => progress + 1)

  if (progress === 6) {
    try {
      const testData = await testResult(answer)
      setResult(testData)
    } catch (e) {
      return e
    }

    restartTest()
  }
}
```

<hr>

# 👏 마치며

> 동적으로 key 값 할당하는 방법을 예제와 함께 정리했습니다 🔮
>
> 1. 동적으로 key 값 설정하는 방법 🚀
>
> 2. 프로젝트 적용 코드 💻

<hr>

### 참고 자료 📩

- [JSON 생성시 Key값을 동적으로 할당하기](https://blog.outsider.ne.kr/675)
