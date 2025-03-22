---
title: "UserDefaults"
category: "Swift"
date: "2025-02-27 09:00:00"
desc: "UserDefaults 사용법 및 주의 사항 정리"
thumbnail: "../../../../src/images/swift.webp"
---

`UserDefaults`는 `Foundation`에서 제공하는 사용자 기본값 데이터베이스에 대한 인터페이스이다.<br>
앱을 실행할 때마다 key-value 쌍을 persistent[^1]하게 저장한다.<br>
측정 단위, 다크 모드 사용 여부 등 사용자의 간단한 설정값을 저장하는 데 적합하다.

## 기본적인 사용법

`UserDefaults`는 `standard` 프로퍼티를 통해 별도의 인스턴스 생성 없이 Singleton처럼[^2] 사용할 수 있다.

### 읽기, 쓰기

`Int`와 `String` 타입의 설정값을 읽고 쓰는 간단한 예시이다.<br>
읽을 때는 `integer(forKey:)`, `string(forKey:)`처럼 타입 이름과 동일한 메서드로 가져오고,
저장할 때는 `set(_:forKey:)` 메소드로 value, key 순서로 파라미터를 넣는다.

```swift
import Foundation

var launchCount = UserDefaults.standard.integer(forKey: "launchCount")
launchCount += 1
UserDefaults.standard.set(launchCount, forKey: "launchCount")

if launchCount == 5 {
    // TODO: 앱 리뷰 요청 띄우기
}
```

```swift
import Foundation

UserDefaults.standard.set("DarkMode", forKey: "themeMode")
let theme = UserDefaults.standard.string(forKey: "themeMode") ?? "LightMode"
```

## 사용 가능한 타입

`UserDefaults`는 plist 기반으로 동작하므로, 다음과 같은 타입 제한이 있다.

* key는 `String` 타입
* value는 plist에 호환되는 `Bool`, `Int`, `Float`, `Double`, `String`, `URL`, `Date`, `Data` 타입

value의 경우 위에 나열한 타입을 내부 타입으로 가지는 `Array`, `Dictionary`까지는 가능하다.<br>
그 외 타입은 `Data` 타입으로 아카이빙하여 사용해야 한다.

```swift
// UIColor 저장하기
let color = UIColor.red
if let colorData = try? NSKeyedArchiver.archivedData(
    withRootObject: color,
    requiringSecureCoding: false
) {
    UserDefaults.standard.set(colorData, forKey: "savedColor")
}

// UIColor 불러오기
if let savedColorData = UserDefaults.standard.data(forKey: "savedColor"),
   let savedColor = try? NSKeyedUnarchiver.unarchivedObject(
    ofClass: UIColor.self,
    from: savedColorData
) {
    print(savedColor) // UIExtendedSRGBColorSpace 1 0 0 1
}
```

## Thread-Safe

[공식 문서](https://developer.apple.com/documentation/foundation/userdefaults)에 따르면 `UserDefaults`는 Thread-Safe하게 작동한다.

## 큰 데이터를 저장하는 것은 비추천

`UserDefaults`는 앱이 실행될 때, plist의 값을 읽어온 후 캐싱한다.<br>
캐싱된 데이터에서 값을 바로 반환해 주기 때문에 속도가 빠르지만, 그만큼 메모리에 부담이 있다.<br>
큰 데이터를 저장할 때는 `FileManager`, `Core Data` 등 다른 방법을 고려해야 한다.

## 보안이 필요한 데이터의 경우 주의

`UserDefaults`는 데이터를 암호화되지 않은 평문으로 저장한다.<br>
API Key, 토큰, 비밀번호 등 보안이 필요한 경우 `Keychain`에 위임하거나, `CryptoKit` 사용 등 다른 방법을 선택해야 한다.

---

### 참고

- https://developer.apple.com/documentation/foundation/userdefaults

[^1]: persistently: 지속적으로, 영속적으로 / 여기서는 상태나 데이터가 앱이 종료, 재시작되더라도 유지되는 것을 말한다.<br>
[^2]: init()이 public하기 때문에 완전한 Singleton으로 보기 어렵다. App Group을 사용하거나 특정 설정을 분리할 때 인스턴스를 만들어서 사용하기도 한다.
