---
title: "초기화(Initialization) ②"
category: "Swift Tutorial"
date: "2021-05-20 15:15:00 +09:00"
desc: "initialization-2"
---

[초기화(Initialization) ①](https://youseokhwan.me/blog/initialization-1/)

## 클래스의 초기화

클래스의 경우 상속이 가능하기 때문에 값 타입에 비해 초기화 과정이 조금 더 복잡하다.

클래스의 이니셜라이저는 지정 이니셜라이저와 편의 이니셜라이저로 구분한다.

### 지정 이니셜라이저

지정 이니셜라이저<sup>Designated Initializers</sup>는 모든 클래스가 1개 이상은 가져야 하는 주<sup>Primary</sup> 생성자이다.

문법은 값 타입의 이니셜라이저와 같다.

```swift
class Person {
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
}
```

### 편의 이니셜라이저

편의 이니셜라이저<sup>Convenience Initializers</sup>는 미리 지정된 값을 사용하여 최소한의 입력으로 초기화를 할 수 있도록 한다.

필수 요소는 아니며, 편의 이니셜라이저 안에서 최종적으로는 지정 이니셜라이저를 반드시 호출해야 한다.

`convenience init` 키워드를 사용한다.

```swift
class Person {
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
    
    convenience init(name: String) {
        self.init(name: name, age: 25)
    }
}

let p = Person(name: "You")
print(p.age) // 25
```

## 클래스의 이니셜라이저 위임

지정 이니셜라이저와 편의 이니셜라이저는 다음 3가지 규칙을 따른다.

1. 자식 클래스의 지정 이니셜라이저는 부모 클래스의 지정 이니셜라이저를 반드시 호출한다.
2. 편의 이니셜라이저는 같은 클래스 내의 다른 이니셜라이저를 반드시 호출한다.
3. 편의 이니셜라이저는 궁극적으로 지정 이니셜라이저를 반드시 호출한다.

지정 이니셜라이저는 반드시 부모 클래스의 지정 이니셜라이저를 호출하기 때문에 기둥 역할을 한다.

2번의 경우 편의 이니셜라이저 안에서 다른 편의 이니셜라이저를 호출해도 무관하지만,

3번에 의해 마지막에 호출된 편의 이니셜라이저는 지정 이니셜라이저를 궁극적으로 호출하게 된다.

다음은 이해를 돕기 위해 공식문서에서 제공하는 도식이다.

![initializer-delegation-for-class.png](/initializer-delegation-for-class.png)

## 2단계 초기화

Swift에서 클래스의 초기화는 2단계로 진행된다.

1단계에서는 각 저장 프로퍼티에 초깃값이 할당되며, 2단계에서는 저장 프로퍼티를 커스터마이징한다.

최소 1단계를 마쳐야 유효한 인스턴스가 되며, 컴파일러는 다음 4단계의 안전확인을 진행한다.

1. 지정 이니셜라이저가 부모 클래스의 지정 이니셜라이저를 호출하기 전에 프로퍼티를 모두 초기화했는지 확인
2. 지정 이니셜라이저가 상속받은 프로퍼티에 값을 할당하기 전에 부모 클래스의 지정 이니셜라이저를 호출했는지 확인
3. 편의 이니셜라이저가 프로퍼티에 값을 할당하기 전에 다른 이니셜라이저를 호출했는지 확인
4. 1단계가 마무리되기 전에 인스턴스 프로퍼티, 인스턴스 메서드를 호출하지 않았는지 확인 및 `self`의 값을 참조하지 않았는지 확인

## 이니셜라이저 상속 및 오버라이딩

일반적으로는 무분별한 초기화를 방지하기 위해 부모 클래스의 이니셜라이저를 상속받지 않는다.

부모 클래스의 이니셜라이저를 자식 클래스에서 사용하고 싶다면 `override` 키워드를 붙여 재정의하면 된다.

```swift
class Person {
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
    
    convenience init(name: String) {
        self.init(name: name, age: 0)
    }
}

class Student: Person {
    var major: String
    
    override init(name: String, age: Int) {
        self.major = "Swift"
        super.init(name: name, age: age)
    }
    
    convenience init(name: String) {
        self.init(name: name, age: 7)
    }
}
```

편의 이니셜라이저의 경우 어차피 부모 클래스의 편의 이니셜라이저를 호출할 수 없으므로 굳이 `override`를 붙이지 않는다.

### 자동으로 상속되는 경우

일반적으로는 상속되지 않지만, 자식 클래스의 모든 프로퍼티에 기본값을 할당하면 다음 규칙에 따라 자동으로 상속된다.

1. 자식 클래스에서 별도의 지정 이니셜라이저를 구현하지 않으면 자동으로 부모 클래스의 모든 지정 이니셜라이저를 상속받는다.
2. 1번에 의해 자동 상속되었거나, 부모 클래스의 모든 지정 이니셜라이저를 모두 오버라이딩한 경우에는 부모 클래스의 모든 편의 이니셜라이저를 상속받는다.

```swift
class Person {
    var name: String
    
    init(name: String) {
        self.name = name
    }
    
    convenience init() {
        self.init(name: "Unknown")
    }
}

class Student: Person {
    var major: String = "Swift"
}

let s1 = Student(name: "You")
let s2 = Student()
print(s1.name, s2.name) // You Unknown
```

## 필수 이니셜라이저

`required` 키워드를 붙이면 필수 이니셜라이저<sup>Required Initializers</sup>가 된다.

이는 자식 클래스에서 반드시 오버라이딩 해야 함을 명시한다.

오버라이딩할 때도 `required` 키워드를 붙인다.

```swift
class Person {
    var name: String
    
    required init(name: String) {
        self.name = name
    }
}

class Student: Person {
    var major: String
    
    required init(name: String) {
        self.major = "Unknown"
        super.init(name: name)
    }
}

let s = Student(name: "You")
print(s.name, s.major) // You Unknown
```

## 디이니셜라이저

디이니셜라이저<sup>Deinitializers</sup>는 이니셜라이저와 반대로 인스턴스가 소멸하기 직전에 호출된다.

`deinit` 키워드를 사용하며, 클래스에서만 사용할 수 있다.

또한, 수동으로 호출할 수 없고 컴파일러에 의해 자동으로 호출된다.

아래는 디이니셜라이저를 호출시키기 위해 임의로 구현한 코드이다.

```swift
func temp() {
    let c = Counter()
    
    // ...
}

class Counter {
    static var count = 100
    
    deinit {
        Self.count -= 1
    }
}

temp()
temp()
temp()

print(Counter.count) // 97
```

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/Initialization.html](https://docs.swift.org/swift-book/LanguageGuide/Initialization.html)
2. 야곰, 「스위프트 프로그래밍 3판」, 한빛미디어(2019), p336-354
3. [https://docs.swift.org/swift-book/LanguageGuide/Deinitialization.html](https://docs.swift.org/swift-book/LanguageGuide/Deinitialization.html)
