---
title: "반복문"
category: "Swift Tutorial"
date: "2021-03-22 19:00:00 +09:00"
desc: "loops"
---

Swift는 반복문으로 `for-in`, `while`, `repeat-while` 3가지를 제공한다.

## for-in

`for-in`은 배열 같은 시퀀스나 숫자 범위, 문자열 등을 순회하기 위해 사용한다.

```swift
var arr = ["One", "Two", "Three"]

for item in arr {
    print(item)
}
/*
 One
 Two
 Three
 */
```

```swift
var str = "Hello"
var arr = [Character]()

for item in str {
    arr.append(item)
}

print(arr) // ["H", "e", "l", "l", "o"]
```

인덱스를 사용하거나 일정 횟수를 반복하려면 범위(range)를 사용한다.

```swift
var arr = ["One", "Two", "Three", "Four", "Five"]

for index in 2..<5 {
    print(arr[index])
}
/*
 Three
 Four
 Five
 */
```

underscore(_)를 사용하여 값을 사용하지 않음을 명시하고, 성능을 높일 수 있다.

```swift
for _ in 0..<5 {
    print("Hello")
}
/*
 Hello
 Hello
 Hello
 Hello
 Hello
 */
```

Swift의 `for-in`은 컬렉션 타입을 다루기가 수월하며 직관적이다.

대신 인덱스를 직접 다루기가 불편한데, 이때는 `stride(from:to:by:)`와 `stride(from:through:by:)`를 이용한다.

`stride(from:to:by:)`는 반열린 범위이다.

```swift
for i in stride(from: 0, to: 10, by: 3) {
    print(i)
}
/*
 0
 3
 6
 9
 */
```

`stride(from:through:by:)`는 닫힌 범위이다.

```swift
for i in stride(from: 5, through: 1, by: -1) {
    print(i)
}
/*
 5
 4
 3
 2
 1
 */
```

## while

`while`은 조건이 거짓일 때까지 반복을 수행한다.

진입할 때부터 조건이 거짓이면, 코드 블록이 실행되지 않는다.

```swift
var num = 5

while num > 0 {
    print(num)
    num -= 1
}
/*
 5
 4
 3
 2
 1
 */
```

## repeat-while

`repeat-while`은 다른 언어의 `do-while`과 유사하다.

`while`과 다르게 `repeat-while`은 조건과 관계없이 최소 1회 실행을 보장한다.

```swift
var num = -3

repeat {
    print(num)
    num -= 1
} while num > 0
// -3
```

## continue

반복문 안에서 `continue`를 만나면 현재 loop를 중지하고 다음 loop를 실행한다.

```swift
for i in 0..<5 {
    if i % 2 == 0 {
        continue
    }
    print(i)
}
/*
 1
 3
 */
```

## break

반복문 안에서 `break`를 만나면 loop를 즉시 종료한다.

```swift
for i in 0..<10 {
    if i == 5 {
        break
    }
    print(i)
}
/*
 0
 1
 2
 3
 4
 */
```

## 레이블

Swift는 제어문에 레이블을 붙여 구분할 수 있다.

레이블을 사용하지 않고 중첩 loop를 중단하려면 [이러한 방법](https://m.blog.naver.com/PostView.nhn?blogId=upssuyo&logNo=80092174516&proxyReferer=https:%2F%2Fwww.google.com%2F)을 써야 한다.

그러나 레이블을 사용하면 원하는 loop를 쉽고 명확하게 중단할 수 있다.

```swift
outer: for i in 0..<10 {
    inner: for j in 0..<10 {
        if j == 3 {
            break outer
        }
        print(i, j)
    }
}
/*
 0 0
 0 1
 0 2
 */
```

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html](https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html)
2. [https://m.blog.naver.com/PostView.nhn?blogId=upssuyo&logNo=80092174516&proxyReferer=https:%2F%2Fwww.google.com%2F](https://m.blog.naver.com/PostView.nhn?blogId=upssuyo&logNo=80092174516&proxyReferer=https:%2F%2Fwww.google.com%2F)
