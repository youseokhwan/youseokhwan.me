---
title: "초기화(Initialization) ①"
category: "Swift Tutorial"
date: "2021-05-15 19:00:00 +09:00"
desc: "initialization-1"
---

초기화<sup>Initialization</sup>는 클래스, 구조체 및 열거형의 인스턴스를 사용하기 위한 준비과정이다.

Swift에서는 `init` 키워드를 통해 생성자를 직접 구현할 수 있다.

## 문법

기본적인 형태는 다음과 같다.

```swift
class Person {
    init() {
        // ...
    }
}
```

## 기본값

초기화가 완료되려면 옵셔널을 제외한 모든 저장 프로퍼티의 값이 확정돼야 한다.

따라서 프로퍼티에 기본값을 지정하거나, `init` 블록 안에서 값을 초기화해야 한다.

```swift
class Person {
    var name: String
    var age: Int = 0
    
    init() {
        name = ""
    }
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
}
```

만약 값이 확정되지 않은 저장 프로퍼티가 있으면 컴파일 에러가 발생한다.

```swift
class Person {
    var name: String
    var age: Int = 0

    init(age: Int) { // Error - Return from initializer without initializing all stored properties
        self.age = age
    }
}
```

## 멤버와이즈 이니셜라이저

값 타입인 구조체와 열거형의 경우, 사용자 정의 이니셜라이저가 없다면 멤버와이즈 이니셜라이저<sup>Memberwise Initializers</sup>를 제공한다.

이 생성자는 프로퍼티의 이름을 그대로 파라미터 이름으로 사용한다.

```swift
struct Person {
    var name: String
    var age: Int
}

var p = Person(name: "You", age: 25)
print(p) // Person(name: "You", age: 25)
```

## 초기화 위임

구조체와 열거형의 경우, `init`에서 다른 `init`을 호출(위임)할 수 있다.

```swift
struct Person {
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
    
    init(name: String, birthYear: Int) {
        self.init(name: name, age: 2021 - birthYear + 1)
    }
}

var p = Person(name: "You", birthYear: 1997)
print(p) // Person(name: "You", age: 25)
```

클래스는 상속하는 경우를 제외하고는 다른 `init`을 호출할 수 없다.

## 실패 가능한 이니셜라이저

이니셜라이저를 옵셔널로 구현하면 실패 가능한 이니셜라이저<sup>Failable Initializers</sup>를 구현할 수 있다.

`return nil` 구문은 초기화에 실패했음을 의미한다.

```swift
struct Person {
    var name: String
    var age: Int
    
    init?(name: String, age: Int) {
        guard !name.isEmpty else {
            return nil
        }
        
        self.name = name
        self.age = age
    }
}

var p1 = Person(name: "You", age: 25)
print(p1?.name ?? "nil") // You

var p2 = Person(name: "", age: 25)
print(p2?.name ?? "nil") // nil
```

[초기화(Initialization) ②](https://youseokhwan.me/blog/initialization-2/)

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/Initialization.html](https://docs.swift.org/swift-book/LanguageGuide/Initialization.html)
