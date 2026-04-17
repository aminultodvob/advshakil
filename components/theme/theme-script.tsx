export function ThemeScript() {
  const script = `
    (() => {
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = stored || (prefersDark ? 'dark' : 'light');
      const is_admin = window.location.pathname.startsWith('/admin');
      document.documentElement.classList.toggle('dark', (theme === 'dark') && !is_admin);
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
