---
title: "프로퍼티(Properties)"
category: "Swift Tutorial"
date: "2021-04-27 23:20:00 +09:00"
desc: "properties"
---

클래스나 구조체 내부에 있는 변수와 함수는 각각 필드(혹은 프로퍼티)와 메서드로 부른다.

프로퍼티(properties)는 객체의 속성을 나타낸다는 점에서는 필드와 유사하나

getter, setter와 같은 기능을 사용할 수 있다는 점에서는 메서드와 유사한 부분도 있다.

Swift는 크게 저장 프로퍼티, 연산 프로퍼티, 타입 프로퍼티를 지원한다.

## 저장 프로퍼티

저장 프로퍼티는 단순히 값을 저장하는 필드의 개념이다.

```swift
class Point {
    let x: Int
    var y: Int
    
    init(_ x: Int, _ y: Int) {
        self.x = x
        self.y = y
    }
}

var p = Point(2, 3)
p.y = 10
print(p.x, p.y) // 2 10
```

### 지연 저장 프로퍼티

`lazy` 키워드를 사용하면 지연 저장을 할 수 있다.

인스턴스가 생성될 때 값이 초기화돼있지 않아도 되며, 이후에 값을 초기화 할 수 있다.

```swift
class Point {
    let x: Int = 0
    lazy var y: Int = Int(10)
}

var p = Point()
dump(p) // 0, nil
print(p.y) // 10
```

`p.y`가 호출되기 전까지는 `nil`로 저장돼있다가, 호출되는 순간 초기화된다.

## 연산 프로퍼티

연산 프로퍼티는 호출될 때마다 값을 연산하여 반환하는 프로퍼티이다.

`get`과 `set` 키워드를 이용해 구현할 수 있다.

```swift
class Point {
    var x = 2
    var y = 3
    
    var computedProperty: Int {
        get {
            return x + y
        }
        set(value) {
            self.y = value
        }
    }
}

var p = Point()
print(p.computedProperty) // 5
p.computedProperty = 10
print(p.x, p.y) // 2 10
```

`set`의 경우 매개변수를 생략하면 자동으로 `newValue`를 사용한다.

```swift
set {
    self.y = newValue
}
```

### 읽기 전용 프로퍼티

`get`, `set` 키워드를 생략하고 `return`만 명시하면 읽기 전용 프로퍼티를 만들 수 있다.

```swift
class Point {
    var x = 2
    var y = 3
    
    var computedProperty: Int {
        return x + y
    }
}

var p = Point()
print(p.computedProperty) // 5
```

### 프로퍼티 옵저버

Swift는 프로퍼티의 값이 초기화될 때마다 원하는 동작을 할 수 있도록 옵저버를 제공한다.

`willSet`은 값이 초기화되기 직전에 호출되고, `didSet`은 값이 변경된 직후에 호출된다.

`set`과 마찬가지로 매개변수를 생략하고 각각 `newValue`와 `oldValue`를 사용할 수 있다.

```swift
class Point {
    var x = 2 {
        willSet {
            print("값이 \(self.x)에서 \(newValue)로 변경될 예정")
        }
        didSet {
            print("값이 \(oldValue)에서 \(self.x)로 변경되었음")
        }
    }
}

var p = Point()
p.x = 5
/*
 값이 2에서 5로 변경될 예정
 값이 2에서 5로 변경되었음
 */
```

## 타입 프로퍼티

타입 프로퍼티는 각각에 인스턴스에 속하는 값이 아닌 타입 자체에 속하는 값이다.

C의 `static` 개념과 유사하며, Swift에서도 `static` 키워드를 사용한다.

```swift
class Point {
    static var typePropertyCount = 0
    
    func addCount() {
        Self.typePropertyCount += 1
    }
}

var p1 = Point()
var p2 = Point()

print(Point.typePropertyCount) // 0
p1.addCount()
print(Point.typePropertyCount) // 1
p2.addCount()
print(Point.typePropertyCount) // 2
```

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/Properties.html](https://docs.swift.org/swift-book/LanguageGuide/Properties.html)
