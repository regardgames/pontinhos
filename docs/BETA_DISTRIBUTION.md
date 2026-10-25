# Pontinhos — distribuição do beta `v0.1.0`

Guia reproduzível para gerar o Android App Bundle, o APK e o IPA do beta fechado (20–30 pessoas) e publicá-los no Google Play Console (teste interno ou fechado) e no TestFlight. O recorte de produto está na seção 14 do planejamento e a privacidade, na seção 15.

Identidade do pacote:

| Campo | Valor |
|---|---|
| Nome na loja e no aparelho | Pontinhos |
| Android `applicationId` / iOS bundle | `com.regard.pontinhos` |
| `versionName` / `CFBundleShortVersionString` | `0.1.0` |
| `versionCode` / `CFBundleVersion` | `1` |
| Orientação | Retrato (`portrait` / `UIInterfaceOrientationPortrait`) |
| Android `minSdk` | 24 |
| iOS | 15.0 |
| Permissões sensíveis | Nenhuma no manifesto de release |

O manifesto principal (`android/app/src/main/AndroidManifest.xml`) não declara câmera, localização, contatos, microfone, armazenamento amplo nem identificador de publicidade. Os manifestos de `debug` e `profile` pedem só `INTERNET`, exigida pela ferramenta do Flutter para hot reload. O `Info.plist` não tem chaves `NS*UsageDescription`.

## 1. Pré-requisitos

- Flutter 3.47 ou mais recente, no canal estável (`flutter --version`). O `pubspec.yaml` pede Dart `^3.13.7`.
- Android Studio com Android SDK e uma plataforma igual ou superior ao `targetSdk` do Flutter. Aceite as licenças com `flutter doctor --android-licenses`.
- Xcode atual, CocoaPods e uma conta Apple Developer com acesso ao time que vai assinar o app. O build iOS é feito em macOS.
- Conta de desenvolvedor Google Play com o app `com.regard.pontinhos` criado no Play Console.
- Repositório limpo, na revisão que vai para o beta.

Verificação obrigatória antes de empacotar (PON-20 e PON-21):

```bash
flutter pub get
flutter analyze
flutter test --coverage
```

`flutter analyze` precisa terminar sem issues. `flutter test` precisa passar por completo, inclusive `test/integration/mvp_flows_e2e_test.dart` (fluxos 7.1 a 7.5) e `test/analytics/`. Não empacote se houver bloqueador conhecido de partida, pausa, revanche ou vazamento de timer do bot.

## 2. Android — assinatura

O arquivo `android/key.properties` não entra no Git (já está no `android/.gitignore`). O exemplo versionado é `android/key.properties.example`.

1. Gere um keystore de upload, fora da árvore do repositório ou em um caminho ignorado. Guarde a senha num cofre, não no Git.

```bash
keytool -genkey -v \
  -keystore "$HOME/pontinhos-upload.jks" \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias upload
```

2. Copie o exemplo e preencha. `storeFile` é relativo a `android/app` quando o caminho não é absoluto.

```properties
storePassword=SENHA_DO_KEYSTORE
keyPassword=SENHA_DA_CHAVE
keyAlias=upload
storeFile=/caminho/absoluto/pontinhos-upload.jks
```

Salve como `android/key.properties`.

3. `android/app/build.gradle.kts` lê esse arquivo quando ele existe e usa o `signingConfig` `release`. Sem o arquivo, o tipo `release` cai na chave de debug para `flutter run --release` local. O artefato enviado ao Play Console precisa do keystore de upload.

Não commite `.jks`, `.keystore` nem `key.properties`.

## 3. Android — artefatos

Na raiz do repositório:

```bash
flutter pub get
flutter build appbundle --release
flutter build apk --release
```

Saídas:

- `build/app/outputs/bundle/release/app-release.aab` — envie este ao Play Console.
- `build/app/outputs/flutter-apk/app-release.apk` — instalação direta no grupo interno, se o console ainda não estiver pronto.

Confira antes do upload:

- `applicationId` `com.regard.pontinhos`
- `versionName` `0.1.0` e `versionCode` `1` (suba o `versionCode` a cada upload novo; o `pubspec.yaml` usa `0.1.0+1`)
- orientação retrato na `MainActivity`
- nenhuma permissão sensível no manifesto de release

## 4. Google Play Console — teste interno ou fechado

1. Crie o app com o nome **Pontinhos** e o id `com.regard.pontinhos`, se ainda não existir.
2. Em **Política do app**, declare que o aplicativo não coleta dados pessoais. Não há conta, anúncio, analytics de rede nem identificador de aparelho. A telemetria fica no aparelho (seção 6).
3. Classificação de conteúdo: jogo sem violência, sem chat e sem compra. Responda o questionário com esse recorte.
4. Em **Teste interno** ou **Teste fechado**, crie uma faixa e envie o `.aab`.
5. Crie uma lista de e-mail com 20–30 testadores. No teste interno o limite prático é 100; o beta deste produto usa 20–30 pessoas (seção 14.2).
6. Publique a faixa. Os testadores abrem o link de opt-in, aceitam o teste e instalam pela Play Store. A primeira instalação pode levar algumas horas para a revisão automática do teste interno.
7. Anote a versão `0.1.0 (1)` na planilha do playbook. Não misture builds sem subir o `versionCode`.

O teste interno serve para a equipe. O teste fechado é a faixa das 20–30 pessoas de fora. Os dois usam o mesmo `.aab`.

## 5. iOS — assinatura e IPA

O bundle está em `ios/Runner/Info.plist` (`CFBundleIdentifier` = `com.regard.pontinhos`) e no projeto Xcode (`PRODUCT_BUNDLE_IDENTIFIER`). As orientações suportadas são só `UIInterfaceOrientationPortrait`.

No Mac, na raiz do repositório:

```bash
flutter pub get
flutter build ipa --release
```

Na primeira vez o Xcode pede o time:

1. Abra `ios/Runner.xcworkspace`.
2. No target **Runner**, em **Signing & Capabilities**, selecione o Team da conta Apple Developer.
3. Deixe o bundle id `com.regard.pontinhos`. Crie um App ID com esse identificador no portal, se o Xcode não criar sozinho.
4. Use um perfil de distribuição **App Store** (o `flutter build ipa` pede assinatura de distribuição, não de desenvolvimento). Automatic signing resolve o perfil se o time tiver permissão.
5. Não adicione capability de push, iCloud, Associated Domains nem tracking. O app não precisa delas.

O IPA sai em `build/ios/ipa/`. O comando também gera um arquivo de opções de exportação. Se a assinatura automática falhar, exporte pelo Xcode com o perfil App Store do mesmo bundle id.

`ios/Podfile` fixa iOS 15.0 e não adiciona SDK de analytics, anúncio ou rastreio. `pod install` só entra quando o Flutter gera os plugins já declarados no `pubspec.yaml` (`shared_preferences` e o restante do framework).

## 6. App Store Connect — TestFlight

1. Crie o app **Pontinhos** com o bundle `com.regard.pontinhos` e o SKU interno que o time escolher.
2. Em **TestFlight**, envie o IPA:

```bash
xcrun altool --upload-app --type ios \
  --file build/ios/ipa/*.ipa \
  --apiKey SUA_API_KEY \
  --apiIssuer SEU_ISSUER_ID
```

O Transporter ou o Organizer do Xcode fazem o mesmo upload.

3. Preencha **App Privacy**: dados não coletados. Não há tracking, não há dados ligados à identidade e não há dados usados para rastrear. Não marque e-mail, nome, identificador de aparelho, localização nem contatos.
4. A classificação etária segue o mesmo recorte do Play: jogo offline, sem chat e sem compra.
5. Quando o processamento terminar, adicione o grupo **Beta fechado** com 20–30 testadores internos (convite por e-mail). TestFlight interno da equipe não exige revisão; um grupo externo exige uma revisão curta da Apple.
6. O convite chega por e-mail. A pessoa instala o TestFlight e depois o Pontinhos. A build expira em 90 dias.
7. Registre a build `0.1.0 (1)` ao lado da faixa Android. As duas plataformas entram na mesma rodada de observação do playbook.

## 7. Privacidade e offline-first (seção 15)

O beta não envia telemetria para um servidor. O serviço padrão (`InMemoryAnalyticsService`, atrás de `ResilientAnalyticsService`) guarda os eventos só na memória do processo. Se um adaptador externo for ligado no futuro e falhar, o jogo continua.

Eventos permitidos: `app_open`, `tutorial_started`, `tutorial_completed`, `tutorial_skipped`, `game_started`, `game_completed`, `game_abandoned`, `rematch_started`, `settings_changed`, `app_error`.

Parâmetros permitidos: `modo`, `tamanho`, `dificuldade`, `resultado`, `duracao`, `duracao_ms`, `quantidade_de_jogadas`, `starting_player`, `setting` (`sound`, `vibration`, `themeMode`), `value`, `code`, `context`.

O filtro em `lib/core/analytics/analytics_service.dart` descarta chaves de PII (`email`, `name`, `phone`, `user_id`, `device_id`, `ip` e as variações normalizadas) e valores que parecem e-mail, IP ou número longo. `app_error` só aceita um código curto, nunca a mensagem da exceção.

Estatísticas de vitória, derrota e empate contra o computador ficam no `SharedPreferences` do aparelho. Partida local de duas pessoas não entra nessa conta. Não há conta, login, anúncio nem dependência de rede para jogar.

O relatório legível da sessão está em Estatísticas (`Relatório da sessão`) e em `AnalyticsService.exportReport`. Ele serve para a pessoa de QA conferir a sessão no aparelho. Não é um upload.

## 8. Checklist de publicação

- [ ] `flutter analyze` sem issues e `flutter test` verde.
- [ ] `versionCode` / build number maior que o da faixa anterior, se não for o primeiro upload.
- [ ] AAB assinado com o keystore de upload, não com a chave de debug.
- [ ] IPA assinado com o time e o perfil App Store de `com.regard.pontinhos`.
- [ ] Manifesto de release e `Info.plist` sem permissão sensível e só em retrato.
- [ ] Fichas de privacidade do Play e da App Store marcadas como sem coleta.
- [ ] Lista de 20–30 testadores igual nas duas plataformas.
- [ ] Playbook de observação impresso ou compartilhado com quem conduz a sessão.
