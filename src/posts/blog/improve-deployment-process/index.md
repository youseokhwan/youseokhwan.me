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







## 빌드를 로컬에서 진행하도록 변경


## Git Hooks을 이용하여 자동화

---

### 참고

- 
