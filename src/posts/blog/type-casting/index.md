---
title: "타입 캐스팅(Type Casting)"
category: "Swift Tutorial"
date: "2021-05-29 22:30:00 +09:00"
desc: "type-casting"
---

일반적으로 타입 캐스팅<sup>Type Casting</sup>은 자료형을 변환하는 것을 의미하지만, Swift에서는 다음 2가지 의미로 사용한다.

1. 인스턴스의 타입 확인(`is`)
2. 인스턴스를 부모 클래스나 자식 클래스로 취급(`as`)

## 타입 확인

`is` 연산자를 사용하여 인스턴스의 타입을 확인할 수 있다.

```swift
var num: Int = 0

print(num is Int) // true
print(num is Double) // false
```

해당 인스턴스의 부모 클래스나 프로토콜 등도 `true`를 반환한다는 점에 유의한다.

```swift
protocol Animal {}
class Dog {}
class Poodle: Dog, Animal {}

let p = Poodle()

print(p is Dog) // true
print(p is Animal) // true
print(p is Any) // true
```

## 다운캐스팅

부모 클래스 타입을 자식 클래스 타입으로 캐스팅하는 것을 다운캐스팅<sup>Downcasting</sup>이라고 한다.

다운캐스팅이 실패 가능성이 있는 경우 `as?` 연산자를 사용하고, 실패하면 `nil`을 반환한다.

```swift
class Animal {}
class Dog: Animal {}
class Cat: Animal {}

let animals = [Cat(), Dog(), Animal()]

for item in animals {
    if let cat = item as? Cat {
        print("고양이")
    } else if let dog = item as? Dog {
        print("강아지")
    } else {
        print("알 수 없음")
    }
}
```

다운캐스팅의 성공을 확신할 수 있는 경우 `as!` 연산자를 사용한다.

만약 실패하면 런타임 에러가 발생한다.

```swift
class Animal {}
class Cat: Animal {
    func desc() { print("고양이") }
}

let animals = [Cat(), Cat(), Cat()]

for item in animals {
    let cat = item as! Cat
    cat.desc()
}
```

컴파일러가 확신할 수 있다면 `as!` 대신 `as`를 사용할 수 있다.

## Any, AnyObject

`Any`는 함수를 포함한 모든 타입을 나타내고, `AnyObject`는 모든 클래스의 인스턴스를 나타낸다.

Swift는 타입에 엄격하므로 `Any` 혹은 `AnyObject`를 다룰 때 `as`를 통해 타입캐스팅할 필요가 있다.

```swift
func check(_ item: Any) {
    if item is Int {
        print("Int")
    } else if item is String {
        print("String")
    }
}

check(3) // Int
check("Hello") // String
```

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/TypeCasting.html](https://docs.swift.org/swift-book/LanguageGuide/TypeCasting.html)
