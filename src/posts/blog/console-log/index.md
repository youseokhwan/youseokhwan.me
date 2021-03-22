---
title: "Console Log"
category: "Swift Tutorial"
date: "2021-02-15 11:50:00 +09:00"
desc: "console-log"
---

Swift에서는 `print()`와 `dump()`를 이용해 콘솔 로그를 출력할 수 있다.

## print()

`print()`는 Swift의 기본적인 출력 함수이다.

```swift
print("Hello World!") // Hello World!
```

`print()`는 여러 항목을 출력할 수 있다.

`separator`는 각 항목 사이에 출력될 문자열이며, 기본값은 공백(" ")이다.

```swift
print(3, 1.5, "hello") // 3 1.5 hello
print("seoul", "incheon", "jeju", separator: "->") // seoul->incheon->jeju
```

`terminator`는 모든 항목을 출력한 후 마지막에 출력되는 문자열이며, 기본값은 개행("\n")이다.

```swift
for i in 1...3 {
    print(i)
}
/*
 1
 2
 3
 */

for i in 1...3 {
    print(i, terminator: "")
}
// 123
```

## dump()

`print()`는 `description` 프로퍼티만 출력하는 반면, `dump()`는 좀 더 구체적인 내용을 출력한다.

```swift
class Person {
    var name: String = "ysh"
    var age: Int = 25
}

print(Person())
// ProjectName.Person

dump(Person())
/*
 ▿ ProjectName.Person #0
   - name: "ysh"
   - age: 25
 */
```

## 참고

1. 야곰, 「스위프트 프로그래밍 3판」, 한빛미디어(2019), p67-68
2. [https://developer.apple.com/documentation/swift/1541053-print](https://developer.apple.com/documentation/swift/1541053-print)
3. [https://developer.apple.com/documentation/swift/1539127-dump](https://developer.apple.com/documentation/swift/1539127-dump)
