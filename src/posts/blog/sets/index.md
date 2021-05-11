---
title: "세트(Sets)"
category: "Swift Tutorial"
date: "2021-03-10 14:30:00 +09:00"
desc: "sets"
---

Swift의 컬렉션 타입 중 하나인 `Set`에 대해 알아보겠다.

`Set` 타입은 수학적으로 집합과 유사하다.

순서가 없는 리스트<sup>Unordered List</sup>이며, 중복된 값을 허용하지 않는다.

## 선언 및 초기화

`Set`은 배열과 마찬가지로 대괄호를 사용하기 때문에 Type Annotation을 사용해야 한다.

배열의 `[Int]`나 딕셔너리의 `[String:Int]`와 같은 축약형은 따로 없다.

```swift
// 빈 Set 선언
var set1 = Set<Character>()

// 리터럴을 이용한 선언 및 초기화
var set2: Set<Int> = [1, 2, 3]

// 캐스팅을 이용한 선언 및 초기화
var set3 = [1.0, 2.0, 3.0] as Set
```

`Set`의 요소는 `Hashable` 프로토콜을 따라야 한다.

해시 가능한 값이 아니면 다음과 같이 컴파일 에러가 발생한다.

```swift
var anySet: Set<Any> = [] // Error! - Type 'Any' does not conform to protocol 'Hashable'
```

## Set의 크기 확인

`isEmpty` 프로퍼티를 사용하면 `Set`이 비어있는지 확인할 수 있다.

```swift
var set1: Set<Int> = []
print(set1.isEmpty) // true

var set2: Set = [1, 2, 3]
if !set2.isEmpty {
    print("Set이 비어있지 않음") // Set이 비어있지 않음
}
```

`Set`의 크기(원소의 개수)는 `count` 프로퍼티를 통해 확인할 수 있다.

```swift
var lang: Set = ["Swift", "Java", "C++", "Python"]
print(lang.count) // 4
```

## Set 순회

`Set`의 전체 요소를 순회하려면 다음과 같이 `for-in` 루프를 사용한다.

```swift
var num: Set = [1, 2, 3, 4, 5]
for item in num {
    print(item) // 2, 1, 3, 5, 4
}
```

`Set`은 순서가 없는 리스트기 때문에 출력 순서는 실행할 때마다 달라질 수 있다.

## 특정 요소가 존재하는지 확인

`contains(_:)` 메서드를 사용하면 특정 요소가 존재하는지 확인할 수 있다.

존재하면 `true`, 존재하지 않으면 `false`를 반환한다.

```swift
var lang: Set = ["Swift", "C", "Java"]

print(lang.contains("Swift")) // true
print(lang.contains("Kotlin")) // false
```

## 요소 추가 및 삭제

요소를 추가하려면 `insert(_:)` 메서드를 사용한다.

```swift
var lang: Set = ["Swift", "C", "Java"]

lang.insert("Python")
print(lang) // ["C", "Swift", "Python", "Java"]
```

요소를 삭제하려면 `remove(_:)` 메서드를 사용한다.

이 메서드는 삭제한 값을 옵셔널 형태로 반환한다.

```swift
var lang: Set = ["C", "Swift", "Python", "Java"]

var item = lang.remove("C")
print(lang) // ["Java", "Swift", "Python"]
print(item) // Optional("C")

item = lang.remove("Go")
print(lang) // ["Java", "Swift", "Python"]
print(item) // nil
```

## 집합 연산

`Set`은 집합과 유사하기 때문에 집합 연산도 제공한다.

공식 문서에서 제공하는 벤 다이어그램을 보면 이해하기 쉽다.

![venn-diagram-1.png](/venn-diagram-1.png)

```swift
var a: Set = [1, 2, 3, 4]
var b: Set = [3, 4, 5, 6]

// 교집합(intersection)
print(a.intersection(b)) // [3, 4]

// 합집합(union)
print(a.union(b)) // [1, 2, 3, 4, 5, 6]

// 여집합의 합, 배타적 논리합(symmetricDifference)
print(a.symmetricDifference(b)) // [1, 2, 5, 6]

// 차집합(subtracting)
print(a.subtracting(b)) // [1, 2]
```

## Set 간 비교

두 `Set`이 같은지 비교하려면 `==` 연산자를 사용한다.

`Set`은 순서가 없으므로 아래 `a`와 `b`는 같은 `Set`이다.

```swift
var a: Set = ["A", "B", "C"]
var b: Set = ["C", "B", "A"]
var c: Set = ["D"]

print(a == b) // true
print(a == c) // false
```

두 `Set`의 포함 관계를 확인하려면 `isSubset(of:)`, `isSuperset(of:)`, `isDisjoint(with:)` 메서드를 사용한다.

이 부분 역시 공식 문서에서 제공하는 벤 다이어그램을 보면 직관적으로 이해할 수 있다.

![venn-diagram-2.png](/venn-diagram-2.png)

```swift
var a: Set = [1, 2, 3, 4]
var b: Set = [1, 2]
var c: Set = [3, 4]

// a는 b의 상위집합(superset)이다. (a ⊇ b)
print(a.isSuperset(of: b)) // true

// b는 a의 부분집합(subset)이다. (b ⊆ a)
print(b.isSubset(of: a)) // true

// b와 c는 서로소 집합(disjoint set)이다. (b ∩ c = ∅)
print(b.isDisjoint(with: c)) // true
```

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/CollectionTypes.html](https://docs.swift.org/swift-book/LanguageGuide/CollectionTypes.html)
