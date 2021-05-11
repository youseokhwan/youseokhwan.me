---
title: "상속(Inheritance)"
category: "Swift Tutorial"
date: "2021-05-07 16:05:00 +09:00"
desc: "inheritance"
---

클래스의 대표적인 특징 중 하나는 상속이 가능하다는 점이다.

상속을 통해 부모 클래스의 요소를 사용하거나 상황에 맞게 재정의하여 사용할 수 있다.

### 예시

먼저 부모 클래스인 `Person`을 정의한다.

```swift
class Person {
    var name: String
    var age: Int
    
    init(_ name: String, _ age: Int) {
        self.name = name
        self.age = age
    }
    
    func desc() {
        print("name: \(name), age: \(age)")
    }
}
```

이후 `Person`을 상속받는 `Student` 클래스를 정의한다.

클래스나 프로토콜 등을 상속받을 때는 `:`을 붙여 명시한다.

```swift
class Student: Person {
    var major: String
    
    init(_ name: String, _ age: Int, _ major: String) {
        self.major = major
        super.init(name, age)
    }
    
    override func desc() {
        print("name: \(name), age: \(age), major: \(major)")
    }
}
```

`Student` 내부에는 정의하지 않았지만, `Person`을 상속받았기 때문에 `name`, `age` 프로퍼티를 사용할 수 있다.

부모 클래스의 요소는 `super` 키워드를 통해 접근할 수 있고, `final`이 아닌 요소들은 오버라이딩할 수 있다.

```swift
let s = Student("Alice", 25, "Computer Science")
s.desc() // name: Alice, age: 25, major: Computer Science
```

상속을 통해 기능을 재구현하는 것을 서브클래싱<sup>Subclassing</sup>이라고도 한다.

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/Inheritance.html](https://docs.swift.org/swift-book/LanguageGuide/Inheritance.html)
