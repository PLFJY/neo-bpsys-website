import { Icon } from "@iconify/react";
import type { RefObject } from "react";
import type { Copy, Lang } from "../data";

type ThemeMode = "system" | "dark" | "light";

type LangItem = {
  value: Lang;
  label: string;
};

type NavbarProps = {
  subtitle: string;
  navCopy: Copy["nav"];
  communityLink: string;
  communityIcon: string;
  lang: Lang;
  langItems: LangItem[];
  currentLangLabel: string;
  langOpen: boolean;
  langComboRef: RefObject<HTMLDivElement>;
  themeIcon: string;
  themeLabel: string;
  onToggleLangOpen: () => void;
  onSelectLang: (lang: Lang) => void;
  onCycleTheme: () => void;
};

export function Navbar({
  subtitle,
  navCopy,
  communityLink,
  communityIcon,
  lang,
  langItems,
  currentLangLabel,
  langOpen,
  langComboRef,
  themeIcon,
  themeLabel,
  onToggleLangOpen,
  onSelectLang,
  onCycleTheme,
}: NavbarProps) {
  return (
    <nav className="navbar acrylic">
      <div className="nav-logo">
        <img src="/icon.png" alt="neo-bpsys-wpf icon" />
        <span>{subtitle}</span>
      </div>
      <div className="nav-links">
        <a target="_blank" rel="noreferrer" href="https://github.com/PLFJY/neo-bpsys-wpf/" className="nav-link">
          <Icon icon="fa6-brands:github" />
          {navCopy.github}
        </a>
        <a target="_blank" rel="noreferrer" href="https://docs.bpsys.plfjy.top/" className="nav-link">
          <Icon icon="fa6-solid:book" />
          {navCopy.docs}
        </a>
        <a target="_blank" rel="noreferrer" href={communityLink} className="nav-link">
          <Icon icon={communityIcon} />
          {navCopy.community}
        </a>

        <div className="lang-combobox" ref={langComboRef}>
          <button
            type="button"
            className="lang-combobox-trigger"
            aria-haspopup="listbox"
            aria-expanded={langOpen}
            onClick={onToggleLangOpen}
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
                  onClick={() => onSelectLang(item.value)}
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
          onClick={onCycleTheme}
        >
          <Icon icon={themeIcon} />
          <span>{themeLabel}</span>
        </button>
      </div>
    </nav>
  );
}
