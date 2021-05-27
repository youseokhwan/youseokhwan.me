---
title: "에러 처리(예외 처리)"
category: "Swift Tutorial"
date: "2021-05-27 17:30:00 +09:00"
desc: "error-handling"
---

## Error 정의

사용자 정의 에러는 `Error` 프로토콜을 준수하는 열거형을 통해 정의한다.

자연수만 허용하고 음수, 0, 실수 등은 에러로 처리하는 임의의 상황을 가정해보았다.

```swift
enum MyError: Error {
    case negativeNumber
    case zero
    case realNumber
}
```

## 함수에서 Error 발생시키기

함수 안에서 에러를 발생시키고 싶을 경우, 함수명 뒤에 `throws` 키워드를 붙인다.

`throws`가 붙은 함수는 에러를 발생시킬 수 있는 Throwing Function임을 의미한다.

이후 `return` 대신 `throw`를 이용해 구체적인 에러의 타입을 반환한다.

```swift
func cube(_ num: Int) throws -> Int {
    guard num != 0 else {
        throw MyError.zero
    }
    
    guard num > 0 else {
        throw MyError.negativeNumber
    }
    
    return num * num * num
}
```

호출 시, `try`를 붙여 에러가 발생할 가능성이 있음을 명시해야 한다.

```swift
print(try cube(3)) // 27
print(try cube(-5)) // MyError.negativNumber 발생
print(try cube(0)) // MyError.zero 발생
```

## do-catch 구문

`do-catch` 구문을 사용하면 에러를 발생시키고, 에러의 종류에 따른 처리를 구현할 수 있다.

`do` 블록에서 에러가 발생할 가능성이 있는 코드를 포함한 로직을 구현하고, 발생한 에러는 `catch` 블록에서 처리한다.

`do` 블록 안에서 에러가 발생할 가능성이 있는 구문은 `try`를 붙여 명시해야 한다.

에러가 한 번이라도 발생하여 `catch` 블록이 실행됐을 경우, `do` 블록의 남은 코드들은 실행되지 않고 종료된다.

```swift
do {
    print(try cube(3)) // 27
    print(try cube(0)) // 0은 유효하지 않음
    print(try cube(-3))
} catch MyError.zero {
    print("0은 유효하지 않음")
} catch MyError.negativeNumber {
    print("음수는 유효하지 않음")
} catch {
    print("알 수 없는 에러")
}
```

## 옵셔널 및 강제 언래핑

`try?`를 사용하면 결과를 옵셔널로 반환한다.

```swift
print(try? cube(4)) // Optional(64)
print(try? cube(-3)) // nil
```

또한, `try!`를 사용하여 강제 언래핑하면 에러가 발생하지 않음을 명시할 수 있다.

만약 에러가 발생하면 런타임 에러가 발생한다.

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/ErrorHandling.html](https://docs.swift.org/swift-book/LanguageGuide/ErrorHandling.html)
