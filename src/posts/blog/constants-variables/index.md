---
title: "상수와 변수"
category: "Swift Tutorial"
date: "2021-02-23 15:05:00 +09:00"
desc: "constants-variables"
---

상수<sup>Constants</sup>는 값이 설정되면 변경할 수 없고, 변수<sup>Variables</sup>는 변경할 수 있다.

## 선언

상수는 `let` 키워드, 변수는 `var` 키워드를 사용한다.

```swift
let birthday = "19970115"
var age = 25
```

상수의 경우 값을 변경하면 컴파일 에러가 발생한다.

![constants-compile-error.png](/constants-compile-error.png)

## Type Annotation

Swift는 타입 주석<sup>Type Annotation</sup>을 통해 값의 타입을 명확히 할 수 있다.

```swift
let birthday: String = "19970115"
var age: Int = 25
```

타입 주석이 필요한 경우는 크게 2가지가 있다.

1. 선언 시 초기화를 진행하지 않는 경우
2. Swift의 타입 추론과 개발자의 의도가 다른 경우

type-safe 언어인 Swift는 선언 시 타입 추론과 초기화를 모두 하지 않으면 컴파일 에러가 발생한다.

![type-annotation-missing.png](/type-annotation-missing.png)

또한, 개발자의 의도대로 타입을 사용하려면 타입 주석을 사용해야 한다.

Swift는 타입 주석이 없으면 정수는 `Int` 타입으로 추론한다. (실수는 `Double`로 추론)

```swift
var age = 25
print(type(of: age)) // Int
```

64비트 기준으로 `Int`의 최댓값은 약 922경인데, `age` 변수는 이렇게 큰 범위는 필요하지 않다.

`age`를 `Int8`(최댓값 127)로 사용하고 싶다면 다음과 같이 타입 주석을 사용하면 된다.

```swift
var age: Int8 = 25
print(type(of: age)) // Int8
```

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html#ID310](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html#ID310)
2. [https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html#ID322](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html#ID322)
