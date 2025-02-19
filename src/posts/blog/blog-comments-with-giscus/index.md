---
title: "블로그 댓글 기능 구현하기"
category: "Blog"
date: "2025-02-19 11:00:00 +09:00"
desc: "giscus를 이용하여 블로그 댓글 기능 구현하기"
thumbnail: "../../../../src/images/giscus.png"
---

블로그에 댓글 기능을 추가하기 위해 구글링을 해보았다.<br>
예전에는 [facebook comments](https://developers.facebook.com/products/social-plugins/comments/) 혹은 [disqus](https://blog.disqus.com/)를 사용했던 것 같은데, 접근성이 아쉽거나 관리 비용이 발생한다.<br>
최근 기술 블로그에서는 GitHub 계정을 기반으로 한 서비스를 많이 사용하는 것으로 보인다.

GitHub 계정 기반 서비스는 [utterances](https://utteranc.es/)가 대표적이고, 최근에는 [giscus](https://giscus.app/)도 쓰인다.<br>
utterances는 repository의 issue를, giscus는 repository의 discussion을 기반으로 작동한다.<br>
utterances의 경우 기존 목적의 issue들(bug report 등)과 섞이면 혼잡해지기 때문에 보통 댓글 전용 repository를 따로 생성하여 연결하는 식으로 구성한다.<br>
utterances에 영감을 받은 giscus는 discussion을 이용하여 이 점을 보완하였다.<br>
기존에 discussion 기능을 쓰던 repository여도 카테고리를 분리할 수 있기 때문에 깔끔하게 관리할 수 있다.<br>
또한 상대적으로 최근까지 활발하게 기능 개발과 유지보수가 진행되고 있는 점도 마음에 들어서 giscus를 써보기로 결정했다.<br>
[이 글](https://jojoldu.tistory.com/704)에서 정보를 얻어 진행했다. 🙏

---

## 블로그에 giscus 적용하기

### GitHub Discussions 활성화

먼저, 블로그 Repository의 `Settings`로 이동하여 `Discussions` 항목을 활성화한다.

![discussions_01.png](discussions_01.png)

![discussions_02.png](discussions_02.png)

### 카테고리 생성

comment들을 모아놓을 전용 카테고리를 생성할 것이다.<br>
`Discussions` 탭으로 이동하여 `Categories` 옆에 있는 펜 모양 버튼을 클릭한다.

![category_01.png](category_01.png)

우측 `New category`를 클릭한다.

![category_02.png](category_02.png)

`Category name`과 `Description`을 입력하고, `Discussion Format`은 `Announcement`를 선택한다.<br>
`Announcement`의 경우 권한이 있는 사람만 discussion을 만들 수 있고, 댓글과 대댓글은 누구나 쓸 수 있다.<br>
우하단의 `Create`를 클릭해 생성을 완료한다.

![category_03.png](category_03.png)

### giscus 앱 설치

repository에 giscus 앱을 설치한다.<br>
[https://github.com/apps/giscus](https://github.com/apps/giscus)로 접속해 `Install`을 클릭한다.

![giscus_01.png](giscus_01.png)

`Only select repositories`를 선택하고, 블로그 repository를 추가하여 이 repository에만 접근할 수 있도록 한다.<br>
하단의 `Install`을 클릭한다.

![giscus_02.png](giscus_02.png)

### script 태그 작성

html에 넣을 script 태그를 직접 작성해도 되지만, 공식 가이드의 도움을 받았다.
[https://giscus.app/ko](https://giscus.app/ko)로 접속해 스크롤을 조금 내려서 `설정` 섹션으로 이동한다.

![script_01.png](script_01.png)

`저장소`와 `Discussion 카테고리`를 알맞게 입력하는 것에 유의하고, 나머지 항목은 취향에 맞게 선택한다.

![script_02.png](script_02.png)

![script_03.png](script_03.png)

하단에 생성된 script 태그를 복사하여 댓글 기능을 넣을 곳에 붙여넣기하면 된다.

![script_04.png](script_04.png)

### script 태그 넣기

(작성중)

### 구현 완료

(작성중)

---

### 참고

- https://giscus.app/
- https://jojoldu.tistory.com/704
