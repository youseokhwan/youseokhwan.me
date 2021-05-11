---
title: "클로저(Closures)"
category: "Swift Tutorial"
date: "2021-04-06 12:30:00 +09:00"
desc: "closures"
---

Swift의 클로저<sup>Closures</sup>는 특정 기능을 하는 코드블록이며, 다른 언어의 람다와 유사하다.

## 클로저의 형태

전역 함수나 중첩 함수도 클로저의 일종이며, 3가지의 형태가 있다.

* 이름이 있고 값을 캡처하지 않는 클로저(전역 함수)
* 이름이 있고 내부에서 값을 캡처할 수 있는 클로저(중첩 함수)
* 이름이 없고 주변 컨텍스트에서 값을 캡처할 수 있으며, 축약된 형태로 작성하는 클로저 표현

## 클로저 표현

공식 문서에서는 `sorted(by:)`를 예시로 들어 설명하고 있다.

`sorted(by:)`는 배열의 값을 정렬하여 반환하는 메서드이며, 활용은 다음과 같다.

```swift
func backward(_ s1: String, _ s2: String) -> Bool {
    return s1 > s2
}

let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
var reversedNames = names.sorted(by: backward)
print(reversedNames) // ["Ewa", "Daniella", "Chris", "Barry", "Alex"]
```

클로저의 특성들을 활용하면 이 코드를 더 간략하게 작성할 수 있다.

### 클로저의 기본 형태

클로저는 기본적으로 다음과 같은 형태를 갖는다.

```text
{ (parameters) -> returnType in
    statements
}
```

`sorted(by:)`를 클로저 표현으로 작성하면 다음과 같다.

```swift
let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
var reversedNames = names.sorted(by: { (s1: String, s2: String) -> Bool in
    return s1 > s2
})
print(reversedNames) // ["Ewa", "Daniella", "Chris", "Barry", "Alex"]
```

### 타입 추론

`sorted(by:)`의 정의에서 `(String, String) -> Bool` 임을 추론할 수 있기 때문에 타입을 생략할 수 있다.

```swift
let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
var reversedNames = names.sorted(by: { s1, s2 in
    return s1 > s2
})
print(reversedNames) // ["Ewa", "Daniella", "Chris", "Barry", "Alex"]
```

### return 키워드 생략

단일문에서는 `return` 키워드를 생략할 수 있다.

```swift
let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
var reversedNames = names.sorted(by: { s1, s2 in
    s1 > s2
})
print(reversedNames) // ["Ewa", "Daniella", "Chris", "Barry", "Alex"]
```

### 파라미터 이름 축약

파라미터의 이름 또한 축약할 수 있다.

파라미터들은 순서대로 `$0`, `$1`, `$2` 등의 이름을 가진다.

```swift
let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
var reversedNames = names.sorted(by: { $0 > $1 })
print(reversedNames) // ["Ewa", "Daniella", "Chris", "Barry", "Alex"]
```

### 후위 클로저

마지막 파라미터가 클로저라면 후위 클로저<sup>Trailing Closures</sup> 형태로 작성할 수 있다.

Argument Label인 `by`를 생략하고, `{}`를 뒤로 보낸다.

```swift
let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
var reversedNames = names.sorted() { $0 > $1 }
print(reversedNames) // ["Ewa", "Daniella", "Chris", "Barry", "Alex"]
```

후위 클로저의 경우 `()`도 생략할 수 있다.

```swift
let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
var reversedNames = names.sorted { $0 > $1 }
print(reversedNames) // ["Ewa", "Daniella", "Chris", "Barry", "Alex"]
```

## 값 캡처

클로저는 주변 컨텍스트의 상수나 변수의 참조를 캡처<sup>Capture</sup>할 수 있다.

이는 원본 값이 더이상 존재하지 않더라도 값을 얻거나 수정할 수 있음을 의미한다.

가장 단순한 중첩 함수 형태를 통해 살펴보도록 하겠다.

```swift
func makeIncrementer(forIncrement amount: Int) -> () -> Int {
    var runningTotal = 0
    func incrementer() -> Int {
        runningTotal += amount
        return runningTotal
    }
    return incrementer
}
```

`makeIncrementer(forIncrement:)`는 `Int`를 파라미터로 받아 `() -> Int` 클로저를 반환한다.

이때 중첩 함수인 `incrementer()`만 따로 보면,

```swift
func incrementer() -> Int {
    runningTotal += amount
    return runningTotal
}
```

`runningTotal`과 `amount`의 정의를 찾을 수 없으나, 이미 값을 캡처했기 때문에 정상적으로 실행된다.

함수를 실행하면 변수를 공유하며 누적된 결과를 얻는다.

```swift
func makeIncrementer(forIncrement amount: Int) -> () -> Int {
    var runningTotal = 0
    func incrementer() -> Int {
        runningTotal += amount
        return runningTotal
    }
    return incrementer
}

let incrementByTen = makeIncrementer(forIncrement: 10)
print(incrementByTen()) // 10
print(incrementByTen()) // 20
print(incrementByTen()) // 30
```

만약 새로운 클로저를 생성하면 고유의 저장 공간을 갖는다.

```swift
func makeIncrementer(forIncrement amount: Int) -> () -> Int {
    var runningTotal = 0
    func incrementer() -> Int {
        runningTotal += amount
        return runningTotal
    }
    return incrementer
}

let incrementByTen = makeIncrementer(forIncrement: 10)
let incrementBySeven = makeIncrementer(forIncrement: 7)

print(incrementByTen()) // 10
print(incrementBySeven()) // 7

print(incrementByTen()) // 20
print(incrementBySeven()) // 14
```

캡처링할 때 메모리 관리는 Swift가 전담하지만,

인스턴스의 프로퍼티를 클로저로 할당하고 그 클로저가 인스턴스를 캡처하면 [강한 참조 순환](https://docs.swift.org/swift-book/LanguageGuide/AutomaticReferenceCounting.html#ID56)이 발생하므로 유의해야 한다.

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/Closures.html](https://docs.swift.org/swift-book/LanguageGuide/Closures.html)
2. [https://docs.swift.org/swift-book/LanguageGuide/AutomaticReferenceCounting.html#ID56](https://docs.swift.org/swift-book/LanguageGuide/AutomaticReferenceCounting.html#ID56)
