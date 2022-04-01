---
title: 'string이란?'
date: '2021-02-09'
category: 'JavaScript'
summary: 'JavaScript string을 정리한 글입니다. 문자열이 유사 배열인 이유, 불변 값과 가변 값 그리고 문자열 배열 메서드 내용을 포함하고 있습니다.'
thumbnail: './images/string.png'
---

## 📚 문자열

- 문자열은 문자의 배열과 생김새는 비슷하지만 문자 배열과 같지 않습니다.

- 문자열이 유사 배열인 이유는 둘 다 length 프로퍼티, indexOf( ) 메서드, concat( ) 메서드를 가집니다.

### 💡 숫자 구문 예제

```js
let a = 'foo'
let b = ['f', 'o', 'o']

a.length // 3
b.length // 3

a.indexOf('o') // 1
b.indexOf('o') // 1

let c = a.concat('bar') // "foobar"
let d = b.concat(['b', 'a', 'r']) // ["f", "o", "o", "b", "a", "r"]

a === c // false
b === d // false

a // "foo"
b // ["f", "o", "o"]
```

- 코드를 통해 let a는 문자열이고 let b는 배열인데 둘 다 length 프로퍼티, indexOf( ) 메서드, concat( ) 메서드 사용할 수 있다는 걸 확인할 수 있습니다.

<hr>

## 📚 불변 값과 가변 값

- 둘 다 문자의 배열이라고 할 수 없는 이유는 문자열은 불변 값이고 배열은 가변 값이기 때문입니다.

### 💡 불변 값과 가변 값 예제

```js
let a = 'foo'
let b = ['f', 'o', 'o']

a[1] = 'c'
b[1] = 'c'

a // "foo"
b // ["f", "c", "o"]
```

- a는 문자열이라서 a[1]의 값을 변경해도 a를 출력했을 때 foo를 출력합니다.

- b는 배열이라서 b[1]의 값이 c로 변경되어 ["f", "c", "o"]를 출력하는 것을 확인할 수 있습니다.

<hr>

## 📚 문자열 배열 메서드

- 문자열은 불변 값이라서 문자열 메서드를 사용해서 문자열의 내용을 변경했을 때 그 내용을 바로 변경하지 않고 항상 새로운 문자열을 생성한 후 그 값을 반환합니다.

- 대부분의 배열 메서드는 그 자리에서 곧바로 원소를 수정합니다.

### 💡 문자열 배열 메서드 예제

```js
let a = 'foo'
let b = ['f', 'o', 'o']

c = a.toUpperCase()
a === c // false
a // "foo"
c // "FOO"

b.push('!')
b // ["f", "o", "o", "!"]
```

- toUpperCase( )를 사용해서 문자열 a의 내용을 변경했을 때 a의 내용을 바로 변경하지 않고 c를 생성한 후 그 값을 반환합니다.

- push( )를 사용해서 배열 b의 내용을 변경했을 때 바로 b의 원소를 수정합니다.

<hr>

### 참고 자료 📩

- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)
