(function () {
  var THEME_KEY = 'pontinhos-web-theme';
  var LANG_KEY = 'pontinhos-lang';
  var current = 'pt-BR';

  var PP = {
    'pt-BR': {
      metaTitle: 'Política de Privacidade — Pontinhos (100% Offline e Zero Coleta de Dados) | Regard Games',
      metaDescription: 'O Pontinhos funciona 100% offline no seu aparelho e não coleta, não armazena em servidores externos e não compartilha nenhum dado pessoal. Regard Games — Picos, Piauí, Brasil.',
      ogTitle: 'Política de Privacidade — Pontinhos',
      ogDescription: 'Transparência total: o Pontinhos funciona 100% offline e não coleta, não armazena em servidores externos e não compartilha nenhum dado pessoal.',
      ogLocale: 'pt_BR',
      langAria: 'Selecionar idioma da página',
      themeAria: 'Alternar entre tema claro e escuro',
      brandTagline: 'Estratégia ponto a ponto',
      themeLight: 'Claro',
      themeDark: 'Escuro',
      badge: '100% Offline • Zero Coleta de Dados • LGPD, GDPR & COPPA Compliant',
      title: 'Política de Privacidade — Pontinhos',
      subtitle: 'Transparência total para você jogar com tranquilidade: o Pontinhos funciona 100% offline no seu aparelho e não coleta, não armazena em servidores externos e não compartilha nenhum dado pessoal.',
      appLabel: 'Aplicativo:',
      appValue: 'Pontinhos (com.regard.pontinhos)',
      studioLabel: 'Desenvolvedor / Estúdio:',
      studioValue: 'Regard Games — Picos, Piauí, Brasil',
      dateLabel: 'Data de vigência:',
      dateValue: '25 de outubro de 2026 (America/Fortaleza, BRT / UTC-3)',
      statusLabel: 'Status de Coleta de Dados:',
      statusValue: 'Zero Coleta de Dados Pessoais (100% Offline)',
      s1t: '1. Compromisso de Privacidade em Primeiro Lugar (Resumo Rápido)',
      s1p1: 'O Pontinhos é um jogo clássico de tabuleiro e estratégia desenvolvido pela Regard Games em Picos, Piauí, Brasil. Nossa filosofia de privacidade é simples e absoluta: nós não coletamos, não transmitimos, não armazenamos em servidores externos, não vendemos e não compartilhamos nenhum dado pessoal ou informação do seu dispositivo.',
      s1p2: 'O jogo funciona 100% offline (sem necessidade de conexão com a internet), não exige criação de conta ou login, não exibe anúncios e não utiliza ferramentas externas de rastreamento.',
      s2t: '2. Informações que NÃO Coletamos',
      s2lead: 'Ao baixar e jogar o Pontinhos, garantimos que o aplicativo jamais solicita, acessa ou coleta:',
      s2a: 'Dados de identificação pessoal: nome, endereço de e-mail, número de telefone, documento, endereço físico ou data de nascimento.',
      s2b: 'Dados de localização: localização aproximada (rede) ou precisa (GPS).',
      s2c: 'Arquivos, mídia e sensores privados: fotos, vídeos, contatos da agenda, microfone, câmera ou histórico de navegação.',
      s2d: 'Identificadores de publicidade ou perfilamento: o aplicativo não utiliza identificadores de anúncios nem realiza rastreamento entre aplicativos ou sites.',
      s2e: 'Dados financeiros: o jogo é gratuito, não possui compras internas e não solicita dados de cartão ou pagamento.',
      s3t: '3. Preferências Salvas Apenas no Seu Próprio Aparelho',
      s3lead: 'Para que você tenha uma ótima experiência entre uma partida e outra, o Pontinhos guarda apenas as suas preferências de jogo na memória interna do seu próprio celular ou tablet:',
      s3a: 'Opções de conforto e acessibilidade: se os efeitos sonoros e a vibração estão ativados ou desativados, o tema visual escolhido (Claro, Escuro ou Automático) e o idioma selecionado (Português, Inglês ou Espanhol).',
      s3b: 'Status do tutorial inicial: um lembrete simples de que você já concluiu ou pulou a introdução de como jogar, evitando que ela reapareça toda vez que você abrir o aplicativo.',
      s3c: 'Histórico local de partidas contra o Computador: a quantidade de partidas jogadas, vitórias, derrotas e empates para que você acompanhe suas estatísticas na tela do jogo.',
      s3control: 'Controle total nas suas mãos: todas essas informações permanecem exclusivamente no seu aparelho e nunca são enviadas pela internet. Você pode apagar o histórico de estatísticas a qualquer momento dentro do próprio jogo (Configurações → Zerar estatísticas) ou limpar os dados do aplicativo nas configurações do seu sistema Android ou iOS.',
      s4t: '4. Uso 100% Offline e Ausência de Serviços de Terceiros',
      s4p: 'O Pontinhos não se conecta a servidores próprios nem incorpora serviços externos de análise de dados, redes de publicidade, login social ou telemetria na nuvem. Todas as partidas — tanto contra a Inteligência Artificial do Computador quanto no modo para 2 Jogadores Local — acontecem integralmente dentro do seu aparelho.',
      s5t: '5. Segurança e Privacidade de Crianças e Famílias',
      s5p: 'Por ser um jogo livre de violência, sem coleta de dados pessoais, sem chat online, sem links de compras e sem publicidade comportamental, o Pontinhos é seguro para jogadores de todas as idades e atende integralmente às normas de proteção infantil e familiar (incluindo o ECA e a LGPD no Brasil, a COPPA nos Estados Unidos e o GDPR na Europa).',
      s6t: '6. Seus Direitos (LGPD, GDPR e CCPA)',
      s6p: 'Como a Regard Games não coleta nem mantém nenhum dado pessoal seu em servidores ou bancos de dados, não há registros externos vinculados a você para consultar, corrigir, portar ou excluir em nossos sistemas. Todo o controle sobre as preferências locais do jogo está diretamente no seu próprio aparelho.',
      s7t: '7. Atualizações desta Política',
      s7p: 'Caso o Pontinhos receba novos recursos no futuro, esta Política de Privacidade será atualizada nesta página pública com a nova data de revisão no topo. Nosso compromisso com a transparência e o respeito ao jogador permanecerá sempre inalterado.',
      s8t: '8. Contato e Identificação do Estúdio',
      s8studioL: 'Estúdio:',
      s8studio: 'Regard Games',
      s8cityL: 'Cidade / Origem:',
      s8city: 'Picos, Piauí, Brasil (America/Fortaleza, UTC-3)',
      s8siteL: 'Página Oficial:',
      s8supportL: 'Canal de Suporte e Feedback:',
      back: 'Voltar para a página do Pontinhos',
      footer: '© 2026 Regard Games — Picos, Piauí, Brasil. 100% Offline • Zero Coleta de Dados • Sem Anúncios.'
    },
    en: {
      metaTitle: 'Privacy Policy — Pontinhos (100% Offline & Zero Data Collection) | Regard Games',
      metaDescription: 'Pontinhos runs 100% offline on your device and does not collect, store on external servers, or share any personal data. Regard Games — Picos, Piauí, Brazil.',
      ogTitle: 'Privacy Policy — Pontinhos',
      ogDescription: 'Complete transparency: Pontinhos runs 100% offline and does not collect, store on external servers, or share any personal data.',
      ogLocale: 'en_US',
      langAria: 'Select page language',
      themeAria: 'Toggle between light and dark theme',
      brandTagline: 'Dot-by-dot strategy',
      themeLight: 'Light',
      themeDark: 'Dark',
      badge: '100% Offline • Zero Data Collection • GDPR, CCPA, LGPD & COPPA Compliant',
      title: 'Privacy Policy — Pontinhos',
      subtitle: 'Complete transparency so you can play with peace of mind: Pontinhos runs 100% offline on your device and does not collect, store on external servers, or share any personal data.',
      appLabel: 'Application:',
      appValue: 'Pontinhos (com.regard.pontinhos)',
      studioLabel: 'Developer / Studio:',
      studioValue: 'Regard Games — Picos, Piauí, Brazil',
      dateLabel: 'Effective Date:',
      dateValue: 'October 25, 2026 (America/Fortaleza, UTC-3)',
      statusLabel: 'Data Collection Status:',
      statusValue: 'Zero Personal Data Collection (100% Offline)',
      s1t: '1. Privacy-First Commitment (Quick Summary)',
      s1p1: 'Pontinhos is a classic dot-to-dot strategy board game created by Regard Games in Picos, Piauí, Brazil. Our privacy philosophy is simple and absolute: we do not collect, transmit, store on external servers, sell, or share any personal data or device information.',
      s1p2: 'The game works 100% offline (no internet connection required), asks for no account or login, displays no advertisements, and uses no external tracking tools.',
      s2t: '2. Information We Do NOT Collect',
      s2lead: 'When you download and play Pontinhos, we guarantee that the application never requests, accesses, or collects:',
      s2a: 'Personal identifiers: name, email address, phone number, government ID, physical address, or date of birth.',
      s2b: 'Location data: approximate (network) or precise (GPS) location.',
      s2c: 'Private files, media, or sensors: photos, videos, contacts, microphone, camera, or browsing history.',
      s2d: 'Advertising or profiling identifiers: the app does not use advertising IDs and never tracks you across apps or websites.',
      s2e: 'Financial data: the game is free, has no in-app purchases, and never asks for payment or card details.',
      s3t: '3. Preferences Saved Only on Your Own Device',
      s3lead: "To provide a smooth experience from one match to the next, Pontinhos saves only your game preferences in your phone or tablet's local storage:",
      s3a: 'Comfort and accessibility options: whether sound effects and vibration are turned on or off, your chosen visual theme (Light, Dark, or Automatic), and your selected language (Portuguese, English, or Spanish).',
      s3b: 'Initial tutorial status: a simple reminder that you already completed or skipped the how-to-play introduction so it does not appear every time you open the app.',
      s3c: 'Local match history against the Computer: your total matches played, wins, losses, and draws so you can track your statistics on the in-game screen.',
      s3control: 'Full control in your hands: all of this information stays exclusively on your device and is never sent over the internet. You can clear your statistics history anytime right inside the game (Settings → Reset statistics) or clear the app storage in your Android or iOS system settings.',
      s4t: '4. 100% Offline Operation and Zero Third-Party Trackers',
      s4p: "Pontinhos does not connect to external servers and embeds no third-party analytics SDKs, advertising networks, social logins, or cloud telemetry. Every match — whether against the Computer's Artificial Intelligence or in 2-Player Local mode — runs entirely on your device.",
      s5t: "5. Children's and Family Safety",
      s5p: 'Because Pontinhos is free of violence, collects no personal data, includes no online chat or purchase links, and shows no behavioral advertising, it is safe for players of all ages and fully complies with child and family privacy regulations worldwide (including COPPA in the United States, GDPR in Europe, and LGPD/ECA in Brazil).',
      s6t: '6. Your Privacy Rights (GDPR, CCPA and LGPD)',
      s6p: 'Because Regard Games collects and holds zero personal data on external servers or databases, there are no external records linked to you to access, rectify, export, or delete on our end. You have direct, immediate control over all local game preferences right on your device.',
      s7t: '7. Changes to This Privacy Policy',
      s7p: 'Should Pontinhos introduce new features in the future, this Privacy Policy will be updated on this public page with a revised effective date at the top. Our commitment to player privacy and transparency will always remain unchanged.',
      s8t: '8. Studio Contact and Identification',
      s8studioL: 'Studio:',
      s8studio: 'Regard Games',
      s8cityL: 'Location / Origin:',
      s8city: 'Picos, Piauí, Brazil (America/Fortaleza, UTC-3)',
      s8siteL: 'Official Website:',
      s8supportL: 'Support and Feedback Channel:',
      back: 'Back to the Pontinhos page',
      footer: '© 2026 Regard Games — Picos, Piauí, Brazil. 100% Offline • Zero Data Collection • No Ads.'
    },
    es: {
      metaTitle: 'Política de Privacidad — Pontinhos (100 % sin conexión y Cero recopilación de datos) | Regard Games',
      metaDescription: 'Pontinhos funciona 100 % sin conexión en tu dispositivo y no recopila, no almacena en servidores externos ni comparte ningún dato personal. Regard Games — Picos, Piauí, Brasil.',
      ogTitle: 'Política de Privacidad — Pontinhos',
      ogDescription: 'Transparencia total: Pontinhos funciona 100 % sin conexión y no recopila, no almacena en servidores externos ni comparte ningún dato personal.',
      ogLocale: 'es_ES',
      langAria: 'Seleccionar idioma de la página',
      themeAria: 'Alternar entre tema claro y oscuro',
      brandTagline: 'Estrategia punto a punto',
      themeLight: 'Claro',
      themeDark: 'Oscuro',
      badge: '100 % sin conexión • Cero recopilación de datos • Cumple con RGPD, CCPA, LGPD y COPPA',
      title: 'Política de Privacidad — Pontinhos',
      subtitle: 'Transparencia total para que juegues con tranquilidad: Pontinhos funciona 100 % sin conexión en tu dispositivo y no recopila, no almacena en servidores externos ni comparte ningún dato personal.',
      appLabel: 'Aplicación:',
      appValue: 'Pontinhos (com.regard.pontinhos)',
      studioLabel: 'Desarrollador / Estudio:',
      studioValue: 'Regard Games — Picos, Piauí, Brasil',
      dateLabel: 'Fecha de entrada en vigor:',
      dateValue: '25 de octubre de 2026 (America/Fortaleza, UTC-3)',
      statusLabel: 'Estado de recopilación de datos:',
      statusValue: 'Cero recopilación de datos personales (100 % sin conexión)',
      s1t: '1. Compromiso de Privacidad ante Todo (Resumen Rápido)',
      s1p1: 'Pontinhos es un clásico juego de mesa y estrategia punto a punto desarrollado por Regard Games en Picos, Piauí, Brasil. Nuestra filosofía de privacidad es simple y absoluta: no recopilamos, no transmitimos, no almacenamos en servidores externos, no vendemos ni compartimos ningún dato personal ni información de tu dispositivo.',
      s1p2: 'El juego funciona 100 % sin conexión a internet, no requiere crear una cuenta ni iniciar sesión, no muestra anuncios y no utiliza herramientas externas de rastreo.',
      s2t: '2. Información que NO Recopilamos',
      s2lead: 'Al descargar y jugar a Pontinhos, garantizamos que la aplicación jamás solicita, accede ni recopila:',
      s2a: 'Datos de identificación personal: nombre, correo electrónico, número de teléfono, documento de identidad, dirección física o fecha de nacimiento.',
      s2b: 'Datos de ubicación: ubicación aproximada (red) o precisa (GPS).',
      s2c: 'Archivos, contenido multimedia o sensores privados: fotos, videos, contactos de la agenda, micrófono, cámara o historial de navegación.',
      s2d: 'Identificadores de publicidad o creación de perfiles: la aplicación no utiliza identificadores publicitarios ni realiza seguimiento entre aplicaciones o sitios web.',
      s2e: 'Datos financieros: el juego es gratuito, no incluye compras integradas y no solicita datos de tarjetas ni pagos.',
      s3t: '3. Preferencias Guardadas Solo en Tu Propio Dispositivo',
      s3lead: 'Para ofrecerte una experiencia cómoda entre una partida y otra, Pontinhos guarda únicamente tus preferencias de juego en la memoria interna de tu propio celular o tablet:',
      s3a: 'Opciones de confort y accesibilidad: si los efectos de sonido y la vibración están activados o desactivados, el tema visual elegido (Claro, Oscuro o Automático) y el idioma seleccionado (Portugués, Inglés o Español).',
      s3b: 'Estado del tutorial inicial: un recordatorio simple de que ya completaste u omitiste la introducción de cómo jugar, para que no vuelva a aparecer cada vez que abras la aplicación.',
      s3c: 'Historial local de partidas contra la Computadora: la cantidad de partidas jugadas, victorias, derrotas y empates para que consultes tus estadísticas en la pantalla del juego.',
      s3control: 'Control total en tus manos: toda esta información permanece exclusivamente en tu dispositivo y nunca se envía por internet. Puedes borrar el historial de estadísticas en cualquier momento dentro del propio juego (Ajustes → Reiniciar estadísticas) o borrar los datos de la aplicación desde los ajustes de tu sistema Android o iOS.',
      s4t: '4. Funcionamiento 100 % sin Conexión y Ausencia de Servicios de Terceros',
      s4p: 'Pontinhos no se conecta a servidores externos ni incorpora servicios de análisis de terceros, redes publicitarias, inicios de sesión sociales ni telemetría en la nube. Todas las partidas — tanto contra la Inteligencia Artificial de la Computadora como en el modo para 2 Jugadores Local — se ejecutan íntegramente en tu dispositivo.',
      s5t: '5. Seguridad y Privacidad para Niños y Familias',
      s5p: 'Al ser un juego libre de violencia, sin recopilación de datos personales, sin chat en línea, sin enlaces de compra y sin publicidad conductual, Pontinhos es seguro para jugadores de todas las edades y cumple íntegramente con las normativas internacionales de protección infantil y familiar (incluyendo RGPD en Europa, COPPA en Estados Unidos y LGPD/ECA en Brasil).',
      s6t: '6. Tus Derechos de Privacidad (RGPD, CCPA y LGPD)',
      s6p: 'Dado que Regard Games no recopila ni conserva ningún dato personal tuyo en servidores o bases de datos externas, no existen registros externos vinculados a ti para consultar, rectificar, exportar o eliminar en nuestros sistemas. Tienes el control directo e inmediato sobre todas las preferencias locales del juego en tu propio dispositivo.',
      s7t: '7. Actualizaciones de Esta Política',
      s7p: 'En caso de que Pontinhos incorpore nuevas funciones en el futuro, esta Política de Privacidad se actualizará en esta página pública indicando la nueva fecha de revisión en la parte superior. Nuestro compromiso con la privacidad y la transparencia hacia el jugador permanecerá siempre intacto.',
      s8t: '8. Contacto e Identificación del Estudio',
      s8studioL: 'Estudio:',
      s8studio: 'Regard Games',
      s8cityL: 'Ciudad / Origen:',
      s8city: 'Picos, Piauí, Brasil (America/Fortaleza, UTC-3)',
      s8siteL: 'Sitio Web Oficial:',
      s8supportL: 'Canal de Soporte y Comentarios:',
      back: 'Volver a la página de Pontinhos',
      footer: '© 2026 Regard Games — Picos, Piauí, Brasil. 100 % sin conexión • Cero recopilación de datos • Sin anuncios.'
    }
  };

  function t(key) {
    var pack = PP[current] || PP['pt-BR'];
    return Object.prototype.hasOwnProperty.call(pack, key) ? pack[key] : PP['pt-BR'][key] || '';
  }

  function detectLang() {
    var query = '';
    try {
      query = new URLSearchParams(window.location.search).get('lang') || '';
    } catch (err) {
      query = '';
    }
    var normalized = String(query).replace('_', '-').toLowerCase();
    if (normalized === 'pt' || normalized === 'pt-br') return 'pt-BR';
    if (normalized === 'en') return 'en';
    if (normalized === 'es') return 'es';
    try {
      var stored = localStorage.getItem(LANG_KEY);
      if (stored === 'pt-BR' || stored === 'en' || stored === 'es') return stored;
    } catch (err) {}
    var nav = (navigator.language || '').toLowerCase();
    if (nav.indexOf('es') === 0) return 'es';
    if (nav.indexOf('en') === 0) return 'en';
    return 'pt-BR';
  }

  function setMeta(attr, name, value) {
    var node = document.querySelector('meta[' + attr + '="' + name + '"]');
    if (node) node.setAttribute('content', value);
  }

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function syncTheme(theme) {
    var button = document.getElementById('theme-toggle');
    if (!button) return;
    var dark = theme === 'dark';
    var label = button.querySelector('.theme-label');
    if (label) label.textContent = dark ? t('themeDark') : t('themeLight');
    button.setAttribute('aria-pressed', dark ? 'true' : 'false');
    var logo = document.querySelector('.brand-logo');
    if (logo) {
      logo.setAttribute('src', dark ? 'store-assets/logo-mark-dark.svg' : 'store-assets/logo-mark-light.svg');
    }
  }

  function applyLang(lang, persist) {
    if (!PP[lang]) lang = 'pt-BR';
    current = lang;
    if (persist) {
      try { localStorage.setItem(LANG_KEY, lang); } catch (err) {}
      try {
        var url = new URL(window.location.href);
        url.searchParams.set('lang', lang === 'pt-BR' ? 'pt' : lang);
        window.history.replaceState(null, '', url);
      } catch (err) {}
    }
    document.documentElement.lang = lang;
    document.title = t('metaTitle');
    setMeta('name', 'description', t('metaDescription'));
    setMeta('property', 'og:title', t('ogTitle'));
    setMeta('property', 'og:description', t('ogDescription'));
    setMeta('property', 'og:locale', t('ogLocale'));
    setMeta('name', 'twitter:title', t('ogTitle'));
    setMeta('name', 'twitter:description', t('ogDescription'));
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
    document.querySelectorAll('.lang-switch [data-lang]').forEach(function (button) {
      button.setAttribute('aria-pressed', button.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
    var home = document.querySelector('a[href^="index.html"], a.brand');
    document.querySelectorAll('a[href^="index.html"]').forEach(function (anchor) {
      var code = lang === 'pt-BR' ? 'pt' : lang;
      anchor.setAttribute('href', 'index.html?lang=' + code);
    });
    if (home && home.classList.contains('brand')) home.setAttribute('href', 'index.html?lang=' + (lang === 'pt-BR' ? 'pt' : lang));
    syncTheme(currentTheme());
  }

  applyLang(detectLang(), false);
  document.querySelectorAll('.lang-switch [data-lang]').forEach(function (button) {
    button.addEventListener('click', function () {
      applyLang(button.getAttribute('data-lang'), true);
    });
  });
  var themeButton = document.getElementById('theme-toggle');
  if (themeButton) {
    themeButton.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      if (next === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
      else document.documentElement.removeAttribute('data-theme');
      try { localStorage.setItem(THEME_KEY, next); } catch (err) {}
      syncTheme(next);
    });
  }
  var media = window.matchMedia('(prefers-color-scheme: dark)');
  if (typeof media.addEventListener === 'function') {
    media.addEventListener('change', function () {
      var stored = null;
      try { stored = localStorage.getItem(THEME_KEY); } catch (err) { stored = 'locked'; }
      if (stored === 'light' || stored === 'dark') return;
      if (media.matches) document.documentElement.setAttribute('data-theme', 'dark');
      else document.documentElement.removeAttribute('data-theme');
      syncTheme(currentTheme());
    });
  }
})();
