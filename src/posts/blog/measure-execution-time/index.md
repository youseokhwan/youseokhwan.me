---
title: "Swift 코드 실행시간 측정하기"
category: "Swift"
date: "2025-02-15 23:00:00 +09:00"
desc: "CFAbsoluteTimeGetCurrent()로 코드 실행시간 측정하기"
thumbnail: "../../../../src/images/swift.webp"
---

알고리즘 문제를 해결하다보면 작성한 코드가 실제로 얼마나 걸리는지 측정해보고 싶을 때가 있다.<br>
이때, `CFAbsoluteTimeGetCurrent()`를 이용하여 확인할 수 있다.

---

## CFAbsoluteTimeGetCurrent()

`CFAbsoluteTimeGetCurrent()`는 `Foundation`에 내장된 함수이다.<br>
2001-01-01 00:00 GMT를 기준으로 현재 시간을 초 단위로 리턴한다.<br>

```swift
import Foundation

let currentTime = CFAbsoluteTimeGetCurrent()
print(currentTime) // 761337286.360585
```

---

## 실행 시간 측정

코드 블럭의 시작과 끝에 `CFAbsoluteTimeGetCurrent()`를 넣어 실행 시간을 계산할 수 있다.

```swift
import Foundation

let startTime = CFAbsoluteTimeGetCurrent()

// 측정할 코드 예시
var temp = 0
for i in 0..<10_000_000 {
    temp += i
}

let difference = CFAbsoluteTimeGetCurrent() - startTime
print(difference) // 1.4829909801483154
```

---

### 참고

- https://developer.apple.com/documentation/corefoundation/1543542-cfabsolutetimegetcurrent
- https://www.hackingwithswift.com/example-code/system/measuring-execution-speed-using-cfabsolutetimegetcurrent
