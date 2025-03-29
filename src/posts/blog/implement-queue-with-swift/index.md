---
title: "Swift로 Queue 구현하기"
category: "Algorithm"
date: "2025-03-29 22:30:00"
desc: "Swift로 Queue 구현하기"
thumbnail: "../../../../src/images/algorithm.webp"
---

## Queue

Queue는 FIFO(First In First Out) 방식의 자료구조이며, 먼저 들어온 데이터가 먼저 나가는 특징이 있다.<br>
기본적인 연산은 다음과 같다.

* enqueue: Queue의 뒤에 데이터를 추가
* dequeue: Queue의 앞에서 데이터를 삭제하고 반환
* peek: Queue의 앞에 있는 데이터를 삭제하지 않고 조회
* isEmpty: Queue가 비어있는지 여부

## Swift로 구현

### 1️⃣ Array

가장 직관적인 방법은 Array를 사용하는 것이다.

```swift
import Foundation

struct Queue<T> {
    private var elements = [T]()

    var isEmpty: Bool {
        elements.isEmpty
    }

    var peek: T? {
        elements.first
    }

    mutating func enqueue(_ element: T) {
        elements.append(element)
    }

    mutating func dequeue() -> T? {
        elements.removeFirst()
    }
}
```

구현이 쉽고 간단하지만, dequeue의 removeFirst()의 시간 복잡도가 O(n)이라는 단점이 있다.

### 2️⃣ Double Stack

### 3️⃣ Linked List

## 검증

### 직접 검증?

### Baekjoon

### Programmers

---

### 참고

- [https://en.wikipedia.org/wiki/Queue_(abstract_data_type)](https://en.wikipedia.org/wiki/Queue_(abstract_data_type))
- [https://velog.io/@gundy/Swift-Swift에서-Queue는-뭘로-구현해야-할까](https://velog.io/@gundy/Swift-Swift%EC%97%90%EC%84%9C-Queue%EB%8A%94-%EB%AD%98%EB%A1%9C-%EA%B5%AC%ED%98%84%ED%95%B4%EC%95%BC-%ED%95%A0%EA%B9%8C)
