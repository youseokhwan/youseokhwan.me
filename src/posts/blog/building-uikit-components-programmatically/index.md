---
title: "UIKit의 UI 컴포넌트를 코드 베이스로 구현하기"
category: "iOS"
date: "2025-02-17 17:00:00 +09:00"
desc: "lazy var를 이용하여 UI 컴포넌트 구현하기"
thumbnail: "../../../../src/images/ios.webp"
---

UIKit에서 UI 컴포넌트(label, button 등)를 코드 베이스(programmatically)로 작성하는 기본적인 방법은 다음과 같다.<br>
auto layout에 관련된 코드는 제외했다.

```swift
import UIKit

class ViewController: UIViewController {
    let dummyLabel = UILabel()

    override func viewDidLoad() {
        super.viewDidLoad()

        dummyLabel.text = "Dummy"
        dummyLabel.textColor = .systemBlue
        dummyLabel.textAlignment = .center
        view.addSubview(dummyLabel)
    }
}
```

storyboard(xml)에 있는 속성들을 코드로 옮겨와서 불가피하게 코드가 길어졌다.<br>
코드 자체를 줄이진 못하더라도 최대한 우아하게 개선해보자.

## 클로저를 이용한 초기화

클로저를 이용해 속성을 부여하면서 컴포넌트를 선언할 수 있다.

```swift
import UIKit

class ViewController: UIViewController {
    let dummyLabel: UILabel = {
        let label = UILabel()
        label.text = "Dummy"
        label.textColor = .systemBlue
        label.textAlignment = .center
        return label
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
        view.addSubview(dummyLabel)
    }
}
```

문법이 낯설다면 기호(`:`, `=`, `{}`, `()`)의 위치나 누락에 유의한다.<br>
이런 구문을 IICE(Immediately Invoked Closure Expression, 즉시 실행되는 클로저 표현식)라고 한다.<br>
이후 그냥 '클로저'라고 표현하겠다.

클로저를 이용하면 속성을 부여하는 코드들을 한 곳으로 묶을 수 있고, `viewDidLoad()`가 깔끔해진다.

### self 접근 문제

`UIButton`으로 예시를 바꿔보자.

```swift
import UIKit

class ViewController: UIViewController {
    let buttonColor = UIColor.green

    let dummyButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Dummy", for: .normal)
        button.setTitleColor(self.buttonColor, for: .normal) // self?
        button.addTarget(self, action: #selector(didTapDummyButton), for: .touchUpInside) // self?
        return button
    }()

    @objc func didTapDummyButton() {
        print(#function)
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        view.addSubview(dummyButton)
    }
}
```

클로저가 실행되는 순간에 `self`의 초기화가 완료됐는지를 보장할 수 없기 때문에 컴파일 에러가 발생한다.<br>
`self`가 포함된 코드는 다시 `viewDidLoad()`로 내려야될까?

## lazy var를 이용한 지연 초기화

다행히 `lazy var`라는 선택지가 있다.<br>
`let dummyButton`을 `lazy var dummyButton`으로 바꿔주자.

```swift
import UIKit

class ViewController: UIViewController {
    let buttonColor = UIColor.green

    lazy var dummyButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Dummy", for: .normal)
        button.setTitleColor(self.buttonColor, for: .normal) // self 접근 ok
        button.addTarget(self, action: #selector(didTapDummyButton), for: .touchUpInside) // self 접근 ok
        return button
    }()

    @objc func didTapDummyButton() {
        print(#function)
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        view.addSubview(dummyButton)
    }
}
```

`lazy var`를 사용하여 지연 초기화를 하게되면, `ViewController` 인스턴스가 먼저 생성되고, `dummyButton`에 접근할 때 클로저가 실행되기 때문에 `self`를 참조할 수 있다.<br>
즉시 실행되어 결과를 반환하고 끝내기 때문에 순환 참조도 발생시키지 않는다.

또한 컴포넌트가 사용되는 시점에 초기화되기 때문에 메모리를 효율적으로 사용할 수 있다.

### lazy var의 단점

- 지연 초기화의 특성상 `let`이나 `computed property`와 함께 사용할 수 없다.
- thread-safe하지 않아서 race condition 우려가 있다.

UIKit에서는 UI 업데이트를 반드시 메인 스레드에서 해야하기에 큰 문제는 없다.<br>
(메인 스레드가 아닌 곳에서 UI 업데이트를 하면 런타임 에러가 발생하는데, 이건 `lazy`나 클로저 여부에 관계없이 발생한다.)

## 라이브러리 사용

이 밖에도 라이브러리를 사용하는 방법이 있다.<br>
사용 방법을 기술하지는 않고, 간단한 예시만 소개한다.

### Then

GitHub: [devxoul/Then](https://github.com/devxoul/Then)

```swift
let label = UILabel().then {
  $0.textAlignment = .center
  $0.textColor = .black
  $0.text = "Hello, World!"
}
```

### DuctTape

GitHub: [marty-suzuki/DuctTape](https://github.com/marty-suzuki/DuctTape)

```swift
let label: UILabel = UILabel().ductTape
    .numberOfLines(0)
    .textColor(.red)
    .text("Hello, World!!")
```

---

### 참고

- https://medium.com/the-traveled-ios-developers-guide/swift-initialization-with-closures-5ea177f65a5
- https://weekoding.tistory.com/12
- https://sueaty.tistory.com/164
- https://github.com/devxoul/Then
- https://github.com/marty-suzuki/DuctTape
