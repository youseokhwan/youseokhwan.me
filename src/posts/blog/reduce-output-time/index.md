---
title: "출력 시간 단축하기"
category: "Swift PS"
date: "2021-03-16 12:50:00 +09:00"
desc: "출력 시간 단축하기"
---

백준의 경우 정답을 연속으로 출력해야 할 때가 있다.

아래와 같이 리스트의 요소들을 순서대로 출력하는 상황을 예시로 들 수 있다.

```swift
var result = [1, 2, 3, 4, 5]

for item in result {
    print(item)
}
/*
 1
 2
 3
 4
 5
 */
```

이때, print() 메서드를 매번 호출하는 것보다

String에 모아서 한번만 출력하면 시간을 꽤 단축할 수 있다.

```swift
var arr = [1, 2, 3, 4, 5]
var result = ""

for item in arr {
    result += "\(item)\n"
}

print(result)
/*
 1
 2
 3
 4
 5
 
 */
```

백준의 경우, 문자열 끝에 있는 개행은 신경쓰지 않아도 된다.

![baekjoon-judge.png](/baekjoon-judge.png)

## 시간 측정

요소의 개수가 20만개라고 가정하고 시간을 측정해보았다.

```swift
import Foundation

var arr = [Int]()
for i in 0..<200_000 {
    arr.append(i)
}

let start = CFAbsoluteTimeGetCurrent()

for item in arr {
    print(item)
}

let diff = CFAbsoluteTimeGetCurrent() - start
print(diff) // 2.256 2.173 2.260 2.282 2.248
```

print()를 for 안에서 계속 호출하는 경우 약 2.243초(5회 평균),

```swift
import Foundation

var arr = [Int]()
for i in 0..<200_000 {
    arr.append(i)
}

let start = CFAbsoluteTimeGetCurrent()

var result = ""
for item in arr {
    result += "\(item)\n"
}
print(result)

let diff = CFAbsoluteTimeGetCurrent() - start
print(diff) // 1.974 1.753 2.121 1.938 1.992
```

String에 모아서 한번만 출력하는 경우 약 1.955초(5회 평균)로 측정되었다.

요소를 100만개로 늘려도 각 10.687초, 9.990초(3회 평균)으로 후자가 더 빠른 것을 확인할 수 있다.

환경에 따라 실행 속도는 달라질 수 있다.

## 참고

1. [https://www.acmicpc.net/help/judge](https://www.acmicpc.net/help/judge)
