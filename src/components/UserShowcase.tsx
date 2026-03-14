import { useEffect, useMemo, useRef } from "react";

type UserShowcaseProps = {
  title: string;
  subtitle: string;
  tournaments: string[];
};

export function UserShowcase({ title, subtitle, tournaments }: UserShowcaseProps) {
  const userScrollRef = useRef<HTMLDivElement | null>(null);
  const marqueeTournaments = useMemo(() => [...tournaments, ...tournaments], [tournaments]);

  useEffect(() => {
    const scrollElement = userScrollRef.current;
    if (!scrollElement) return;

    const trackElement = scrollElement.querySelector(".user-track") as HTMLDivElement | null;
    if (!trackElement) return;

    let rafId = 0;
    let isScrolling = true;
    let lastTimestamp = 0;
    const speed = 2;
    const interval = 30;
    let loopWidth = trackElement.scrollWidth / 2;
    let resumeTimer = 0;

    const refreshLoopWidth = () => {
      loopWidth = trackElement.scrollWidth / 2;
    };

    const step = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      if (delta > interval && isScrolling && loopWidth > 0) {
        lastTimestamp = timestamp;
        scrollElement.scrollLeft += speed;
        if (scrollElement.scrollLeft >= loopWidth) {
          scrollElement.scrollLeft -= loopWidth;
        }
      }

      rafId = requestAnimationFrame(step);
    };

    const pauseScroll = () => {
      isScrolling = false;
      if (resumeTimer) {
        window.clearTimeout(resumeTimer);
        resumeTimer = 0;
      }
    };
    const resumeScroll = () => {
      if (resumeTimer) window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        isScrolling = true;
        lastTimestamp = 0;
      }, 900);
    };
    const onFocusIn = () => {
      pauseScroll();
    };
    const onFocusOut = (event: FocusEvent) => {
      const nextFocused = event.relatedTarget as Node | null;
      if (!nextFocused || !scrollElement.contains(nextFocused)) {
        resumeScroll();
      }
    };

    refreshLoopWidth();

    const resizeObserver = new ResizeObserver(() => {
      refreshLoopWidth();
    });
    resizeObserver.observe(trackElement);

    scrollElement.addEventListener("mouseenter", pauseScroll);
    scrollElement.addEventListener("mouseleave", resumeScroll);
    scrollElement.addEventListener("touchstart", pauseScroll, { passive: true });
    scrollElement.addEventListener("touchend", resumeScroll, { passive: true });
    scrollElement.addEventListener("touchcancel", resumeScroll, { passive: true });
    scrollElement.addEventListener("focusin", onFocusIn);
    scrollElement.addEventListener("focusout", onFocusOut);
    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      if (resumeTimer) window.clearTimeout(resumeTimer);
      resizeObserver.disconnect();
      scrollElement.removeEventListener("mouseenter", pauseScroll);
      scrollElement.removeEventListener("mouseleave", resumeScroll);
      scrollElement.removeEventListener("touchstart", pauseScroll);
      scrollElement.removeEventListener("touchend", resumeScroll);
      scrollElement.removeEventListener("touchcancel", resumeScroll);
      scrollElement.removeEventListener("focusin", onFocusIn);
      scrollElement.removeEventListener("focusout", onFocusOut);
    };
  }, [marqueeTournaments]);

  return (
    <>
      <h2 className="section-title">{title}</h2>
      <h2 className="section-title">{subtitle}</h2>
      <div className="users-wrap">
        <div className="scroll-mask scroll-mask-left" />
        <div className="scroll-mask scroll-mask-right" />
        <section className="user-scroll" ref={userScrollRef}>
          <div className="user-track">
            {marqueeTournaments.map((tournament, index) => (
              <div key={`${tournament}-${index}`} dangerouslySetInnerHTML={{ __html: tournament }} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
