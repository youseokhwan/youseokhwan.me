---
title: "나머지 연산 분배법칙"
category: "Swift PS"
date: "2021-03-29 13:40:00 +09:00"
desc: "remainder-distribution-property"
---

알고리즘 문제를 풀다 보면 '정답을 15746으로 나눈 나머지를 출력하시오' 등의 문제([예시](https://www.acmicpc.net/problem/1904))를 볼 수 있다.

매우 큰 값을 대비한 것인데, 이때 출력 직전에만 나머지 연산을 진행하면 오버플로가 발생할 확률이 높다.

오버플로를 방지하려면 분배법칙을 이용하여 미리미리 나머지 연산을 진행하는 것이 좋다.

## 나머지 분배법칙

사칙 연산에 나머지 분배법칙을 적용하면 다음과 같다.

### 덧셈

> (x + y) % m == ((x % m) + (y % m)) % m

`x + y`의 나머지는 각 나머지 합의 나머지와 같다.

```swift
var x = 1596372
var y = 392949112
var m = 15746

print((x + y) % m) // 13708
print((x % m) + (y % m)) // 13708
```

### 곱셈

> (x \* y) % m == ((x % m) \* (y % m)) % m

덧셈과 마찬가지로 `x * y`의 나머지는 각 나머지 곱의 나머지와 같다.

오버플로를 확인하기 위해 `Int8`로 범위를 좁혀 검증하였다.

55와 82의 곱은 4510이므로 최댓값이 127인 `Int8`에선 오버플로가 발생한다.

그러나 미리미리 계산하면 오버플로를 방지할 수 있다.

```swift
var x: Int8 = 55
var y: Int8 = 82
var m: Int8 = 25

// print((x * y) % m) // runtime error
print((55 * 82) % Int(m)) // 10
print(((x % m) * (y % m)) % m) // 10
```

### 뺄셈

> (x - y) % m == ((x % m) - (y % m) + m) % m

뺄셈의 경우 나머지가 음수가 나오는 것을 방지하기 위해 마지막에 `m`을 더한 후 나머지를 연산한다.

```swift
var x = 1596372
var y = 392949
var m = 15746

print((x - y) % m) // 6727
print(((x % m) - (y % m) + m) % m) // 6727
```

이때 주의할 것은 Swift의 `%` 연산자는 음수의 나머지를 음수로 반환한다.

```swift
print(-5 % 2) // -1
```

따라서 `x - y`가 음수인 경우 다른 결과를 얻는다.

```swift
var x = 1596372
var y = 39294911
var m = 15746

print((x - y) % m) // -2615
print(((x % m) - (y % m) + m) % m) // 13131
```

정수론에서 정의한 나머지는 음수가 될 수 없으므로,

수학적인 의미의 나머지 연산과 Swift의 `%` 연산자가 완전히 동일하다고 볼 수는 없을 것 같다.

### 나눗셈

나눗셈에는 나머지 분배법칙이 적용되지 않는다.

## 참고

1. [https://www.acmicpc.net/problem/1904](https://www.acmicpc.net/problem/1904)
2. [https://goodteacher.tistory.com/133](https://goodteacher.tistory.com/133)
3. [https://velog.io/@gidskql6671/%EB%82%98%EB%A8%B8%EC%A7%80Modulo-%EC%97%B0%EC%82%B0-%EB%B6%84%EB%B0%B0%EB%B2%95%EC%B9%99](https://velog.io/@gidskql6671/%EB%82%98%EB%A8%B8%EC%A7%80Modulo-%EC%97%B0%EC%82%B0-%EB%B6%84%EB%B0%B0%EB%B2%95%EC%B9%99)
