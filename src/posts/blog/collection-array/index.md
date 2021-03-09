---
title: "Swift 배열(Array)"
category: "Swift Tutorial"
date: "2021-03-09 23:30:00 +09:00"
desc: "Swift 배열(Array)"
---

Swift의 컬렉션 타입 중 하나인 배열(Array)에 대해 알아보겠다.

## 선언 및 초기화

Swift는 배열의 크기를 자동으로 조절해주기 때문에 크기를 명시하지 않아도 된다.

다음은 Int 타입을 기준으로 배열을 선언하고 초기화하는 방법이다.

```swift
// 빈 배열 선언
var arr1 = [Int]()
var arr2 = Array<Int>()

// 리터럴을 이용한 선언 및 초기화
var arr3 = [1, 2, 3]
var arr4 = arr3 + [4, 5] // [1, 2, 3, 4, 5]

// 초깃값 지정
var arr5 = [Int](repeating: 7, count: 3) // [7, 7, 7]
```

## 배열의 크기 확인

isEmpty 프로퍼티를 사용하면 배열이 비어있는지 확인할 수 있다.

```swift
var arr1 = [Double]()
print(arr1.isEmpty) // true

var arr2 = [1.1, 2.2, 3.3]
if !arr2.isEmpty {
    print("배열이 비어있지 않음") // 배열이 비어있지 않음
}
```

배열의 크기(원소의 개수)는 count 프로퍼티를 통해 확인할 수 있다.

```swift
var arr = ["Swift", "Java", "C++", "Python"]
print(arr.count) // 4
```

## 배열 순회

배열의 전체 요소를 순회하려면 다음과 같이 for-in 루프를 사용한다.

```swift
var arr = [1, 2, 3, 4, 5]

for item in arr {
    print(item, terminator: " ") // 1 2 3 4 5 
}
```

인덱스가 필요할 경우, enumerated() 메서드를 사용하면 (index, value) 튜플로 접근할 수 있다.

```swift
var arr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

for (i, v) in arr.enumerated() {
    print("Item \(i + 1): \(v)")
}
/*
 Item 1: Sun
 Item 2: Mon
 Item 3: Tue
 Item 4: Wed
 Item 5: Thu
 Item 6: Fri
 Item 7: Sat
 */
```

## 특정 요소 접근

인덱스를 직접 명시하여 특정 요소의 값을 얻거나 수정할 수 있다.

```swift
var arr = ["A", "B", "C", "D"]
print(arr[2]) // C

arr[3] = "Z"
print(arr) // ["A", "B", "C", "Z"]
```

## 배열 요소 추가

배열의 맨 뒤에 요소를 추가하려면 append(_:) 메서드를 사용하고,

특정 위치에 삽입하려면 insert(_:at:) 메서드를 사용한다.

```swift
var arr = ["A", "C", "D"]

arr.append("E")
print(arr) // ["A", "C", "D", "E"]

arr.insert("B", at: 1)
print(arr) // ["A", "B", "C", "D", "E"]
```

## 배열 요소 삭제

맨 앞이나 맨 뒤의 요소를 삭제하려면 removeFirst(), removeLast() 메서드를 사용하고,

특정 위치의 요소를 삭제하려면 remove(at:) 메서드를 사용한다.

3가지 메서드 모두 삭제한 값을 반환하는데, 필요 없다면 반환 값을 버려도 된다.

```swift
var arr = [1, 2, 3, 4, 5]

var firstItem = arr.removeFirst()
print(arr) // [2, 3, 4, 5]
print(firstItem) // 1

arr.removeLast()
print(arr) // [2, 3, 4]

arr.remove(at: 1)
print(arr) // [2, 4]
```

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/CollectionTypes.html](https://docs.swift.org/swift-book/LanguageGuide/CollectionTypes.html)
