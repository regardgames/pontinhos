# Manifesto de Ativos Visuais de Lojas — Pontinhos (`com.regard.pontinhos`)

- **Repositório:** `dayvidemerson/regard-jogo-dos-pontinhos`
- **Issues Atendidas:** `#30` (`PON-23`), `#31` (`PON-24`), `#32` (`PON-25`), `#33` (`PON-26`)
- **Direção de Arte:** *Tactile Paper & Ink* (`#F8FAFC` / `#0F172A`, Azul Cobalto `#2563EB` `●`, Laranja/Âmbar `#EA580C` `◆`/`▲`, Verde Esmeralda `#10B981` na última jogada)
- **Total de Arquivos Validados:** `69` arquivos (`100% PASS` em dimensões exatas, modo de cor `RGB`/`RGBA` e integridade)

## 1. Resumo dos Pacotes

| Pacote | Issue | Diretório Base | Quantidade | Formato / Modo de Cor |
| :--- | :--- | :--- | :--- | :--- |
| **Pacote 1 — Ícones Oficiais** | `#30` (`PON-23`) | `/workspace/store-assets/icons/` | 41 arquivos (37 PNG + 3 XML + 1 JSON) | Play Store `512×512` (`RGBA`), App Store `1024×1024` (`RGB` 24-bit sem alfa), Android `mipmap-*` + Adaptive (`108×108 dp` com safe zone `66×66 dp`), iOS `AppIcon.appiconset` (`RGB` 24-bit sem alfa) |
| **Pacote 2 — Feature Graphic** | `#31` (`PON-24`) | `/workspace/store-assets/feature-graphic/` | 1 arquivo PNG | `1024 × 500 px`, PNG 24-bit `RGB` **sem canal alfa/transparência** |
| **Pacote 3 — Screenshots Smartphone** | `#32` (`PON-25`) | `/workspace/store-assets/screenshots-phone/` | 15 arquivos PNG (5 cards × 3 resoluções) | `1080×1920` (Google Play), `1284×2778` (iPhone 6.5"), `1290×2796` (iPhone 6.7"), todos PNG 24-bit `RGB` sem alfa |
| **Pacote 4 — Screenshots Tablet** | `#33` (`PON-26`) | `/workspace/store-assets/screenshots-tablet/` | 12 arquivos PNG (4 cards × 3 resoluções) | `1200×1920` (Tablet 7"), `1600×2560` (Tablet 10"), `2048×2732` (iPad Pro 12.9"), todos PNG 24-bit `RGB` sem alfa |

## 2. Instruções de Integração no Projeto Flutter e nas Lojas

### 2.1 Integração Nativa Android (`android/app/src/main/res/`)
```bash
cp -r /workspace/store-assets/icons/android/mipmap-* android/app/src/main/res/
cp -r /workspace/store-assets/icons/android/values/* android/app/src/main/res/values/
```

### 2.2 Integração Nativa iOS (`ios/Runner/Assets.xcassets/AppIcon.appiconset/`)
```bash
cp -r /workspace/store-assets/icons/ios/AppIcon.appiconset/* ios/Runner/Assets.xcassets/AppIcon.appiconset/
```

### 2.3 Upload no Google Play Console e App Store Connect
- **Google Play Console → Ficha da loja principal:**
  - **Ícone do app (`512 × 512 px`):** `/workspace/store-assets/icons/play-store-icon-512x512.png`
  - **Recurso gráfico (`1024 × 500 px`):** `/workspace/store-assets/feature-graphic/feature-graphic-1024x500.png`
  - **Capturas de tela de telefone (`1080 × 1920 px`):** `/workspace/store-assets/screenshots-phone/google-play-1080x1920/01..05-*.png`
  - **Capturas de tela de tablet de 7 pol. (`1200 × 1920 px`):** `/workspace/store-assets/screenshots-tablet/tablet-7-1200x1920/01..04-*.png`
  - **Capturas de tela de tablet de 10 pol. (`1600 × 2560 px`):** `/workspace/store-assets/screenshots-tablet/tablet-10-1600x2560/01..04-*.png`
- **Apple App Store Connect:**
  - **Ícone Master (`1024 × 1024 px` sem alfa):** `/workspace/store-assets/icons/app-store-icon-1024x1024.png`
  - **iPhone 6.7" Display (`1290 × 2796 px`):** `/workspace/store-assets/screenshots-phone/app-store-6.7-1290x2796/01..05-*.png`
  - **iPhone 6.5" Display (`1284 × 2778 px`):** `/workspace/store-assets/screenshots-phone/app-store-6.5-1284x2778/01..05-*.png`
  - **iPad Pro (6th Gen) 12.9" Display (`2048 × 2732 px`):** `/workspace/store-assets/screenshots-tablet/ipad-pro-12.9-2048x2732/01..04-*.png`

## 3. Inventário Completo de Arquivos e Checksums (SHA-256)

| Pacote | Caminho Relativo (`/workspace/store-assets/`) | Dimensões | Formato / Cor | Tamanho | SHA-256 (primeiros 16 hex) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Pacote 1 — Ícones (PON-23) | `icons/play-store-icon-512x512.png` | `512 × 512 px` | `PNG (RGBA)` | `49.3 KB` | `8aeab0078ce9b6dd…` |
| Pacote 1 — Ícones (PON-23) | `icons/app-store-icon-1024x1024.png` | `1024 × 1024 px` | `PNG (RGB)` | `83.2 KB` | `0f23c34767212852…` |
| Pacote 1 — Android (PON-23) | `icons/android/mipmap-mdpi/ic_launcher.png` | `48 × 48 px` | `PNG (RGBA)` | `3.1 KB` | `a19d2fcfa55ca7f3…` |
| Pacote 1 — Android (PON-23) | `icons/android/mipmap-mdpi/ic_launcher_round.png` | `48 × 48 px` | `PNG (RGBA)` | `3.2 KB` | `d246bdbb81b787cb…` |
| Pacote 1 — Android Adaptive (PON-23) | `icons/android/mipmap-mdpi/ic_launcher_foreground.png` | `108 × 108 px` | `PNG (RGBA)` | `5.1 KB` | `f2528c752094b102…` |
| Pacote 1 — Android Adaptive (PON-23) | `icons/android/mipmap-mdpi/ic_launcher_background.png` | `108 × 108 px` | `PNG (RGB)` | `1.7 KB` | `9e160d97529cd580…` |
| Pacote 1 — Android (PON-23) | `icons/android/mipmap-hdpi/ic_launcher.png` | `72 × 72 px` | `PNG (RGBA)` | `5.3 KB` | `5931d24050237089…` |
| Pacote 1 — Android (PON-23) | `icons/android/mipmap-hdpi/ic_launcher_round.png` | `72 × 72 px` | `PNG (RGBA)` | `5.4 KB` | `70e72416ec55c258…` |
| Pacote 1 — Android Adaptive (PON-23) | `icons/android/mipmap-hdpi/ic_launcher_foreground.png` | `162 × 162 px` | `PNG (RGBA)` | `8.8 KB` | `d6cc8ddaf084a71f…` |
| Pacote 1 — Android Adaptive (PON-23) | `icons/android/mipmap-hdpi/ic_launcher_background.png` | `162 × 162 px` | `PNG (RGB)` | `2.5 KB` | `aa751b447a40696d…` |
| Pacote 1 — Android (PON-23) | `icons/android/mipmap-xhdpi/ic_launcher.png` | `96 × 96 px` | `PNG (RGBA)` | `7.9 KB` | `9b54c00f0c4f398e…` |
| Pacote 1 — Android (PON-23) | `icons/android/mipmap-xhdpi/ic_launcher_round.png` | `96 × 96 px` | `PNG (RGBA)` | `7.8 KB` | `41a174fbb40c5600…` |
| Pacote 1 — Android Adaptive (PON-23) | `icons/android/mipmap-xhdpi/ic_launcher_foreground.png` | `216 × 216 px` | `PNG (RGBA)` | `12.3 KB` | `618c26b876f3644b…` |
| Pacote 1 — Android Adaptive (PON-23) | `icons/android/mipmap-xhdpi/ic_launcher_background.png` | `216 × 216 px` | `PNG (RGB)` | `3.4 KB` | `03721e4e02850588…` |
| Pacote 1 — Android (PON-23) | `icons/android/mipmap-xxhdpi/ic_launcher.png` | `144 × 144 px` | `PNG (RGBA)` | `12.9 KB` | `ea754125c8bad34a…` |
| Pacote 1 — Android (PON-23) | `icons/android/mipmap-xxhdpi/ic_launcher_round.png` | `144 × 144 px` | `PNG (RGBA)` | `12.7 KB` | `f1810ab07413abcb…` |
| Pacote 1 — Android Adaptive (PON-23) | `icons/android/mipmap-xxhdpi/ic_launcher_foreground.png` | `324 × 324 px` | `PNG (RGBA)` | `19.5 KB` | `4552901444309ac7…` |
| Pacote 1 — Android Adaptive (PON-23) | `icons/android/mipmap-xxhdpi/ic_launcher_background.png` | `324 × 324 px` | `PNG (RGB)` | `5.6 KB` | `cbeeefe0d4daa086…` |
| Pacote 1 — Android (PON-23) | `icons/android/mipmap-xxxhdpi/ic_launcher.png` | `192 × 192 px` | `PNG (RGBA)` | `17.7 KB` | `0054ec595eaa0b45…` |
| Pacote 1 — Android (PON-23) | `icons/android/mipmap-xxxhdpi/ic_launcher_round.png` | `192 × 192 px` | `PNG (RGBA)` | `17.1 KB` | `33916a8309afef55…` |
| Pacote 1 — Android Adaptive (PON-23) | `icons/android/mipmap-xxxhdpi/ic_launcher_foreground.png` | `432 × 432 px` | `PNG (RGBA)` | `26.6 KB` | `1dcac84b54735b16…` |
| Pacote 1 — Android Adaptive (PON-23) | `icons/android/mipmap-xxxhdpi/ic_launcher_background.png` | `432 × 432 px` | `PNG (RGB)` | `7.9 KB` | `28ec8e1bd069b5bc…` |
| Pacote 1 — iOS AppIcon (PON-23) | `icons/ios/AppIcon.appiconset/Icon-App-20x20@1x.png` | `20 × 20 px` | `PNG (RGB)` | `0.8 KB` | `614eb8e1fbea8d08…` |
| Pacote 1 — iOS AppIcon (PON-23) | `icons/ios/AppIcon.appiconset/Icon-App-20x20@2x.png` | `40 × 40 px` | `PNG (RGB)` | `2.1 KB` | `782963e311e82347…` |
| Pacote 1 — iOS AppIcon (PON-23) | `icons/ios/AppIcon.appiconset/Icon-App-20x20@3x.png` | `60 × 60 px` | `PNG (RGB)` | `3.6 KB` | `6ce963e9492414e3…` |
| Pacote 1 — iOS AppIcon (PON-23) | `icons/ios/AppIcon.appiconset/Icon-App-29x29@1x.png` | `29 × 29 px` | `PNG (RGB)` | `1.4 KB` | `be5ac449a29ac11a…` |
| Pacote 1 — iOS AppIcon (PON-23) | `icons/ios/AppIcon.appiconset/Icon-App-29x29@2x.png` | `58 × 58 px` | `PNG (RGB)` | `3.6 KB` | `446cbc9098fa06c2…` |
| Pacote 1 — iOS AppIcon (PON-23) | `icons/ios/AppIcon.appiconset/Icon-App-29x29@3x.png` | `87 × 87 px` | `PNG (RGB)` | `6.0 KB` | `22eeba42d60c3b81…` |
| Pacote 1 — iOS AppIcon (PON-23) | `icons/ios/AppIcon.appiconset/Icon-App-40x40@1x.png` | `40 × 40 px` | `PNG (RGB)` | `2.1 KB` | `782963e311e82347…` |
| Pacote 1 — iOS AppIcon (PON-23) | `icons/ios/AppIcon.appiconset/Icon-App-40x40@2x.png` | `80 × 80 px` | `PNG (RGB)` | `5.2 KB` | `5e41418e3a30b155…` |
| Pacote 1 — iOS AppIcon (PON-23) | `icons/ios/AppIcon.appiconset/Icon-App-40x40@3x.png` | `120 × 120 px` | `PNG (RGB)` | `8.5 KB` | `6e68df82a451e761…` |
| Pacote 1 — iOS AppIcon (PON-23) | `icons/ios/AppIcon.appiconset/Icon-App-60x60@2x.png` | `120 × 120 px` | `PNG (RGB)` | `8.5 KB` | `6e68df82a451e761…` |
| Pacote 1 — iOS AppIcon (PON-23) | `icons/ios/AppIcon.appiconset/Icon-App-60x60@3x.png` | `180 × 180 px` | `PNG (RGB)` | `13.7 KB` | `090fa9a2c89224e2…` |
| Pacote 1 — iOS AppIcon (PON-23) | `icons/ios/AppIcon.appiconset/Icon-App-76x76@1x.png` | `76 × 76 px` | `PNG (RGB)` | `4.8 KB` | `760df5341aa8f894…` |
| Pacote 1 — iOS AppIcon (PON-23) | `icons/ios/AppIcon.appiconset/Icon-App-76x76@2x.png` | `152 × 152 px` | `PNG (RGB)` | `11.2 KB` | `94106f768cd7e598…` |
| Pacote 1 — iOS AppIcon (PON-23) | `icons/ios/AppIcon.appiconset/Icon-App-83.5x83.5@2x.png` | `167 × 167 px` | `PNG (RGB)` | `12.3 KB` | `ee6e95bbf99362de…` |
| Pacote 1 — iOS AppIcon (PON-23) | `icons/ios/AppIcon.appiconset/Icon-App-1024x1024@1x.png` | `1024 × 1024 px` | `PNG (RGB)` | `83.2 KB` | `0f23c34767212852…` |
| Pacote 2 — Feature Graphic (PON-24) | `feature-graphic/feature-graphic-1024x500.png` | `1024 × 500 px` | `PNG (RGB)` | `140.9 KB` | `a360280246d757d9…` |
| Pacote 3 — Screenshots Smartphone (PON-25) | `screenshots-phone/google-play-1080x1920/01-proposta-principal-tabuleiro.png` | `1080 × 1920 px` | `PNG (RGB)` | `263.9 KB` | `c51e46c9aadba2ac…` |
| Pacote 3 — Screenshots Smartphone (PON-25) | `screenshots-phone/google-play-1080x1920/02-bot-facil-e-dificil.png` | `1080 × 1920 px` | `PNG (RGB)` | `275.5 KB` | `00ac1ddd9a0b4432…` |
| Pacote 3 — Screenshots Smartphone (PON-25) | `screenshots-phone/google-play-1080x1920/03-dois-jogadores-passa-e-joga.png` | `1080 × 1920 px` | `PNG (RGB)` | `252.9 KB` | `b80beeecd160fbc8…` |
| Pacote 3 — Screenshots Smartphone (PON-25) | `screenshots-phone/google-play-1080x1920/04-temas-claro-escuro-acessibilidade.png` | `1080 × 1920 px` | `PNG (RGB)` | `285.6 KB` | `3308a0116363b038…` |
| Pacote 3 — Screenshots Smartphone (PON-25) | `screenshots-phone/google-play-1080x1920/05-estatisticas-e-100-offline.png` | `1080 × 1920 px` | `PNG (RGB)` | `288.7 KB` | `8df5b5f0cbd8c376…` |
| Pacote 3 — Screenshots Smartphone (PON-25) | `screenshots-phone/app-store-6.5-1284x2778/01-proposta-principal-tabuleiro.png` | `1284 × 2778 px` | `PNG (RGB)` | `333.9 KB` | `524f6c6a80383c04…` |
| Pacote 3 — Screenshots Smartphone (PON-25) | `screenshots-phone/app-store-6.5-1284x2778/02-bot-facil-e-dificil.png` | `1284 × 2778 px` | `PNG (RGB)` | `368.0 KB` | `6335f7327bd4977a…` |
| Pacote 3 — Screenshots Smartphone (PON-25) | `screenshots-phone/app-store-6.5-1284x2778/03-dois-jogadores-passa-e-joga.png` | `1284 × 2778 px` | `PNG (RGB)` | `337.5 KB` | `c279c8c800b68423…` |
| Pacote 3 — Screenshots Smartphone (PON-25) | `screenshots-phone/app-store-6.5-1284x2778/04-temas-claro-escuro-acessibilidade.png` | `1284 × 2778 px` | `PNG (RGB)` | `354.6 KB` | `0d7ad706b7b2fb33…` |
| Pacote 3 — Screenshots Smartphone (PON-25) | `screenshots-phone/app-store-6.5-1284x2778/05-estatisticas-e-100-offline.png` | `1284 × 2778 px` | `PNG (RGB)` | `365.6 KB` | `d4aebfed3282fd9b…` |
| Pacote 3 — Screenshots Smartphone (PON-25) | `screenshots-phone/app-store-6.7-1290x2796/01-proposta-principal-tabuleiro.png` | `1290 × 2796 px` | `PNG (RGB)` | `334.0 KB` | `ba1ef83001235a5f…` |
| Pacote 3 — Screenshots Smartphone (PON-25) | `screenshots-phone/app-store-6.7-1290x2796/02-bot-facil-e-dificil.png` | `1290 × 2796 px` | `PNG (RGB)` | `373.9 KB` | `3acc5eb771653dd4…` |
| Pacote 3 — Screenshots Smartphone (PON-25) | `screenshots-phone/app-store-6.7-1290x2796/03-dois-jogadores-passa-e-joga.png` | `1290 × 2796 px` | `PNG (RGB)` | `339.4 KB` | `18de4effd1c692db…` |
| Pacote 3 — Screenshots Smartphone (PON-25) | `screenshots-phone/app-store-6.7-1290x2796/04-temas-claro-escuro-acessibilidade.png` | `1290 × 2796 px` | `PNG (RGB)` | `358.4 KB` | `a20706a8f979ba0d…` |
| Pacote 3 — Screenshots Smartphone (PON-25) | `screenshots-phone/app-store-6.7-1290x2796/05-estatisticas-e-100-offline.png` | `1290 × 2796 px` | `PNG (RGB)` | `356.7 KB` | `7dcc44bcbe0248f2…` |
| Pacote 4 — Screenshots Tablet (PON-26) | `screenshots-tablet/tablet-7-1200x1920/01-tablet-tabuleiro-5x5.png` | `1200 × 1920 px` | `PNG (RGB)` | `130.9 KB` | `1d49ff53bda4c61f…` |
| Pacote 4 — Screenshots Tablet (PON-26) | `screenshots-tablet/tablet-7-1200x1920/02-tablet-modo-2-jogadores.png` | `1200 × 1920 px` | `PNG (RGB)` | `126.2 KB` | `3de51453deb86326…` |
| Pacote 4 — Screenshots Tablet (PON-26) | `screenshots-tablet/tablet-7-1200x1920/03-tablet-tema-escuro-hd.png` | `1200 × 1920 px` | `PNG (RGB)` | `126.0 KB` | `3a1e3c37ff23076a…` |
| Pacote 4 — Screenshots Tablet (PON-26) | `screenshots-tablet/tablet-7-1200x1920/04-tablet-config-e-estatisticas.png` | `1200 × 1920 px` | `PNG (RGB)` | `150.7 KB` | `c04957f6cd48ec68…` |
| Pacote 4 — Screenshots Tablet (PON-26) | `screenshots-tablet/tablet-10-1600x2560/01-tablet-tabuleiro-5x5.png` | `1600 × 2560 px` | `PNG (RGB)` | `185.3 KB` | `0d7a09fdd7f1b327…` |
| Pacote 4 — Screenshots Tablet (PON-26) | `screenshots-tablet/tablet-10-1600x2560/02-tablet-modo-2-jogadores.png` | `1600 × 2560 px` | `PNG (RGB)` | `180.3 KB` | `f60a5c29c53e7ae0…` |
| Pacote 4 — Screenshots Tablet (PON-26) | `screenshots-tablet/tablet-10-1600x2560/03-tablet-tema-escuro-hd.png` | `1600 × 2560 px` | `PNG (RGB)` | `177.5 KB` | `4774965e77e6504a…` |
| Pacote 4 — Screenshots Tablet (PON-26) | `screenshots-tablet/tablet-10-1600x2560/04-tablet-config-e-estatisticas.png` | `1600 × 2560 px` | `PNG (RGB)` | `211.7 KB` | `05392eb8e78cddd2…` |
| Pacote 4 — Screenshots Tablet (PON-26) | `screenshots-tablet/ipad-pro-12.9-2048x2732/01-tablet-tabuleiro-5x5.png` | `2048 × 2732 px` | `PNG (RGB)` | `235.5 KB` | `064404710ba930de…` |
| Pacote 4 — Screenshots Tablet (PON-26) | `screenshots-tablet/ipad-pro-12.9-2048x2732/02-tablet-modo-2-jogadores.png` | `2048 × 2732 px` | `PNG (RGB)` | `228.2 KB` | `a917be53206fc348…` |
| Pacote 4 — Screenshots Tablet (PON-26) | `screenshots-tablet/ipad-pro-12.9-2048x2732/03-tablet-tema-escuro-hd.png` | `2048 × 2732 px` | `PNG (RGB)` | `226.0 KB` | `45a3446f3eee0387…` |
| Pacote 4 — Screenshots Tablet (PON-26) | `screenshots-tablet/ipad-pro-12.9-2048x2732/04-tablet-config-e-estatisticas.png` | `2048 × 2732 px` | `PNG (RGB)` | `272.0 KB` | `9562f50eac792f82…` |
| Pacote 1 — Android XML (PON-23) | `icons/android/mipmap-anydpi-v26/ic_launcher.xml` | `XML Vector/Resource` | `UTF-8 XML` | `0.3 KB` | `2064a79695507316…` |
| Pacote 1 — Android XML (PON-23) | `icons/android/mipmap-anydpi-v26/ic_launcher_round.xml` | `XML Vector/Resource` | `UTF-8 XML` | `0.3 KB` | `2064a79695507316…` |
| Pacote 1 — Android XML (PON-23) | `icons/android/values/ic_launcher_background.xml` | `XML Vector/Resource` | `UTF-8 XML` | `0.1 KB` | `2a2b569e9c23e920…` |
| Pacote 1 — iOS Contents.json (PON-23) | `icons/ios/AppIcon.appiconset/Contents.json` | `19 entries` | `UTF-8 JSON` | `2.4 KB` | `b56e324dc0745fd3…` |
