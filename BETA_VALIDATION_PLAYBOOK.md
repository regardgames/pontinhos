# Pontinhos — playbook de validação do beta fechado

Roteiro para as sessões com 20–30 pessoas (seção 14.2), o questionário depois da partida e a matriz que recomenda **Avançar para v0.2 (Retenção)**, **Iterar** ou **Reavaliar** (seção 19). As contas saem de `BetaMetricsEvaluator` em `lib/core/analytics/beta_metrics.dart`. Nenhum campo pede nome, e-mail, telefone ou identificador de aparelho.

Versão observada: `v0.1.0-beta` (`versionCode` 1). Android e iOS na mesma revisão.

## 1. Como conduzir a sessão

Duração prevista: uma partida completa, com espaço para uma revanche se a pessoa quiser. Quem observa não ensina a regra, não aponta a aresta e não explica o turno extra antes de a pessoa descobrir ou desistir.

Antes de entregar o aparelho:

1. Instale a build da faixa (Play teste fechado ou TestFlight). Abra o app uma vez numa conta limpa, ou apague os dados, para `hasSeenTutorial` estar desligado.
2. Som e vibração ficam no padrão (ligados). Tema no sistema.
3. Anote só: plataforma (Android ou iOS), modelo do aparelho, tamanho de tela e o código da sessão (`A01`, `I01`, …). Sem nome da pessoa.
4. Entregue o aparelho já na abertura do app, na tela do tutorial.
5. Diga apenas: "Jogue como quiser. Pode pular o tutorial. Quando terminar, me avise."

Durante a partida, preencha a ficha da seção 2 em silêncio. Intervenha só se o app travar (bloqueador). Nesse caso, registre a plataforma, o passo e se precisou reabrir o app. Isso conta em H4.

## 2. Roteiro da primeira partida

Marque cada linha com sim, não ou o número pedido. Uma ficha por pessoa.

| # | O que observar | Como anotar |
|---|---|---|
| 1 | Abriu o tutorial sem ajuda externa | sim / não |
| 2 | Pulou ou concluiu o tutorial | `pulou` / `concluiu` / `não viu` |
| 3 | Tempo até o primeiro lance válido, a partir da entrada na partida | segundos |
| 4 | O primeiro lance foi numa aresta livre, sem toque repetido em aresta ocupada | sim / não |
| 5 | Fechou ao menos uma caixa na partida | sim / não |
| 6 | Percebeu o turno extra ao fechar a caixa (jogou de novo sem achar que o app tinha errado o turno) | sim / não / não fechou caixa |
| 7 | Concluiu a primeira partida (última caixa fechada e resultado na tela) | sim / não |
| 8 | Leu o resultado como vitória, derrota ou empate sem perguntar o que significava | sim / não |
| 9 | Usou a revanche por conta própria | sim / não |
| 10 | Se não usou a revanche, começou outra partida pelo início | sim / não / não se aplica |
| 11 | Travou, botão sem resposta ou timer do bot que continuou depois de pausar, sair ou reiniciar | descrever ou "nenhum" |
| 12 | Partidas concluídas nessa sessão, incluindo a revanche | número |

O tempo do item 3 começa quando o tabuleiro aparece e termina no primeiro traço aceito. Se a pessoa não chegar a jogar, anote "não jogou" e a conclusão da primeira partida fica como não.

Não demonstre o turno extra. Se a pessoa perguntar de quem é a vez depois de fechar uma caixa, responda só "o que a tela está dizendo?" e marque o item 6 como não.

## 3. Questionário pós-teste

Aplicar logo depois da sessão, em voz alta ou por escrito. Escala de 1 a 5, em que 1 é "discordo" e 5 é "concordo", salvo onde a pergunta pede outra coisa. Não grave áudio com voz identificável.

1. As regras ficaram claras o bastante para eu terminar uma partida sem ajuda. (1–5)
2. No tabuleiro 3×3, o toque acertava a aresta que eu queria. (1–5)
3. No tabuleiro 5×5, o toque acertava a aresta que eu queria. (1–5) — pule se a pessoa não jogou 5×5. Convide a abrir uma partida 5×5 só se ela topar; não é obrigatório para H1.
4. O computador no modo Fácil pareceu justo para aprender. (1–5)
5. O computador no modo Difícil pareceu um desafio justo, sem parecer aleatório nem impossível. (1–5) — pule se a pessoa não enfrentou o Difícil. Ofereça uma partida curta só se ela quiser.
6. Eu jogaria Pontinhos de novo nos próximos dias. (1–5)
7. O que mais atrapalhou, se algo atrapalhou? (texto livre, sem dado pessoal)
8. O que você faria de novo agora: revanche, outra partida, ou parar? (`revanche` / `outra` / `parar`)

Para o avaliador, converta a média da pergunta 6 em intenção de 0 a 1: `(média - 1) / 4`. A média das perguntas 4 e 5, com a mesma conversão, alimenta `easySatisfaction` e `hardSatisfaction`. Quem não respondeu a pergunta fica de fora da média; se ninguém respondeu uma dificuldade, deixe o campo nulo.

## 4. Painel H1–H5

Preencha os agregados da coorte inteira, somando Android e iOS, salvo H4, que separa as plataformas.

| ID | Hipótese | Conta | Meta |
|---|---|---|---|
| H1 | Compreensão | `firstMatchesCompleted / firstMatchesStarted` | `>= 80%` |
| H2 | Engajamento | `playersWhoRematched / firstMatchesCompleted` e `matchesPlayed / activePlayers` | revanche `>= 50%` e `>= 3` partidas por pessoa ativa no dia |
| H3 | Retenção | volta no dia seguinte e no sétimo dia, sobre quem era elegível | D1 `>= 25%`, D7 `>= 10%` |
| H4 | Qualidade | bloqueadores críticos que impediram jogar ou corromperam a partida | zero em Android e zero em iOS |
| H5 | Preferência | satisfação com o Bot Fácil e com o Bot Difícil | ambas `>= 0,60` na escala 0–1 |

Definições operacionais, as mesmas do código:

- **Primeira partida iniciada:** a pessoa chegou ao tabuleiro na primeira sessão.
- **Primeira partida concluída:** o resultado (`UX-04`) apareceu nessa primeira partida. Abandono e reinício não contam como conclusão.
- **Revanche / segunda partida imediata:** a pessoa tocou em Revanche ou começou outra partida antes de encerrar a sessão. O denominador é quem concluiu a primeira.
- **Pessoa ativa no dia:** quem iniciou ao menos uma partida naquele dia. O numerador de partidas inclui revanche concluída.
- **D1 e D7:** entre quem jogou no dia 0 e ainda podia abrir o app no dia seguinte ou no sétimo, quantas abriram e iniciaram partida. Não use identificador de publicidade. A lista é o código da sessão que a própria pessoa devolve no convite ("abri de novo?"), ou a contagem anônima combinada no grupo.
- **Bloqueador crítico:** crash, partida impossível de terminar, toque morto no tabuleiro inteiro, ou bot que continua jogando depois de pausar, sair ou reiniciar. Ajuste visual que não impede a partida não entra aqui.
- **H5 não trava a decisão sozinho.** Ele aparece no painel. A matriz da seção 5 usa H1–H4 e a intenção da pergunta 6.

O relatório da sessão no app (Estatísticas → Relatório da sessão) mostra as contagens locais de `game_started`, `game_completed`, `game_abandoned` e `rematch_started` daquele processo, mais vitórias, derrotas e empates contra o computador. Use-o para conferir uma sessão. O painel da coorte continua sendo a soma das fichas, porque retenção não cabe num único aparelho.

Exemplo de chamada, com os números já agregados:

```dart
const evaluator = BetaMetricsEvaluator();
final evaluation = evaluator.evaluate(
  BetaSessionSummary(
    firstMatchesStarted: 25,
    firstMatchesCompleted: 21,
    playersWhoRematched: 14,
    activePlayers: 25,
    matchesPlayed: 80,
    d1EligiblePlayers: 25,
    d1ReturningPlayers: 7,
    d7EligiblePlayers: 25,
    d7ReturningPlayers: 3,
    criticalBlockersAndroid: 0,
    criticalBlockersIos: 0,
    easySatisfaction: 0.75,
    hardSatisfaction: 0.62,
    replayIntent: 0.70,
  ),
);
evaluation.decision; // BetaDecision.advanceToV02, iterate ou reevaluate
evaluation.recommendationLabel;
```

## 5. Matriz de decisão (seção 19)

Aplique nesta ordem. Os limiares são os de `BetaMetricsEvaluator`.

| Situação | Decisão | Por quê |
|---|---|---|
| Conclusão da 1ª partida `< 80%`, ou intenção de jogar de novo `< 0,40` | **Reavaliar** | O entendimento segue difícil, ou a vontade de voltar ficou baixa mesmo com a partida terminando. |
| Conclusão `>= 80%`, intenção ok ou ainda não medida, mas revanche `< 50%`, partidas/dia `< 3`, D1 `< 25%`, D7 `< 10%`, ou há bloqueador crítico | **Iterar** | A pessoa entende o jogo e termina a primeira partida. A repetição, a volta ou a estabilidade ainda não sustentam a v0.2. Priorize bot, ritmo, tutorial ou progressão — o que a ficha e o questionário apontarem. |
| H1, H2, H3 e H4 dentro da meta, e a intenção não está abaixo de `0,40` | **Avançar para v0.2 (Retenção)** | A experiência está estável, a compreensão está alta e há repetição e retenção compatíveis com as metas. |

Reavaliar não compete com iterar: se a compreensão ou a intenção falham, a recomendação é reavaliar mesmo que a revanche também seja baixa. Iterar é o caminho quando a primeira partida termina bem e o que falta é repetir, voltar ou estabilizar.

H5 abaixo de `0,60` não muda a célula da matriz. Registre no relatório se o Fácil, o Difícil ou os dois ficaram aquém, para a v0.2 ou para a iteração do bot.

## 6. Relatório pós-beta

Depois da janela (D0 das sessões, mais a leitura de D1 e D7), publique uma página com:

1. Build (`0.1.0`, código `1`) e quantas pessoas em Android e em iOS.
2. A tabela H1–H5 com a taxa calculada, a meta e se passou.
3. Três frases das fichas: tempo mediano até o primeiro lance, quantas pessoas entenderam o turno extra, quantas pediram revanche sozinhas.
4. Bloqueadores, ou a frase "nenhum bloqueador crítico".
5. A recomendação literal: `Avançar para v0.2 (Retenção)`, `Iterar` ou `Reavaliar`, seguida da frase de `BetaEvaluation.rationale`.
6. Se a decisão for iterar, uma prioridade: bot, ritmo, tutorial ou progressão.

Não anexe a ficha bruta se ela tiver qualquer anotação que identifique a pessoa. O consolidado basta.

## 7. Prontidão técnica da `v0.1.0-beta`

O alfa interno que este repositório consegue provar é o da seção 16: motor, bots, widgets e os fluxos 7.1 a 7.5 automatizados, com `flutter analyze` sem issues e `flutter test` verde. Essa é a condição chamada aqui de **alfa interno aprovado** para empacotar o beta. Ela não substitui a sessão humana das seções 2 e 3.

Está coberto no código desta versão:

- Tutorial no primeiro acesso, com pular e concluir, e reabertura pelas configurações.
- Nova partida com padrão Computador, Fácil e 3×3, e dificuldade oculta no modo local.
- Partida até a última caixa, resultado com vitória, derrota ou empate, revanche e volta ao início.
- Pausa que bloqueia o tabuleiro, reinício e saída com confirmação, e cancelamento do timer do bot.
- Estatística contra o computador contada uma vez por partida, também depois de revanche ou de reconstruir o resultado.
- Telemetria offline com filtro de PII e relatório de sessão.
- Manifestos em retrato, sem permissão sensível de release, ids `com.regard.pontinhos`.

O beta fechado começa quando essa suíte está verde e os artefatos da [`BETA_DISTRIBUTION.md`](BETA_DISTRIBUTION.md) estão nas faixas. A decisão da seção 5 só sai depois das fichas e do D7, não antes.
