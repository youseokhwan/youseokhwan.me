---
title: "열거형(Enumerations)"
category: "Swift Tutorial"
date: "2021-04-12 19:00:00 +09:00"
desc: "enumerations"
---

열거형(enumerated type)은 관련된 값을 그룹으로 묶어 안정성을 보장해주는 타입이다.

## 문법

열거형은 `enum`과 `case` 키워드를 사용하여 정의한다.

```swift
enum DayOfWeek {
    case Mon
    case Tue
    case Wed
    case Thu
    case Fri
    case Sat
    case Sun
}
```

C와 달리 Swift는 각 `case`에 대해 기본값을 자동으로 부여하지 않는다.

예를 들어, 위 코드에서 `Mon`과 `Tue`는 각각 0과 1이 아님에 유의한다.

각 `case`는 열거형 타입 뒤에 `.`을 붙여 접근할 수 있고 추론이 가능한 상태라면 타입을 생략할 수 있다.

```swift
enum DayOfWeek {
    case Mon, Tue, Wed, Thu, Fri, Sat, Sun
}

var today = DayOfWeek.Mon
print(today) // Mon

today = .Wed
print(today) // Wed
```

## switch에서 사용

열거형은 `switch`를 함께 사용하면 직관적으로 코드를 작성할 수 있다.

`switch`의 특성에 따라 모든 `case`를 커버할 수 있도록 작성해야 한다.

```swift
enum DayOfWeek {
    case Mon, Tue, Wed, Thu, Fri, Sat, Sun
}

var today = DayOfWeek.Mon

switch(today) {
case .Mon, .Tue, .Wed, .Thu, .Fri:
    print("평일")
case .Sat, .Sun:
    print("주말")
}
```

## Associated Values

associated value를 이용하여 한 열거형 안에 다른 타입의 `case`를 정의할 수 있다.

```swift
enum MyEnum {
    case intCase(Int, Int, Int)
    case strCase(String, String)
}

var e1 = MyEnum.intCase(1, 2, 3)
var e2 = MyEnum.strCase("A", "B")

switch(e1) {
case let .intCase(a, b, c):
    print("intCase - a: \(a), b: \(b), c: \(c)")
case .strCase(let a, let b):
    print("strCase - a: \(a), b: \(b)")
}
```

## Raw Values

각 `case`에 대해 임의의 `raw` 값을 부여할 수 있다.

```swift
enum DayOfWeek: Int {
    case Mon = 1
    case Tue
    case Wed
    case Thu
    case Fri
    case Sat
    case Sun
}

var today = DayOfWeek.Wed
print(today.rawValue) // 3
```

`Int`의 경우 1씩 증가시켜서 암시적으로 값을 할당하고, `String`인 경우 값이 부여되지 않을 경우 `case` 이름을 암시적으로 부여한다.

```swift
enum DayOfWeek: String {
    case Mon = "월"
    case Tue
    case Wed
    case Thu
    case Fri
    case Sat
    case Sun
}

var today = DayOfWeek.Mon
print(today.rawValue) // "월"

today = .Fri
print(today.rawValue) // Fri
```

또한, `raw` 값을 이용한 초기화도 가능한데 이 경우 `Optional`임에 유의한다.

```swift
enum DayOfWeek: Int {
    case Mon = 1
    case Tue
    case Wed
    case Thu
    case Fri
    case Sat
    case Sun
}

var today = DayOfWeek(rawValue: 6)
print(today ?? "nil") // Sat

today = DayOfWeek(rawValue: -5)
print(today ?? "nil") // nil
```

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/Enumerations.html](https://docs.swift.org/swift-book/LanguageGuide/Enumerations.html)
