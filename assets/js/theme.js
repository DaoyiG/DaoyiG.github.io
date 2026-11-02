// Light/dark theme, adapted from al-folio's theme.js and dark_mode.js (MIT).
// Loaded in <head> so the stored theme is applied before the first paint.

let setTheme = (theme) => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => document.documentElement.classList.remove("transition"), 500);
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  try { localStorage.setItem("theme", theme); } catch (e) {}
};

let toggleTheme = () => {
  setTheme(document.documentElement.getAttribute("data-theme") == "dark" ? "light" : "dark");
};

(() => {
  let theme = null;
  try { theme = localStorage.getItem("theme"); } catch (e) {}
  if ((theme == null || theme == "null") && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    theme = "dark";
  }
  setTheme(theme);
})();

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("light-toggle").addEventListener("click", toggleTheme);

  // "Abs" buttons open the one-sentence summary below an entry.
  document.querySelectorAll("a.abstract").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      btn.closest("li").querySelector(".abstract.hidden").classList.toggle("open");
    });
  });

  // Hover previews: play the video only while the pointer is over its entry.
  document.querySelectorAll(".publications ol.bibliography li").forEach((li) => {
    const video = li.querySelector("video.on-hover");
    if (!video) return;
    li.addEventListener("mouseenter", () => { video.play().catch(() => {}); });
    li.addEventListener("mouseleave", () => { video.pause(); video.currentTime = 0; });
  });
});
