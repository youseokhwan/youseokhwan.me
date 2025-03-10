---
title: "백준 입출력 처리"
category: "Algorithm"
date: "2025-03-09 21:00:00 +09:00"
desc: "readLine(), print()를 이용한 백준 알고리즘 입출력 처리"
thumbnail: "../../../../src/images/algorithm.webp"
---

## 입력

입력은 `readLine()` 메서드를 통해 구현한다.<br>
대부분의 경우 채점 시스템을 통한 안전한 입력이 보장되므로 알고리즘 문제 풀이에 한해 강제 언래핑을 사용하기도 한다.

```swift
let word = readLine()!
let number = Int(readLine()!)!
```

공백으로 구분된 여러 인자를 한 줄로 입력받는 경우, `split(separator:)` 메서드를 사용한다.

```swift
let words = readLine()!.split(separator: " ").map { String($0) }
let numbers = readLine()!.split(separator: " ").map { Int($0)! }
```

`split(separator:)`의 반환 타입이 `[String]`이 아닌 `[String.SubSequence]`임에 유의한다.

## 출력

출력은 간단히 `print()` 메서드로 구현할 수 있다.

```swift
let result = 10
print(result)
```

만약 반복문 안에서 시행 횟수마다 `print()`를 호출하고 있고 메모리는 여유가 있는 상태라면,<br>
결과를 변수에 모아서 한번만 출력하는 방법을 고려해볼 수 있다.

```swift
// 반복 횟수마다 출력
(0..<1_000_000).forEach { i in
    print(i)
}
```

```swift
// 변수에 모아서 한번만 출력
var result = ""
(0..<1_000_000).forEach { i in
    result += "\(i)\n"
}
print(result)
```

```swift
// joined 활용하여 한번만 출력
let words = ["abc", "def", "ghi", "jkl"]
print(words.joined(separator: "\n"))
```

I/O 횟수를 줄여서 실행 속도 개선을 기대해 볼 수 있지만, 긴 문자열을 사용하게 되므로 메모리 효율을 고려해야 한다.

### 참고

- [https://developer.apple.com/documentation/swift/readline(strippingnewline:)](https://developer.apple.com/documentation/swift/readline(strippingnewline:))
- [https://developer.apple.com/documentation/swift/string/split(separator:maxsplits:omittingemptysubsequences:)](https://developer.apple.com/documentation/swift/string/split(separator:maxsplits:omittingemptysubsequences:))
