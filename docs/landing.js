(function () {
  var STORAGE_KEY = 'pontinhos-web-theme';
  var MSG = {
    initial:
      'Toque em uma aresta tracejada com 3 lados prontos para fechar a caixa e ganhar turno extra!',
    capture:
      'Boa! Você fechou uma caixa (+1) e ganhou um turno extra! Continue jogando.',
    bot: '◆ O Bot traçou uma aresta (destaque Verde Esmeralda). Sua vez!',
    done: 'Partida de demonstração concluída! Clique em "Reiniciar Tabuleiro" para jogar novamente.',
  };

  var SVG_NS = 'http://www.w3.org/2000/svg';
  var state = null;
  var botTimer = 0;

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'dark'
      : 'light';
  }

  function syncThemeButton(theme) {
    var button = document.getElementById('theme-toggle');
    if (!button) return;
    var isDark = theme === 'dark';
    button.querySelector('.theme-icon').textContent = isDark ? '☾' : '☀';
    button.querySelector('.theme-label').textContent = isDark
      ? 'Tema Escuro'
      : 'Tema Claro';
    button.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    syncThemeButton(theme);
  }

  function initTheme() {
    applyTheme(currentTheme());
    var button = document.getElementById('theme-toggle');
    button.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (err) {
        /* armazenamento indisponível: o tema ainda alterna nesta visita */
      }
      applyTheme(next);
    });

    var media = window.matchMedia('(prefers-color-scheme: dark)');
    var onScheme = function () {
      var stored = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch (err) {
        stored = 'locked';
      }
      if (stored === 'light' || stored === 'dark') return;
      applyTheme(media.matches ? 'dark' : 'light');
    };
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onScheme);
    }
  }

  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute(
        'aria-label',
        open ? 'Fechar menu de navegação' : 'Abrir menu de navegação',
      );
    }

    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'));
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
    });
  }

  function initGallery() {
    var tabs = Array.prototype.slice.call(
      document.querySelectorAll('[role="tab"]'),
    );
    if (!tabs.length) return;

    function select(tab) {
      tabs.forEach(function (item) {
        var selected = item === tab;
        item.setAttribute('aria-selected', selected ? 'true' : 'false');
        item.tabIndex = selected ? 0 : -1;
        var panel = document.getElementById(item.getAttribute('aria-controls'));
        if (panel) panel.hidden = !selected;
      });
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        select(tab);
      });
      tab.addEventListener('keydown', function (event) {
        var next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft')
          next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        tabs[next].focus();
        select(tabs[next]);
      });
    });
  }

  function createState() {
    var h = [0, 1, 2, 3].map(function () {
      return [null, null, null];
    });
    var v = [0, 1, 2].map(function () {
      return [null, null, null, null];
    });
    var boxes = [0, 1, 2].map(function () {
      return [null, null, null];
    });
    var fresh = {
      h: h,
      v: v,
      boxes: boxes,
      scores: { p1: 0, bot: 0 },
      last: null,
      turn: 'p1',
      over: false,
      lock: false,
    };

    function claimBox(r, c, who) {
      boxes[r][c] = who;
      fresh.scores[who] += 1;
      h[r][c] = h[r][c] || who;
      h[r + 1][c] = h[r + 1][c] || who;
      v[r][c] = v[r][c] || who;
      v[r][c + 1] = v[r][c + 1] || who;
    }

    claimBox(0, 0, 'p1');
    claimBox(0, 1, 'p1');
    claimBox(0, 2, 'bot');
    v[1][0] = 'bot';
    v[1][1] = 'bot';
    h[2][2] = 'p1';
    h[3][1] = 'p1';
    fresh.last = { type: 'v', r: 1, c: 1, who: 'bot' };
    return fresh;
  }

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  function availableMoves(board) {
    var moves = [];
    var r;
    var c;
    for (r = 0; r < 4; r += 1) {
      for (c = 0; c < 3; c += 1) {
        if (!board.h[r][c]) moves.push({ type: 'h', r: r, c: c });
      }
    }
    for (r = 0; r < 3; r += 1) {
      for (c = 0; c < 4; c += 1) {
        if (!board.v[r][c]) moves.push({ type: 'v', r: r, c: c });
      }
    }
    return moves;
  }

  function adjacentBoxes(move) {
    if (move.type === 'h') {
      return [
        { r: move.r - 1, c: move.c },
        { r: move.r, c: move.c },
      ];
    }
    return [
      { r: move.r, c: move.c - 1 },
      { r: move.r, c: move.c },
    ];
  }

  function inside(box) {
    return box.r >= 0 && box.c >= 0 && box.r < 3 && box.c < 3;
  }

  function filledSides(h, v, r, c) {
    return [h[r][c], h[r + 1][c], v[r][c], v[r][c + 1]].filter(Boolean).length;
  }

  function applyMove(board, move, who) {
    if (move.type === 'h') {
      if (board.h[move.r][move.c]) return -1;
      board.h[move.r][move.c] = who;
    } else if (board.v[move.r][move.c]) {
      return -1;
    } else {
      board.v[move.r][move.c] = who;
    }
    board.last = { type: move.type, r: move.r, c: move.c, who: who };
    var captured = 0;
    adjacentBoxes(move).forEach(function (box) {
      if (!inside(box) || board.boxes[box.r][box.c]) return;
      if (filledSides(board.h, board.v, box.r, box.c) === 4) {
        board.boxes[box.r][box.c] = who;
        captured += 1;
      }
    });
    board.scores[who] += captured;
    return captured;
  }

  function preview(board, move) {
    var h = board.h.map(function (row) {
      return row.slice();
    });
    var v = board.v.map(function (row) {
      return row.slice();
    });
    if (move.type === 'h') h[move.r][move.c] = 'x';
    else v[move.r][move.c] = 'x';
    var captured = 0;
    var threats = 0;
    var r;
    var c;
    for (r = 0; r < 3; r += 1) {
      for (c = 0; c < 3; c += 1) {
        if (board.boxes[r][c]) continue;
        var count = filledSides(h, v, r, c);
        if (count === 4) captured += 1;
        else if (count === 3) threats += 1;
      }
    }
    return { captured: captured, threats: threats };
  }

  function chooseBotMove(board) {
    var ranked = availableMoves(board).map(function (move) {
      var result = preview(board, move);
      return { move: move, captured: result.captured, threats: result.threats };
    });
    var captures = ranked.filter(function (item) {
      return item.captured > 0;
    });
    if (captures.length) {
      captures.sort(function (a, b) {
        return b.captured - a.captured;
      });
      return captures[0].move;
    }
    var safe = ranked.filter(function (item) {
      return item.threats === 0;
    });
    if (safe.length) return safe[0].move;
    ranked.sort(function (a, b) {
      return a.threats - b.threats;
    });
    return ranked[0].move;
  }

  function runBot() {
    var guard = 0;
    while (guard < 40) {
      guard += 1;
      if (!availableMoves(state).length) {
        state.over = true;
        state.turn = null;
        return;
      }
      var move = chooseBotMove(state);
      var captured = applyMove(state, move, 'bot');
      if (captured <= 0) {
        state.turn = 'p1';
        return;
      }
      if (!availableMoves(state).length) {
        state.over = true;
        state.turn = null;
        return;
      }
    }
  }

  function motionDelay() {
    var media = window.matchMedia('(prefers-reduced-motion: reduce)');
    return media.matches ? 40 : 480;
  }

  function setStatus(text, announce) {
    var el = document.getElementById('board-status');
    if (!announce) {
      el.textContent = text;
      return;
    }
    el.textContent = '';
    window.setTimeout(function () {
      el.textContent = text;
    }, 30);
  }

  function svgEl(name, attrs) {
    var node = document.createElementNS(SVG_NS, name);
    Object.keys(attrs).forEach(function (key) {
      node.setAttribute(key, attrs[key]);
    });
    return node;
  }

  function dot(index) {
    return 36 + index * 82;
  }

  function edgeGeometry(move) {
    var x1 = dot(move.c);
    var y1 = dot(move.r);
    if (move.type === 'h') {
      return {
        x1: x1,
        y1: y1,
        x2: dot(move.c + 1),
        y2: y1,
        hit: {
          x: x1 + 18,
          y: y1 - 22,
          width: 46,
          height: 44,
        },
      };
    }
    return {
      x1: x1,
      y1: y1,
      x2: x1,
      y2: dot(move.r + 1),
      hit: {
        x: x1 - 22,
        y: y1 + 18,
        width: 44,
        height: 46,
      },
    };
  }

  function isLast(move) {
    return (
      state.last &&
      state.last.type === move.type &&
      state.last.r === move.r &&
      state.last.c === move.c
    );
  }

  function drawLine(parent, move, claimed) {
    var geo = edgeGeometry(move);
    if (claimed && isLast(move)) {
      parent.appendChild(
        svgEl('line', {
          x1: geo.x1,
          y1: geo.y1,
          x2: geo.x2,
          y2: geo.y2,
          stroke: 'var(--color-last-move)',
          'stroke-width': '14',
          'stroke-linecap': 'round',
          'stroke-opacity': '0.35',
        }),
      );
    }
    parent.appendChild(
      svgEl('line', {
        x1: geo.x1,
        y1: geo.y1,
        x2: geo.x2,
        y2: geo.y2,
        stroke: claimed
          ? isLast(move)
            ? 'var(--color-last-move)'
            : 'var(--line-ink)'
          : 'var(--text-muted)',
        'stroke-width': claimed ? '6' : '4',
        'stroke-linecap': 'round',
        'stroke-dasharray': claimed ? '0' : '8 7',
        'stroke-opacity': claimed ? '1' : '0.9',
      }),
    );
    if (claimed && isLast(move)) {
      var cx = (geo.x1 + geo.x2) / 2;
      var cy = (geo.y1 + geo.y2) / 2;
      parent.appendChild(
        svgEl('circle', {
          cx: cx,
          cy: cy,
          r: '8',
          fill: 'var(--bg-surface)',
          stroke: 'var(--color-last-move)',
          'stroke-width': '3.5',
        }),
      );
    }
  }

  function edgeLabel(move, closes) {
    var axis = move.type === 'h' ? 'horizontal' : 'vertical';
    var base =
      'Aresta ' +
      axis +
      ' livre, linha ' +
      (move.r + 1) +
      ', coluna ' +
      (move.c + 1) +
      '.';
    if (closes) {
      return base + ' Fecha uma caixa, soma um ponto e mantém o turno.';
    }
    return base + ' Toque para traçar.';
  }

  function renderBoard() {
    var mount = document.getElementById('board-mount');
    mount.textContent = '';
    var svg = svgEl('svg', {
      viewBox: '0 0 320 320',
      role: 'group',
      'aria-label':
        'Mini-tabuleiro 3 por 3. Arestas tracejadas podem ser jogadas com clique, toque ou teclado.',
      'aria-describedby': 'board-help',
    });
    var defs = svgEl('defs', {});
    var pattern = svgEl('pattern', {
      id: 'bot-hatch',
      patternUnits: 'userSpaceOnUse',
      width: '8',
      height: '8',
      patternTransform: 'rotate(45)',
    });
    pattern.appendChild(
      svgEl('line', {
        x1: '0',
        y1: '0',
        x2: '0',
        y2: '8',
        stroke: 'var(--color-p2)',
        'stroke-width': '3',
        'stroke-opacity': '0.8',
      }),
    );
    defs.appendChild(pattern);
    svg.appendChild(defs);

    var r;
    var c;
    for (r = 0; r < 3; r += 1) {
      for (c = 0; c < 3; c += 1) {
        var owner = state.boxes[r][c];
        if (!owner) continue;
        var x = dot(c) + 10;
        var y = dot(r) + 10;
        var rect = svgEl('rect', {
          x: x,
          y: y,
          width: '62',
          height: '62',
          rx: '10',
          fill: owner === 'p1' ? 'var(--color-p1-tint)' : 'var(--color-p2-tint)',
          stroke: owner === 'p1' ? 'var(--color-p1)' : 'var(--color-p2)',
          'stroke-width': '2',
        });
        svg.appendChild(rect);
        if (owner === 'bot') {
          var hatch = svgEl('rect', {
            x: x,
            y: y,
            width: '62',
            height: '62',
            rx: '10',
            fill: 'url(#bot-hatch)',
          });
          svg.appendChild(hatch);
        }
        var label = svgEl('text', {
          x: dot(c) + 41,
          y: dot(r) + 46,
          'text-anchor': 'middle',
          'font-size': '15',
          'font-weight': '800',
          fill: owner === 'p1' ? 'var(--color-p1)' : 'var(--color-p2)',
          'font-family': 'Plus Jakarta Sans, Inter, sans-serif',
        });
        label.textContent = owner === 'p1' ? '● J1' : '◆ BOT';
        svg.appendChild(label);
      }
    }

    var lines = svgEl('g', {});
    for (r = 0; r < 4; r += 1) {
      for (c = 0; c < 3; c += 1) {
        if (state.h[r][c]) drawLine(lines, { type: 'h', r: r, c: c }, true);
      }
    }
    for (r = 0; r < 3; r += 1) {
      for (c = 0; c < 4; c += 1) {
        if (state.v[r][c]) drawLine(lines, { type: 'v', r: r, c: c }, true);
      }
    }
    availableMoves(state).forEach(function (move) {
      drawLine(lines, move, false);
    });
    svg.appendChild(lines);

    for (r = 0; r < 4; r += 1) {
      for (c = 0; c < 4; c += 1) {
        svg.appendChild(
          svgEl('circle', {
            cx: dot(c),
            cy: dot(r),
            r: '6.5',
            fill: 'var(--line-ink)',
          }),
        );
      }
    }

    var interactive = state.turn === 'p1' && !state.over && !state.lock;
    if (interactive) {
      availableMoves(state)
        .slice()
        .sort(function (a, b) {
          return preview(state, a).captured - preview(state, b).captured;
        })
        .forEach(function (move) {
        var geo = edgeGeometry(move);
        var closes = preview(state, move).captured > 0;
        var hit = svgEl('rect', {
          x: geo.hit.x,
          y: geo.hit.y,
          width: geo.hit.width,
          height: geo.hit.height,
          rx: '8',
          class: closes ? 'edge-hit is-hot' : 'edge-hit',
          role: 'button',
          tabindex: '0',
          'aria-label': edgeLabel(move, closes),
          'data-edge': move.type + '-' + move.r + '-' + move.c,
          'data-closes': closes ? 'true' : 'false',
        });
        hit.addEventListener('click', function () {
          onPlayerMove(move);
        });
        hit.addEventListener('keydown', function (event) {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onPlayerMove(move);
          }
        });
        svg.appendChild(hit);
      });
    }

    mount.appendChild(svg);
    document.getElementById('score-p1').textContent = pad(state.scores.p1);
    document.getElementById('score-bot').textContent = pad(state.scores.bot);
    document.getElementById('turn-p1').hidden = state.turn !== 'p1';
    var turnBot = document.getElementById('turn-bot');
    turnBot.hidden = state.turn !== 'bot';
  }

  function finishIfNeeded() {
    if (!availableMoves(state).length) {
      state.over = true;
      state.turn = null;
    }
  }

  function onPlayerMove(move) {
    if (state.lock || state.over || state.turn !== 'p1') return;
    var captured = applyMove(state, move, 'p1');
    if (captured < 0) return;
    finishIfNeeded();
    if (state.over) {
      setStatus(MSG.done, true);
      renderBoard();
      return;
    }
    if (captured > 0) {
      state.turn = 'p1';
      setStatus(
        captured === 1
          ? MSG.capture
          : 'Boa! Você fechou duas caixas (+2) e ganhou um turno extra! Continue jogando.',
        true,
      );
      renderBoard();
      return;
    }
    state.turn = 'bot';
    state.lock = true;
    renderBoard();
    window.clearTimeout(botTimer);
    botTimer = window.setTimeout(function () {
      runBot();
      state.lock = false;
      finishIfNeeded();
      setStatus(state.over ? MSG.done : MSG.bot, true);
      renderBoard();
    }, motionDelay());
  }

  function resetBoard() {
    window.clearTimeout(botTimer);
    state = createState();
    setStatus(MSG.initial, true);
    renderBoard();
  }

  function initBoard() {
    state = createState();
    renderBoard();
    document.getElementById('reset-board').addEventListener('click', resetBoard);
  }

  initTheme();
  initNav();
  initGallery();
  initBoard();
})();

