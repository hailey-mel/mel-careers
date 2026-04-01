// Mel Careers

// 모바일 메뉴
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.mobile-menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => menu.classList.remove('open'))
  );
}

// 직군 필터
const chips = document.querySelectorAll('.chip');
const rows = document.querySelectorAll('.pos-row');
const empty = document.getElementById('emptyState');
const countEl = document.getElementById('visibleCount');

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const f = chip.dataset.filter;
    let count = 0;
    rows.forEach(row => {
      const show = f === 'all' || row.dataset.team === f;
      row.style.display = show ? 'grid' : 'none';
      if (show) count++;
    });
    if (empty) empty.style.display = count === 0 ? 'block' : 'none';
    if (countEl) countEl.textContent = count;
  });
});

// 포지션 클릭 → 상세 펼치기
const detailMap = {
  'ML Engineer': 'detail-ml',
  'Marketing Manager': 'detail-marketing'
};

rows.forEach(row => {
  row.addEventListener('click', (e) => {
    // 지원하기 링크 클릭은 무시 (기본 동작 유지)
    if (e.target.classList.contains('pos-link')) return;

    const position = row.dataset.position;
    const detailId = detailMap[position];
    if (!detailId) return;

    const detail = document.getElementById(detailId);
    if (!detail) return;

    // 토글
    const isOpen = detail.classList.contains('open');

    // 모든 상세 닫기
    document.querySelectorAll('.detail-section').forEach(s => s.classList.remove('open'));

    if (!isOpen) {
      detail.classList.add('open');
      // 스크롤
      setTimeout(() => {
        detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  });
});

// "지원하기 →" 링크 또는 "이 포지션에 지원하기" 버튼 클릭 시 포지션 자동 선택
document.querySelectorAll('[data-target]').forEach(el => {
  el.addEventListener('click', () => {
    const target = el.dataset.target;
    const select = document.getElementById('position');
    if (select) {
      for (const opt of select.options) {
        if (opt.value === target) { select.value = target; break; }
      }
    }
  });
});

// 파일 업로드
const fileInput = document.getElementById('resume');
const fileNameEl = document.getElementById('fileName');
const fileUpload = document.getElementById('fileUpload');

if (fileInput) {
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      fileNameEl.textContent = fileInput.files[0].name;
      fileNameEl.classList.add('show');
    } else {
      fileNameEl.classList.remove('show');
    }
  });
}
if (fileUpload && fileInput) {
  ['dragenter', 'dragover'].forEach(e =>
    fileUpload.addEventListener(e, ev => { ev.preventDefault(); ev.stopPropagation(); fileUpload.classList.add('dragover'); })
  );
  fileUpload.addEventListener('dragleave', () => fileUpload.classList.remove('dragover'));
  fileUpload.addEventListener('drop', ev => {
    ev.preventDefault(); ev.stopPropagation();
    fileUpload.classList.remove('dragover');
    const files = ev.dataTransfer.files;
    if (files.length > 0) {
      fileInput.files = files;
      fileNameEl.textContent = files[0].name;
      fileNameEl.classList.add('show');
    }
  });
}

// Formsubmit: 제출 후 돌아오기
const nextInput = document.querySelector('input[name="_next"]');
if (nextInput) nextInput.value = window.location.href.split('?')[0] + '?done=1#apply';

// 제출 완료
if (window.location.search.includes('done=1')) {
  const form = document.querySelector('.apply-form');
  if (form) {
    form.innerHTML = '<div style="text-align:center;padding:36px 0;"><p style="font-size:1.1rem;font-weight:700;margin-bottom:8px;">지원서가 제출되었습니다</p><p style="color:#999;font-size:0.88rem;">검토 후 연락드리겠습니다. 감사합니다.</p></div>';
  }
}
