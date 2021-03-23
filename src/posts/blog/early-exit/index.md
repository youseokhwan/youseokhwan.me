---
title: "guard를 이용한 빠른 종료(Early Exit)"
category: "Swift Tutorial"
date: "2021-03-22 19:00:00 +09:00"
desc: "early-exit"
---

Swift는 함수에서 `guard`를 만나면 조건이 `true`인지 검사한다.

`if-else`로 동일한 구현이 가능하지만, `guard`를 사용하면 가독성을 높일 수 있다.

```swift
func divide(_ x: Int, _ y: Int) -> Int {
    guard y != 0 else {
        return -1
    }
    return x / y
}

print(divide(10, 3)) // 3
print(divide(10, 0)) // -1
```

`if`와 차이점은 다음과 같다.

* `else` 구문이 반드시 있어야 한다.
* `else`에는 상위 블록의 코드를 종료하는 코드가 있어야 한다.

상위 블록을 종료하려면 `return`, `break`, `continue`, `throw` 등을 사용하거나 `fatalError(_:file:line:)`과 같은 비반환 함수 혹은 메서드를 사용하면 된다.

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html](https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html)
