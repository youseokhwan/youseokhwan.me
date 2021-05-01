---
title: "메서드(method)"
category: "Swift Tutorial"
date: "2021-05-01 15:30:00 +09:00"
desc: "method"
---

클래스나 구조체 내부에 있는 함수를 메서드(method)라고 한다.

Swift에서는 각 인스턴스에서 실행할 수 있는 인스턴스 메서드와 메모리를 공유하는 타입 메서드로 세분화한다.

## 인스턴스 메서드

인스턴스 메서드(instance method)는 특정 클래스, 구조체의 인스턴스에 속한 메서드이다.

```swift
class Counter {
    var count = 0
    
    func increment(amount: Int) {
        count += amount
        print("count: \(count)")
    }
}

let counter = Counter()
counter.increment(amount: 5) // count: 5
```

`self` 프로퍼티는 인스턴스 자기 자신을 의미한다.

`self`를 사용하여 프로퍼티와 파라미터를 구분하거나, 프로퍼티임을 명확히 할 수 있다.

```swift
class Counter {
    var count = 0
    
    func increment(count: Int) {
        self.count += count
        print("count: \(count)")
    }
}
```

### 구조체에서 값 변경

구조체, 열거형은 값 타입이기 때문에 프로퍼티를 수정하려면 `mutating` 키워드를 사용해야 한다.

```swift
struct Counter {
    var count = 0
    
    mutating func increment(count: Int) {
        self.count += count
        print("count: \(count)")
    }
}

var counter = Counter()
counter.increment(count: 5) // count: 5
```

## 타입 메서드

타입 메서드(type method)는 타입 자체에 속하는 메서드이다.

C의 `static` 개념과 유사하며, Swift에서는 `static`과 `class` 키워드를 사용한다.

```swift
class Counter {
    static var count = 0
    
    static func add() {
        count += 1
    }
}

Counter.add()
Counter.add()
print(Counter.count) // 2
```

`static`으로 선언한 타입 메서드는 오버라이딩이 불가능하다.

오버라이딩을 허용하려면 `class` 메서드를 사용해야 한다.

```swift
class Counter {
    static var count = 0
    
    class func add() {
        count += 1
    }
}

class MinusCounter: Counter {
    class override func add() {
        count -= 1
    }
}

Counter.add()
MinusCounter.add()
print(Counter.count) // 0
```

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/Methods.html](https://docs.swift.org/swift-book/LanguageGuide/Methods.html)
