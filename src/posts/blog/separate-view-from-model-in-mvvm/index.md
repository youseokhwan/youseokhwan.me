---
title: "View에서 Model 직접 참조하지 않도록 구현하기"
category: "iOS"
date: "2025-05-07 20:00:00"
desc: "MVVM에서 View가 Model을 직접 참조하지 않도록 DisplayModel 만들기"
thumbnail: "../../../../src/images/ios.webp"
---

UIKit에서 MVVM을 적용하면, View는 아래와 같이 구현할 수 있다.

```swift
class SomeView: UIView {
    private let nameLabel = UILabel()

    override init(frame: CGRect) { ... }
    required init?(coder: NSCoder) { ... }

    func update(name: String) {
        nameLabel.text = name
    }
}
```

이때, Entity(Model)의 파라미터 개수가 많아지면, 메서드 혹은 파라미터의 개수가 많아진다.

```swift
struct User {
    let name: String
    let age: Int
    let email: String
    let createdAt: Date
}

class SomeView: UIView {
    private let nameLabel = UILabel()
    private let ageLabel = UILabel()
    private let emailLabel = UILabel()
    private let createdAtLabel = UILabel()

    override init(frame: CGRect) { ... }
    required init?(coder: NSCoder) { ... }

    func update(
        name: String,
        age: Int,
        email: String,
        createdAt: Date,
    ) {
        nameLabel.text = name
        ageLabel.text = age
        emailLabel.text = email
        createdAtLabel.text = createdAt
    }
}
```

## Entity 자체를 넘기면?

Entity 자체를 넘기면 더 간편하게 구현할 수 있다.

```swift
class SomeView: UIView {
    private let nameLabel = UILabel()
    private let ageLabel = UILabel()
    private let emailLabel = UILabel()
    private let createdAtLabel = UILabel()

    override init(frame: CGRect) { ... }
    required init?(coder: NSCoder) { ... }

    func update(with user: User) {
        nameLabel.text = user.name
        ageLabel.text = user.age
        emailLabel.text = user.email
        createdAtLabel.text = user.createdAt
    }
}
```

View가 Model을 참조하고 있지만, 데이터를 가공하거나 판단하는 로직이 있는 것은 아니기에, 팀원들과 협의 하에 충분히 사용할 만하다.

## 참조하기 꺼려지는 경우

### 데이터를 가공하거나 판단하는 경우

데이터를 가공하거나 판단한다면 문제가 될 수 있다.

```swift
class SomeView: UIView {
    private let nameLabel = UILabel()
    private let isAdultLabel = UILabel()

    override init(frame: CGRect) { ... }
    required init?(coder: NSCoder) { ... }

    func update(with user: User) {
        nameLabel.text = "\(user.name)님"
        isAdultLabel.text = user.age > 18 ? "성인" : "청소년"
    }
}
```

데이터를 가공하거나 판단하는 것은 ViewModel의 책임인데, View가 이를 침범하고 있다.<br>
위 코드를 테스트하려면 View 레벨에서 검증해야 하므로, MVVM의 장점이 무색해진 상태이다.

### Entity의 일부만 사용하는 경우

만약 Entity가 많은 프로퍼티를 가지고 있고, 일부만 사용하는 경우도 관심사 분리를 고려해야 한다.

```swift
struct User {
    let id: UUID
    let name: String
    let nickname: String
    let email: String
    let phoneNumber: String
    let age: Int
    let gender: Gender
    let isActive: Bool
    let profileImageURL: URL?
    let registeredAt: Date
}

class SomeView: UIView {
    private let nameLabel = UILabel()

    override init(frame: CGRect) { ... }
    required init?(coder: NSCoder) { ... }

    func update(with user: User) {
        nameLabel.text = "\(user.name)님"
    }
}
```

View는 name만 알면 되는데, 너무 많은 정보와 Coupling 되어있다.<br>
나중에, 이 코드를 읽는 사람이 이 View가 User 전체를 다 쓰는 것으로 혼동할 수 있다.

## DisplayModel 사용

가장 최적화된 방법인지는 확신이 없지만, DisplayModel 타입을 사용하는 방법이 있다.<br>
DisplayModel은 View에 표시하기 위한 가공된 데이터들로만 구성하며, ViewModel이 가지고 있기 때문에 View가 Entity를 직접 참조하지 않는다.

```swift
struct User {
    let id: UUID
    let name: String
    let nickname: String
    let email: String
    let phoneNumber: String
    let age: Int
    let gender: Gender
    let isActive: Bool
    let profileImageURL: URL?
    let registeredAt: Date
}

class SomeViewModel {
    private var user: User

    struct UserDisplayModel {
        let formattedName: String
        let isAdultText: String
    }

    func makeUserDisplayModel(from user: User) -> UserDisplayModel {
        return UserDisplayModel(
            formattedName: "\(user.name)님",
            isAdultText: user.age > 18 ? "성인" : "청소년"
        )
    }
}

class SomeView: UIView {
    private let nameLabel = UILabel()
    private let isAdultLabel = UILabel()

    override init(frame: CGRect) { ... }
    required init?(coder: NSCoder) { ... }

    func update(with model: SomeViewModel.UserDisplayModel) {
        nameLabel.text = model.formattedName
        isAdultLabel.text = model.isAdultText
    }
}
```

View는 UI 로직에만 집중할 수 있고, 데이터의 가공과 판단은 ViewModel의 책임으로 분리했다.<br>
유닛 테스트를 위해 View에 접근하지 않아도 되고, Entity 구조 변경에 View가 영향을 받지 않는다.

다만, 데이터 흐름이 명확하지 않으면 오히려 복잡성을 증가시킬 수 있으므로, 필요한 경우에만 분리해서 구현하도록 하자.

---

### 참고

- https://techblog.woowahan.com/2602/
- [https://velog.io/@kyeun95/디자인-패턴-MVVM-패턴이란](https://velog.io/@kyeun95/%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4-MVVM-%ED%8C%A8%ED%84%B4%EC%9D%B4%EB%9E%80)
