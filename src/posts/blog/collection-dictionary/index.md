---
title: "딕셔너리(Dictionary)"
category: "Swift Tutorial"
date: "2021-03-13 23:05:00 +09:00"
desc: "collection-dictionary"
---

`Dictionary` 타입은 `key`와 `value`의 쌍으로 구성된 요소들을 저장하는 컬렉션 타입이다.

실제 사전에서 단어를 찾듯이, `key`를 통해 요소에 접근하여 `value`를 얻는 방식으로 사용한다.

`Set`과 마찬가지로 순서가 없는 리스트(unordered list)이며, `key`는 중복될 수 없다.

## 선언 및 초기화

다음은 `key`와 `value`가 각각 `String`과 `Int` 타입인 `Dictionary`를 선언하고 초기화하는 방법이다.

```swift
// 빈 Dictionary 선언
var dic1 = Dictionary<String, Int>()
var dic2 = [String: Int]()

// 리터럴을 이용한 선언 및 초기화
var dic3 = ["국어": 95, "수학": 85, "영어": 75]
```

## Dictionary의 크기 확인

`isEmpty` 프로퍼티를 사용하면 `Dictionary`가 비어있는지 확인할 수 있다.

```swift
var dic1 = [String: Int]()
print(dic1.isEmpty) // true

var dic2 = ["국어": 95, "수학": 85, "영어": 75]
if !dic2.isEmpty {
    print("Dictionary가 비어있지 않음") // Dictionary가 비어있지 않음
}
```

`Dictionary`의 크기(원소의 개수)는 `count` 프로퍼티를 통해 확인할 수 있다.

```swift
var dic = ["국어": 95, "수학": 85, "영어": 75]
print(dic.count) // 3
```

## Dictionary 순회

`Dictionary`의 전체 요소를 순회하려면 다음과 같이 `for-in` 루프를 사용한다.

```swift
var dic = ["국어": 95, "수학": 85, "영어": 75]

for (key, value) in dic {
    print(key, value)
}
/*
 수학 85
 영어 75
 국어 95
 */
```

`Dictionary`는 순서가 없는 리스트기 때문에 출력 순서는 실행할 때마다 달라질 수 있다.

만약 `key`만 순회하거나, `value`만 순회하고 싶다면 다음과 같다.

```swift
var dic = ["국어": 95, "수학": 85, "영어": 75]

for key in dic.keys {
    print(key) // 영어 국어 수학
}

for value in dic.values {
    print(value) // 75 95 85
}

var keys = [String](dic.keys)
print(keys) // ["영어", "국어", "수학"]

var values = [Int](dic.values)
print(values) // [75, 95, 85]
```

## Dictionary 요소 접근, 추가, 수정

`key`를 인덱스로 직접 명시하여 특정 요소의 값을 얻거나, 추가하거나, 수정할 수 있다.

해당 `key`가 없는 경우 `get`을 시도하면 `nil`을 반환하고, `set`을 시도하면 요소를 추가한다.

```swift
var dic = ["국어": 95, "수학": 85, "영어": 75]

print(dic["국어"]) // 95
print(dic["과학"]) // nil (없는 값에 get하면 nil 반환)

dic["국어"] = 100
dic["사회"] = 90 // 없는 값을 set하면 요소 추가

print(dic) // ["수학": 85, "사회": 90, "영어": 75, "국어": 100]
```

인덱스로 접근하는 방법 외에 `updateValue(_:forKey:)` 메서드도 제공한다.

이 메서드는 수정하기 이전 값을 반환한다.

```swift
var dic = ["국어": 95, "수학": 85, "영어": 75]
var oldValue = dic.updateValue(100, forKey: "국어")

print(dic) // ["국어": 100, "수학": 85, "영어": 75]
print(oldValue) // 95
```

## Dictionary 요소 삭제

`Dictionary`의 요소를 삭제하려면 `removeValue(forKey:)` 메서드를 사용한다.

`updateValue(_:forKey:)`와 마찬가지로 삭제되기 이전 값을 반환한다.

없는 값에 대해 삭제 연산을 진행하면 `nil`을 반환한다.

```swift
var dic = ["국어": 95, "수학": 85, "영어": 75]

var value1 = dic.removeValue(forKey: "국어")
print(dic) // ["수학": 85, "영어": 75]
print(value) // 95

var value2 = dic.removeValue(forKey: "과학")
print(value2) // nil
```

혹은 인덱스로 접근하여 직접 `nil`을 할당하는 방식으로도 요소를 삭제할 수 있다.

```swift
var dic = ["국어": 95, "수학": 85, "영어": 75]

dic["국어"] = nil
print(dic) // ["수학": 85, "영어": 75]
```

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/CollectionTypes.html](https://docs.swift.org/swift-book/LanguageGuide/CollectionTypes.html)
