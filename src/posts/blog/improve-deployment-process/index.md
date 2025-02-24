---
title: "(작성중)블로그 배포 프로세스 개선하기"
category: "Blog"
date: "2025-02-23 17:00:00 +09:00"
desc: "로컬 빌드 방식으로 변경하여 블로그 배포 시간 단축하기"
thumbnail: "../../../../src/images/gatsby.png"
---

현재 이 블로그의 배포 프로세스는 다음과 같다.

1. 포스트를 작성 및 수정하거나, React 파일 변경(UI 업데이트 등) 후 push
2. Netlify에서 변경을 감지하면, 서버에서 gatsby build 명령어 실행
3. 서버에서 진행한 빌드의 결과물인 public/을 호스팅

배포 프로세스에 문제는 없으나, 반영되는 속도가 아쉬웠다.
로컬에서 gatsby build를 실행하면 약 10초 정도 걸리는데, Netlify에선 2분 넘게 소요된다.
UI 업데이트같은 큰 변경은 간헐적으로 배포하니 괜찮지만,
오타 수정같은 경우는 commit마다 변경 사항이 적고, push 주기가 짧기때문에 꽤 답답했다.

시간 단축에 비하면 CPU 사용량이 부담되는 상황은 아니였기에 로컬 빌드 방식으로 변경해보았다.

---

## Git Subtree를 이용하여 deploy branch 분리

git subtree를 이용하면 여러 repository를 한 repository에서 관리할 수 있다.
여기서는 public/을 하위 repository로 두고, 별도의 branch로 관리하는 목적으로 사용했다.

### empty branch 만들기

--orphan 명령어를 이용해 기존 커밋 내역을 계승하지 않는 deploy라는 empty branch를 만든다.
~~orphan 단어 뜻이 너무 직접적이여서 당황스러웠다.~~

```bash
git checkout --orphan deploy
```

자동으로 stage된 파일들을 해제하고, commit, push하여 remote에 반영한다.
--allow-empty는 변경 사항이 없더라도 commit 할 수 있게 해준다.

```bash
git reset
git commit --allow-empty -m "initial commit"
git push origin deploy
```

empty branch가 만들어진 것을 확인할 수 있다.

![empty-branch.png](empty-branch.png)

---

## 로컬 빌드 방식으로 변경하기

### deploy branch로 빌드하기

현재, public/이 .gitignore에 추가돼있어 추적되지 않는 상태이다.
public/을 추적할 수 있도록 임시로 .gitignore에서 해제하고, remote에 push한다.

```text
# .gitignore 수정

# public
```

```bash
gatsby build
git add .gitignore public/
git commit -m "public/ 임시 추가"
git push origin main
```

subtree 명령어로 deploy branch에 public/을 push한다.
비어있는 branch에 처음 push할 때는 force 옵션이 필요했다.

```bash
git push origin `git subtree split --prefix public main`:deploy --force
```

이후, public/을 다시 .gitignore에 추가하고 main branch에선 삭제한다.

```text
# .gitignore 수정

public
```

```bash
git rm -r --cached public
git add .
git commit -m "public/ 제거"
git push origin main
```

이후, gatsby build를 통해 public에 변경 사항이 발생하면 아래 명령어로 deploy branch에 배포한다.

```bash
gatsby build
git subtree push --prefix public origin deploy
```

### Netlify 설정 변경

---

## Git Hooks을 이용하여 자동화

---

### 참고

- https://log4day.tistory.com/64
- https://bum0w0.tistory.com/16
