export const createRipple = (event, element) => {
  const rippleContainer = element.querySelector('.ripple-container');
  if (!rippleContainer) return;

  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';

  rippleContainer.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 900);
};
