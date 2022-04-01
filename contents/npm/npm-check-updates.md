---
title: 'package.json 모듈 최신 버전으로 업데이트하는 방법'
date: '2022-01-18'
category: 'NPM'
summary: 'npm-check-updates를 사용해서 프로젝트의 package.json 모듈을 최신 버전으로 업데이트하는 방법입니다.'
thumbnail: './images/npm-check-updates.png'
---

# 💡 들어가며

> npm-check-updates을 사용해서 프로젝트의 **package.json 모듈을 최신 버전으로 업데이트하는 방법**입니다.
>
> 프로젝트 진행 중 모듈 버전 업데이트가 필요해서 해당 방법에 대해 알아본 후 작성하는 글입니다.
>
> 앞으로 다른 프로젝트를 진행할 때도 자주 사용할 거 같아서 기록했습니다.

<hr>

> [npm-check-updates](https://www.npmjs.com/package/npm-check-updates)를 사용하면 `package.json`의 `dependencies`와 `devDependencies`를 모두 최신 버전으로 업데이트할 수 있습니다.

1. npm-check-updates 전역으로 설치

```bash
npm install -g npm-check-updates
```

2. 업데이트가 필요한 모듈의 최신 버전 확인

```bash
ncu
```

3. 최신 버전으로 모듈 업데이트 (2번 과정 생략하고 바로 업데이트할 수 있습니다.)

```bash
ncu -u
```

4. 업데이트한 모듈 설치

```bash
npm install
```

<hr>

### 참고 자료 📩

- [npm-check-updates](https://www.npmjs.com/package/npm-check-updates)
