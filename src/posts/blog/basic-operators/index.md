---
title: "기본 연산자"
category: "Swift Tutorial"
date: "2021-03-17 18:05:00 +09:00"
desc: "basic-operators"
---

Swift 공식 문서에서는 연산자에 대한 내용을 'Basic Operators'와 'Advanced Operators'로 나누어 설명하고 있다.

그중 'Basic Operators'에 대한 내용을 살펴보겠다.

## 용어(Terminology)

연산자는 단항 연산자<sup>Unary Operators</sup>, 이항 연산자<sup>Binary Operators</sup>, 삼항 연산자<sup>Ternary Operators</sup>로 구분할 수 있다.

* 단항 연산자: 피연산자의 앞 혹은 뒤에 붙여 사용하는 연산자(`-a`, `a!`)
* 이항 연산자: 두 개의 피연산자 사이에 사용하는 연산자(`a + b`)
* 삼항 연산자: 세 개의 피연산자 사이에 사용하는 연산자(`a ? b : c`)

## 대입 연산자(Assignment Operator)

`=`을 사용하여 값을 초기화하거나 갱신할 수 있다.

```swift
var a = 10
```

## 산술 연산자(Arithmetic Operators)

기본적인 사칙 연산(덧셈, 뺄셈, 곱셈, 나눗셈)을 지원한다.

```swift
var a = 5
var b = 3

print(a + b) // 8
print(a - b) // 2
print(a * b) // 15
```

`/` 연산자의 경우, 정수는 몫만 반환하므로 유의해야 한다.

```swift
print(3 / 2) // 1
print(3.0 / 2.0) // 1.5
```

### 나머지 연산(Remainder Operator)

정수의 경우 `%` 연산자를 통해 나머지 연산을 할 수 있다.

```swift
print(5 % 3) // 2
print(-7 % 3) // -1
```

부동소수점의 나머지 연산은 `truncatingRemainder(dividingBy:)` 메서드로 가능하다.

```swift
print(5.0.truncatingRemainder(dividingBy: 1.5)) // 0.5
```

### 단항 음수 연산(Unary Minus Operator)

`-`를 전위 연산자로 사용하여 부호를 변환할 수 있다.

```swift
var a = 2
print(-a) // -2
```

## 복합 대입 연산자(Compound Assignment Operators)

산술, 비트, 논리 연산자들은 대입 연산과 함께 사용할 때 축약형을 사용할 수 있다.

```swift
var a = 5
a += 1
print(a) // 6
```

Swift는 `++`, `--` 연산자를 제공하지 않으니 주의한다.

```swift
var a = 5
print(a++) // error!

a += 1
print(a) // 6
```

## 비교 연산자(Comparison Operators)

Swift는 다음과 같은 비교 연산자들을 제공한다.

* 같다(`a == b`)
* 같지 않다(`a != b`)
* 크다(`a > b`)
* 작다(`a < b`)
* 크거나 같다(`a >= b`)
* 작거나 같다(`a <= b`)

```swift
print(5 == 5) // true
print(3 != 5) // true
print(3 > 5) // false
print(3 < 5) // true
print(3 >= 5) // false
print(5 <= 5) // true
```

## 삼항 조건 연산자(Ternary Conditional Operator)

조건이 참인 경우 앞의 값을, 거짓인 경우 뒤의 값을 할당하는 연산자이다.

```swift
var a = -5
var abs = a > 0 ? a : -a
print(abs) // 5
```

이것은 다음 코드를 축약한 것이다.

```swift
var a = -5
var abs = Int()

if a > 0 {
    abs = a
} else {
    abs = -a
}

print(abs) // 5
```

삼항 조건 연산자를 적절히 사용하면 코드의 가독성을 높일 수 있다.

## nil 병합 연산자(Nil-Coalescing Operator)

다음은 삼항 조건 연산자를 이용해 옵셔널 값을 추출하는 코드이다.

```swift
var title: String? = "Basic Operators"
print(title != nil ? title! : "Untitled") // Basic Operators
```

이것은 nil 병합 연산자를 사용하면 더 직관적으로 작성할 수 있다.

```swift
var title: String? = nil
print(title ?? "Untitled") // Untitled
```

## 범위 연산자(Range Operators)

Swift는 다음과 같은 범위 연산자를 제공한다.

* `a...b`(`a <= x && x <= b`)
* `a..<b`(`a <= x && x < b`)
* `a...`(`a <= x`)
* `...a`(`x <= a`)
* `..<a`(`x < a`)

```swift
for i in 1...5 {
    print(i, terminator: " ") // 1 2 3 4 5 
}

var list = ["A", "B", "C", "D"]
for item in list[..<2] {
    print(item, terminator: " ") // A B
}

var range = -2...5
print(range.contains(0)) // true
print(range.contains(7)) // false
```

## 논리 연산자(Logical Operators)

Swift는 3가지 논리 연산자(불 연산자)를 지원한다.

* NOT(`!a`)
* AND(`a && b`)
* OR(`a || b`)

```swift
var condition = false
if !condition {
    print("if문 실행") // if문 실행
}

var a = 6
if a > 0 && a % 2 == 0 {
    print("a는 양수이면서 짝수이다.") // a는 양수이면서 짝수이다.
}

var b = -1
if (b > 0) || (b % 2 != 0) {
    print("b는 양수거나 홀수이다.") // b는 양수거나 홀수이다.
}
```

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/BasicOperators.html](https://docs.swift.org/swift-book/LanguageGuide/BasicOperators.html)
