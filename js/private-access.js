function initPrivateAccess() {
  const logo = document.querySelector('.logo-brand');
  const dialog = document.getElementById('privateCodeDialog');
  const form = document.getElementById('privateCodeForm');
  const input = document.getElementById('privateCodeInput');
  const error = document.getElementById('privateCodeError');
  const close = document.getElementById('privateCodeClose');
  if (!logo || !dialog || !form || !input || !error || !close) return;

  let taps = 0;
  let lastTap = 0;
  logo.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    const now = Date.now();
    taps = now - lastTap < 2800 ? taps + 1 : 1;
    lastTap = now;
    if (taps < 4) {
      if (taps === 1 && window.location.hash !== '#inicio') window.location.hash = '#inicio';
      return;
    }
    taps = 0;
    error.textContent = '';
    dialog.showModal();
    input.focus();
  }, true);

  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    form.reset();
    error.textContent = '';
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    error.textContent = '';
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ password: input.value })
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        error.textContent = data.error || 'No se pudo validar el código. Compruebe que el servidor FITROP esté activo.';
        input.select();
        return;
      }
      window.location.assign('gestion-puestos.html');
    } catch (_) {
      error.textContent = 'No se pudo conectar con el servidor FITROP. Actualice la página y vuelva a intentar.';
    } finally {
      submit.disabled = false;
    }
  });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPrivateAccess, { once:true });
else initPrivateAccess();
