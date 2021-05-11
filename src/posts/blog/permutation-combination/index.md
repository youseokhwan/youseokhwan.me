---
title: "순열과 조합"
category: "Swift PS"
date: "2021-05-11 12:30:00 +09:00"
desc: "permutation-combination"
---

## 개념

순열(Permutation)은 서로 다른 `n`개의 원소에서 `r`개를 순서에 상관있게 나열한 것이며,

조합(Combination)은 서로 다른 `n`개의 원소에서 `r`개를 순서에 상관없이 나열한 것이다.

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
func getPermutation(_ _arr: [Int], _ r: Int, _ depth: Int = 0) {
    var arr = _arr
    
    if depth == r {
        permutation.append(Array(arr[0..<r]))
        return
    }
    
    for i in depth..<arr.count {
        arr.swapAt(i, depth)
        getPermutation(arr, r, depth + 1)
        arr.swapAt(i, depth)
    }
}

let arr = [1, 2, 3, 4]
var permutation = [[Int]]()
getPermutation(arr, 3)

print("count: \(permutation.count)") // count: 24
print(permutation)
/*
 [[1, 2, 3], [1, 2, 4], [1, 3, 2], [1, 3, 4], [1, 4, 3], [1, 4, 2],
 [2, 1, 3], [2, 1, 4], [2, 3, 1], [2, 3, 4], [2, 4, 3], [2, 4, 1],
 [3, 2, 1], [3, 2, 4], [3, 1, 2], [3, 1, 4], [3, 4, 1], [3, 4, 2],
 [4, 2, 3], [4, 2, 1], [4, 3, 2], [4, 3, 1], [4, 1, 3], [4, 1, 2]]
 */
```

```swift
func getCombination(_ _arr: [Int], _ tempR: Int, _ index: Int = 0, _ target: Int = 0) {
    var arr = _arr
    
    if tempR == 0 {
        combination.append(Array(arr[0..<r]))
    } else if target == arr.count {
        return
    } else {
        arr[index] = target
        getCombination(arr, tempR - 1, index + 1, target + 1)
        getCombination(arr, tempR, index, target + 1)
    }
}

let arr = [1, 2, 3, 4]
let r = 3
var combination = [[Int]]()
getCombination(arr, r)

print("count: \(combination.count)") // count: 4
print(combination) // [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]]
```

## 참고

1. [https://aerocode.net/376](https://aerocode.net/376)
2. [https://gorakgarak.tistory.com/522](https://gorakgarak.tistory.com/522)
