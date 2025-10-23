document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle');
  const body = document.body;

  // Проверяем сохраненную тему в localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.classList.add(savedTheme);

  toggleButton.textContent = savedTheme === 'dark' ? 'Светлая тема' : 'Темная тема';

  toggleButton.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
      body.classList.replace('dark', 'light');
      toggleButton.textContent = 'Темная тема';
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.replace('light', 'dark');
      toggleButton.textContent = 'Светлая тема';
      localStorage.setItem('theme', 'dark');
    }
  });
});