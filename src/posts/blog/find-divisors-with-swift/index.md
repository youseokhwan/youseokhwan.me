---
title: "Swift로 약수 구하기"
category: "Algorithm"
date: "2025-03-31 11:30:00"
desc: "Swift로 약수 구하기"
thumbnail: "../../../../src/images/algorithm.webp"
---

## 약수

약수(Divisor, Factor)는 어떤 수를 나누어떨어지게 하는 수다.<br>
예를 들어, 12의 약수는 [1, 2, 3, 4, 6, 12]로 총 6개다.

## 직관적인 구현

임의의 자연수 `n`의 약수를 구하는 직관적인 방법은 다음과 같다.

```swift
import Foundation

let n = 12
var divisors = [Int]()

for i in 1...n {
    if n % i == 0 {
        divisors.append(i)
    }
}

print(divisors) // [1, 2, 3, 4, 6, 12]
```

1부터 `n`까지 순회하면서 `n`을 `i`로 나눈 나머지가 0인 수를 찾으면 된다.<br>
O(n)의 시간 복잡도를 가진다.

## O(logN)으로 개선

약수는 대칭성을 가진다.<br>
예를 들어, 12의 약수는 (1, 12), (2, 6), (3, 4)인데, (1, 2, 3)을 찾을 때 (12, 6, 4)를 동시에 찾을 수 있다.

또한, `n`의 제곱근은 약수 집합의 중간값이다.<br>
예를 들어, 16의 제곱근은 4고, 4는 [1, 2, 4, 8, 16]의 중간값이다.<br>
즉, 1부터 `n`의 제곱근까지만 순회하여 O(logN)으로 개선할 수 있다.

```swift
import Foundation

let n = 16
var divisors = [Int]()

for i in 1...Int(sqrt(Double(n))) {
    if n % i == 0 {
        divisors.append(i)
        if i != n / i {
            divisors.append(n / i)
        }
    }
}

print(divisors) // [1, 16, 2, 8, 4]
```

`if i != n / i`는 같은 수일 경우 중복을 제거하기 위한 조건문이다.<br>
또한 `Set`, `sorted()` 등을 활용하여 상황에 맞게 대응하면 된다.

```swift
import Foundation

let n = 36
var divisors = Set<Int>()

for i in 1...Int(sqrt(Double(n))) {
    if n % i == 0 {
        divisors.insert(i)
        divisors.insert(n / i)
    }
}

print(divisors) // [2, 1, 12, 3, 4, 9, 36, 6, 18]
print(divisors.sorted()) // [1, 2, 3, 4, 6, 9, 12, 18, 36]
```

## while 구문으로 개선

자동완성이 안되거나, 컴파일 오류를 확인할 수 없는 코딩 테스트 환경일 수 있다.<br>
이때, 복잡한 `Int(sqrt(Double(n)))`보다 `while i * i <= n`으로 기억하는 게 더 쉬울 수 있다.

```swift
import Foundation

let n = 36
var divisors = Set<Int>()

var i = 1
while i * i <= n {
    if n % i == 0 {
        divisors.insert(i)
        divisors.insert(n / i)
    }
    i += 1
}

print(divisors) // [2, 4, 18, 1, 9, 12, 6, 3, 36]
print(divisors.sorted()) // [1, 2, 3, 4, 6, 9, 12, 18, 36]
```

---

### 참고

- https://kbw1101.tistory.com/32
