---
title: "구조체(Structures)와 클래스(Classes) 비교"
category: "Swift Tutorial"
date: "2021-04-20 19:50:00 +09:00"
desc: "compare-structures-classes"
---

구조체<sup>Structures</sup>와 클래스<sup>Classes</sup>는 둘 다 연관된 데이터를 그룹화하여 새로운 타입을 생성한다.

또한 구성요소나 키워드 등 유사한 부분이 많은데, 2개의 공통점과 차이점을 알아보겠다.

## 기능

구조체와 클래스의 공통적인 기능은 다음과 같다.

* 프로퍼티 및 메서드 정의
* 서브스크립트<sup>Subscripts</sup> 정의
* 생성자<sup>Initializer</sup> 정의
* 익스텐션<sup>Extensions</sup> 사용 가능
* 프로토콜<sup>Protocols</sup> 사용 가능

클래스만 할 수 있는 기능은 다음과 같다.

* 상속<sup>Inheritance</sup>
* 런타임에서 타입 캐스팅
* 소멸자<sup>Deinitializer</sup> 정의
* Reference Counting: 한 인스턴스에 둘 이상의 참조 허용

## 정의

구조체는 `struct`, 클래스는 `class` 키워드를 사용한다.

둘 다 새로운 타입을 생성하는 것이므로 대문자로 시작한다.

```swift
struct PointStruct {
    var width = 0
    var height = 0
    
    func desc() {
        print("PointStruct - w: \(width), h: \(height)")
    }
}

class PointClass {
    var width = 0
    var height = 0
    
    func desc() {
        print("PointClass - w: \(width), h: \(height)")
    }
}
```

## 인스턴스

타입 뒤에 괄호를 붙이면 각각의 인스턴스를 생성할 수 있고 `.`을 통해 하위 요소에 접근할 수 있다.

```swift
var pointStruct = PointStruct(width: 2, height: 5)
var pointClass = PointClass()

pointStruct.desc() // PointStruct - w: 2, h: 5
pointClass.desc() // PointClass - w: 0, h: 0
```

구조체의 경우 별도의 이니셜라이저를 구현하지 않아도 프로퍼티에 값을 할당하여 초기화할 수 있다.

## 값 타입과 참조 타입

구조체는 값 타입<sup>Value Types</sup>이고, 클래스는 참조 타입<sup>Reference Types</sup>이다.

### 구조체는 값 타입

구조체는 값 타입이기 때문에 대입 시 값만 복사한다.

```swift
var s1 = PointStruct(width: 5)
var s2 = s1
s2.width = 10

print(s1.width) // 5
print(s2.width) // 10
```

`s2`에 `s1`을 대입한 후 값을 변경해도 값 타입이기 때문에 기존 `s1`에 영향을 끼치지 않는다.

### 클래스는 참조 타입

반면 클래스는 참조 타입이기 때문에 대입 시 같은 메모리를 참조한다.

```swift
var c1 = PointClass()
var c2 = c1
c2.width = 10

print(c1.width) // 10
print(c2.width) // 10
```

`c2`에 `c1`을 대입한 후 값을 변경하면 기존 `s1`도 변경된다.

### 같은 참조인지 확인

클래스의 경우 식별 연산자(`===`, `!==`)를 사용하여 같은 참조인지 판단할 수 있다.

```swift
var c1 = PointClass()
var c2 = PointClass()
var c3 = c1

print(c1 === c2) // false
print(c1 === c3) // true
print(c2 !== c3) // true
```

## 결론

공식 문서에서는 아래 4가지 조건 중 하나라도 해당되면 구조체를 사용하라고 권하고 있다.

* 간단한 값을 캡슐화하려는 경우
* 인스턴스나 프로퍼티가 참조보다 복사되기를 원하는 경우
* 상속이 필요 없는 경우

해당 사항이 없는 경우 클래스를 사용하면 된다.

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/ClassesAndStructures.html](https://docs.swift.org/swift-book/LanguageGuide/ClassesAndStructures.html)
