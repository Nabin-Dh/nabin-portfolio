export function ThemeScript() {
  const script = `
(function(){
  try {
    var stored = null;
    try { stored = localStorage.getItem("theme"); } catch (e) {}
    var theme = "light";
    if (stored === "light" || stored === "dark") {
      theme = stored;
    } else {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    var root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.style.colorScheme = "dark";
  }
})();
`;
  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: static, trusted inline theme script (no dynamic input)
    <script dangerouslySetInnerHTML={{ __html: script }} />
  );
}
