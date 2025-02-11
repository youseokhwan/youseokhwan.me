---
title: "Gatsby 블로그 구축"
category: "Blog"
date: "2025-02-11 17:00:00 +09:00"
desc: "Gatsby 블로그 구축"
thumbnail: "../images/default.jpg"
alt: "apple big sur gradient"
---

Tistory, Velog 등의 블로그 플랫폼을 이용하다가, 직접 커스텀해보고싶은 부분들이 있어서 GitHub Blog를 구축해보기로 했다.

## Gatsby

Gatsby는 정적 사이트 생성기이다.
GitHub 블로그를 구축할 때 Ruby 기반의 Jekyll과 React 기반의 Gatsby가 주로 언급되는데,
~~그나마~~ React가 좀 더 친숙했기에 Gatsby를 선택했다.

테마는 가장 취향에 맞는 [gatsby-starter-apple](https://github.com/sungik-choi/gatsby-starter-apple)로 결정했다.

## Gatsby 프로젝트 클론 및 로컬에서 실행하기

먼저 테마 프로젝트를 클론해야한다.

```zsh
npm install -g gatsby-cli
gatsby new my-blog https://github.com/sungik-choi/gatsby-starter-apple
```

my-blog는 로컬 디렉토리, 뒤에 Github 주소는 해당 테마 프로젝트의 주소이다.<br>
추후 Github Pages와 연계하기 위해 youseokhwan.github.io로 네이밍했더니, 빌드에 오류가 발생하여 .이 없는 이름으로 바꾸었다.

이후 필요한 모듈을 설치하면, 로컬에서 실행해볼 수 있다.

```zsh
npm install
gatsby develop
```

브라우저에 [http://localhost:8000/](http://localhost:8000/)을 입력하여 접속할 수 있다.

## Repository 생성 및 remote 연결

추후 GitHub Pages와의 연동을 위해 Repository 이름은 youseokhwan.github.io로 지었다.
이후 로컬 디렉토리와 repository를 연결해준다.

```zsh
rm -rf .git
git init
git add .
git commit -m "clone gatsby-starter-apple"
git remote add origin https://github.com/youseokhwan/youseokhwan.github.io
git push -u origin main
```

## 포스트 작성

포스트는 /src/posts/blog 경로에 마크다운 파일을 추가하는 방식으로 작성할 수 있다.

![01.png](01.png)

![02.png](02.png)

![03.png](03.png)

### 참고

* https://velog.io/@gparkkii/build-gatsby-blog
* https://github.com/sungik-choi/gatsby-starter-apple
