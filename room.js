(() => {
  const scene = document.querySelector('#manor-scene');
  const light = document.querySelector('#room-light');
  const dialog = document.querySelector('#room-notebook');
  const note = dialog.querySelector('textarea');
  const status = document.querySelector('#room-note-status');
  const key = 'self-discipline-manor-room-note';
  let saved = '';
  try { saved = localStorage.getItem(key) || ''; } catch {}
  light.addEventListener('click', () => {
    const night = scene.classList.toggle('room-evening');
    light.setAttribute('aria-pressed', String(night));
    light.textContent = night ? '切回日光' : '打开晚灯';
  });
  document.querySelector('#room-write').addEventListener('click', () => {
    note.value = saved;
    status.textContent = '';
    dialog.showModal();
    note.focus();
  });
  dialog.querySelector('[data-save]').addEventListener('click', () => {
    try {
      localStorage.setItem(key, note.value);
      saved = note.value;
      dialog.close();
      document.querySelector('#room-write').textContent = saved ? '翻开手记' : '写手记';
    } catch { status.textContent = '浏览器暂时无法保存，可以先复制文字。'; }
  });
  if (saved) document.querySelector('#room-write').textContent = '翻开手记';
  document.querySelector('#clear-demo').addEventListener('click', () => {
    saved = ''; try { localStorage.removeItem(key); } catch {}
    scene.classList.remove('room-evening');
    light.setAttribute('aria-pressed','false');
    light.textContent = '打开晚灯';
    document.querySelector('#room-write').textContent = '写手记';
  });
})();
