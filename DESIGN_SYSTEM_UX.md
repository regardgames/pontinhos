> Referência de equipe sincronizada com a especificação de Design System e UX (`UX-00`, issue #1). A implementação dos tokens em `lib/core/theme/` fica para a Sprint 2 (`PON-06`).

# Pontinhos — Especificação Completa de Design System, UI/UX (`UX-01` a `UX-08`) e `CustomPainter`

**Repositório Oficial:** `dayvidemerson/regard-jogo-dos-pontinhos`  
**Issue Principal:** `[UX-00] Especificação de Design System e Telas (UX-01 a UX-08)` (**Issue #1**)  
**Issues Destravadas (Sprint 2 & Sprint 4):**  
- **Issue #7 (`[PON-06]`):** Criar tema e componentes base (`lib/core/theme/`)  
- **Issue #8 (`[PON-07]`):** Criar início e configuração de partida (`lib/features/home/`, `lib/app/router.dart`)  
- **Issue #9 (`[PON-08]`):** Renderizar tabuleiro com `CustomPainter` (`lib/features/game/presentation/board_painter.dart`)  
- **Issue #10 (`[PON-09]`):** Implementar detecção de toque em arestas (`hitTestEdge` + `GameController`)  
- **Issue #11 (`[PON-10]`):** Criar placar, pausa e resultado (`UX-03`, `UX-04`, `UX-08`)  
- **Sprint 4 (`[PON-15]` a `[PON-18]`):** Tutorial (`UX-06`), Estatísticas (`UX-05`), Configurações (`UX-07`) e Polimento  

**Última atualização:** 24 de outubro de 2026 (Picos, Piauí, UTC-3)

---

## 1. Direção Visual & Princípios de Design (Seções 5 e 10)

O **Pontinhos** resgata a nostalgia do clássico jogo de papel e caneta (*Dots and Boxes*) com uma linguagem digital moderna, minimalista e 100% offline-first para Android e iOS.

### 1.1 Pilares Visuais e Não Funcionais
1. **Visual Moderno e Minimalista (*Tactile Paper & Ink*):** O tabuleiro geométrico é o protagonista absoluto da tela, sem anúncios, menus poluídos ou distrações visuais.
2. **Orientação e Densidades:** Operação prioritária em **orientação retrato (`portraitUp`)**, com layout fluido e responsivo desde telas compactas (`360×640dp`) até telas grandes (`412×915dp+`) em diferentes densidades de pixels.
3. **Feedback Imediato e Discreto (150ms–300ms):**
   - Indicação clara e instantânea para jogada válida, captura de 1 ou 2 caixas simultâneas (captura dupla), concessão de **turno extra**, mudança de turno, estado pausado (`GameStatus.paused`), pensamento do bot (`"Bot pensando..."`), vitória, derrota e empate.
4. **Acessibilidade Nativa & Independência de Cor (WCAG 2.1 AA+):**
   - **Regra de Ouro:** Nunca depender exclusivamente de cor para indicar de quem é o turno, quem marcou uma aresta ou quem conquistou uma caixa.
   - **Dupla Codificação Visual (`Player.one` vs `Player.two` / Bot):**
     - **`Player.one` (Jogador 1 / Você):** Azul Cobalto (`#2563EB` Light / `#60A5FA` Dark) + **Círculo Sólido (`●`) / Inicial `J1`** no centro das caixas capturadas + Badge textual `"SUA VEZ"` / `"VEZ DO J1"`.
     - **`Player.two` (Jogador 2 Local / Computador - Bot):** Âmbar Coral (`#D97706` Light / `#FBBF24` Dark — par Azul+Âmbar 100% seguro para Deuteranopia, Protanopia e Tritanopia) + **Losango (`◆` para J2 humano) ou Triângulo/Ícone (`▲` / `🤖` para Bot)** + Inicial `J2` / `BOT` no centro das caixas capturadas + Hachura diagonal sutil opcional (8% alpha) + Badge textual `"VEZ DO J2"` ou `"BOT PENSANDO..."`.

---

## 2. Design Tokens para Flutter (`lib/core/theme/` — `[PON-06]` / Issue #7)

### 2.1 Paleta de Cores Semântica (Light & Dark Mode)

Todos os tokens de texto e marcadores gráficos cumprem contraste **WCAG 2.1 AA+** ($\ge 4.5:1$ para texto e $\ge 3.0:1$ para elementos gráficos de interface e tabuleiro).

| Token Semântico | Light Mode (Hex) | Dark Mode (Hex) | Contraste | Uso no App e no `BoardPainter` |
| :--- | :--- | :--- | :--- | :--- |
| `bgPrimary` | `#F8FAFC` | `#0F172A` | — | Fundo geral do `Scaffold` |
| `bgSurface` | `#FFFFFF` | `#1E293B` | 14.8:1 | Cards, HUD de placar, seletores de `UX-02` e modais (`UX-08`) |
| `bgBoardCanvas` | `#F1F5F9` | `#162032` | — | Superfície interna do container do tabuleiro (`AspectRatio 1:1`) |
| `bgElevated` | `#E2E8F0` | `#334155` | — | Botões secundários, chips inativos, divisores |
| `textPrimary` | `#0F172A` | `#F8FAFC` | 15.2:1 | Títulos, placar numérico tabular, textos principais |
| `textSecondary` | `#475569` | `#94A3B8` | 5.7:1 | Subtítulos, rótulos secundários, contadores de estatísticas |
| `dotNeutral` | `#334155` | `#CBD5E1` | 8.4:1 | Grade de pontos (16 pontos no `3×3`, 36 pontos no `5×5`) |
| `edgeEmptyGuide` | `#CBD5E1` | `#334155` | 1.6:1 | Arestas livres (guias sutis entre pontos adjacentes) |
| `edgeHoverPreview` | `#94A3B8` | `#64748B` | 3.2:1 | Preview visual ao pressionar/arrastar sobre aresta livre |
| `playerOnePrimary` | `#2563EB` | `#60A5FA` | 4.8:1 | Aresta marcada por `Player.one`, borda de turno ativo, ícone `●` |
| `playerOneBoxFill` | `#DBEAFE` (`26%`) | `#1E3A8A` (`38%`) | — | Preenchimento translúcido de caixa conquistada por `Player.one` |
| `playerOneAccent` | `#1D4ED8` | `#93C5FD` | 6.1:1 | Símbolo/inicial (`● J1`) no centro da caixa capturada |
| `playerTwoPrimary` | `#D97706` | `#FBBF24` | 4.6:1 | Aresta marcada por `Player.two`/Bot, borda de turno ativo, ícone `◆`/`▲` |
| `playerTwoBoxFill` | `#FEF3C7` (`32%`) | `#78350F` (`40%`) | — | Preenchimento translúcido de caixa conquistada por `Player.two`/Bot |
| `playerTwoAccent` | `#B45309` | `#FDE68A` | 5.4:1 | Símbolo/inicial (`◆ J2` ou `▲ BOT`) no centro da caixa capturada |
| `lastMoveHighlight` | `#10B981` | `#34D399` | 3.8:1 | Halo externo + ponto central na **última aresta jogada** (`lastMove`) |
| `semanticSuccess` | `#16A34A` | `#4ADE80` | 4.6:1 | Indicador de Vitória, turno extra e feedback positivo |
| `semanticWarning` | `#EA580C` | `#FB923C` | 4.5:1 | Indicador de Empate e alertas de substituição |
| `semanticDanger` | `#DC2626` | `#F87171` | 4.8:1 | Ações destrutivas em `UX-08` (Reiniciar partida, Sair, Zerar dados) |
| `borderSubtle` | `#E2E8F0` | `#334155` | — | Bordas de cards inativos (`1.0dp`) e divisores |

### 2.2 Código de Referência para `lib/core/theme/app_theme.dart` (`ThemeData` + `ThemeExtension`)

```dart
import 'dart:ui' show FontFeature;
import 'package:flutter/material.dart';

@immutable
class PontinhosThemeColors extends ThemeExtension<PontinhosThemeColors> {
  final Color bgBoardCanvas;
  final Color dotNeutral;
  final Color edgeEmptyGuide;
  final Color edgeHoverPreview;
  final Color playerOnePrimary;
  final Color playerOneBoxFill;
  final Color playerOneAccent;
  final Color playerTwoPrimary;
  final Color playerTwoBoxFill;
  final Color playerTwoAccent;
  final Color lastMoveHighlight;

  const PontinhosThemeColors({
    required this.bgBoardCanvas,
    required this.dotNeutral,
    required this.edgeEmptyGuide,
    required this.edgeHoverPreview,
    required this.playerOnePrimary,
    required this.playerOneBoxFill,
    required this.playerOneAccent,
    required this.playerTwoPrimary,
    required this.playerTwoBoxFill,
    required this.playerTwoAccent,
    required this.lastMoveHighlight,
  });

  static const light = PontinhosThemeColors(
    bgBoardCanvas: Color(0xFFF1F5F9),
    dotNeutral: Color(0xFF334155),
    edgeEmptyGuide: Color(0xFFCBD5E1),
    edgeHoverPreview: Color(0xFF94A3B8),
    playerOnePrimary: Color(0xFF2563EB),
    playerOneBoxFill: Color(0x422563EB), // 26% alpha
    playerOneAccent: Color(0xFF1D4ED8),
    playerTwoPrimary: Color(0xFFD97706),
    playerTwoBoxFill: Color(0x52D97706), // 32% alpha
    playerTwoAccent: Color(0xFFB45309),
    lastMoveHighlight: Color(0xFF10B981),
  );

  static const dark = PontinhosThemeColors(
    bgBoardCanvas: Color(0xFF162032),
    dotNeutral: Color(0xFFCBD5E1),
    edgeEmptyGuide: Color(0xFF334155),
    edgeHoverPreview: Color(0xFF64748B),
    playerOnePrimary: Color(0xFF60A5FA),
    playerOneBoxFill: Color(0x611E3A8A), // 38% alpha
    playerOneAccent: Color(0xFF93C5FD),
    playerTwoPrimary: Color(0xFFFBBF24),
    playerTwoBoxFill: Color(0x6678350F), // 40% alpha
    playerTwoAccent: Color(0xFFFDE68A),
    lastMoveHighlight: Color(0xFF34D399),
  );

  @override
  PontinhosThemeColors copyWith({
    Color? bgBoardCanvas,
    Color? dotNeutral,
    Color? edgeEmptyGuide,
    Color? edgeHoverPreview,
    Color? playerOnePrimary,
    Color? playerOneBoxFill,
    Color? playerOneAccent,
    Color? playerTwoPrimary,
    Color? playerTwoBoxFill,
    Color? playerTwoAccent,
    Color? lastMoveHighlight,
  }) {
    return PontinhosThemeColors(
      bgBoardCanvas: bgBoardCanvas ?? this.bgBoardCanvas,
      dotNeutral: dotNeutral ?? this.dotNeutral,
      edgeEmptyGuide: edgeEmptyGuide ?? this.edgeEmptyGuide,
      edgeHoverPreview: edgeHoverPreview ?? this.edgeHoverPreview,
      playerOnePrimary: playerOnePrimary ?? this.playerOnePrimary,
      playerOneBoxFill: playerOneBoxFill ?? this.playerOneBoxFill,
      playerOneAccent: playerOneAccent ?? this.playerOneAccent,
      playerTwoPrimary: playerTwoPrimary ?? this.playerTwoPrimary,
      playerTwoBoxFill: playerTwoBoxFill ?? this.playerTwoBoxFill,
      playerTwoAccent: playerTwoAccent ?? this.playerTwoAccent,
      lastMoveHighlight: lastMoveHighlight ?? this.lastMoveHighlight,
    );
  }

  @override
  PontinhosThemeColors lerp(ThemeExtension<PontinhosThemeColors>? other, double t) {
    if (other is! PontinhosThemeColors) return this;
    return PontinhosThemeColors(
      bgBoardCanvas: Color.lerp(bgBoardCanvas, other.bgBoardCanvas, t)!,
      dotNeutral: Color.lerp(dotNeutral, other.dotNeutral, t)!,
      edgeEmptyGuide: Color.lerp(edgeEmptyGuide, other.edgeEmptyGuide, t)!,
      edgeHoverPreview: Color.lerp(edgeHoverPreview, other.edgeHoverPreview, t)!,
      playerOnePrimary: Color.lerp(playerOnePrimary, other.playerOnePrimary, t)!,
      playerOneBoxFill: Color.lerp(playerOneBoxFill, other.playerOneBoxFill, t)!,
      playerOneAccent: Color.lerp(playerOneAccent, other.playerOneAccent, t)!,
      playerTwoPrimary: Color.lerp(playerTwoPrimary, other.playerTwoPrimary, t)!,
      playerTwoBoxFill: Color.lerp(playerTwoBoxFill, other.playerTwoBoxFill, t)!,
      playerTwoAccent: Color.lerp(playerTwoAccent, other.playerTwoAccent, t)!,
      lastMoveHighlight: Color.lerp(lastMoveHighlight, other.lastMoveHighlight, t)!,
    );
  }
}
```

---

## 3. Tipografia, Espaçamentos, Raios e Componentes Base (`[PON-06]`)

### 3.1 Escala Tipográfica (`sp`)
- **Fonte Recomendada:** `Plus Jakarta Sans` ou fonte geométrica do sistema (`SF Pro Rounded` / `Roboto`).
- **Placar Tabular Obrigatório:** Todos os contadores de placar (`UX-03`, `UX-04`) e números de estatísticas (`UX-05`) devem aplicar `fontFeatures: const [FontFeature.tabularFigures()]` para impedir deslocamento horizontal (*layout jitter*) ao mudar de dígito.

| Estilo | Tamanho (`sp`) | Line Height | Peso | Aplicação |
| :--- | :--- | :--- | :--- | :--- |
| `displayTitle` | `32sp` | `40sp` | `w800` | Título "Pontinhos" na tela de Início (`UX-01`) |
| `scoreDisplay` | `28sp` | `32sp` | `w800` | Placar em tempo real em `UX-03` (`tabularFigures`) |
| `headlineLarge` | `24sp` | `32sp` | `w700` | Cabeçalho de Vitória/Derrota/Empate em `UX-04` |
| `sectionTitle` | `18sp` | `24sp` | `w700` | Rótulos de seção em `UX-02`, `UX-05` e `UX-07` |
| `boxSymbol` | `20sp` (`3×3`) / `14sp` (`5×5`) | `1.0` | `w800` | Símbolo + Inicial central nas caixas (`● J1`, `◆ J2`, `▲ BOT`) |
| `buttonLabel` | `16sp` | `20sp` | `w700` | Botões primários e secundários |
| `bodyMedium` | `15sp` | `22sp` | `w500` | Textos de tutorial (`UX-06`) e confirmações (`UX-08`) |
| `turnBadge` | `12sp` | `16sp` | `w700` | Badges de turno (`"SUA VEZ"`, `"BOT PENSANDO..."`) |

### 3.2 Espaçamentos, Raios e Tamanhos Mínimos de Toque (`lib/core/theme/`)
- **Espaçamentos (Grid 4dp):** `xs = 4dp`, `sm = 8dp`, `md = 12dp`, `lg = 16dp` (padding padrão de tela), `xl = 24dp`, `xxl = 32dp`.
- **Raios de Borda (`BorderRadius`):** `sm = 8dp` (badges), `md = 12dp` (seletores e cards), `lg = 16dp` (botões primários e HUD), `xl = 24dp` (container do tabuleiro e modais).
- **Área Mínima de Toque de Componentes Base (`[PON-06]`):**
  - Botões primários: altura `52dp`–`56dp`, largura total do container.
  - Botões secundários e seletores segmentados (`UX-02`): altura mínima `48dp`.
  - Botões de ícone na barra superior (`Pausa`, `Reiniciar`, `Voltar`): `48×48dp` obrigatório (`ConstrainedBox(constraints: BoxConstraints(minWidth: 48, minHeight: 48))`).

---

## 4. Especificação Completa das Telas e Fluxos (`UX-01` a `UX-08`)

### Mapa de Rotas Declarativas (`lib/app/router.dart` — `GoRouter`)
- `/` $\rightarrow$ **`UX-01` (Início)** (Se primeiro acesso absoluto ao app, redireciona ou abre overlay de **`UX-06` Tutorial** dispensável)
- `/new-game` (ou Modal BottomSheet a partir de `/`) $\rightarrow$ **`UX-02` (Nova Partida)**
- `/game` $\rightarrow$ **`UX-03` (Partida)** + Modais **`UX-08` (Pausa/Confirmações)** + Modal/Tela **`UX-04` (Resultado)**
- `/stats` $\rightarrow$ **`UX-05` (Estatísticas)**
- `/tutorial` $\rightarrow$ **`UX-06` (Tutorial)**
- `/settings` $\rightarrow$ **`UX-07` (Configurações)**

---

### `UX-01` — Início (`lib/features/home/` — `[PON-07]` / Issue #8)
- **Objetivo:** Acesso rápido ao jogo sem cadastro, login ou internet (*offline-first*).
- **Elementos Obrigatórios:**
  1. **Identidade Visual:** Emblema geométrico minimalista (quadrado de 4 pontos com 3 arestas azuis `Player.one` e 1 aresta âmbar `Player.two` fechando a caixa) + Título `"Pontinhos"` (`32sp`) + Subtítulo `"Estratégia ponto a ponto"`.
  2. **CTA Principal (`56dp` altura):** Botão **"Jogar"** (`variant: primary`, ícone `play_arrow_rounded`) $\rightarrow$ abre `UX-02` (Nova Partida).
     - *(Nota para Sprint 4: Caso exista partida salva em andamento via `SharedPreferences`, exibe botão primário **"Continuar Partida"** com resumo do placar e botão secundário **"Nova Partida"**).*
  3. **Ações Secundárias de Navegação (`48dp+` hit target):**
     - Botão/Card **Estatísticas** (`bar_chart_rounded`) $\rightarrow$ navega para `UX-05` (`/stats`).
     - Botão/Card **Configurações** (`settings_outlined`) $\rightarrow$ navega para `UX-07` (`/settings`).
     - Atalho opcional **Como Jogar** (`help_outline_rounded`) $\rightarrow$ abre `UX-06` (`/tutorial`).

---

### `UX-02` — Nova Partida (`lib/features/home/` — `[PON-07]` / Issue #8)
- **Objetivo:** Definir a sessão de jogo de forma rápida e intuitiva seguindo o **Fluxo 7.2**:
  `Início → selecionar modo → selecionar tamanho → selecionar dificuldade (apenas contra bot) → iniciar partida`.
- **Valores Padrão Pré-Selecionados Obrigatórios (Seção 7.2 / Issue #8):**
  - **Adversário:** `Computador` (vs Bot)
  - **Dificuldade:** `Fácil`
  - **Tamanho do Tabuleiro:** `3×3` (9 caixas, 16 pontos)
- **Estrutura de Seletores Segmentados / Cards (`[PON-06]`):**
  1. **Adversário (`RF-01`, `RF-02`):**
     - Opção 1 (Default): **Computador (Bot)** — Ícone `smart_toy_rounded` (`"1 Jogador vs IA"`).
     - Opção 2: **Local 2 Jogadores** — Ícone `people_alt_rounded` (`"Passa e joga no mesmo aparelho"`).
  2. **Tamanho do Tabuleiro (`RF-03`):**
     - Opção 1 (Default): **3×3 Caixas** — `"Rápido • 16 pontos • 9 caixas"`.
     - Opção 2: **5×5 Caixas** — `"Clássico • 36 pontos • 25 caixas"`.
  3. **Dificuldade do Bot (`RF-04`):**
     - **Regra Condicional Obrigatória:** Visível e habilitada **apenas** quando `Adversário == Computador`. Ao alternar para `"Local 2 Jogadores"`, ocultar suavemente (`AnimatedSize` / `AnimatedCrossFade` em `180ms`) ou desabilitar com clareza.
     - Opção 1 (Default): **Fácil** — `"Ideal para partidas casuais"`.
     - Opção 2: **Difícil** — `"Estratégico: evita entregar caixas e aproveita cadeias"`.
  4. **Resumo de Identidade Acessível:**
     - Linha informativa mostrando os marcadores da partida: `● Jogador 1 (Azul)` vs `▲ Computador / ◆ Jogador 2 (Âmbar)`.
  5. **CTA de Confirmação (`56dp`):**
     - Botão **"Iniciar Partida"** $\rightarrow$ navega via `GoRouter` para `/game` (`UX-03`) passando o objeto imutável `GameConfig(mode, boardSize, botDifficulty)`.

---

### `UX-03` — Partida (`lib/features/game/presentation/` — `[PON-08]`, `[PON-09]`, `[PON-10]`)
- **Objetivo:** Executar o jogo com foco total no tabuleiro, placar em tempo real e indicação inequívoca de turno.
- **Layout em Orientação Retrato (`SafeArea`):**
  1. **Barra Superior (`TopBar` — `56dp` altura):**
     - **Esquerda:** Botão **Pausa** (`pause_rounded`, área de toque `48×48dp`, `Semantics(label: 'Pausar partida')`) $\rightarrow$ altera status para `GameStatus.paused` e abre o modal `UX-08`.
     - **Centro:** Pill discreta com configuração ativa (`"3×3 • Vs Computador (Fácil)"` ou `"5×5 • 2 Jogadores"`).
     - **Direita:** Botão **Reiniciar** (`refresh_rounded`, `48×48dp`) $\rightarrow$ abre confirmação `UX-08` antes de reiniciar.
  2. **Cabeçalho de Placar e Turno (`ScoreHeader` — `[PON-10]` / Issue #11):**
     - Dois cartões lado a lado (`Row` com `Expanded`):
       - **Card `Player.one`:** Símbolo **`●`** + Rótulo (`"Você"` ou `"Jogador 1"`) + Placar em `28sp` (`tabularFigures`). Quando ativo: borda de `2.5dp` em `playerOnePrimary`, fundo tonalizado e badge **`"SUA VEZ"`** (ou `"VEZ DO J1"`).
       - **Card `Player.two` / Bot:** Símbolo **`▲`** (Bot) ou **`◆`** (J2) + Rótulo (`"Computador"` ou `"Jogador 2"`) + Placar em `28sp` (`tabularFigures`). Quando ativo: borda de `2.5dp` em `playerTwoPrimary` e badge **`"VEZ DO J2"`** ou **`"BOT PENSANDO..."`** (com animação sutil de pulso).
  3. **Faixa de Feedback de Eventos (`28dp` altura fixa):**
     - Exibe micro-mensagens sem deslocar o tabuleiro:
       - Turno extra ao fechar 1 caixa: `"✨ +1 ponto! Jogue novamente!"`
       - Captura dupla (2 caixas com 1 aresta): `"🔥 Captura dupla (+2)! Turno extra!"`
       - Turno do Bot: `"🤖 Computador pensando..."`
  4. **Área Central do Tabuleiro (`Expanded` + `Center` + `AspectRatio(1.0)`):**
     - Contém o `GestureDetector` envolvendo o `CustomPaint(painter: BoardPainter(...))`.
     - **Bloqueio Estrito de Interação (Seção 8.3 / Issues #10 e #11):** Quando `status == GameStatus.paused`, `status == GameStatus.finished` ou quando for o turno do Bot (`isBotTurn == true`), qualquer toque no tabuleiro é **estritamente ignorado** pelo `GameController` e pelo `GestureDetector`.

---

### `UX-04` — Resultado e Revanche (`[PON-10]` — Issue #11, Fluxos 7.3 e 7.5)
- **Objetivo:** Encerrar o ciclo da partida assim que todas as caixas são conquistadas (`GameStatus.finished`), apresentando o vencedor e incentivando a revanche imediata.
- **Gatilho de Exibição:** Disparado automaticamente após o preenchimento da última caixa (com delay curto de `400ms` para o jogador visualizar a última caixa fechada no tabuleiro).
- **Elementos Obrigatórios:**
  1. **Título e Ícone Semântico de Desfecho:**
     - **Vitória (`Player.one`):** Ícone Troféu + `"Vitória!"` (contra Bot) ou `"Vitória do Jogador 1 (●)!"` (modo local).
     - **Derrota (contra Bot):** Ícone Robô + `"Derrota! O Computador venceu"` (ou `"Vitória do Jogador 2 (◆)!"` no modo local).
     - **Empate:** Ícone Equilíbrio + `"Empate!"` (suportado pelo motor e pela UI).
  2. **Placar Final Comparativo:**
     - Exibe a pontuação final exata de cada jogador com seus respectivos símbolos acessíveis (`●` vs `▲`/`◆`).
  3. **Ações Obrigatórias (Fluxos 7.3 e 7.5 — Issue #11):**
     - **CTA Primário (`56dp`) — `"Revanche"` (ou `"Jogar Novamente"`):**
       - Inicia imediatamente uma nova partida mantendo as **mesmas configurações** (`GameConfig`) e **alternando obrigatoriamente o jogador inicial** (`startingPlayer = previousStartingPlayer.opponent`, conforme **Fluxo 7.5**).
       - Exibe subtítulo ou indicação clara: `"Próxima partida começa com: [Jogador 2 / Computador / Você]"`.
     - **CTA Secundário (`48dp`) — `"Voltar ao início"`:**
       - Encerra a sessão atual e retorna para `UX-01` (`/`).

---

### `UX-05` — Estatísticas (`[PON-16]` — Sprint 4 / Issue #1)
- **Objetivo:** Exibir o progresso local acumulado do jogador contra o Computador (Bot), persistido via `SharedPreferences`.
- **Elementos Obrigatórios:**
  1. **Contadores Principais (Partidas contra Bot):**
     - **Total de Partidas** concluídas
     - **Vitórias** (`semanticSuccess`)
     - **Derrotas** (`semanticDanger`)
     - **Empates** (`semanticWarning`)
     - **Taxa de Aproveitamento (%)**
  2. **Recorte / Filtro Segmentado:**
     - Visualização geral e separação clara por **Dificuldade** (`Fácil` vs `Difícil`) e **Tamanho do Tabuleiro** (`3×3` vs `5×5`).
  3. **Estado Vazio (Empty State):**
     - Quando `totalMatches == 0`, exibe mensagem amigável: `"Nenhuma partida contra o computador finalizada ainda."` + botão `"Jogar Agora"`.

---

### `UX-06` — Tutorial / Como Jogar (`[PON-15]` — Sprint 4 / Issue #1)
- **Objetivo:** Ensinar as regras essenciais de forma visual e rápida no primeiro acesso e sob demanda.
- **Regras de Fluxo Obrigatórias:**
  - Exibido automaticamente no **primeiro acesso** do usuário ao app (`hasSeenTutorial == false`).
  - **Dispensável em todas as etapas:** Botão visível **"Pular"** no canto superior direito (`48×48dp` mínimo) em todos os passos do onboarding, marcando o tutorial como visto e levando direto ao jogo.
  - **Reabertura garantida:** Acessível a qualquer momento via **Configurações (`UX-07`)** (e opcionalmente na Home `UX-01`).
- **Estrutura Visual em 3 Passos (`PageView`):**
  1. **Passo 1 — Ligar Pontos:** `"Toque entre dois pontos vizinhos (horizontal ou vertical) para traçar uma linha por turno."`
  2. **Passo 2 — Fechar Caixa = +1 Ponto e Turno Extra:** `"Quem desenhar o 4º lado de um quadrado conquista a caixa (+1 ponto) e ganha um turno extra imediato!"`
  3. **Passo 3 — Maior Placar Vence:** `"Planeje suas jogadas para não entregar fileiras de caixas ao adversário. Quando todas as caixas forem fechadas, vence quem tiver o maior placar!"` (CTA final: **"Começar a Jogar"**).

---

### `UX-07` — Configurações (`[PON-17]` — Sprint 4 / Issue #1)
- **Objetivo:** Gerenciar preferências locais do jogador.
- **Elementos Obrigatórios:**
  1. **Toggle de Som (`SwitchListTile`):** Ativar/desativar efeitos sonoros locais (*Default: Ativado*).
  2. **Toggle de Vibração / Haptics (`SwitchListTile`):** Ativar/desativar feedback tátil (*Default: Ativado*).
  3. **Seletor de Tema (Opcional/Recomendado):** `Sistema` | `Claro` | `Escuro`.
  4. **Ação "Rever Tutorial" (`ListTile`):** Abre `UX-06` (`/tutorial`) a qualquer momento.
  5. **Ação "Zerar Estatísticas" (`ListTile` destrutivo):** Abre diálogo de confirmação `UX-08` antes de limpar os contadores locais.

---

### `UX-08` — Confirmações e Pausa (`[PON-10]` — Issue #11, Fluxo 7.4)
- **Objetivo:** Evitar perda acidental de progresso durante a partida ou exclusão involuntária de dados.
- **Fluxo 7.4 Obrigatório (`Partida → pausar → continuar, reiniciar ou sair`):**
  1. **Modal de Pausa:**
     - Ao tocar no botão de Pausa em `UX-03`, a partida entra em `GameStatus.paused` (bloqueando o tabuleiro e pausando eventual timer do bot) e exibe o modal com 3 ações:
       - **Continuar** (Botão Primário): Fecha o modal e retoma `GameStatus.playing`.
       - **Reiniciar partida** (Botão Secundário): Solicita confirmação explícita antes de zerar o tabuleiro atual.
       - **Sair para o início** (Botão Secundário/Destrutivo): Solicita confirmação explícita antes de descartar a partida e navegar para `UX-01`.
  2. **Confirmação Explícita antes de Reiniciar ou Sair:**
     - Título: `"Reiniciar partida?"` ou `"Sair da partida?"`
     - Texto: `"O progresso da partida atual será perdido. Deseja continuar?"`
     - Botões: **"Cancelar"** (retorna para a partida) e **"Confirmar Reinício" / "Sair"** (`semanticDanger`).
     - *(Interceptar também o botão físico/gesto de voltar do sistema via `PopScope(canPop: false)` durante uma partida em andamento para exibir o modal de pausa/confirmação).*

---

## 5. Especificação Técnica do `BoardPainter` (`[PON-08]`) e Hit-Testing (`[PON-09]`)

### 5.1 Geometria Adaptativa em Orientação Retrato (`lib/features/game/presentation/board_painter.dart`)
Para um tabuleiro de tamanho $N \in \{3, 5\}$ caixas por lado:
- **Número de pontos por lado:** $P = N + 1$ ($4 \times 4 = 16$ pontos no `3×3`; $6 \times 6 = 36$ pontos no `5×5`).
- **Total de caixas:** $N^2$ ($9$ caixas no `3×3`; $25$ caixas no `5×5`).
- **Total de arestas:** $2 \cdot N \cdot (N + 1)$ ($24$ arestas no `3×3`; $60$ arestas no `5×5`).

Dado o `Size boardSize` quadrado fornecido por `AspectRatio(aspectRatio: 1.0)`:
1. **Padding Interno (`boardPadding`):** $p = 24.0\text{ dp}$ (garante que os pontos das bordas e a área de toque externa nunca sejam cortados).
2. **Espaçamento entre Pontos Adjacentes (`cellSpacing`):**
   $$\text{cellSpacing} = \frac{\text{boardSize.width} - 2p}{N}$$
3. **Posição do Ponto $(r, c)$ com $r, c \in \{0, \dots, N\}$:**
   $$\text{Offset}(c, r) = \left(p + c \cdot \text{cellSpacing},\; p + r \cdot \text{cellSpacing}\right)$$

### 5.2 Tabela de Dimensões e Proporções (`3×3` vs `5×5`)

| Propriedade Visual / Geométrica | Tabuleiro `3×3` (16 pontos, 24 arestas) | Tabuleiro `5×5` (36 pontos, 60 arestas) |
| :--- | :--- | :--- |
| **`cellSpacing` em tela compacta `360dp` ($S = 328\text{dp}$)** | **`93.3 dp`** | **`56.0 dp`** |
| **`cellSpacing` em tela padrão `390dp` ($S = 358\text{dp}$)** | **`103.3 dp`** | **`62.0 dp`** |
| **Raio dos Pontos (`dotRadius`)** | `6.0 dp` (diâmetro `12.0 dp`) | `5.0 dp` (diâmetro `10.0 dp`) |
| **Espessura da Aresta Livre (`guideStrokeWidth`)** | `2.0 dp` (`edgeEmptyGuide`) | `2.0 dp` (`edgeEmptyGuide`) |
| **Espessura da Aresta Marcada (`claimedStrokeWidth`)** | `7.0 dp` (`StrokeCap.round`) | `5.5 dp` (`StrokeCap.round`) |
| **Destaque da Última Jogada (`lastMove`)** | Halo `13.0 dp` (`32%` alpha) + ponto central `r = 4.5dp` | Halo `11.5 dp` (`32%` alpha) + ponto central `r = 4.0dp` |
| **Inset & Raio da Caixa Capturada (`RRect`)** | `inset = 6.0 dp`, `radius = 10.0 dp` | `inset = 5.0 dp`, `radius = 7.0 dp` |
| **Raio de Tolerância de Toque (`hitSlopRadius`)** | `32.0 dp` para cada lado (**`64.0 dp` total**) | `24.0 dp` para cada lado (**`48.0 dp` total**) |

### 5.3 Ordem de Camadas de Pintura (Z-Order no `BoardPainter` — `[PON-08]` / Issue #9)
1. **Camada 1 — Caixas Capturadas:**
   - Desenha `RRect` interno com `playerOneBoxFill` ou `playerTwoBoxFill`.
   - Desenha o marcador visual acessível centralizado:
     - `Player.one`: Círculo `●` + texto `"J1"` em `playerOneAccent`.
     - `Player.two` / Bot: Losango `◆` (`"J2"`) ou Triângulo `▲` (`"BOT"`) em `playerTwoAccent`.
2. **Camada 2 — Arestas Livres (Guias):**
   - Linhas sutis (`2.0dp`, cor `edgeEmptyGuide`) entre pontos adjacentes não conectados.
3. **Camada 3 — Arestas Marcadas + Destaque `lastMove`:**
   - Linhas sólidas com `StrokeCap.round` na cor do jogador proprietário (`playerOnePrimary` ou `playerTwoPrimary`).
   - Se a aresta for igual a `gameState.lastMove`, desenha sob ela o halo verde esmeralda (`lastMoveHighlight.withOpacity(0.32)`) e sobre seu ponto médio um marcador circular nítido (`lastMoveHighlight`), permitindo identificar imediatamente o lance do Bot.
4. **Camada 4 — Grade de Pontos (No Topo):**
   - Círculos sólidos (`dotNeutral`) desenhados sobre todos os vértices $(r, c)$, cobrindo as extremidades das arestas.
5. **Otimização `shouldRepaint`:**
   ```dart
   @override
   bool shouldRepaint(covariant BoardPainter oldDelegate) {
     return oldDelegate.gameState != gameState ||
            oldDelegate.hoveredMove != hoveredMove ||
            oldDelegate.themeColors != themeColors;
   }
   ```

### 5.4 Algoritmo Puro de Detecção de Toque (`hitTestEdge` — `[PON-09]` / Issue #10)

```dart
/// Converte uma coordenada local de toque no canvas em um [Move] válido,
/// ou retorna `null` se o toque estiver fora da zona de tolerância ou muito
/// próximo ao centro de um vértice (evitando cliques ambíguos nos cantos).
Move? hitTestEdge(
  Offset localPosition,
  Size boardSize,
  BoardSize grid, {
  double boardPadding = 24.0,
}) {
  final int n = grid.boxesPerSide; // 3 ou 5
  final double side = boardSize.shortestSide;
  final double cellSpacing = (side - 2 * boardPadding) / n;
  if (cellSpacing <= 0) return null;

  // Hit slop confortável: mínimo 24dp de cada lado (48dp de largura total)
  final double maxPerpDistance = (cellSpacing * 0.42).clamp(24.0, 32.0);
  // Zona de exclusão de 18% ao redor dos vértices para evitar ambiguidade nos cantos
  final double vertexExclusion = cellSpacing * 0.18;

  Move? bestMove;
  double bestDistance = double.infinity;

  // Avalia todas as arestas horizontais e verticais candidatas
  for (final candidate in grid.allPossibleMoves) {
    final Offset a = candidate.startOffset(boardPadding, cellSpacing);
    final Offset b = candidate.endOffset(boardPadding, cellSpacing);

    final double length = (b - a).distance;
    final Offset dir = (b - a) / length;
    final Offset ap = localPosition - a;

    // Projeção escalar ao longo da aresta
    final double proj = ap.dx * dir.dx + ap.dy * dir.dy;
    if (proj < vertexExclusion || proj > length - vertexExclusion) {
      continue; // Toque em cima do ponto/vértice: ignora para evitar erro
    }

    // Distância perpendicular exata ao segmento da aresta
    final Offset closestPoint = a + dir * proj;
    final double perpDistance = (localPosition - closestPoint).distance;

    if (perpDistance <= maxPerpDistance && perpDistance < bestDistance) {
      bestDistance = perpDistance;
      bestMove = candidate;
    }
  }

  return bestMove;
}
```

### 5.5 Regras Estritas de Tratamento de Toque no `GameController` (Seção 8.3 / Issue #10)
- Se `hitTestEdge(...) == null` $\rightarrow$ **ignora** (não altera o estado).
- Se a aresta retornada já estiver ocupada (`board.isEdgeClaimed(move)`) $\rightarrow$ **ignora** (não altera o estado, não troca turno).
- Se `state.status == GameStatus.paused` ou `state.status == GameStatus.finished` ou `state.isBotTurn` $\rightarrow$ **ignora estritamente**.

---

## 6. Checklist de Validação Cruzada (`[UX-00]` e `[PON-06]` a `[PON-10]`)

- [x] **Tokens de Tema (`[PON-06]` / Issue #7):** Cores Light/Dark, tipografia tabular, espaçamentos, raios e durações prontos para `lib/core/theme/`.
- [x] **Acessibilidade Não Dependente Apenas de Cor (Issues #1, #7, #9, #11):** Azul (`● J1`) vs Âmbar (`◆ J2` / `▲ BOT`) + badges textuais de turno no cabeçalho.
- [x] **Início e Nova Partida (`[PON-07]` / Issue #8):** `UX-01` offline-first e `UX-02` com valores padrão **Computador / Fácil / 3×3**, ocultando dificuldade no modo 2 Jogadores.
- [x] **Renderização `BoardPainter` (`[PON-08]` / Issue #9):** Camadas Z-Order (caixas $\rightarrow$ guias $\rightarrow$ arestas + `lastMove` $\rightarrow$ pontos) e `shouldRepaint` eficiente para 3×3 (16 pontos, 24 arestas) e 5×5 (36 pontos, 60 arestas).
- [x] **Hit-Testing de Arestas (`[PON-09]` / Issue #10):** Função pura `hitTestEdge(Offset localPosition, Size boardSize, BoardSize grid)` com hitbox $\ge 48\text{dp}$ e ignorando toques fora de área, em arestas ocupadas, na pausa ou no turno do bot.
- [x] **Placar, Pausa e Resultado com Revanche (`[PON-10]` / Issue #11):** `UX-03` com placar em tempo real, `UX-08` com confirmação explícita antes de Reiniciar ou Sair, e `UX-04` com botão **Revanche** mantendo configurações e **alternando o jogador inicial** (Fluxo 7.5).
- [x] **Tutorial Dispensável (`UX-06`):** 3 passos visuais com botão **"Pular"** visível em todas as etapas e reabertura via Configurações (`UX-07`).
