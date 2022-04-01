---
title: '클로저(closure)란?'
date: '2021-02-02'
category: 'JavaScript'
summary: 'JavaScript 클로저(closure)에 대해 정리한 글입니다. 함수 예제 코드와 함께 작성했습니다.'
thumbnail: './images/closure.png'
---

## 📚 클로저

자바스크립트에는 내부함수와 외부함수가 존재하고 내부함수는 외부함수의 지역변수에 접근할 수 있습니다.

또한, **외부함수가 소멸한 이후**에도 **내부함수가 외부함수의 변수에 접근**할 수 있습니다.

이 특성을 이용한 것이 바로 **클로저**입니다.

예시를 통해 알아보겠습니다.

### 💡 함수 예제

```javascript
function outter() {
  let title = 'coding everybody'
  return function () {
    alert(title)
  }
}

inner = outter()
inner()
```

위 코드는 outter **외부함수**를 정의한 후 **내부함수**로 function을 return하고 outter 외부함수 실행 결과를 inner 변수에 담는 코드입니다.

### 🔍 예제 코드 실행 결과

```javascript
coding everybody
```

코드를 실행하면, 위 사진과 같이 'coding everybody'라는 경고창이 출력됩니다.

'coding everybody'는 외부함수의 지역변수인 title에 담긴 값입니다.

위 예시에서 알 수 있는 클로저의 특성은

```javascript
inner = outter()
```

위 코드에서 outter 함수는 내부함수를 return 한 후 outter 함수가 종료되었음에도

```javascript
inner()
```

이후 inner 함수를 호출했을 때 외부함수에 존재하는 title 변수에 접근할 수 있다는 것입니다.

즉, 내부함수를 포함하고 있는 외부함수에 접근할 수 있을 뿐만 아니라

외부함수가 종료된 이후에도 **내부함수를 통해 외부함수 및 외부함수의 지역 변수에 접근할 수 있다는 것**이 **클로저**의 특징입니다.

<hr>

### 참고 자료 📩

- [클로저 - 생활코딩](https://opentutorials.org/course/743/6544)
