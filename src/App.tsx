import { Icon } from "@iconify/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { DISCORD_LINK, QQ_LINK, contributors, copyByLang, tournaments, type Lang } from "./data";

type ThemeMode = "system" | "dark" | "light";

type DownloadInfo = {
  github: string;
  proxy1: string;
  proxy2: string;
  proxy3: string;
};

const fallbackDownload =
  "https://github.com/plfjy/neo-bpsys-wpf/releases/latest/download/neo-bpsys-wpf_Installer.exe";

const langItems: Array<{ value: Lang; label: string }> = [
  { value: "zh", label: "中文" },
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
];

function detectLangFromLocale(): Lang {
  if (typeof navigator === "undefined") return "zh";
  const locales = [...(navigator.languages || []), navigator.language].filter(Boolean);
  for (const locale of locales) {
    const lower = locale.toLowerCase();
    if (lower.startsWith("ja")) return "ja";
    if (lower.startsWith("en")) return "en";
    if (lower.startsWith("zh")) return "zh";
  }
  return "zh";
}

const nextThemeMode: Record<ThemeMode, ThemeMode> = {
  light: "dark",
  dark: "system",
  system: "light",
};

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("neo-lang");
    if (saved === "zh" || saved === "en" || saved === "ja") return saved;
    return detectLangFromLocale();
  });
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    (localStorage.getItem("neo-theme") as ThemeMode) ?? "system"
  );
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)").matches : true
  );
  const [langOpen, setLangOpen] = useState(false);
  const [isWindows, setIsWindows] = useState(true);
  const [versionText, setVersionText] = useState(copyByLang.zh.hero.loading);
  const [githubDisabled, setGithubDisabled] = useState(false);
  const [downloadLinks, setDownloadLinks] = useState<DownloadInfo>({
    github: fallbackDownload,
    proxy1: fallbackDownload,
    proxy2: fallbackDownload,
    proxy3: fallbackDownload,
  });

  const langComboRef = useRef<HTMLDivElement | null>(null);
  const userScrollRef = useRef<HTMLDivElement | null>(null);

  const resolvedTheme = themeMode === "system" ? (systemPrefersDark ? "dark" : "light") : themeMode;
  const copy = copyByLang[lang];
  const isZh = lang === "zh";
  const roundedCount = Math.floor(tournaments.length / 10) * 10;
  const communityLink = isZh ? QQ_LINK : DISCORD_LINK;

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => setSystemPrefersDark(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!langComboRef.current) return;
      if (!langComboRef.current.contains(event.target as Node)) setLangOpen(false);
    };
    window.addEventListener("mousedown", onClickOutside);
    return () => window.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang === "en" ? "en" : "ja";
    document.title = copy.title;
    localStorage.setItem("neo-lang", lang);
  }, [copy.title, lang]);

  useEffect(() => {
    localStorage.setItem("neo-theme", themeMode);
    document.documentElement.dataset.theme = resolvedTheme;
  }, [resolvedTheme, themeMode]);

  useEffect(() => {
    setVersionText(copy.hero.loading);
  }, [copy.hero.loading]);

  useEffect(() => {
    setIsWindows(typeof navigator !== "undefined" && /windows/i.test(navigator.userAgent));

    async function fetchLatest() {
      try {
        const response = await fetch(
          "https://gh-releases.plfjy.top/?repo=PLFJY/neo-bpsys-wpf&latest=true&ua=neo-bpsys-wpf"
        );
        const data = await response.json();
        const installer = (data.assets || []).find(
          (asset: { name: string }) => asset.name === "neo-bpsys-wpf_Installer.exe"
        );
        if (!installer) {
          setVersionText(copy.hero.notFound);
          setGithubDisabled(true);
          return;
        }

        const raw = installer.browser_download_url as string;
        setDownloadLinks({
          github: raw,
          proxy1: `https://ghproxy.net/${raw}`,
          proxy2: `https://gh-proxy.com/${raw}`,
          proxy3: `https://ghfast.top/${raw}`,
        });
        setVersionText(data.tag_name || "latest");
        setGithubDisabled(false);
      } catch {
        setVersionText(copy.hero.fetchFailed);
        setGithubDisabled(true);
      }
    }

    fetchLatest();
  }, [copy.hero.fetchFailed, copy.hero.notFound]);

  useEffect(() => {
    const scrollElement = userScrollRef.current;
    if (!scrollElement) return;

    let rafId = 0;
    let isScrolling = true;
    let isResetting = false;
    let lastTimestamp = 0;
    const speed = 2;
    const interval = 30;

    const startSmoothReset = (el: HTMLDivElement) => {
      if (isResetting) return;
      isResetting = true;
      isScrolling = false;

      const startPosition = el.scrollLeft;
      const startTime = performance.now();
      const duration = 500;

      const resetStep = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - (1 - progress) ** 3;
        el.scrollLeft = startPosition * (1 - easeProgress);

        if (progress < 1) {
          requestAnimationFrame(resetStep);
        } else {
          el.scrollLeft = 0;
          isResetting = false;
          isScrolling = true;
          lastTimestamp = 0;
        }
      };

      requestAnimationFrame(resetStep);
    };

    const step = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      if (delta > interval && isScrolling && !isResetting) {
        lastTimestamp = timestamp;
        scrollElement.scrollLeft += speed;
        if (scrollElement.scrollLeft >= scrollElement.scrollWidth - scrollElement.clientWidth - 50) {
          startSmoothReset(scrollElement);
        }
      }

      if (isScrolling || isResetting || scrollElement.scrollLeft > 0) {
        rafId = requestAnimationFrame(step);
      }
    };

    const onEnter = () => {
      if (!isResetting) isScrolling = false;
    };
    const onLeave = () => {
      if (!isResetting) {
        isScrolling = true;
        lastTimestamp = 0;
        rafId = requestAnimationFrame(step);
      }
    };

    scrollElement.addEventListener("mouseenter", onEnter);
    scrollElement.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      scrollElement.removeEventListener("mouseenter", onEnter);
      scrollElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const subtitle = useMemo(
    () => copy.usersSubtitle.replace("{count}", String(roundedCount)),
    [copy.usersSubtitle, roundedCount]
  );

  const downloadDisabled = !isWindows || githubDisabled;
  const currentLangLabel = langItems.find((item) => item.value === lang)?.label ?? "中文";
  const themeIcon =
    themeMode === "light"
      ? "fa6-solid:sun"
      : themeMode === "dark"
        ? "fa6-solid:moon"
        : "fa6-solid:desktop";
  const themeLabel = themeMode === "light" ? "Light" : themeMode === "dark" ? "Dark" : "System";

  return (
    <div className="page-root">
      <nav className="navbar acrylic">
        <div className="nav-logo">
          <img src="/icon.png" alt="neo-bpsys-wpf icon" />
          <span>{copy.subtitle}</span>
        </div>
        <div className="nav-links">
          <a target="_blank" rel="noreferrer" href="https://github.com/PLFJY/neo-bpsys-wpf/" className="nav-link">
            <Icon icon="fa6-brands:github" />
            {copy.nav.github}
          </a>
          <a target="_blank" rel="noreferrer" href="https://docs.bpsys.plfjy.top/" className="nav-link">
            <Icon icon="fa6-solid:book" />
            {copy.nav.docs}
          </a>
          <a target="_blank" rel="noreferrer" href={communityLink} className="nav-link">
            <Icon icon={isZh ? "fa6-brands:qq" : "fa6-brands:discord"} />
            {copy.nav.community}
          </a>

          <div className="lang-combobox" ref={langComboRef}>
            <button
              type="button"
              className="lang-combobox-trigger"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((v) => !v)}
            >
              <Icon icon="fa6-solid:globe" />
              <span>{currentLangLabel}</span>
              <Icon icon={langOpen ? "fa6-solid:chevron-up" : "fa6-solid:chevron-down"} />
            </button>
            {langOpen && (
              <div className="lang-combobox-menu" role="listbox">
                {langItems.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    role="option"
                    aria-selected={item.value === lang}
                    className={`lang-combobox-option ${item.value === lang ? "active" : ""}`}
                    onClick={() => {
                      setLang(item.value);
                      setLangOpen(false);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="theme-cycle-btn"
            aria-label="theme mode cycle"
            title={`Theme: ${themeLabel}`}
            onClick={() => setThemeMode((prev) => nextThemeMode[prev])}
          >
            <Icon icon={themeIcon} />
            <span>{themeLabel}</span>
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <img src="/icon.png" alt="软件图标" className="software-icon" />
          <h1 className="software-name">neo-bpsys-wpf</h1>
          <p className="software-desc">
            {copy.hero.desc1}
            <br />
            {copy.hero.desc2}
          </p>
          <div className="system-requirements">
            <span>{copy.hero.requirements}</span>
            <span>{copy.hero.requirementsWindows}</span>
          </div>

          <a
            href={isZh ? downloadLinks.proxy1 : downloadLinks.github}
            className={`download-btn ${downloadDisabled ? "disabled" : ""}`}
            title={!isWindows ? copy.hero.unsupportedTitle : githubDisabled ? copy.hero.githubDisabledTitle : ""}
            onClick={(e) => {
              if (downloadDisabled) e.preventDefault();
            }}
          >
            <div className="download-btn-main">
              <div className="line1">
                <Icon icon="fa6-solid:download" />
                {downloadDisabled ? copy.hero.unsupported : copy.hero.downloadNow}
              </div>
              <div className="line2">{versionText}</div>
            </div>
          </a>

          {isZh && isWindows && (
            <div className="backup-download-btn">
              <a href={downloadLinks.proxy2} className="download-btn2">
                <Icon icon="fa6-solid:link" />
                {copy.hero.backup1}
              </a>
              <a href={downloadLinks.proxy3} className="download-btn2">
                <Icon icon="fa6-solid:link" />
                {copy.hero.backup2}
              </a>
              <a
                href={downloadLinks.github}
                className={`download-btn2 ${githubDisabled ? "disabled" : ""}`}
                onClick={(e) => {
                  if (githubDisabled) e.preventDefault();
                }}
              >
                <Icon icon="fa6-solid:link" />
                {copy.hero.githubFallback}
              </a>
            </div>
          )}
          {githubDisabled && <div className="download-disabled-tip">{copy.hero.disabledTip}</div>}
        </div>
      </section>

      <section className="timeline">
        <h2 className="section-title">{copy.timelineTitle}</h2>
        {copy.timeline.map((project) => (
          <a key={project.name} className="project" href={project.url} target="_blank" rel="noreferrer">
            <Icon icon="fa6-solid:code-branch" />
            <div>
              <h3>{project.name}</h3>
              <p>{project.desc}</p>
            </div>
          </a>
        ))}
      </section>

      <h2 className="section-title">{copy.usersTitle}</h2>
      <h2 className="section-title">{subtitle}</h2>
      <div className="users-wrap">
        <div className="scroll-mask scroll-mask-left" />
        <div className="scroll-mask scroll-mask-right" />
        <section className="user-scroll" ref={userScrollRef}>
          <div className="user-track">
            {tournaments.map((tournament) => (
              <div key={tournament} dangerouslySetInnerHTML={{ __html: tournament }} />
            ))}
          </div>
        </section>
      </div>

      <section className="author-section">
        <h2 className="section-title">{copy.authorTitle}</h2>
        <div className="author-card acrylic">
          <div className="author-header">
            <img src="/plfjy.png" alt="作者头像" className="author-avatar" />
            <h2 className="author-name">{copy.authorName}</h2>
            <p className="author-title">{copy.authorRole}</p>
          </div>

          <p>{copy.authorDesc}</p>

          <div className="author-links">
            <a target="_blank" rel="noreferrer" href="https://plfjy.top/" className="author-link">
              <Icon icon="fa6-solid:house" />
              {copy.authorLinks.home}
            </a>
            <a target="_blank" rel="noreferrer" href="https://blog.plfjy.top/" className="author-link">
              <Icon icon="fa6-solid:blog" />
              {copy.authorLinks.blog}
            </a>
            <a target="_blank" rel="noreferrer" href="https://space.bilibili.com/453909624/" className="author-link">
              <Icon icon="fa6-brands:bilibili" />
              {copy.authorLinks.bilibili}
            </a>
            <a target="_blank" rel="noreferrer" href="https://github.com/PLFJY/" className="author-link">
              <Icon icon="fa6-brands:github" />
              {copy.authorLinks.github}
            </a>
          </div>
        </div>
      </section>

      <section className="contributors">
        <h2 className="section-title">{copy.contributorsTitle}</h2>
        <div className="contributors-grid">
          {contributors.map((c) => (
            <div key={c.name} className="contributor-item">
              <img className="contributor-avatar" src={c.avatar} alt={c.name} loading="lazy" />
              <div className="contributor-name">{c.name}</div>
              <div className="contributor-contribution">{c.contribution}</div>
              {c.link && (
                <a href={c.link} target="_blank" rel="noreferrer" className="contributor-link">
                  <Icon icon="fa6-brands:github" />
                  GitHub
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
