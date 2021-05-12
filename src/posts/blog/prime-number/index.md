---
title: "소수 구하기"
category: "Swift PS"
date: "2021-05-12 19:10:00 +09:00"
desc: "prime-number"
---

## 개념

소수<sup>Prime Number</sup>는 1과 자기 자신만을 약수로 갖는 수이다.

## 직관적인 접근

가장 직관적인 방법은 2부터 하나씩 나누어떨어지는지 확인하는 방법이다.

다음은 2부터 100 사이의 소수를 출력하는 코드이다.

```swift
func getPrimeNumbers(_ num: Int) -> [Int] {
    var primeNumbers = [Int]()
    
    outer: for i in 2..<num {
        for j in 2..<i {
            if i % j == 0 {
                continue outer
            }
        }
        primeNumbers.append(i)
    }
    
    return primeNumbers
}

print(getPrimeNumbers(100))
/*
 [2, 3, 5, 7, 11, 13, 17,
 19, 23, 29, 31, 37, 41,
 43, 47, 53, 59, 61, 67,
 71, 73, 79, 83, 89, 97]
 */

```

O(N<sup>2</sup>)의 시간복잡도를 가진다.

## 에라토스테네스의 체

에라토스테네스의 체를 이용하면 더 효율적으로 구현할 수 있다.

소수의 배수들을 연속해서 지워나가는 방식으로 구현한다.

또한 약수는 짝을 이루기 때문에 약수 집합의 중간값 이후로는 계산할 필요가 없다.

```swift
func getPrimeNumbers(_ num: Int) -> [Int] {
    var isPrime = [Bool](repeating: true, count: num + 1)
    isPrime[0] = false
    isPrime[1] = false
    
    for i in 2..<num {
        if i * i > num {
            break
        }
        if isPrime[i] {
            for j in stride(from: i * i, through: num, by: i) {
                isPrime[j] = false
            }
        }
    }
    
    var primeNumber = [Int]()
    for i in 2..<num {
        if isPrime[i] {
            primeNumber.append(i)
        }
    }
    
    return primeNumber
}

print(getPrimeNumbers(100))
/*
 [2, 3, 5, 7, 11, 13, 17,
 19, 23, 29, 31, 37, 41,
 43, 47, 53, 59, 61, 67,
 71, 73, 79, 83, 89, 97]
 */
```

O(Nlog(logN))의 시간복잡도를 가진다.

## 참고

1. [https://ko.wikipedia.org/wiki/%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98_%EC%B2%B4](https://ko.wikipedia.org/wiki/%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98_%EC%B2%B4)
