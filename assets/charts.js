(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  var tooltipBase = {
    appendToBody: true,
    backgroundColor: ink,
    borderWidth: 0,
    textStyle: { color: '#FBF5EB', fontSize: 12 }
  };

  // --- Chart: 技能七维雷达 ---
  var radarEl = document.getElementById('chart-radar');
  if (radarEl && window.echarts) {
    var radar = echarts.init(radarEl, null, { renderer: 'svg' });
    radar.setOption({
      animation: false,
      tooltip: tooltipBase,
      radar: {
        indicator: [
          { name: 'SQL / 数据提取', max: 100 },
          { name: 'Python', max: 100 },
          { name: '数据可视化', max: 100 },
          { name: '统计建模', max: 100 },
          { name: 'AI 智能应用', max: 100 },
          { name: '业务理解', max: 100 },
          { name: '项目管理', max: 100 }
        ],
        radius: '66%',
        center: ['50%', '52%'],
        axisName: { color: ink, fontSize: 12 },
        splitArea: { areaStyle: { color: ['rgba(217,154,61,0.04)', 'rgba(217,154,61,0.08)'] } },
        splitLine: { lineStyle: { color: rule } },
        axisLine: { lineStyle: { color: rule } }
      },
      series: [{
        type: 'radar',
        data: [{
          value: [92, 88, 86, 85, 86, 90, 88],
          name: '技能熟练度',
          areaStyle: { color: 'rgba(192,90,51,0.22)' },
          lineStyle: { color: accent, width: 2.5 },
          itemStyle: { color: accent },
          symbolSize: 6
        }]
      }]
    });
    window.addEventListener('resize', function () { radar.resize(); });
  }

  // --- 兴趣爱好：点击卡片切换展示图 ---
  var hobbyData = {
    guitar: {
      img: 'assets/guitar-photo.jpg',
      quote: '「白天和数据打交道，<br>晚上和<i>六弦琴</i>聊聊天。」',
      sub: '吉他是我坚持最久的爱好。从艺术团团长到自媒体创作者，音乐和表达一直是我的生活底色。'
    },
    xhs: {
      img: 'assets/xiaohongshu.jpg',
      quote: '「<i>500 万+</i> 次阅读，<br>创作是我的第二事业。」',
      sub: '小红书创作类自媒体博主「奶昔嘎嘎」，累计阅读量破 500 万，目前有转向 AI 视频类的想法，探索内容创作与 AI 的化学反应。'
    }
  };
  var hobbyImg = document.getElementById('hobby-img');
  var hobbyQuote = document.getElementById('hobby-quote');
  var hobbySub = document.getElementById('hobby-quote-sub');
  var switchCards = document.querySelectorAll('.hobby-card.switchable');
  switchCards.forEach(function (card) {
    card.addEventListener('click', function () {
      var key = card.getAttribute('data-hobby');
      var data = hobbyData[key];
      if (!data || card.classList.contains('active')) return;
      switchCards.forEach(function (c) { c.classList.remove('active'); });
      card.classList.add('active');
      if (hobbyImg) {
        hobbyImg.style.opacity = '0';
        var pre = new Image();
        pre.onload = function () {
          hobbyImg.src = data.img;
          hobbyImg.style.opacity = '1';
        };
        pre.src = data.img;
      }
      if (hobbyQuote) hobbyQuote.innerHTML = data.quote;
      if (hobbySub) hobbySub.textContent = data.sub;
    });
  });

  // --- 滚动渐显动画 ---
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }
})();
