---
title: "함수(Functions)"
category: "Swift Tutorial"
date: "2021-03-26 16:20:00 +09:00"
desc: "functions"
---

함수<sup>Functions</sup>는 작업을 수행하는 단위이다.

다른 언어에 비해 Swift의 함수 표현 방법은 매우 다양하고, 함수 자체가 값으로 사용할 수 있는 일급 객체기 때문에 유의해야 한다.

## 정의 및 호출

함수는 `func` 키워드와 함께 파라미터와 리턴 값을 명시하여 정의한다.

```swift
func add(x: Int, y: Int) -> Int {
    return x + y
}
```

정의된 함수는 이름을 명시하여 호출할 수 있다.

```swift
func add(x: Int, y: Int) -> Int {
    return x + y
}

print(add(x: 2, y: 3)) // 5
```

## 함수의 종류

함수는 파라미터 및 리턴 값을 선택적으로 정의할 수 있다.

### 파라미터가 없는 함수

파라미터가 필요하지 않으면 괄호 안의 내용을 생략한다.

```swift
func hello() -> String {
    return "Hello"
}

print(hello()) // Hello
```

실행 코드가 1줄일 경우 `return`을 생략할 수 있다.

```swift
func hello() -> String {
    "Hello"
}

print(hello()) // Hello
```

### 리턴 값이 없는 함수

리턴 값이 필요하지 않으면 화살표 이후 내용과 `return` 구문을 생략한다.

```swift
func printAdd(x: Int, y: Int) {
    print("\(x + y)")
}

printAdd(x: 2, y: 3) // 5
```

### 가변 매개변수를 가지는 함수

매개변수의 타입 뒤에 `...`을 붙이면 가변 매개변수<sup>Variadic Parameters</sup>가 된다.

```swift
func printSum(numbers: Int...) -> Int {
    var sum = 0
    for item in numbers {
        sum += item
    }
    return sum
}

print(printSum(numbers: 2, 3, 5, 6)) // 16
```

### inout 매개변수

매개변수의 타입 앞에 `inout` 키워드를 붙이면 값이 아닌 참조를 전달한다.

C에서 변수 앞에 `&`를 붙여 주솟값을 넘기는 형태와 유사하다.

```swift
import Foundation

func cube(num: inout Double) {
    num = pow(num, 3.0)
}

var x = 4.0
cube(num: &x)
print(x) // 64.0
```

## Argument Label과 Parameter Name

각 파라미터는 Argument Label과 Parameter Name을 가진다.

```swift
func hello(name str: String) -> String {
    return "Hello, \(str)!"
}

print(hello(name: "Swift")) // Hello, Swift!
```

위 함수의 경우 `name`은 Argument Label이고 `str`은 Parameter Name이다.

Argument Label은 함수 호출 시 사용되는 이름이고, Parameter Name은 함수 안에서 사용되는 이름이다.

함수의 이름과 Argument Label이 같으면 같은 함수로 분류하며, 함수를 지칭할 때도 Argument Label을 포함하여 지칭한다.

예를 들어 `hello(name:)`과 `hello(word:)`는 다른 함수로 간주한다.

```swift
func hello(name str: String) -> String {
    return "Hello, \(str)!"
}

func hello(word str: String) -> String {
    return "Hello, \(str)!"
}
```

만약 Argument Label을 명시하고 싶지 않다면 `underscore(_)`를 이용해 와일드카드로 만들 수 있다.

```swift
func hello(_ str: String) -> String {
    return "Hello, \(str)!"
}

print(hello("Swift")) // Hello, Swift!
```

## 기본값 지정

파라미터에 값을 대입하면 기본값을 지정할 수 있다.

```swift
func hello(_ str: String = "World") -> String {
    return "Hello, \(str)!"
}

print(hello()) // Hello, World!
print(hello("Swift")) // Hello, Swift!
```

## Function Types

Swift의 함수는 일급 객체기 때문에 함수 자체를 타입으로 사용할 수 있다.

```swift
func add(_ x: Int, _ y: Int) -> Int {
    return x + y
}

func sub(_ x: Int, _ y: Int) -> Int {
    return x - y
}

var mathFunc: (Int, Int) -> Int = add(_:_:)
print(mathFunc(2, 3)) // 5

mathFunc = sub(_:_:)
print(mathFunc(2, 3)) // -1
```

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/Functions.html](https://docs.swift.org/swift-book/LanguageGuide/Functions.html)
