---
title: "순열과 조합"
category: "Swift PS"
date: "2021-05-11 12:30:00 +09:00"
desc: "permutation-combination"
---

## 개념

순열<sup>Permutation</sup>은 서로 다른 `n`개의 원소에서 `r`개를 순서에 상관있게 나열한 것이며,

조합<sup>Combination</sup>은 서로 다른 `n`개의 원소에서 `r`개를 순서에 상관없이 나열한 것이다.

각각 머리글자를 따서 `nPr`, `nCr`로 표현한다.

## for로 구현

`for`를 중첩해서 구현한 순열과 조합은 다음과 같다.

```swift
let arr = [1, 2, 3, 4]
let n = arr.count
var permutation = [[Int]]()

for i in 0..<n {
    for j in 0..<n {
        for k in 0..<n {
            if i == j || i == k || j == k {
                continue
            }
            permutation.append([arr[i], arr[j], arr[k]])
        }
    }
}

print("count: \(permutation.count)") // count: 24
print(permutation)
/*
 [[1, 2, 3], [1, 2, 4], [1, 3, 2], [1, 3, 4], [1, 4, 2], [1, 4, 3],
 [2, 1, 3], [2, 1, 4], [2, 3, 1], [2, 3, 4], [2, 4, 1], [2, 4, 3],
 [3, 1, 2], [3, 1, 4], [3, 2, 1], [3, 2, 4], [3, 4, 1], [3, 4, 2],
 [4, 1, 2], [4, 1, 3], [4, 2, 1], [4, 2, 3], [4, 3, 1], [4, 3, 2]]
 */
```

```swift
let arr = [1, 2, 3, 4]
let n = arr.count
var combination = [[Int]]()

for i in 0..<n {
    for j in (i + 1)..<n {
        for k in (j + 1)..<n {
            combination.append([arr[i], arr[j], arr[k]])
        }
    }
}

print("count: \(combination.count)") // count: 4
print(combination) // [[1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4]]
```

`for`를 중첩하여 구현하면 직관적이다.

그러나 `r`이 커질수록 `for` 중첩이 많아져 코드가 난잡해지며,

`r`이 다이나믹할 경우 위 코드로는 대처할 수 없다.

## 재귀로 구현

재귀로 구현하면 위의 단점을 보완할 수 있다.

```swift
import Foundation

func getPermutation<T>(_ arr: [T], _ r: Int, _ res: inout [[T]], _ idx: Int = 0) {
    if idx == r {
        res.append(Array(arr[0..<idx]))
        return
    }
    
    var arr = arr
    
    for i in idx..<arr.count {
        arr.swapAt(idx, i)
        getPermutation(arr, r, &res, idx + 1)
        arr.swapAt(idx, i)
    }
}

let arr = ["A", "B", "C", "D"]
let r = 2

var res = [[String]]()
getPermutation(arr, r, &res)

print(res.count) // 12
print(res)
/*
 [["A", "B"], ["A", "C"], ["A", "D"], ["B", "A"],
 ["B", "C"], ["B", "D"], ["C", "B"], ["C", "A"],
 ["C", "D"], ["D", "B"], ["D", "C"], ["D", "A"]]
 */
```

1. `[A, B, C, D]`를 입력받고 탐색을 시작한다.
2. 첫 번째 원소인 `A`를 다른 원소들과 스왑하고 재귀 호출한다.<br>
`[A, B, C, D]`, `[B, A, C, D]`, `[C, B, A, D]`, `[D, B, C, A]`<br>
첫 번째 위치한 원소는 확정된 것이므로 나머지에서 `r - 1`개 만큼 선택하면 된다.
3. 호출된 4개 함수 중 `[C, B, A, D]`를 기준으로 살펴보면,<br>
두 번째 원소까지 확정하여 `[C, B]`가 확정된 상태이다.<br>
`r`개 만큼 확정을 지었으므로 `res`에 추가한 뒤 함수를 종료한다.
4. 각 재귀 함수들은 DFS와 비슷한 느낌으로 요소를 확정지으며 순열을 구할 수 있다.

```swift
import Foundation

func getCombination<T>(_ arr: [T], _ r: Int, _ res: inout [[T]], _ now: [T] = [T]()) {
    let n = arr.count

    guard n > 0 else { return }
    
    if r == 0 {
        res.append(now)
    } else if n == r {
        res.append(now + arr)
    } else {
        getCombination(Array(arr[1...]), r - 1, &res, now + [arr.first!])
        getCombination(Array(arr[1...]), r, &res, now)
    }
}

let arr = ["A", "B", "C", "D"]
let r = 2
var res = [[String]]()

getCombination(arr, r, &res)

print(res.count) // 6
print(res)
/*
 [["A", "B"], ["A", "C"], ["A", "D"],
 ["B", "C"], ["B", "D"], ["C", "D"]]
 */
```

1. `[A, B, C, D]`를 입력받고 탐색을 시작한다.
2. 첫 번째 원소인 `A`를 확정한 경우와 그렇지 않은 경우 2가지로 나누어 재귀 호출한다.<br>
전자는 나머지 `[B, C, D]`에서 `r - 1`개를 선택하면 되고, 후자는 `[B, C, D]`에서 `r`개를 선택하면 된다.
3. `r`이 0이 되는 경우는 더이상 선택할 필요가 없으므로 `now`를 추가하고 함수를 종료한다.
4. `n`과 `r`이 같은 경우는 모든 요소를 선택하면 되므로 `now`와 입력받은 `arr`을 더하여 추가학고 함수를 종료한다.
5. 재귀 함수들이 종료되면 최종적으로 조합을 구할 수 있다.

## 참고

1. [https://github.com/raywenderlich/swift-algorithm-club/tree/master/Combinatorics](https://github.com/raywenderlich/swift-algorithm-club/tree/master/Combinatorics)
2. [https://minusi.tistory.com/entry/%EC%88%9C%EC%97%B4-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-Permutation-Algorithm](https://minusi.tistory.com/entry/%EC%88%9C%EC%97%B4-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-Permutation-Algorithm)
