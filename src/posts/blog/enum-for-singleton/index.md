---
title: "enum으로 Singleton 구현하기"
category: "Swift"
date: "2025-02-21 15:00:00 +09:00"
desc: "class Singleton과 enum Singleton의 장단점 비교"
thumbnail: "../../../../src/images/swift.png"
---

## Singleton

Singleton은 클래스의 인스턴스 개수를 1개로 제한하는 디자인 패턴이다.<br>
iOS의 대표적인 예시로는 `UserDefaults`, `URLSession` 등이 있다.

### 장점

* 메모리 효율: 단일 인스턴스기 때문에, 한번 생성한 인스턴스를 재사용하며 공간 효율을 최적화할 수 있다.
* 데이터 공유: 인스턴스가 전역으로 사용되기 때문에, 데이터 공유가 편하다.

### 단점

* 테스트 어려움: 데이터 공유가 편한 대신, 컴포넌트간 결합도가 높아져 테스트가 어려워진다.
* 멀티 스레드 문제: 전역으로 사용되는 만큼, race condition 우려가 있다.
* SOLID 위반하기 쉬움: 접근성이 좋아서 여러 역할을 추가하다보면 SRP, DIP, OCP 등 객체지향 설계 원칙(SOLID)을 위반하기 쉽다.

Concurrency, 의존성 주입 등 개선 방법은 있지만, 단점이 뚜렷하여 Singleton을 안티 패턴으로 취급하기도 한다.

---

## class로 Singleton 구현

class로 Singleton을 구현해보자.<br>
GET 요청으로 JSON 데이터(`Post`)를 가져오는 `NetworkManager`이다.

```swift
struct Post: Codable {
    let id: Int
    let title: String
    let body: String
}
```

```swift
class NetworkManager {
    static let shared = NetworkManager()

    private init() {}

    func fetchPosts() async throws -> [Post] {
        let url = URL(string: "https://jsonplaceholder.typicode.com/posts")!
        let (data, _) = try await URLSession.shared.data(from: url)
        return try JSONDecoder().decode([Post].self, from: data)
    }
}

Task {
    do {
        let posts = try await NetworkManager.shared.fetchPosts()
        print("포스트 개수: \(posts.count)")
    } catch {
        print("Error: \(error.localizedDescription)")
    }
}
```

단일 인스턴스인 `shared`를 통해 전역에서 편하게 접근할 수 있다.<br>
또한, `init()`을 `private`으로 선언했기 때문에 외부에서 새로운 인스턴스를 생성할 수 없다.

---

## enum으로 Singleton 구현

enum은 enumerations이라는 이름 그대로 열거형 타입을 정의할 때 사용하지만,<br>
Swift에서는 약간의 트릭?으로 namespace의 역할을 하기도 한다.

`NetworkManager`를 enum으로 migration 해보자.

```swift
enum NetworkManager {
    static func fetchPosts() async throws -> [Post] {
        let url = URL(string: "https://jsonplaceholder.typicode.com/posts")!
        let (data, _) = try await URLSession.shared.data(from: url)
        return try JSONDecoder().decode([Post].self, from: data)
    }
}

Task {
    do {
        let posts = try await NetworkManager.fetchPosts()
        print("포스트 개수: \(posts.count)")
    } catch {
        print("Error: \(error.localizedDescription)")
    }
}
```

enum을 이용해 인스턴스 자체를 만들지 않고, 타입 프로퍼티로 접근하여 같은 기능을 구현했다.<br>
(아예 인스턴스가 없는데 Singleton이라고 명명해도 될까?)

---

## class Singleton vs enum Singleton

enum Singleton은 class Singleton과 비교해 다음과 같은 장점이 있다.

* enum은 인스턴스 생성을 원천적으로 차단하므로 더 안전하다.
* `private init()`을 작성하지 않아도 되고, 접근할 때도 타입 프로퍼티로 바로 접근하기에 구문이 더 간결해진다.
* heap에 할당되지 않기에, 상태 값이 필요없는 경우(stateless)에 적합하다.

그렇다면 항상 enum을 쓰는게 좋은가? 그렇지는 않다.

* state 저장이 필요한 경우 class Singleton을 써야한다.
* 테스트할 때 mocking이 어렵다.
* 프로토콜을 채택할 때 제약이 있을 수 있다.

---

단순 Utility나 Helper의 목적으로 state 없이 class Singleton을 사용하고 있다면, enum Singleton으로 migration을 고려해볼 수 있다.<br>
enum을 채택하지 않더라도, namespace로 사용하는 방식은 종종 볼 수 있기에 인지하고 있으면 좋을 것 같다.

---

### 참고

- https://velog.io/@wlsrhkd4023/Design-Pattern-%EC%8B%B1%EA%B8%80%ED%86%A4-%ED%8C%A8%ED%84%B4Singleton-Pattern-rzs6f6vd
- https://inpa.tistory.com/entry/GOF-%F0%9F%92%A0-%EC%8B%B1%EA%B8%80%ED%86%A4Singleton-%ED%8C%A8%ED%84%B4-%EA%BC%BC%EA%BC%BC%ED%95%98%EA%B2%8C-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90#%EC%8B%B1%EA%B8%80%ED%86%A4%EC%9D%98_%EB%AC%B8%EC%A0%9C%EC%A0%90
- https://medium.com/@cgoldsby/swift-an-enum-for-a-singleton-9f8a1780a21f
- https://medium.com/@Jager-yoo/swift-%EB%8B%A4%EC%8B%9C-%EA%B3%B5%EB%B6%80%ED%95%98%EB%8A%94-%EC%8B%B1%EA%B8%80%ED%84%B4-singleton-%ED%8C%A8%ED%84%B4-a013757775bc
- https://zeddios.tistory.com/353
- https://medium.com/@jamshehadeh/your-guide-to-a-thread-safe-singleton-in-swift-part-i-17633c5a65fe
