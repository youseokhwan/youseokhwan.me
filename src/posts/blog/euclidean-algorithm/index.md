---
title: "유클리드 호제법"
category: "Swift PS"
date: "2021-05-28 18:00:00 +09:00"
desc: "euclidean-algorithm"
---

유클리드 호제법<sup>Euclidean Algorithm</sup>은 두 자연수의 최대공약수를 구하는 알고리즘이다.

1. 두 자연수 `a`와 `b`를 입력받는다.
2. `b`가 0이면 a를 반환하고 종료한다.
3. `b`가 0이 아니라면 `a`를 `b`로 나눈 나머지를 `a`에 대입한 뒤, `a`와 `b`를 swap하고 2번으로 돌아간다.

`O(logN)`의 시간 복잡도를 가진다.

## 최대공약수

최대공약수<sup>GCD, Greatest Common Divisor</sup>를 구하는 코드는 다음과 같다.

```swift
func gcd(_ a: Int, _ b: Int) -> Int {
    return b == 0 ? a : gcd(b, a % b)
}

print(gcd(16, 24)) // 8
```

## 최소공배수

최소공배수<sup>LCM, Least Common Multiple</sup>는 최대공약수를 이용해 구할 수 있다.

```swift
func lcm(_ a: Int, _ b: Int) -> Int {
    return a * b / gcd(a, b)
}

print(lcm(16, 24)) // 48
```

## 참고

1. [https://ko.wikipedia.org/wiki/%EC%9C%A0%ED%81%B4%EB%A6%AC%EB%93%9C_%ED%98%B8%EC%A0%9C%EB%B2%95](https://ko.wikipedia.org/wiki/%EC%9C%A0%ED%81%B4%EB%A6%AC%EB%93%9C_%ED%98%B8%EC%A0%9C%EB%B2%95)
2. [https://myjamong.tistory.com/138](https://myjamong.tistory.com/138)
