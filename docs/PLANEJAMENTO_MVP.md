# Pontinhos — Planejamento de Produto e MVP v1.0

Consolidação do planejamento v1.0 para o jogo **Pontinhos** (Dots and Boxes) em Android e iOS. Este documento reúne o recorte necessário para a equipe: resumo, objetivos, inventário `UX-01` a `UX-08`, fluxos 7.1 a 7.5, regras da seção 8, arquitetura da seção 11, backlog `PON-01` a `PON-22` e a estratégia de testes da seção 16.

A especificação visual correspondente está em [`DESIGN_SYSTEM_UX.md`](DESIGN_SYSTEM_UX.md) (`UX-00`, issue #1).

## 1. Resumo executivo

Pontinhos resgata o jogo de papel e caneta em que dois participantes ligam pontos adjacentes e fecham quadrados. O MVP é um aplicativo **offline-first**, em português do Brasil, com visual moderno e minimalista. Não há cadastro, login, anúncios nem dependência de rede para jogar.

A partida acontece em tabuleiros de **3×3 caixas** (16 pontos, 24 arestas) ou **5×5 caixas** (36 pontos, 60 arestas). O adversário pode ser outra pessoa no mesmo aparelho ou o computador, em dificuldade fácil ou difícil. Quem fecha a quarta aresta de uma caixa marca 1 ponto e joga de novo. Se a mesma aresta fechar duas caixas, são 2 pontos e ainda assim apenas um turno extra. A partida acaba quando todas as caixas têm dono. Vence o maior placar; placares iguais são empate.

O tabuleiro é o foco da tela, em orientação retrato, com alvos de toque confortáveis e feedback curto (150–300 ms). Cor nunca é o único sinal de turno, aresta ou caixa: Jogador 1 e Jogador 2/Bot também se distinguem por símbolo, inicial ou ícone.

A entrega é faseada em cinco sprints. A Sprint 1 (este repositório, issues #2 a #6) deixa o projeto Flutter de pé e o motor de regras puro, imutável e coberto por testes. A interface jogável, os bots, a experiência e o beta vêm nas sprints seguintes.

## 2. Objetivos

1. Publicar um beta funcional para Android (Google Play Testing) e iOS (TestFlight), jogável do início ao fim nos dois tamanhos de tabuleiro, contra outra pessoa e contra o computador.
2. Ensinar as regras no primeiro acesso, com tutorial dispensável, e permitir revanche imediata com as mesmas opções e o jogador inicial alternado.
3. Guardar no aparelho as preferências de som e vibração e as estatísticas das partidas contra o computador, contando cada resultado uma única vez.
4. Medir, com telemetria mínima e sem dados pessoais, se as pessoas entendem o jogo, jogam de novo e voltam no dia seguinte.
5. Decidir depois do beta fechado (cerca de 20–30 pessoas) se o produto avança, itera ou é reavaliado.

Hipóteses exploratórias usadas nessa decisão:

| ID | Hipótese | Sinal observado |
|---|---|---|
| H1 | Compreensão | Conclusão da primeira partida ≥ 80% |
| H2 | Engajamento | Segunda partida depois da primeira e ≥ 3 partidas por jogador ativo no dia |
| H3 | Retenção | D1 ≥ 25% e D7 ≥ 10% |
| H4 | Qualidade | Nenhum bloqueador crítico nos aparelhos Android e iOS escolhidos |
| H5 | Preferência | Satisfação com o computador nas duas dificuldades |

Critério de decisão pós-beta:

- **Avançar** para uma v0.2 de retenção quando a experiência estiver estável, a compreensão alta e houver repetição e retenção compatíveis com as metas.
- **Iterar** quando a primeira partida termina bem, mas a repetição é baixa. A prioridade recai sobre bot, ritmo, tutorial ou progressão.
- **Reavaliar** quando o entendimento continuar difícil ou a intenção de jogar de novo permanecer baixa depois das iterações.

### Requisitos funcionais acompanhados pelo backlog

| ID | Requisito |
|---|---|
| RF-01 | Jogar contra o computador |
| RF-02 | Dois jogadores no mesmo aparelho |
| RF-03 | Tabuleiros 3×3 e 5×5 |
| RF-04 | Dificuldade fácil e difícil, só contra o computador |
| RF-05 | Marcar arestas válidas |
| RF-06 | Pontuar caixas fechadas, inclusive duas na mesma jogada |
| RF-07 | Encerrar em vitória ou empate |
| RF-08 | Pausar e bloquear o tabuleiro |
| RF-09 | Revanche com as mesmas opções e jogador inicial alternado |
| RF-10 | Tutorial breve, com pular, no primeiro acesso e sob demanda |
| RF-11 | Animação, som e vibração discretos |
| RF-12 | Estatísticas locais só das partidas contra o computador |
| RF-13 | Preferências locais de som e vibração |
| RF-14 | Telemetria mínima, degradável e sem dados pessoais |

Requisitos não funcionais que já condicionam a Sprint 1: orientação retrato, locale `pt_BR`, domínio desacoplado de Flutter, alvos de toque e contraste acessíveis, e funcionamento integral sem rede.

## 3. Inventário funcional (`UX-01` a `UX-08`)

| ID | Tela ou componente | Objetivo | Elementos obrigatórios |
|---|---|---|---|
| UX-01 | Início | Entrar no jogo sem cadastro nem internet | CTA "Jogar", acesso a Estatísticas (UX-05) e Configurações (UX-07) |
| UX-02 | Nova partida | Definir a sessão | Adversário (Bot ou local), tamanho (3×3 ou 5×5) e dificuldade (Fácil ou Difícil, só contra o Bot). Padrão: Computador, Fácil, 3×3 |
| UX-03 | Partida | Jogar | Tabuleiro, placar em tempo real, indicador de turno (e "Bot pensando..."), botão de pausa |
| UX-04 | Resultado | Encerrar o ciclo | Vitória, derrota ou empate, placar final, CTA "Revanche" e ação "Voltar ao início" |
| UX-05 | Estatísticas | Mostrar progresso local | Total, vitórias, derrotas e empates contra o bot, com recorte por dificuldade e tamanho quando fizer sentido |
| UX-06 | Tutorial | Ensinar as regras | 3 ou 4 passos visuais, botão "Pular" visível e reabertura pelas Configurações |
| UX-07 | Configurações | Preferências | Som, vibração e botão para rever o tutorial |
| UX-08 | Confirmações | Evitar perda acidental | Pausa (Continuar, Reiniciar, Sair) e confirmação explícita antes de reiniciar ou sair |

O Jogador 1 usa azul e o marcador `●` / `J1`. O Jogador 2 humano usa âmbar e `◆` / `J2`. O computador usa âmbar e `▲` / `BOT`. O par azul e âmbar permanece distinguível para deuteranopia, protanopia e tritanopia. Detalhe de cor, tipo, espaçamento e geometria do `CustomPainter` está na especificação de design.

## 4. Fluxos 7.1 a 7.5

### 7.1 Primeiro acesso

Abrir o aplicativo → tutorial breve, com opção de pular em qualquer passo → início → nova partida → partida.

A flag local `hasSeenTutorial` faz o tutorial aparecer sozinho só na primeira abertura. Concluir ou pular grava a flag. Configurações reabre o tutorial quando a pessoa quiser.

Os três passos ensinam: ligar pontos vizinhos na horizontal ou na vertical; fechar a quarta aresta para ganhar 1 ponto e um turno extra; vencer quem tiver mais pontos quando todas as caixas forem fechadas.

### 7.2 Nova partida

Início → escolher modo → escolher tamanho → escolher dificuldade, apenas contra o bot → iniciar partida.

Valores já selecionados ao abrir: **Computador**, **Fácil**, **3×3**. No modo local a dificuldade some ou fica desabilitada. Confirmar navega para a partida com um `GameConfig` válido.

### 7.3 Partida e encerramento

Na partida, cada toque em aresta livre marca a linha, atualiza o placar e o turno, ou concede turno extra. O bot, quando for a vez dele, joga sem aceitar toque humano. Quando a última caixa é capturada, o resultado mostra vitória, derrota ou empate e o placar final.

### 7.4 Pausa e saída

Partida → pausar → continuar, reiniciar ou sair.

Pausar grava `GameStatus.paused` e ignora o tabuleiro. Reiniciar e sair pedem confirmação (`UX-08`) antes de descartar o progresso. O mesmo vale para o gesto ou botão de voltar do sistema durante a partida. Se o bot estiver prestes a jogar, pausar, reiniciar ou sair cancela a jogada pendente; continuar retoma do ponto correto.

### 7.5 Revanche

A revanche abre outra partida com o mesmo modo, tamanho e dificuldade e **alterna o jogador inicial**. O resultado da partida anterior entra nas estatísticas contra o bot uma única vez, mesmo que a tela de resultado seja reconstruída ou que a pessoa peça revanche ou volte ao início. Partidas locais de duas pessoas não entram nessa estatística. Se a revanche começar com o bot, ele faz a primeira jogada sozinho.

## 5. Regras de negócio (seção 8)

### 8.1 Tabuleiro

Uma jogada marca uma aresta horizontal ou vertical entre dois pontos adjacentes.

| Tamanho | Pontos | Caixas | Arestas |
|---|---:|---:|---:|
| 3×3 | 16 (grade 4×4) | 9 | 24 (12 horizontais + 12 verticais) |
| 5×5 | 36 (grade 6×6) | 25 | 60 (30 horizontais + 30 verticais) |

Convenção de coordenadas, com `n` caixas por lado:

- Aresta horizontal: `row` em `0..n`, `column` em `0..n-1`. Liga os pontos `(row, column)` e `(row, column + 1)`.
- Aresta vertical: `row` em `0..n-1`, `column` em `0..n`. Liga os pontos `(row, column)` e `(row + 1, column)`.
- Caixa `(boxRow, boxCol)`: topo horizontal `(boxRow, boxCol)`, base horizontal `(boxRow + 1, boxCol)`, esquerda vertical `(boxRow, boxCol)`, direita vertical `(boxRow, boxCol + 1)`.

Aresta da borda externa pertence a uma caixa. Aresta interna pertence a duas. O mapeamento é bidirecional: cada aresta da caixa aponta para a caixa, e cada caixa lista a aresta entre as suas quatro.

### 8.2 Turnos, captura, pontuação e fim

1. `Player.one` e `Player.two` alternam jogadas válidas. O primeiro a jogar vem de `GameConfig.startingPlayer`.
2. Não vale aresta já marcada nem coordenada fora do tabuleiro.
3. Uma jogada fecha 0, 1 ou 2 caixas. A caixa fecha quando as quatro arestas estão marcadas. O dono é quem marcou a última.
4. Cada caixa vale 1 ponto. Duas caixas na mesma jogada valem 2 pontos para o jogador da vez.
5. Fechar 1 ou 2 caixas concede **exatamente um** turno extra, desde que a partida continue. O mesmo jogador permanece na vez.
6. Fechar nenhuma caixa passa a vez ao adversário.
7. A soma dos pontos é sempre igual à quantidade de caixas capturadas.
8. A partida termina assim que todas as caixas têm dono (9 no 3×3, 25 no 5×5) e o status passa a `finished`.
9. Vence o placar maior. Placares iguais são empate: `winner == null` e `isDraw == true`. Os tamanhos atuais têm número ímpar de caixas, então uma partida completa neles não empata; o motor ainda assim trata o empate de forma genérica (regra 8.2.8 e RF-07).
10. A jogada que captura a última caixa encerra a partida e **não** concede turno extra.

Jogada com status diferente de `playing` (`ready`, `paused` ou `finished`) é recusada. O `GameState` anterior permanece o mesmo objeto, sem alteração de placar, tabuleiro ou histórico.

### 8.3 Entrada, pausa e revanche

- Toque fora da tolerância de uma aresta não muda o estado.
- Toque em aresta ocupada não muda o estado nem o turno.
- Toque durante pausa, partida encerrada ou turno do bot é ignorado.
- Pausar só tem efeito em partida `playing`. Retomar só tem efeito em partida `paused`.
- Revanche cria outra partida limpa. Repetir a operação sobre o **mesmo** estado anterior devolve o mesmo jogador inicial; a alternância não acumula. O estado encerrado continua disponível para a contagem idempotente do resultado.

### 8.4 Bots (Sprint 3)

Os dois bots implementam `GameBot.chooseMove` sem depender de Flutter e nunca devolvem jogada inválida.

- **Fácil:** escolhe entre as arestas livres com alguma aleatoriedade e pode capturar caixas disponíveis, sem evitar armadilhas de forma consistente. Aceita `Random` injetável para os testes. Responde na hora nos dois tabuleiros.
- **Difícil:** 1) prefere capturar duas caixas e, em seguida, uma; 2) se não houver captura, escolhe aresta que não deixe caixa com três lados; 3) se toda jogada entregar caixas, escolhe a que entrega a menor cadeia. A decisão no 5×5 fica abaixo de 50 ms.

O controlador da Sprint 3 bloqueia toque humano durante o turno do bot, espera um intervalo curto entre jogadas (desligável em teste) e trata pausa, reinício, saída e revanche conforme os fluxos 7.4 e 7.5.

## 6. Arquitetura (seção 11)

### 11.1 Stack

- Cliente Flutter/Dart para Android e iOS.
- Orientação prioritária `portraitUp` e `portraitDown`, também fixada no manifesto Android (`sensorPortrait`) e no `Info.plist`.
- Locale inicial `pt_BR`.
- Estado com `flutter_riverpod`.
- Navegação com `go_router`.
- Persistência simples com `shared_preferences`.
- Testes com `flutter_test` e lints de `flutter_lints`.

### 11.2 Telemetria

Há um módulo `lib/core/analytics/` com implementação padrão que não depende de rede (no-op ou buffer local). Um adaptador externo, se existir, é opcional e condicionado a configuração. Falha de rede ou do SDK não pode derrubar nem bloquear o jogo. Os eventos previstos são `app_open`, `tutorial_started`, `tutorial_completed`, `tutorial_skipped`, `game_started`, `game_completed`, `game_abandoned`, `rematch_started`, `settings_changed` e `app_error`. Nenhum payload leva identificador pessoal.

### 11.3 Estrutura

```text
lib/
  main.dart
  app/
    app.dart
    router.dart
  core/
    theme/
    storage/
    analytics/
  features/
    game/
      domain/
        board.dart
        game_state.dart
        game_engine.dart
      ai/
        easy_bot.dart
        hard_bot.dart
      presentation/
        game_screen.dart
        board_painter.dart
        game_controller.dart
    home/
    tutorial/
    settings/
    statistics/
test/
  game/
  ai/
  widgets/
```

O diretório `lib/features/game/domain/` é Dart puro: é proibido importar `package:flutter`. O mesmo vale para `lib/features/game/ai/` quando os bots forem implementados.

### 11.4 Contratos

```dart
enum Player { one, two }
enum GameStatus { ready, playing, paused, finished }
enum EdgeOrientation { horizontal, vertical }

class Move {
  final EdgeOrientation orientation;
  final int row;
  final int column;
}

abstract interface class GameEngine {
  GameState createGame(GameConfig config);
  MoveResult applyMove(GameState state, Move move);
  bool isValidMove(GameState state, Move move);
  List<Move> availableMoves(GameState state);
  GameState createRematch(GameState previousState);
  GameState pauseGame(GameState state);
  GameState resumeGame(GameState state);
}

abstract interface class GameBot {
  Move chooseMove(GameState state);
}
```

`MoveResult` carrega o novo `GameState`, se a jogada foi aceita, as caixas capturadas (0, 1 ou 2), se houve turno extra, se a partida acabou nessa jogada e, quando recusada, um motivo diagnóstico. `GameConfig` guarda modo, tamanho, dificuldade e jogador inicial, e `forRematch()` alterna só o jogador inicial.

Rotas previstas: `/` (UX-01), `/game` (UX-03, com UX-04 e UX-08), `/stats` (UX-05), `/tutorial` (UX-06) e `/settings` (UX-07). A nova partida pode ser rota ou modal a partir do início.

## 7. Backlog `PON-01` a `PON-22`

Estimativas são pontos relativos. P0 é indispensável para o beta; P1 é desejável para a validação da experiência.

| ID | Issue | Sprint | Pts | Pri. | Entrega |
|---|---:|---|---:|---|---|
| PON-01 | #2 | 1 | 2 | P0 | Projeto Flutter, retrato, `pt_BR` e pastas da seção 11.3 |
| PON-02 | #3 | 1 | 3 | P0 | Tabuleiro, arestas, caixas, config e estado imutáveis |
| PON-03 | #4 | 1 | 5 | P0 | Jogadas válidas, captura de 0/1/2 caixas e turno extra |
| PON-04 | #5 | 1 | 3 | P0 | Placar, fim de jogo, vitória/empate e revanche |
| PON-05 | #6 | 1 | 5 | P0 | Testes do motor com cobertura ≥ 95% no domínio |
| PON-06 | #7 | 2 | 3 | P0 | Tema e componentes base acessíveis |
| PON-07 | #8 | 2 | 3 | P0 | Início e nova partida, com os padrões Computador / Fácil / 3×3 |
| PON-08 | #9 | 2 | 5 | P0 | `BoardPainter` para 3×3 e 5×5 |
| PON-09 | #10 | 2 | 5 | P0 | Toque convertido em aresta, com hit slop confortável |
| PON-10 | #11 | 2 | 5 | P0 | Placar, pausa com confirmação e resultado com revanche |
| PON-11 | #12 | 3 | 3 | P0 | Bot fácil legal e rápido |
| PON-12 | #13 | 3 | 8 | P0 | Bot difícil: captura, jogada segura e menor cadeia |
| PON-13 | #14 | 3 | 3 | P0 | Bot integrado ao controlador, inclusive pausa e revanche |
| PON-14 | #15 | 3 | 5 | P0 | Simulações de legalidade, heurística e equilíbrio |
| PON-15 | #16 | 4 | 3 | P1 | Tutorial do primeiro acesso, com pular e reabertura |
| PON-16 | #17 | 4 | 3 | P1 | Animações curtas, som e vibração conforme preferência |
| PON-17 | #18 | 4 | 5 | P1 | Preferências, estatísticas e contagem idempotente |
| PON-18 | #19 | 4 | 5 | P0 | Acessibilidade, semântica e layout em retrato |
| PON-19 | #20 | 5 | 3 | P1 | Telemetria mínima e privada |
| PON-20 | #21 | 5 | 5 | P0 | QA dos fluxos 7.1 a 7.5 e correções |
| PON-21 | #22 | 5 | 5 | P0 | Beta Android e iOS em retrato, sem permissão sensível extra |
| PON-22 | #23 | 5 | 3 | P1 | Feedback do beta e recomendação avançar, iterar ou reavaliar |

Soma: Sprint 1 = 18, Sprint 2 = 21, Sprint 3 = 19, Sprint 4 = 16, Sprint 5 = 16. Total = 90 pontos relativos.

`UX-00` (issue #1) corre em paralelo à Sprint 1 e destrava `PON-06` a `PON-10` e o polimento da Sprint 4. A especificação já está versionada em `docs/DESIGN_SYSTEM_UX.md`.

### O que a Sprint 1 fecha

- Aplicativo Flutter compilável para Android e iOS, em retrato e `pt_BR`, com Riverpod, GoRouter e SharedPreferences declarados.
- Domínio puro: `Board`, `Move`, `BoxCoordinate`, `GameConfig`, `GameState` e `PontinhosGameEngine`.
- Regras de jogada, turno extra único, placar, fim, vitória, empate genérico, pausa e revanche idempotente.
- Suíte `test/game/` cobrindo os casos da seção 16 para o motor.

Ficam de fora desta sprint, de propósito: tema jogável, hit testing, bots com estratégia, tutorial, estatísticas, telemetria real e distribuição.

## 8. Estratégia de testes (seção 16)

A suíte automatizada é a rede principal contra erro de captura, turno extra duplo e mutação acidental do estado. `flutter analyze` precisa terminar sem issues. `flutter test` cobre motor, bots e widgets.

### Regras e motor (`test/game/`)

Obrigatório na Sprint 1, com cobertura de `lib/features/game/domain/` de pelo menos 95%:

- Inicialização 3×3 (16 pontos, 9 caixas, 24 arestas) e 5×5 (36 pontos, 25 caixas, 60 arestas).
- Mapeamento de borda (1 caixa) e de aresta interna (2 caixas), nos dois sentidos.
- Rejeição sem mutação: coordenada negativa, acima do limite, aresta ocupada e status `ready`, `paused` ou `finished`.
- Turno alternado quando nenhuma caixa fecha.
- Uma caixa: +1 ponto e o mesmo jogador continua (`grantedExtraTurn`).
- Duas caixas na mesma aresta interna: +2 pontos e um único turno extra. O histórico cresce uma jogada, não duas.
- Cadeia de capturas do mesmo jogador até uma jogada vazia ou até a última caixa. Na jogada que encerra, não há turno extra.
- Partida inteira: 24 jogadas no 3×3 e 60 no 5×5, status `finished`, soma dos pontos igual ao total de caixas e vencedor coerente com o placar.
- Empate genérico quando os pontos são iguais (`isDraw`, `winner == null`).
- Revanche preserva modo, tamanho e dificuldade e alterna Jogador 1 → Jogador 2 → Jogador 1, sem alterar o estado anterior.
- Igualdade de valor e `hashCode`. Mapas e listas expostos são não modificáveis. A instância recebida por `applyMove` inválido, `pauseGame` ou `resumeGame` fora de hora é devolvida intacta.
- Nenhum arquivo de `lib/features/game/domain/` importa `package:flutter`.

### Interface e experiência (`test/widgets/`)

A partir da Sprint 2, e fechado na Sprint 4 e no QA da Sprint 5:

- Fluxos 7.1 a 7.5 de ponta a ponta, inclusive pular o tutorial, confirmação antes de reiniciar ou sair, e revanche.
- Padrões da nova partida e ocultação da dificuldade no modo local.
- Tabuleiro inicial, intermediário e final nos dois tamanhos.
- `hitTestEdge` em aresta válida, ocupada, canto ambíguo e área vazia.
- Toques ignorados em pausa, fim de jogo e turno do bot.
- Layout sem overflow em retrato compacto e grande, inclusive com texto ampliado, e rótulos de semântica em placar, turno e ações.
- Persistência de preferências e idempotência da estatística contra o bot entre reconstruções e reinícios do processo.

### Bots e qualidade (`test/ai/`)

Na Sprint 3:

- Nenhuma jogada inválida em simulações `Easy`×`Easy`, `Hard`×`Easy` e `Hard`×`Hard`, nos dois tamanhos.
- Bot difícil captura quando pode, não entrega a terceira aresta se existir jogada segura e, no sacrifício, escolhe a menor cadeia.
- Em uma bateria contra o bot fácil, com alternância de quem começa, o bot difícil vence de forma claramente superior (referência: ≥ 80%).
- Tempo de decisão no 5×5 sem travar a interface.
- O controlador não aceita toque humano enquanto o bot pensa ou encadeia turnos extras.

### Pronto para o beta

Antes de empacotar (PON-20 e PON-21): os três blocos acima estão verdes, não há bloqueador conhecido nos fluxos principais, timers e listeners do bot são cancelados ao sair ou reiniciar, e os manifestos não pedem permissão sensível desnecessária. O roteiro do beta (PON-22) observa a primeira partida e consolida conclusão, repetição, partidas por dia, D1, D7 e estabilidade para recomendar avançar, iterar ou reavaliar.
