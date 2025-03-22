---
title: "CLI에서 EOF 이후에도 표준 입력 받기"
category: "Swift"
date: "2025-03-13 23:00:00"
desc: "CLI 환경에서 표준 입력을 FileHandle.standardInput으로 처리하여 EOF에 유연하게 대응하기"
thumbnail: "../../../../src/images/swift.webp"
---

## EOF란?

EOF(End Of File)는 파일이나 데이터 스트림에서 더 이상 읽을 데이터가 없음을 나타내는 신호이다.<br>
프로그래밍에서는 일반적으로 파일을 읽는 루프를 종료하는 데 사용된다.

Unix 기반 시스템[^1]에서는 `⌃ + D`로, Windows에서는 `Ctrl + Z`로 EOF를 입력할 수 있다.

## CLI 환경에서 readLine() 사용

Swift CLI 환경에서 사용자 입력을 받기 위해서는 보통 `readLine()`을 사용한다.<br>
예시로, 다음과 같이 게임 메뉴를 구현했다.

```swift
import Foundation

while true {
    print("1. 게임시작, 2. 기록보기, 3. 종료")
    print("숫자 입력 >> ", terminator: "")
    guard let input = readLine() else { break }

    switch input {
    case "1": print("게임시작\n")
    case "2": print("기록보기\n")
    case "3": exit(0)
    default: print("Invalid Input\n")
    }
}
```

1이나 2가 입력되면 각각 게임을 시작하거나 기록을 보는 로직이 실행된다.<br>
3은 게임을 종료하고, 그 외에는 잘못된 입력에 대한 예외 처리를 한다.

![readline_01](readline_01.png)

## EOF를 만나면?

이때, `⌃ + D`를 눌러 EOF를 입력하면 `readLine()`은 `nil`을 반환한다.<br>
현재 코드에서는 EOF를 만나면 `guard` 구문을 통해 break되어 프로그램이 종료된다.

![readline_02](readline_02.png)

그런데 EOF를 만나면 꼭 프로세스를 종료해야 할까?<br>
그냥 '올바르지 않은 입력입니다!' 정도를 출력하고 다시 입력을 받으면 되지 않을까?<br>
`break`를 `continue`로 바꾸고, `print`를 호출하도록 바꿔보았다.

```swift
import Foundation

while true {
    print("1. 게임시작, 2. 기록보기, 3. 종료")
    print("숫자 입력 >> ", terminator: "")
    guard let input = readLine() else {
        print("EOF 입력됨\n")
        continue
    }

    switch input {
    case "1": print("게임시작\n")
    case "2": print("기록보기\n")
    case "3": exit(EXIT_SUCCESS)
    default: print("Invalid Input\n")
    }
}
```

![readline_03](readline_03.png)

의도한 바와 다르게 사용자의 입력을 기다리지도 않고, `EOF 입력됨`이 무한으로 출력되는 루프에 빠진 것을 확인할 수 있다.<br>
`⌘ + .`을 눌러 프로세스를 종료하면 된다.

[공식 문서](https://developer.apple.com/documentation/swift/readline(strippingnewline:))에서 이것에 대한 이유를 찾을 수 있다.<br>
`readLine()`은 EOF를 만나면 `nil`을 반환하고, 이미 EOF에 도달했다면 이후에 호출되는 `readLine()`은 자동으로 `nil`을 반환하기 때문이다.<br>
문제는 이때 blocking이 걸리지 않기 때문에, 의도하지 않은 무한 루프가 발생한 것이다.

## FileHandle 사용해 보기

표준 입력을 처리할 수 있는 다른 방법을 찾아보던 중, `FileHandle`에 대해 학습했다.

`FileHandle`은 파일, 소켓, 파이프 같은 데이터 스트림을 처리하는 객체인데,<br>
터미널의 표준 입력(stdin), 표준 출력(stdout), 표준 에러(stderr)에 대한 내용도 처리할 수 있다.

다음은 `FileHandle.standardInput` 객체를 통해 표준 입력(stdin)을 처리하는 과정이다.

```swift
import Foundation

while true {
    print("1. 게임시작, 2. 기록보기, 3. 종료")
    print("숫자 입력 >> ", terminator: "")
    let data = FileHandle.standardInput.availableData

    guard !data.isEmpty else {
        print("\nEOF 입력됨\n")
        continue
    }
    guard var selected = String(data: data, encoding: .utf8) else {
        print("utf8 변환 실패\n")
        continue
    }
    selected = selected.trimmingCharacters(in: .newlines)

    switch selected {
    case "1": print("게임시작\n")
    case "2": print("기록보기\n")
    case "3": exit(EXIT_SUCCESS)
    default: print("Invalid Input\n")
    }
}
```

`String`을 사용하는 것이 아닌 `Data` 타입으로 처리하는 것에 유의한다.<br>
`availableData`는 버퍼에 있는 데이터를 한 번에 읽어오고, 표준 입력을 받기 위해 blocking하는 역할도 한다.<br>
EOF가 입력될 경우 비어 있는 `Data`를 반환하고, 정상적인 문자열이 입력될 경우 UTF-8 포맷으로 변환하여 사용한다.<br>
이때 표준 입력을 마치기 위한 개행 문자(`\n`)도 같이 포함되므로, trimming을 해주어야 한다.

![filehandle_01](filehandle_01.png)

---

### 참고

- https://ddd-a.tistory.com/47
- https://developer.apple.com/documentation/swift/readline(strippingnewline:)
- https://developer.apple.com/documentation/foundation/filehandle

[^1]: macOS도 여기에 해당한다.
