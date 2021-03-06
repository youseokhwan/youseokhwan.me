---
title: "기본 데이터 타입"
category: "Swift Tutorial"
date: "2021-02-27 19:45:00 +09:00"
desc: "basic-data-types"
---

이번 포스트에서는 Swift의 기본적인 데이터 타입을 살펴보도록 하겠다.

Swift도 `Int`, `Double`, `String` 등 익숙한 키워드를 사용하지만

모두 구조체로 구현되어있기 때문에 원시 타입<sup>Primitive Types</sup>은 아니며, 익스텐션<sup>Extensions</sup>을 사용할 수 있다.

모든 데이터 타입은 대문자 카멜 케이스<sup>Camel Case</sup>를 사용한다.

## Numbers

### Integers

정수는 범용적으로 쓸 수 있는 `Int`와 함께 8, 16, 32, 64비트 크기의 `Int8`, `Int16`, `Int32`, `Int64`를 제공한다.

`Int8`, `Int16`, `Int32`, `Int64`의 범위는 다음과 같다.

```swift
print(Int8.min, Int8.max)
// -128 127

print(Int16.min, Int16.max)
// -32768 32767

print(Int32.min, Int32.max)
// -2147483648 2147483647

print(Int64.min, Int64.max)
// -9223372036854775808 9223372036854775807
```

`Int`의 크기는 현재 플랫폼의 Word Size에 맞게 조정된다.

예를 들어, 현재 이 글을 작성하고 있는 맥북은 64비트 플랫폼이므로 `Int`의 크기는 `Int64`와 같다.

```swift
print(Int.min, Int.max)
// -9223372036854775808 9223372036854775807

print(Int64.min, Int64.max)
// -9223372036854775808 9223372036854775807
```

꼭 필요한 경우가 아니라면 코드 일관성과 상호 운용성을 고려해 범용적인 `Int`를 사용하는 것이 좋다.

또한 Swift는 Unsigned 타입인 `UInt`, `UInt8`, `UInt16`, `UInt32`, `UInt64`도 지원한다.

### Floating-Point Numbers

부동소수점의 경우 `Float`과 `Double`이 있다.

`Double`은 64비트를 사용하며, 소수점 이하 15자리의 정밀도를 가진다.

`Float`은 32비트를 사용하며, 소수점 이하 6자리의 정밀도를 가진다.

Type Annotation을 명시하지 않으면 부동소수점은 `Double`로 추론된다.

```swift
var floatPi: Float = 3.141592
print(type(of: floatPi)) // Float

var pi = 3.141592653589793
print(type(of: pi)) // Double
```

## Booleans

Swift는 논리 값으로 `true`와 `false`를 제공한다.

```swift
var swiftIsProgrammingLanguage = true
var htmlIsProgrammingLanguage = false
```

## Characters

`Character`의 경우 큰따옴표로 감싸서 표현할 수 있으며, 유니코드를 지원한다.

단, Type Annotation을 명시하지 않으면 `String`으로 추론되므로 주의해야 한다.

```swift
var smile: Character = "😊"

var sleep = "😪"
print(type(of: sleep)) // String
```

## Strings

`String` 또한 큰따옴표로 감싸서 표현할 수 있다.

선언 및 초기화 방법은 다음과 같다.

```swift
var str1 = String() // 빈 문자열 생성
var str2 = "Hello, World!"
var str3 = String(repeating: "A", count: 3) // "AAA"
```

문자열을 이어붙이려면 `append()` 혹은 `+` 연산자를 사용하며,

문자열 비교는 `==` 연산자를 통해 직관적으로 비교할 수 있다.

```swift
var str4 = "Hello, "
str4.append("World!")
var str5 = "Hello, " + "World!"

if str4 == str5 {
    print("같은 문자열입니다.")
}
```

`String` 타입은 양이 많고 중요한 내용이 있어 구체적인 내용은 [이 포스팅](https://youseokhwan.me/blog/string/)에서 다루도록 한다.

## Tuples

튜플<sup>Tuples</sup>은 여러 데이터 타입을 결합한 데이터 타입이다.

모든 데이터 타입을 사용할 수 있고, 동일한 데이터 타입이 아니어도 된다.

```swift
var tuple1: (Int, Int) = (10, 20)
var tuple2 = (1, "Swift", (0.5, false), [1, 2, 3])
```

각 요소에는 인덱스로 접근할 수 있고, 개별 요소에 이름이 있는 경우 이름으로도 접근할 수 있다.

```swift
var person = (name: "You", age: 25)

print(person.0, person.1)
// You 25

print(person.name, person.age)
// You 25
```

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html)
