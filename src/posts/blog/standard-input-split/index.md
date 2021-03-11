---
title: "표준 입력 Split 하기"
category: "Swift PS"
date: "2021-03-11 23:40:00 +09:00"
desc: "표준 입력 Split 하기"
---

백준의 경우 문제를 풀 때 표준 입출력을 사용한다.

Swift에서 표준 입력은 보통 readLine()을 사용하는데, 개행(\n)을 만나면 입력이 종료된다.

## 한 줄에 한 개의 변수만 주어지는 경우

한 줄에 한 개의 변수만 주어지는 경우는 입력받은 값을 Int로 캐스팅만 해주면 된다.

problem solving에선 보통 입력값이 nil이 아님이 보장되므로 강제 언래핑(force-unwrap) 하였다.

```swift
var input = Int(readline()!)!
```

## 한 줄에 2개 이상의 변수가 주어지는 경우

한 줄에 두 개 이상의 변수가 주어지는 경우엔 split을 해야 한다.

### split(separator:)

첫 번째는 split(separator:) 내장 함수를 사용하는 방법이다.

separator에는 split의 기준이 될 Character를 입력하면 된다.

```swift
// 표준 입력: 2 3
var input = readLine()!.split(separator: " ")
var a = input[0]
var b = input[1]
print(a, b) // 2 3
```

이때, a와 b의 타입은 Substring임에 유의한다.

map을 이용해 캐스팅하면 더 편하게 사용할 수 있다.

```swift
var input = readLine()!.split(separator: " ").map { Int(String($0))! }
```

### components(separatedBy:)

두 번째는 Foundation에 정의된 components(separatedBy:)를 사용하는 방법이다.

split(separator:)의 반환형은 [Substring]인 반면, 이 함수는 [String]으로 반환한다.

```swift
import Foundation

var input1 = readLine()!.split(separator: " ")
print(type(of: input1)) // Array<Substring>

var input2 = readLine()!.components(separatedBy: " ")
print(type(of: input2)) // Array<String>
```

또한, 여러 문자로 split하거나 문자열로 split 할 수도 있다.

```swift
import Foundation

// 표준 입력: 1a2b3c4
var input = readLine()!.components(separatedBy: ["a", "b", "c"])
print(input) // ["1", "2", "3", "4"]
```

```swift
import Foundation

// 표준 입력: 1abc2abc3abc4
var input = readLine()!.components(separatedBy: "abc")
print(input) // ["1", "2", "3", "4"]
```

## 참고

1. [https://zeddios.tistory.com/74](https://zeddios.tistory.com/74)
2. [https://0urtrees.tistory.com/167](https://0urtrees.tistory.com/167)
