(function () {
  'use strict';

  var machines = [
    { id: 'm01', label: 'M01 娃娃機' },
    { id: 'm02', label: 'M02 打地鼠' },
    { id: 'm03', label: 'M03 彈珠台' },
    { id: 'm04', label: 'M04 扭蛋機' },
    { id: 'm05', label: 'M05 BubbleCha' },
    { id: 'm06', label: 'M06 搖馬' },
    { id: 'm07', label: 'M07 A格子機' },
    { id: 'm08', label: 'M08 B格子機' },
    { id: 'm09', label: 'M09 格子飯店' },
    { id: 'm10', label: 'M10 格子辦公' },
    { id: 'm11', label: 'M11 一番賞' },
    { id: 'm12', label: 'M12 兌幣機' },
  ];

  var filename = location.pathname.split('/').pop() || 'index.html';
  var page = filename.replace('.html', '') || 'index';
  var isMachine = /^m\d{2}$/.test(page);

  /* ── Styles ──────────────────────────────────────── */
  var style = document.createElement('style');
  style.textContent = [
    'body{padding-bottom:60px!important}',

    /* Bottom tab bar */
    '.bnav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:480px;',
    'background:#fff;border-top:1px solid #e5e7eb;display:flex;z-index:100;',
    'box-shadow:0 -1px 8px rgba(0,0,0,.07)}',
    '.bnav a{flex:1;display:flex;flex-direction:column;align-items:center;',
    'padding:7px 2px 5px;text-decoration:none;color:#9ca3af;font-size:.6rem;',
    'font-weight:700;gap:1px;-webkit-tap-highlight-color:transparent}',
    '.bnav .ni{font-size:1.15rem;line-height:1.3}',
    '.bnav a.on{color:#1d4ed8}',
    '.bnav a.sos{color:#dc2626}',

    /* Machine prev/next bar */
    isMachine ? [
      'body{padding-bottom:96px!important}',
      '.mnav{position:fixed;bottom:56px;left:50%;transform:translateX(-50%);',
      'width:100%;max-width:480px;background:#1e293b;display:flex;',
      'justify-content:space-between;z-index:99}',
      '.mnav a{color:#94a3b8;text-decoration:none;padding:8px 14px;',
      'font-size:.75rem;font-weight:700;-webkit-tap-highlight-color:transparent}',
      '.mnav a:active{background:rgba(255,255,255,.1)}',
    ].join('') : '',

    /* Today banner */
    '.tbanner{display:block;text-decoration:none;border-radius:12px;',
    'margin:0 12px 8px;padding:13px 16px}',
    '.tbanner.tb-blue{background:#1d4ed8;color:#fff}',
    '.tbanner.tb-green{background:#059669;color:#fff}',
    '.tbanner .td{font-size:.75rem;font-weight:700;opacity:.8;margin-bottom:3px}',
    '.tbanner .tn{font-size:1rem;font-weight:900;line-height:1.35}',
    '.tbanner .ta{font-size:.72rem;opacity:.7;margin-top:5px}',
  ].join('');
  document.head.appendChild(style);

  /* ── Bottom Tab Bar ──────────────────────────────── */
  var bnav = document.createElement('nav');
  bnav.className = 'bnav';
  [
    { href: 'index.html',           icon: '🏠', label: '首頁',   id: 'index'    },
    { href: 'index.html#machines',  icon: '🎮', label: '機台',   id: '_machine' },
    { href: 'schedule.html',        icon: '📅', label: '今日',   id: 'schedule' },
    { href: 'pitch.html',           icon: '💬', label: '話術',   id: 'pitch'    },
    { href: 'emergency.html',       icon: '🚨', label: '緊急',   id: 'emergency', sos: true },
  ].forEach(function (t) {
    var a = document.createElement('a');
    a.href = t.href;
    a.innerHTML = '<span class="ni">' + t.icon + '</span>' + t.label;
    if (t.sos) a.classList.add('sos');
    var isActive = (page === t.id) || (t.id === '_machine' && isMachine);
    if (isActive) a.classList.add('on');
    bnav.appendChild(a);
  });
  document.body.appendChild(bnav);

  /* ── Machine Prev / Next ─────────────────────────── */
  if (isMachine) {
    var mi = machines.findIndex(function (m) { return m.id === page; });
    if (mi !== -1) {
      var prev = machines[(mi - 1 + machines.length) % machines.length];
      var next = machines[(mi + 1) % machines.length];
      var mnav = document.createElement('div');
      mnav.className = 'mnav';
      mnav.innerHTML =
        '<a href="' + prev.id + '.html">← ' + prev.label + '</a>' +
        '<a href="' + next.id + '.html">' + next.label + ' →</a>';
      document.body.insertBefore(mnav, bnav);
    }
  }

  /* ── Today Banner (index only) ───────────────────── */
  if (page === 'index') {
    var now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Taipei' }));
    var mo = now.getMonth() + 1;
    var dy = now.getDate();
    var days = {
      23: { cls: 'tb-blue',  date: '4/23（三）展覽第一天', note: '穿公司服・早上先了解所有設備', cta: '查看今日工作 →' },
      24: { cls: 'tb-blue',  date: '4/24（四）展覽第二天', note: '穿公司服・教學解說試玩',       cta: '查看今日工作 →' },
      25: { cls: 'tb-green', date: '4/25（五）展覽最後一天', note: '便服・逛展蒐集・15:00 撤場', cta: '查看今日工作 →' },
    };
    if (mo === 4 && days[dy]) {
      var s = days[dy];
      var banner = document.createElement('a');
      banner.href = 'schedule.html';
      banner.className = 'tbanner ' + s.cls;
      banner.innerHTML =
        '<div class="td">今天 ' + s.date + '</div>' +
        '<div class="tn">' + s.note + '</div>' +
        '<div class="ta">' + s.cta + '</div>';
      var anchor = document.querySelector('.quick-nav') || document.querySelector('.section');
      if (anchor) anchor.parentNode.insertBefore(banner, anchor);
    }
  }

})();
