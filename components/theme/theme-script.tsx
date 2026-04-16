export function ThemeScript() {
  const script = `
    (() => {
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = stored || (prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', theme === 'dark');
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
