---
title: "프로토콜(Protocols)"
category: "Swift Tutorial"
date: "2021-06-05 19:00:00 +09:00"
desc: "protocols"
---

프로토콜<sup>Protocols</sup>은 프로퍼티, 메서드 등을 추상적으로 정의한 타입이다.

구조체, 클래스, 열거형 등에서 프로토콜을 채택<sup>Adopt</sup>하여 프로토콜의 요구사항에 맞게 실제로 구현한다.

이를 프로토콜에 순응<sup>Conform</sup>한다고 표현한다.

## 프로토콜 정의 및 채택

프로토콜은 `protocol` 키워드를 통해 정의할 수 있고, 채택은 상속처럼 `:`을 사용한다.

프로토콜도 하나의 타입이기 때문에 대문자 카멜 케이스를 사용한다.

```swift
protocol SomeProtocol {
    // ...
}

class SomeClass: SomeProtocol {
    // ...
}
```

## 요구사항

프로토콜 내부에는 추상적인 프로퍼티, 메서드, 이니셜라이저 등을 정의한다.

청사진을 제공하는 역할이기 때문에 구현은 하지 않고, 기본값도 지정할 수 없다.

### 프로퍼티 요구

프로퍼티를 요구하려면 프로퍼티의 이름, 타입 그리고 `get`, `set` 여부를 정의한다.

저장 프로퍼티인지 연산프로퍼티인지는 따로 정의하지 않는다.

기본값은 할당할 수 없다.

```swift
protocol Person {
    var name: String { get set }
    var age: Int { get }
}

class Student: Person {
    var name: String
    var age: Int
    
    init(name: String) {
        self.name = name
        self.age = 0
    }
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
}
```

이때, `age`처럼 `get`만 명시할 경우 `set`은 구현하지 않아도 상관없다.

타입 프로퍼티를 요구하려면 `var` 앞에 `static` 키워드를 붙이면 된다.

### 메서드 요구

메서드를 요구하려면 메서드의 이름과 파라미터, 반환 타입을 정의한다.

마찬가지로 파라미터에 기본값을 지정할 수 없다.

```swift
protocol Person {
    func info(id: Int)
}

class Student: Person {
    func info(id: Int) {
        print("학번: \(id)")
    }
}
```

구조체에서 인스턴스 내부의 값을 변경하려면 `mutating` 키워드를 사용해야 하는데,

프로토콜도 마찬가지로 `mutating` 키워드를 사용해야 한다.

클래스의 경우는 mutating function을 오버라이딩하더라도 `mutating` 키워드를 붙일 필요는 없다.

```swift
protocol Person {
    mutating func setName(name: String)
}

struct Student: Person {
    var name: String = "You"
    
    mutating func setName(name: String) {
        self.name = name
    }
}
```

타입 메서드를 요구하려면 `func` 앞에 `static` 키워드를 붙이면 된다.

### 이니셜라이저 요구

메서드와 마찬가지로 이니셜라이저를 요구할 때도 이름과 파라미터를 정의하는 것은 유사하다.

유의할 점은 클래스에서 구현할 때, `required`를 붙여 요구 이니셜라이저로 구현해야 한다.

```swift
protocol SomeProtocol {
    var someProperty: Int { get set }
    init(someParam: Int)
}

class ParentClass: SomeProtocol {
    var someProperty: Int
    required init(someParam: Int) {
        self.someProperty = someParam
    }
}
```

## 옵셔널 요구사항

프로토콜에 옵셔널 요구사항을 넣어 선택적으로 구현하도록 하고싶다면 `@objc` 속성을 사용해야 한다.

따라서 열거형, 구조체에서는 이러한 프로토콜을 채택할 수 없다.

```swift
import Foundation

@objc protocol SomeProtocol {
    var majorProperty: Int { get set }
    @objc optional var minorProperty: Int { get set }
}

class SomeClass: SomeProtocol {
    var majorProperty: Int = 0
}
```

## 프로토콜 합성

프로토콜은 구현을 하지 않기 때문에 다중 상속의 형태가 가능하다.

여러 프로토콜에 순응하는 타입을 나타낼 때는 `&`를 사용해 연결하여 표현한다.

다음은 `A`와 `B` 프로토콜을 동시에 순응하는 타입을 파라미터로 받는 예시이다.

```swift
protocol A {}
protocol B {}

func SomeFunc(someParam: A & B) {
    // ...
}
```

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/Protocols.html](https://docs.swift.org/swift-book/LanguageGuide/Protocols.html)
2. 야곰, 「스위프트 프로그래밍 3판」, 한빛미디어(2019), p371-391
3. [https://woongsios.tistory.com/88](https://woongsios.tistory.com/88)
