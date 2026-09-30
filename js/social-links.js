document.addEventListener('DOMContentLoaded', async () => {
  const buttons = [...document.querySelectorAll('[data-social]')];
  if (!buttons.length) return;
  try {
    const response = await fetch('/api/social-links', { cache:'no-store' });
    if (!response.ok) return;
    const { socialLinks = {} } = await response.json();
    for (const button of buttons) {
      const value = socialLinks[button.dataset.social];
      if (!value) continue;
      const url = new URL(value);
      if (!['http:','https:'].includes(url.protocol)) continue;
      button.href = url.href;
      button.target = '_blank';
      button.rel = 'noopener noreferrer';
      button.removeAttribute('aria-disabled');
    }
  } catch (_) { /* Enlaces pendientes o servidor temporalmente inaccesible. */ }
});
