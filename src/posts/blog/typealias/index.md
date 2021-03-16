---
title: "Swift typealias"
category: "Swift Tutorial"
date: "2021-03-16 19:10:00 +09:00"
desc: "Swift typealias"
---

typealias 키워드를 사용하면 타입의 별칭을 지정할 수 있다.

별칭을 지정해놓으면 어디서든 별칭을 통해 원래 타입을 호출할 수 있다.

```swift
typealias MyType = Int8

var myVar = MyType.max
print(myVar) // 127
```

```swift
typealias RGB = (R: UInt8, G: UInt8, B: UInt8)

let green = RGB(34, 177, 76)
let yellow = RGB(255, 242, 0)

print(yellow) // (R: 255, G: 242, B: 0)
```

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html)
