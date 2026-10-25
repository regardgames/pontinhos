# Política de Privacidade — Pontinhos

| Campo | Valor |
|---|---|
| Aplicativo | Pontinhos |
| Identificador Android / iOS | `com.regard.pontinhos` |
| Versão do aplicativo coberta | `0.1.0` (versionCode / build `1`) |
| Versão desta política | 1.0 |
| Vigência | 25 de outubro de 2026 |
| Responsável | Regard, Fortaleza, Ceará, Brasil |
| Página HTML | [`privacy-policy.html`](privacy-policy.html) |

Esta política descreve o tratamento de dados do aplicativo **Pontinhos** (`com.regard.pontinhos`). A versão HTML publicada para a Google Play Store e para o GitHub Pages está em [`docs/privacy-policy.html`](privacy-policy.html). A entrada do site é [`docs/index.html`](index.html).

## 1. Resumo

O Pontinhos é um jogo de Dots and Boxes para Android e iOS. O aplicativo opera **100% offline-first**: partida, tutorial, configurações e estatísticas funcionam sem conta, sem servidor e sem conexão com a internet.

O Pontinhos:

- armazena apenas estatísticas de jogo e preferências de áudio, tema e vibração localmente no dispositivo, usando `SharedPreferences` no Android e o armazenamento local equivalente no iOS;
- guarda também, no mesmo armazenamento local, se o tutorial já foi concluído ou pulado;
- não solicita permissões sensíveis no pacote publicado;
- não exibe anúncios;
- não utiliza o identificador de publicidade (`AD_ID`);
- não coleta, não transmite e não compartilha dados pessoais com terceiros.

Nenhum dado do jogador sai do aparelho.

## 2. O que fica gravado no aparelho

O armazenamento persistente é o `SharedPreferences` (Android) e o equivalente local no iOS, no espaço privado do aplicativo. A Regard não recebe cópia desses dados. Eles permanecem no aparelho até a pessoa limpar os dados do Pontinhos ou desinstalar o aplicativo.

### 2.1 Preferências

| Chave local | Conteúdo |
|---|---|
| `soundEnabled` | Efeitos sonoros ligados ou desligados |
| `vibrationEnabled` | Vibração ligada ou desligada |
| `themeMode` | Tema claro, escuro ou o do sistema |
| `hasSeenTutorial` | Se o tutorial já foi concluído ou pulado |

### 2.2 Estatísticas de jogo

| Chave local | Conteúdo |
|---|---|
| `botStats` | Vitórias, derrotas, empates e partidas contra o computador, por tamanho de tabuleiro e dificuldade |
| `botStats.gamesPlayed`, `botStats.wins`, `botStats.losses`, `botStats.draws` | Totais agregados dessas partidas |
| `botStats.recordedMatchIds` | Identificadores locais de partidas já contabilizadas, usados só para não registrar o mesmo resultado duas vezes |

Partidas locais entre duas pessoas no mesmo aparelho não entram nessa estatística. Não há nome, e-mail, telefone, conta, foto, contatos, localização, identificador do aparelho nem conteúdo digitado pelo jogador.

### 2.3 Eventos da sessão (somente em memória)

Enquanto o aplicativo está aberto, eventos da sessão podem ficar na memória do processo: abertura, tutorial, início, conclusão, abandono e revanche de partida, mudança de preferência e um código curto de erro. Esses eventos não são gravados para envio, não atravessam a rede e somem quando o processo termina. O relatório da sessão, na tela de Estatísticas, é só para leitura no próprio aparelho.

O filtro interno descarta chaves que pareceriam dado pessoal (`email`, `name`, `phone`, `user_id`, `device_id`, `ip` e variações) e valores com formato de e-mail, IP ou número longo. Erros guardam apenas um código curto, nunca a mensagem da exceção.

## 3. Permissões

O manifesto de release do Android não declara permissões sensíveis. Não há câmera, microfone, localização, contatos, telefone, SMS, armazenamento amplo nem a permissão `com.google.android.gms.permission.AD_ID`.

A permissão `INTERNET` existe apenas nos manifestos de desenvolvimento (`debug` e `profile`), porque a ferramenta do Flutter precisa dela para o hot reload. Ela não entra no Android App Bundle publicado na Google Play.

No iOS, o `Info.plist` não declara chaves `NS*UsageDescription` (câmera, fotos, microfone, localização, contatos, rastreamento ou equivalente).

## 4. Anúncios e identificador de publicidade

O Pontinhos não exibe anúncios e não incorpora SDK de publicidade, mediação ou atribuição. O aplicativo não lê, não gera e não transmite o identificador de publicidade do Android (`AD_ID`) nem o identificador de anunciantes da Apple (IDFA). Não há rastreamento entre aplicativos.

## 5. Coleta, transmissão e compartilhamento

O Pontinhos não coleta dados pessoais, não os transmite e não os compartilha com a Regard, com afiliadas, com redes de anúncio, com ferramentas de analytics em nuvem ou com qualquer terceiro. Não há venda de dados. Não há conta, login, backend nem analytics de rede.

Na ficha **Data safety** da Google Play, a resposta correspondente a este comportamento é: o aplicativo não coleta nem compartilha dados do usuário. Dados que nunca saem do aparelho não são tratados como coletados.

## 6. Crianças

O aplicativo não pede cadastro e não coleta dados pessoais de crianças nem de adultos. Não há chat, compra nem perfil.

## 7. Segurança

Os dados locais ficam no armazenamento privado do aplicativo, protegido pelo sistema operacional. A Regard não opera servidor para esse conteúdo e não tem como recuperá-lo.

Para apagar o que estiver no aparelho: nas configurações do sistema, limpe os dados do Pontinhos ou desinstale o aplicativo.

## 8. Bibliotecas

O aplicativo é feito em Flutter. As dependências de produto são interface, navegação e armazenamento local (`shared_preferences`). Nenhuma delas é usada para enviar dados do jogador a um servidor.

## 9. Alterações desta política

Se o tratamento de dados mudar, esta página será atualizada neste repositório antes da publicação da versão correspondente na loja. A data de vigência no topo é a referência.

## 10. Contato

Dúvidas sobre esta política: abra uma issue no repositório [regard-jogo-dos-pontinhos](https://github.com/dayvidemerson/regard-jogo-dos-pontinhos).

URL pública prevista no GitHub Pages, depois que o site da pasta `docs/` estiver publicado:

`https://dayvidemerson.github.io/regard-jogo-dos-pontinhos/privacy-policy.html`

