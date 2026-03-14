import { useEffect, useMemo, useRef, useState } from "react";
import { DISCORD_LINK, QQ_LINK, contributors, copyByLang, partners, promoByLang, tournaments, type Lang } from "./data";
import { ContributorsSection } from "./components/ContributorsSection";
import { DownloadCenter, type DownloadInfo } from "./components/DownloadCenter";
import { LeadDeveloper } from "./components/LeadDeveloper";
import { Navbar } from "./components/Navbar";
import { PartnersSection } from "./components/PartnersSection";
import { PromoSection } from "./components/PromoSection";
import { ProjectOrigins } from "./components/ProjectOrigins";
import { UserShowcase } from "./components/UserShowcase";

type ThemeMode = "system" | "dark" | "light";

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

  const langComboRef = useRef<HTMLDivElement>(null);
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

  const subtitle = useMemo(
    () => copy.usersSubtitle.replace("{count}", String(roundedCount)),
    [copy.usersSubtitle, roundedCount]
  );

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
      <Navbar
        subtitle={copy.subtitle}
        navCopy={copy.nav}
        communityLink={communityLink}
        communityIcon={isZh ? "fa6-brands:qq" : "fa6-brands:discord"}
        lang={lang}
        langItems={langItems}
        currentLangLabel={currentLangLabel}
        langOpen={langOpen}
        langComboRef={langComboRef}
        themeIcon={themeIcon}
        themeLabel={themeLabel}
        onToggleLangOpen={() => setLangOpen((value) => !value)}
        onSelectLang={(value) => {
          setLang(value);
          setLangOpen(false);
        }}
        onCycleTheme={() => setThemeMode((prev) => nextThemeMode[prev])}
      />

      <DownloadCenter
        heroCopy={copy.hero}
        isZh={isZh}
        isWindows={isWindows}
        versionText={versionText}
        githubDisabled={githubDisabled}
        downloadLinks={downloadLinks}
      />

      <PromoSection promo={promoByLang[lang]} />

      <ProjectOrigins title={copy.timelineTitle} timeline={copy.timeline} />

      <UserShowcase title={copy.usersTitle} subtitle={subtitle} tournaments={tournaments} />

      <LeadDeveloper
        title={copy.authorTitle}
        authorName={copy.authorName}
        authorRole={copy.authorRole}
        authorDesc={copy.authorDesc}
        authorLinks={copy.authorLinks}
      />

      <ContributorsSection title={copy.contributorsTitle} contributors={contributors} />
      <PartnersSection title={copy.partnersTitle} partners={partners} websiteLabel={copy.partnerWebsiteLabel} />
    </div>
  );
}
