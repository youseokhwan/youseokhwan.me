---
title: "서브스크립트(Subscripts)"
category: "Swift Tutorial"
date: "2021-05-04 20:00:00 +09:00"
desc: "subscripts"
---

클래스, 구조체 및 열거형에 서브스크립트(Subscripts)를 정의할 수 있다.

서브스크립트를 정의하면 컬렉션, 리스트 등의 타입에 특정 요소에 간단하게 접근할 수 있다.

예를 들면, `Array`에서 `arr[0]`으로 첫 번째 요소에 접근하거나, `Dictionary`에서 `dic["key"]`로 원하는 요소에 접근하는 것과 같은 맥락이다.

## 정의 및 사용

서브스크립트의 구조는 `subscript` 키워드를 사용하는 것을 제외하면 연산 프로퍼티와 유사하다.

숫자로 접근하면 영단어를 반환하고, 영단어로 접근하면 숫자를 반환하는 `Month` 구조체를 예시로 들어보겠다.

인덱스 범위를 검사하는 과정은 생략하였다.

```swift
struct Month {
    var arr = ["January", "February", "March", "April", "May", "June",
               "July", "August", "September", "October", "November", "December"]
    
    subscript(input: Int) -> String {
        get {
            return arr[input - 1]
        }
        set {
            arr[input - 1] = newValue
        }
    }
    
    subscript(input: String) -> Int {
        return (arr.firstIndex(of: input) ?? -1) + 1
    }
}

var month = Month()
print(month[5]) // May
print(month["August"]) // 8

month[5] = "Good"
print(month[5]) // Good
```

아래 서브스크립트처럼 읽기 전용인 경우 `get`, `set` 키워드를 생략할 수 있다.

## 타입 서브스크립트

타입 프로퍼티, 타입 메서드와 마찬가지로 타입 자체에 속하는 서브스크립트를 정의할 수 있다.

서브스크립트 앞에 `static` 혹은 `class` 키워드를 붙여 정의한다.

```swift
class Month {
    static var arr = ["January", "February", "March", "April", "May", "June",
               "July", "August", "September", "October", "November", "December"]
    
    class subscript(input: String) -> Int {
        return (arr.firstIndex(of: input) ?? -1) + 1
    }
}

print(Month["June"]) // 6
```

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/Subscripts.html](https://docs.swift.org/swift-book/LanguageGuide/Subscripts.html)
