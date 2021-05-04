---
title: "문자열(Strings)"
category: "Swift Tutorial"
date: "2021-03-15 17:20:00 +09:00"
desc: "strings"
---

## 개요

`String`은 문자열을 저장할 수 있는 타입이다.

문자열에 대한 가치관은 언어마다 상이하지만, 그중 Swift는 매우 독특하다.

가장 큰 특징은 유니코드에 특화된 언어라는 점이다.

숫자, 알파벳, 한글, 한자는 물론이고 심지어 이모지(🤔, 🇰🇷)까지도 모두 1개의 문자로 처리하며,

각 문자의 크기는 `Index` 타입으로 처리하기 때문에 개발자의 부담이 적다.

그러나 숫자 인덱스를 사용할 수 없다는 큰 불편함도 있다.

```swift
let str = "Hello, World!"
print(str[1]) // error!
```

위와 같은 코드는 `Index` 타입을 사용하여 다음과 같이 작성해야 한다.

```swift
let str = "Hello, World!"
print(str[str.index(str.startIndex, offsetBy: 1)]) // e
```

Swift의 문자열 처리 방법이 다른 언어보다 더 나은지에 대한 판단은 각자의 몫이지만,

문자열 처리를 개선하기 위한 선배 개발자들의 많은 고민이 녹아있음은 확인할 수 있을 것이다.

## 문자열 표현 방법

문자열은 큰따옴표(`"`)로 표현한다. (작은따옴표(`'`)를 사용하면 컴파일 에러가 발생한다)

```swift
var str = "Hello, World!"
```

큰따옴표(`"`) 3개를 사용하면 여러 줄 문자열을 표현할 수 있다.

```swift
var str = """
\" 3개를 사용하면
여러 줄 문자열을
표현할 수 있다.
"""
```

## 유니코드 결합

유니코드의 경우 여러 문자가 결합하여 새로운 문자를 표현할 수 있다.

예를 들어 `ㅎ`, `ㅏ`, `ㄴ`의 유니코드는 각각 `U+1112`, `U+1161`, `U+11AB`이다.

```swift
print("\u{1112}") // ㅎ
print("\u{1161}") // ㅏ
print("\u{11AB}") // ㄴ
```

그러나 연속으로 사용될 경우 `한`으로 결합하여 표현된다.

이렇게 표현된 문자는 3글자가 아닌 1글자로 본다.

```swift
var letter = "\u{1112}\u{1161}\u{11AB}"
print(letter) // 한
print(letter.count) // 1
```

## 문자열 생성 및 초기화

빈 문자열을 생성하는 방법은 다음과 같다.

```swift
var str1 = ""
var str2 = String()
```

리터럴을 이용해 생성 및 초기화를 하는 방법은 다음과 같다.

```swift
var str1 = "Hello, World!"
var str2 = String("Hello, World!")
var str3 = "Hello, " + "World!"
```

`[Character]`로 초기화할 수도 있다.

```swift
var arr: [Character] = ["H", "e", "l", "l", "o"]
var str = String(arr)
print(str) // Hello
```

## 문자 개수 확인

`isEmpty` 프로퍼티를 사용하면 문자열이 비어있는지 확인할 수 있다.

```swift
var str1 = String()
print(str1.isEmpty) // true

var str2 = "Hello"
if !str2.isEmpty {
    print("문자열이 비어있지 않음") // 문자열이 비어있지 않음
}
```

문자의 개수는 `count` 프로퍼티를 통해 확인할 수 있다.

```swift
var str = "Swift"
print(str.count) // 5
```

## 문자열 보간

문자열 보간(interpolation)은 `\()` 형태로 가능하다.

```swift
var name = "석환"
var age = 25

print("\(name)의 나이는 \(age)살이다.") // 석환의 나이는 25살이다.
```

## 문자열 결합

문자열을 결합은 `+` 연산자 혹은 `append(_:)` 메서드를 사용한다.

```swift
var str = "Hello, " + "World!"
print(str) // Hello, World!

str.append(" Hello, Swift!")
print(str) // Hello, World! Hello, Swift!
```

## 문자열 복사

`String`은 value type이므로 복사한 문자열을 수정해도 원본 문자열이 수정되진 않는다.

```swift
var str1 = "Hello"
var str2 = str1
str2 = "World"

print(str1) // Hello
print(str2) // World
```

## 문자열 비교

두 문자열이 같은지 확인하려면 `==`, `!=` 연산자를 사용한다.

```swift
var str1 = "Swift"
var str2 = "Python"

print(str1 == str2) // false
print(str1 != str2) // true
```

부등호를 사용하면 사전 순으로 어떤 단어가 먼저인지 비교할 수 있다.

```swift
var str1 = "Cat".lowercased()
var str2 = "Dog".lowercased()

print(str1 < str2) // true
```

## 문자열 순회

`for-in` 구문을 사용하여 문자열을 순회할 수 있다.

```swift
var str = "Hello"

for item in str {
    print(item)
}
/*
 H
 e
 l
 l
 o
 */
```

앞에서도 언급했지만, 아래처럼 접근하는 것은 불가능하다.

```swift
var str = "Hello"

for i in 0..<str.count {
    print(str[i]) // error!
}
```

## Substring

범위 연산자 혹은 `split(separator:)` 메서드 등을 사용하면 `String`이 아닌 `Substring`을 얻는다.

```swift
var str = "Hello, World!"
var index = str.firstIndex(of: ",") ?? str.endIndex
var substr = str[..<index]

print(substr) // Hello
print(type(of: substr)) // Substring
```

`Substring` 타입은 원본 `String`의 값을 참조한다.

따라서 원본 `String`은 필요하지 않고 `Substring`만 계속 사용할 예정이라면

`String`으로 캐스팅하여 사용해야 메모리를 절약할 수 있다.

## Index 사용하기

앞서 숫자 인덱스를 통한 접근 대신 `Index`를 사용한다고 언급하였다.

`Index`를 사용하는 방법은 다음과 같다.

### startIndex

가장 기본이 되는 `startIndex`는 해당 문자열의 시작 인덱스를 반환한다.

이 인덱스로 문자열에 접근하면 첫 번째 문자를 얻을 수 있다.

```swift
var str = "Swift"
var idx = str.startIndex
print(str[idx]) // S
```

### endIndex

`endIndex`는 마지막 문자의 다음 인덱스를 반환한다.

마지막 문자의 인덱스를 반환하는 게 아니기 때문에 `startIndex`와 같은 방식으로 접근하면 에러가 발생한다.

```swift
var str = "Swift"
var idx = str.endIndex
print(str[idx]) // error!
```

마지막 글자를 얻고 싶다면 `index(before:)`를 사용해야 한다.

```swift
var str = "Swift"
var idx = str.endIndex
print(str[str.index(before: idx)]) // t
```

### 특정 위치에 접근하기

`index(_:offsetBy:)` 메서드를 사용하면 '앞에서 3번째 문자' 혹은 '뒤에서 2번째 문자' 등으로 접근할 수 있다.

```swift
var str = "Swift"
var startIdx = str.startIndex
var endIdx = str.endIndex

print(str[str.index(startIdx, offsetBy: 1)]) // w
print(str[str.index(endIdx, offsetBy: -2)]) // f
```

### 원하는 문자 찾기

`firstIndex(of:)` 메서드를 사용하여 원하는 문자가 처음 등장하는 인덱스 값을 얻을 수 있다.

다음은 "Swift" 문자열에서 "f" 문자를 찾는 코드이고, 편의상 강제 언래핑을 사용하였다.

```swift
var str = "Swift"
var fIdx = str.firstIndex(of: "f")!
print(str[fIdx]) // f
```

### 문자 삽입

특정 `Character`를 삽입하려면 `insert(_:at:)` 메서드를 사용한다.

```swift
var str = "Swift Programming"
var idx = str.startIndex

str.insert(",", at: str.index(idx, offsetBy: 5))
print(str) // Swift, Programming
```

특정 `String`을 삽입하려면 `insert(contentsOf:at:)` 메서드를 사용한다.

```swift
var str = "Swift Programming"
var idx = str.startIndex

str.insert(contentsOf: " 5.4", at: str.index(idx, offsetBy: 5))
print(str) // Swift 5.4 Programming
```

### 문자열 치환

문자열을 치환하려면 `replaceSubrange(_:with:)` 메서드를 사용한다.

```swift
var str = "Today is Sunday"
var range = str.index(str.startIndex, offsetBy: 9)..<str.index(str.startIndex, offsetBy: 12)

str.replaceSubrange(range, with: "Mon")
print(str) // Today is Monday
```

### 문자 삭제

특정 `Character`를 삭제하려면 `remove(_:at:)` 메서드를 사용한다.

```swift
var str = "Swift"
str.remove(at: str.startIndex)
print(str) // wift
```

`removeSubrange(_:)` 메서드를 사용하여 원하는 범위를 삭제할 수도 있다.

```swift
var str = "Swift"
var range = str.index(str.startIndex, offsetBy: 1)..<str.index(str.endIndex, offsetBy: -1)

str.removeSubrange(range)
print(str) // St
```

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/StringsAndCharacters.html](https://docs.swift.org/swift-book/LanguageGuide/StringsAndCharacters.html)
2. [https://developer.apple.com/swift/blog/?id=10](https://developer.apple.com/swift/blog/?id=10)
3. [https://medium.com/@esung/swift%EC%9D%98-%EB%AC%B8%EC%9E%90%EC%97%B4%EA%B3%BC-%EC%9C%A0%EB%8B%88%EC%BD%94%EB%93%9C-af37a5d503a4](https://medium.com/@esung/swift%EC%9D%98-%EB%AC%B8%EC%9E%90%EC%97%B4%EA%B3%BC-%EC%9C%A0%EB%8B%88%EC%BD%94%EB%93%9C-af37a5d503a4)
4. [https://hcn1519.github.io/articles/2017-07/swift_Str](https://hcn1519.github.io/articles/2017-07/swift_Str)
