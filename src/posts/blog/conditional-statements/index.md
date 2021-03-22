---
title: "조건문"
category: "Swift Tutorial"
date: "2021-03-21 12:40:00 +09:00"
desc: "conditional-statements"
---

Swift는 조건문으로 `if`와 `switch`를 제공한다.

## if

`if`는 조건식이 참일 때 코드 블록을 실행한다.

사용되는 키워드는 `if`, `else if`, `else` 3가지가 있으며 `else if`와 `else`는 생략할 수 있다.

```swift
var age = 25

if age >= 19 {
    print("\(num)세는 성인이다.") // 25세는 성인이다.
}
```

```swift
var age = 15

if age >= 19 {
    print("\(age)세는 성인이다.")
} else {
    print("\(age)세는 미성년자이다.") // 15세는 미성년자이다.
}
```

```swift
var age = 70

if age < 19 {
    print("미성년자는 백신 접종 대상입니다.")
} else if age >= 65 {
    print("65세 이상 노인은 백신 접종 대상입니다.") // 65세 이상 노인은 백신 접종 대상입니다.
} else {
    print("\(age)세는 백신 접종 대상이 아닙니다.")
}
```

## switch

`switch`는 여러 가지 패턴 중 처음으로 일치하는 패턴의 코드 블록을 실행한다.

```swift
var time = 12

switch time {
case 9:
    print("아침 식사 시간")
case 12:
    print("점심 식사 시간") // 점심 식사 시간
case 18:
    print("저녁 식사 시간")
default:
    print("식사 시간이 아님")
}
```

C나 Java의 경우 조건에 부합하는 `case`부터 `break`를 만날 때까지 이후 `case`를 계속 실행한다.

이와 다르게 Swift는 1개의 `case` 블록만 실행하고 `switch`를 종료한다.

상위 반복문을 종료하고자 하는 것이 아니라면 `break`를 작성하지 않아야 한다.

만약 여러 `case`를 동일한 코드 블록으로 처리하고 싶다면 `case`를 결합한다.

```swift
var alphabet = "o"

switch alphabet {
case "a", "e", "i", "o", "u":
    print("모음") // 모음
default:
    print("자음")
}
```

C나 Java처럼 이후 `case`도 연속적으로 실행하고 싶다면 `fallthrough` 키워드를 사용한다.

```swift
var num = 3
var output = "\(num)은 "

switch num {
case 2, 3, 5, 7, 11, 13:
    output += "소수이면서 "
    fallthrough
default:
    output += "정수이다."
}

print(output) // 3은 소수이면서 정수이다.
```

또한, `switch`는 모든 경우의 수를 처리해야 한다.

예를 들어 다음의 코드는 모든 경우를 커버할 수 없으므로 컴파일 에러가 발생한다.

```swift
enum Grade {
    case A, B, C, D, F
}

var myGrade: Grade = Grade.B

switch myGrade { // error - Switch must be exhaustive
case .A:
    print("A")
case .B:
    print("B")
}
```

`default` 구문을 사용하여 예외를 처리하거나, 모든 경우의 `case` 구문을 작성해야 한다.

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html](https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html)
