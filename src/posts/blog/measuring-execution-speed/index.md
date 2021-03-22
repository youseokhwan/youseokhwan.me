---
title: "코드 실행 시간 측정하기"
category: "Swift PS"
date: "2021-03-15 12:40:00 +09:00"
desc: "measuring-execution-speed"
---

알고리즘 문제를 해결하다보면 작성한 코드가 실제로 얼마나 걸리는지 측정해보고 싶을 때가 있다.

이때, `CFAbsoluteTimeGetCurrent()` 함수를 이용하면 된다.

## CFAbsoluteTimeGetCurrent()

`CFAbsoluteTimeGetCurrent()`는 `Foundation`의 내장 함수이다.

이 함수는 `Double` 타입으로 값을 반환하는데,

2001-01-01 00:00 GMT를 기준으로 현재 시간을 초 단위로 반환한다.

```swift
import Foundation

let currentTime = CFAbsoluteTimeGetCurrent()
print(currentTime) // 637473242.14479
```

## 실행 시간 측정

실행 시간은 작성한 코드의 시작과 끝에 `CFAbsoluteTimeGetCurrent()`를 사용하여 계산할 수 있다.

```swift
import Foundation

let start = CFAbsoluteTimeGetCurrent()

// 예시
var temp = 0
for i in 0..<10_000_000 {
    temp = i
}

let diff = CFAbsoluteTimeGetCurrent() - start
print(diff) // 7.711310982704163
```

실행 시간은 환경에 따라 다르게 오차가 있을 수 있다.

## 참고

1. [https://developer.apple.com/documentation/corefoundation/1543542-cfabsolutetimegetcurrent](https://developer.apple.com/documentation/corefoundation/1543542-cfabsolutetimegetcurrent)
2. [https://www.hackingwithswift.com/example-code/system/measuring-execution-speed-using-cfabsolutetimegetcurrent](https://www.hackingwithswift.com/example-code/system/measuring-execution-speed-using-cfabsolutetimegetcurrent)
