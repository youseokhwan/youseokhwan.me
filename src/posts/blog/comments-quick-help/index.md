---
title: "Swift 주석 및 퀵헬프"
category: "Swift"
date: "2021-02-19 02:30:00 +09:00"
desc: "Swift 주석 및 퀵헬프"
---

## 주석

Swift의 주석(comments)은 C와 유사하다.

한 줄 주석(single-line comments)은 다음과 같이 사용한다.

```swift
// 이것은 한 줄 주석입니다.
```

여러 줄 주석(multiline comments)은 다음과 같이 사용한다.

```swift
/* 이것은
여러 줄 주석입니다. */
```

중첩해서 사용할 수도 있다.

```swift
/* 이것은 첫 번째 주석의 시작입니다.
/* 이것은 두 번째 주석입니다. */
이것은 첫 번째 주석의 끝입니다. */
```

## 퀵헬프

퀵헬프(Quick Help)는 레퍼런스 문서의 요약된 내용을 보여주는 기능이다.

원하는 항목을 option(⌥)과 함께 마우스로 클릭하거나,

![quick-help-pop-up.png](/quick-help-pop-up.png)

우측 Quick Help inspector를 열고 원하는 항목에 커서를 두면 된다.

![quick-help-inspector.png](/quick-help-inspector.png)

퀵헬프는 마크업 문법과 함께 다음과 같이 작성한다.

```swift
/**
 양의 정수 2개를 입력받아 합을 반환하는 함수
 - parameters:
    - x: 첫 번째 파라미터
    - y: 두 번째 파라미터
 - throws: 음수 값을 입력할 경우 InputError 발생
 - returns: x + y
 */
func add(x: Int, y: Int) throws -> Int {
    if x < 0 || y < 0 {
        throw InputError.negativeNumber
    }
    return x + y
}

enum InputError: Error {
    case negativeNumber
}
```

![write-quick-help-document.png](/write-quick-help-document.png)

## 참고

1. [https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html)
2. [https://developer.apple.com/library/archive/documentation/Xcode/Reference/xcode_markup_formatting_ref/SymbolDocumentation.html](https://developer.apple.com/library/archive/documentation/Xcode/Reference/xcode_markup_formatting_ref/SymbolDocumentation.html)
