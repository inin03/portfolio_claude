import { useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/useMediaQuery';
import { COLORS } from './tokens';

type Page = 'home' | 'portfolio' | 'about';

interface NavProps {
  current: Page;
  onNav: (page: Page) => void;
}

// 실제 링크(href)를 갖도록 해서 키보드 포커스·새 탭 열기·스크린 리더가 모두 동작합니다.
const ITEMS: { page: Page; label: string; href: string }[] = [
  { page: 'home', label: '홈', href: '#' },
  { page: 'portfolio', label: '포트폴리오', href: '#portfolio' },
  { page: 'about', label: '소개', href: '#about' },
];

export function Nav({ current, onNav }: NavProps) {
  const isMobile = useIsMobile(640);
  const [menuOpen, setMenuOpen] = useState(false);

  // Esc로 모바일 메뉴 닫기
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const go = (e: React.MouseEvent, page: Page) => {
    // 새 탭/창 열기(⌘·Ctrl·Shift 클릭)는 브라우저 기본 동작에 맡김
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onNav(page);
    setMenuOpen(false);
  };

  const navLink = (item: (typeof ITEMS)[number]) => {
    const active = current === item.page;
    return (
      <a
        key={item.page}
        href={item.href}
        onClick={(e) => go(e, item.page)}
        aria-current={active ? 'page' : undefined}
        className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portfolio-ink"
        style={{
          display: 'inline-flex', alignItems: 'center',
          minHeight: 44, padding: isMobile ? '0' : '0 4px',
          textDecoration: active ? 'underline' : 'none',
          textDecorationThickness: 2, textUnderlineOffset: 8,
          fontSize: isMobile ? 16 : 14, fontWeight: active ? 600 : 400,
          letterSpacing: '0.04em', cursor: 'pointer',
          color: active ? COLORS.ink : COLORS.text, transition: 'color 0.2s',
          fontFamily: "'Noto Sans KR', sans-serif",
          borderBottom: isMobile ? '1px solid rgba(0,0,0,0.08)' : 'none',
        }}
      >
        {item.label}
      </a>
    );
  };

  return (
    <>
      <nav
        aria-label="주 메뉴"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: 'rgba(250,249,247,0.92)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '0 5%', height: 64,
        }}
      >
        <a
          onClick={(e) => go(e, 'home')}
          href="#"
          style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 17, fontWeight: 600,
            letterSpacing: '0.01em', color: COLORS.ink, textDecoration: 'none',
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', minHeight: 44,
          }}
        >
          Portfolio
        </a>

        {!isMobile && (
          <ul style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0 }}>
            {ITEMS.map((item) => <li key={item.page}>{navLink(item)}</li>)}
          </ul>
        )}

        {isMobile && (
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-ink"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              width: 44, height: 44, marginRight: -10,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 5,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} aria-hidden="true" style={{
                display: 'block', width: 22, height: 2, background: COLORS.ink,
                transition: 'all 0.2s',
                transform: menuOpen && i === 0 ? 'translateY(7px) rotate(45deg)'
                  : menuOpen && i === 1 ? 'scaleX(0)'
                  : menuOpen && i === 2 ? 'translateY(-7px) rotate(-45deg)'
                  : 'none',
              }} />
            ))}
          </button>
        )}
      </nav>

      {isMobile && menuOpen && (
        <div
          id="mobile-menu"
          style={{
            position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99,
            background: 'rgba(250,249,247,0.98)', backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            display: 'flex', flexDirection: 'column', padding: '8px 5% 16px',
          }}
        >
          {ITEMS.map(navLink)}
        </div>
      )}
    </>
  );
}
