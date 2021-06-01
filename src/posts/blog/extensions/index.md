---
title: "익스텐션(Extensions)"
category: "Swift Tutorial"
date: "2021-06-01 19:10:00 +09:00"
desc: "extensions"
---

Swift에서는 익스텐션<sup>Extensions</sup>을 통해 타입을 확장하여 구현할 수 있다.

원본 코드를 몰라도 가능하지만, 오버라이딩은 할 수 없다.

## 연산 프로퍼티

익스텐션은 `extension` 키워드를 사용하여 정의한다.

다음은 정수의 제곱과 세제곱을 반환하는 연산 프로퍼티<sup>Computed Properties</sup>를 구현한 것이다.

```swift
extension Int {
    var square: Int { return self * self }
    var cube: Int { return self * self * self }
}

print(3.square, 3.cube) // 9 27
```

저장 프로퍼티<sup>Stored Properties</sup>와 프로퍼티 옵저버<sup>Property Observers</sup>는 익스텐션에서 추가로 구현할 수 없다.

## 편의 이니셜라이저

익스텐션을 통해 편의 이니셜라이저<sup>Convenience Initializers</sup>를 추가로 구현할 수 있다.

편의 이니셜라이저의 특성상, 내부에서 지정 이니셜라이저<sup>Designated Initializers</sup>를 호출해야 한다.

```swift
extension Int {
    init(square: Int) {
        self.init(square * square)
    }
}

var num = Int(square: 5)
print(num) // 25
```

지정 이니셜라이저와 디이니셜라이저<sup>Deinitializers</sup>는 익스텐션에서 추가로 구현할 수 없다.

## 메서드

마찬가지로 익스텐션을 통해 인스턴스 메서드<sup>Instance Methods</sup>와 타입 메서드<sup>Type Methods</sup>를 추가로 구현할 수 있다.

```swift
extension Double {
    func square() -> Double {
        return self * self
    }
}

var num = 1.2
print(num.square()) // 1.44
```

자기 자신의 값을 변경하려면 `mutating` 키워드를 붙이고, `self`에 값을 대입하면 된다.

```swift
extension Double {
    mutating func square() {
        self *= self
    }
}

var num = 1.2
num.square()
print(num) // 1.44
```

타입 메서드는 `static` 키워드를 붙여 구현한다.

```swift
extension Double {
    static func swiftVersion() -> Double {
        return 5.4
    }
}

print(Double.swiftVersion()) // 5.4
```

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/Extensions.html](https://docs.swift.org/swift-book/LanguageGuide/Extensions.html)
