---
date: '2022-04-10'
category: 'JavaScript'
title: '단축 평가'
summary: '단축 평가의 개념과 단축 평가에는 어떤 것들이 있는지 정리해 보았습니다.'
tag: ['옵셔널 체이닝 연산자', 'null 병합 연산자']
thumbnail: '../../static/no-thumbnail.jpeg'
---

# 단축 평가란?

논리 연산의 결과를 결정하는 피연산자를 타입 변환하지 않고 그대로 반환한다. 이를 단축 평가라 한다.

단축 평가는 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평가 과정을 생략하는 것을 말한다.

## 1. 논리 연산자를 사용한 단축 평가 (||, &&)

### 논리곱(&&)

- 좌항에서 우항으로 평가가 진행된다.
- 평가 중 Falsy 값(false, undefined, null, 0, NaN, '')을 만나면 그 값을 반환하고 해당 위치에서 평가를 종료한다. (내 의견)
- N 개의 피연산자가 모두 true로 평가될 때 true를 반환한다.

  ```javascript
  // 논리곱(&&) 연산자
  'Cat' && 'Dog' // -> 'Dog'
  false && 'Dog' // -> false
  'Cat' && false // -> false

  // done이 true라면 message에 '완료'를 할당
  const done = true
  const message = done && '완료' // -> '완료'
  ```

- 객체를 가리키기를 기대하는 변수가 null 또는 undefined가 아닌지 확인하고 프로퍼티를 참조할 때

### 논리합(||)

- 좌항에서 우항으로 평가가 진행된다.
- 평가 중 Truthy 값(false, undefined, null, 0, NaN, '' 을 제외한 모든 값들)을 만나면 그 값을 반환하고 해당 위치에서 평가를 종료한다. (내 의견)
- N 개의 피연산자중 하나의 값이 true로 평가될 때 true를 반환한다.

  ```javascript
  // 논리합(||) 연산자
  'Cat' || 'Dog' // -> 'Cat'
  false || 'Dog' // -> 'Dog'
  'Cat' || false // -> 'Cat'

  // done이 false라면 message에 '미완료'를 할당
  const done = false
  const message = done || '미완료' // -> '미완료'
  ```

- 함수 매개변수에 기본값을 설정할 때 (💩)

  ```javascript
  function getStringLength(str) {
    str = str || ''
    return str.length
  }

  getStringLength() // -> 0
  getStringLength('hi') // -> 2

  // ES6의 매개변수의 기본값 설정 (✨)
  function getStringLength(str = '') {
    return str.length
  }

  getStringLength() // -> 0
  getStringLength('hi') // -> 2
  ```

## 2. 옵셔널 체이닝 연산자 (?.)

ES11(ECMAScript2020)에서 도입된 옵셔널 체이닝(optional chaining)연산자는 좌항의 피연산자가 null 또는 undefined인 경우 undefined를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.

```javascript
const elem = null

const value = elem?.value
console.log(value) // -> undefined
```

### 옵셔널 체이닝이 필요한 상황

1. 옵셔널 체이닝 연산자가 도입되기 이전에는 논리곱 연산자를 사용한 단축 평가를 통해 변수가 null 또는 undefined인지 확인했다.

   ```javascript
   const elem = null

   // elem이 Falsy 값이면 elem으로 평가되고, Truthy 값으면 elem.value로 평가된다.
   const value = elem && elem.value
   console.log(value) // -> null
   ```

1. 논리곱 연산자는 좌항 피연산자가 false로 평가되는 Falsy 값(false, undefined, null, 0, NaN, '')이면 좌항 피연산자를 그대로 반환한다. 하지만 0이나 ''은 객체로 평가될 때도 있다.

   ```javascript
   const str = ''
   const length = str && str.length

   // 문자열의 길이를 참조하지 못한다.(의도하지 않은 동작!)
   console.log(length) // -> ''
   ```

1. 하지만 옵셔널 체이닝 연산자는 좌항 피연산자가 false로 평가되는 Falsy 값이라도 null 또는 undefined가 아니면 우항의 참조를 이어간다.

   ```javascript
   const str = ''
   const length = str?.length

   // ''은 Falsy 값이지만, null 또는 undefined가 아니기 때문에 우항의 참조를 이어간다.
   console.log(length) // -> 0
   ```

## 3. null 병합 연산자 (??)

- ES11에서 도입된 null 병합(nullish coalescing) 연산자는 좌항의 피연산자가 null 또는 undefined인 경우 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다.
- 변수에 기본값을 설정할 때 유용하다.

  ```js
  const param = null

  const foo = param ?? 'default string'
  console.log(foo) // -> 'default string'
  ```

### null 병합이 필요한 상황

1. null 병합 연산자는 변수에 기본값을 설정할 때 유용하다.
1. null 병합 연산자가 도입되기 이전에는 논리합 연산자를 사용한 단축 평가를 통해 변수에 기본값을 설정했다.
1. 논리합 연산자를 사용한 단축 평가의 경우 좌항의 피연산자가 false로 평가되는 Falsy 값이면 우항의 피연산자를 반환한다.
1. 만약 Falsy 값이 0이나 ''도 기본값으로서 유효하다면, 예기치 않은 동작이 발생할 수 있다.

   ```jsx
   const param = ''

   const foo = param || 'default string'
   console.log(foo) // -> 'default string'
   ```

1. 하지만 null 병합 연산자는 좌항의 피연산자가 false로 평가되는 Falsy 값이라도 null 또는 undefined가 아니라면 좌항의 피연산자를 그대로 반환한다.

   ```jsx
   const param = ''

   const foo = param ?? 'default string'
   console.log(foo) // -> ''
   ```

<hr>

### 참고 자료 📩

- [모던 자바스크립트 Deep Dive](https://poiemaweb.com/js-type-coercion)
