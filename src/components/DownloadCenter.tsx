import { Icon } from "@iconify/react";
import type { Copy } from "../data";

export type DownloadInfo = {
  github: string;
  proxy1: string;
  proxy2: string;
  proxy3: string;
};

type DownloadCenterProps = {
  heroCopy: Copy["hero"];
  isZh: boolean;
  isWindows: boolean;
  versionText: string;
  githubDisabled: boolean;
  downloadLinks: DownloadInfo;
};

export function DownloadCenter({
  heroCopy,
  isZh,
  isWindows,
  versionText,
  githubDisabled,
  downloadLinks,
}: DownloadCenterProps) {
  const downloadDisabled = !isWindows || githubDisabled;

  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-content">
        <img src="/icon.png" alt="软件图标" className="software-icon" />
        <h1 className="software-name">neo-bpsys-wpf</h1>
        <p className="software-desc">
          {heroCopy.desc1}
          <br />
          {heroCopy.desc2}
        </p>
        <div className="system-requirements">
          <span>{heroCopy.requirements}</span>
          <span>{heroCopy.requirementsWindows}</span>
        </div>

        <a
          href={isZh ? downloadLinks.proxy1 : downloadLinks.github}
          className={`download-btn ${downloadDisabled ? "disabled" : ""}`}
          title={!isWindows ? heroCopy.unsupportedTitle : githubDisabled ? heroCopy.githubDisabledTitle : ""}
          onClick={(event) => {
            if (downloadDisabled) event.preventDefault();
          }}
        >
          <div className="download-btn-main">
            <div className="line1">
              <Icon icon="fa6-solid:download" />
              {downloadDisabled ? heroCopy.unsupported : heroCopy.downloadNow}
            </div>
            <div className="line2">{versionText}</div>
          </div>
        </a>

        {isZh && isWindows && (
          <div className="backup-download-btn">
            <a href={downloadLinks.proxy2} className="download-btn2">
              <Icon icon="fa6-solid:link" />
              {heroCopy.backup1}
            </a>
            <a href={downloadLinks.proxy3} className="download-btn2">
              <Icon icon="fa6-solid:link" />
              {heroCopy.backup2}
            </a>
            <a
              href={downloadLinks.github}
              className={`download-btn2 ${githubDisabled ? "disabled" : ""}`}
              onClick={(event) => {
                if (githubDisabled) event.preventDefault();
              }}
            >
              <Icon icon="fa6-solid:link" />
              {heroCopy.githubFallback}
            </a>
          </div>
        )}

        {githubDisabled && <div className="download-disabled-tip">{heroCopy.disabledTip}</div>}
      </div>
    </section>
  );
}
