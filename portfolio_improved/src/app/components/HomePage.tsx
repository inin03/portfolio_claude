import { useIsMobile } from "../hooks/useMediaQuery"
import { PROJECTS, SORTED_PROJECTS, type Project } from "./projectData"
import { COLORS } from "./tokens"

type Page = "home" | "portfolio" | "about"

interface HomePageProps {
  onNav: (page: Page) => void
  onOpenProject: (projectId: number) => void
}

// 대표 작업: MD 프로젝트 전체 + 가장 최근 디자인 작업 1개 (바꾸고 싶다면 이 부분만 수정)
const MD_PROJECTS = SORTED_PROJECTS.filter((p) => p.filterCat === "md")
const FEATURED_DESIGN = SORTED_PROJECTS.find(
  (p) => p.filterCat === "web" && p.thumbImage,
)
const FEATURED: Project[] = [...MD_PROJECTS, ...(FEATURED_DESIGN ? [FEATURED_DESIGN] : [])]

// 하드코딩된 ID 대신 데이터에서 찾음
const COUPANG = MD_PROJECTS.find((p) => p.title.includes("쿠팡"))

const STATS = {
  growth: "↑ 618%", // 쿠팡 채널 누적 매출 (2020–2025, 프로젝트 상세 데이터 기준)
  total: String(PROJECTS.length),
}

export function HomePage({ onNav, onOpenProject }: HomePageProps) {
  const isMobile = useIsMobile()

  return (
    <main style={{ paddingTop: 64 }}>
      {/* Hero */}
      <section
        style={{
          minHeight: isMobile ? "auto" : "calc(100vh - 64px)",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: isMobile ? "60px 6% 40px" : "80px 5% 80px 8%",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.15em",
              color: COLORS.accentText,
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            E-COMMERCE MD & WEB DESIGNER
          </p>
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: isMobile
                ? "clamp(34px, 9vw, 52px)"
                : "clamp(40px, 5vw, 66px)",
              lineHeight: 1.15,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: 20,
              color: COLORS.ink,
              wordBreak: "keep-all",
            }}
          >
            데이터로 기획하고
            <br />
            <span style={{ color: COLORS.accentLarge, fontWeight: 400 }}>
              디자인으로 완성하는
            </span>
            <br />
            이커머스 MD
          </h1>
          <p
            style={{
              fontSize: isMobile ? 14 : 15,
              color: COLORS.text,
              lineHeight: 1.9,
              maxWidth: 400,
              marginBottom: 40,
              fontWeight: 400,
              fontFamily: "'Noto Sans KR', sans-serif",
              wordBreak: "keep-all",
            }}
          >
            디자인의 감각과 이커머스의 경험으로
            <br />
            브랜드의 온라인 경험을 설계합니다.
            <br />
            데이터와 디자인을 바탕으로 더 나은 경험과 성과를 만듭니다.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "포트폴리오 보기", primary: true, page: "portfolio" as Page, href: "#portfolio" },
              { label: "소개 보기", primary: false, page: "about" as Page, href: "#about" },
            ].map((btn) => (
              <a
                key={btn.label}
                href={btn.href}
                onClick={(e) => {
                  e.preventDefault()
                  onNav(btn.page)
                }}
                className={
                  btn.primary
                    ? "bg-[#1a1a1a] text-white hover:bg-transparent hover:text-[#1a1a1a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-ink"
                    : "bg-transparent text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-ink"
                }
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 48,
                  border: "2px solid #1a1a1a",
                  padding: isMobile ? "0 24px" : "0 32px",
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "all 0.25s",
                }}
              >
                {btn.label}
              </a>
            ))}
          </div>

          {/* 모바일: 우측 패널이 숨겨지므로 핵심 성과를 한 줄로 노출 */}
          {isMobile && (
            <dl
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
                marginTop: 40,
                paddingTop: 24,
                borderTop: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              {[
                { num: STATS.growth, label: "쿠팡 채널\n누적 매출" },
                { num: "7 Yrs", label: "MD 실무 경력" },
                { num: STATS.total, label: "총 프로젝트" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{ display: "flex", flexDirection: "column-reverse", justifyContent: "flex-end" }}
                >
                  <dt
                    style={{
                      fontSize: 12,
                      color: COLORS.muted,
                      marginTop: 6,
                      whiteSpace: "pre-line",
                      lineHeight: 1.4,
                    }}
                  >
                    {s.label}
                  </dt>
                  <dd
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 22,
                      fontWeight: 700,
                      color: COLORS.ink,
                      lineHeight: 1.1,
                      margin: 0,
                    }}
                  >
                    {s.num}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* Right — 데스크톱/태블릿 */}
        {!isMobile && (
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(135deg, #f0ebe3 0%, #e8f0ec 50%, #f5ede6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ position: "relative", width: 340, height: 440 }}>
              <FloatCard style={{ top: 0, left: 0, width: 210 }}>
                <Label>총 프로젝트</Label>
                <BigNum>{STATS.total}</BigNum>
                <Sub>이커머스 MD · 웹디자인</Sub>
              </FloatCard>

              <FloatCard
                style={{ top: 140, right: 0, width: 190 }}
                href={COUPANG ? `#detail/${SORTED_PROJECTS.indexOf(COUPANG)}` : undefined}
                onClick={COUPANG ? () => onOpenProject(COUPANG.id) : undefined}
                ariaLabel="쿠팡 채널 운영 프로젝트 상세 보기"
              >
                <Label>쿠팡 채널 누적 매출</Label>
                <BigNum>{STATS.growth}</BigNum>
                <Sub>2020 – 2025 · 6년</Sub>
                {COUPANG && (
                  <p
                    aria-hidden="true"
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: COLORS.accentText,
                      marginTop: 10,
                    }}
                  >
                    상세 보기 →
                  </p>
                )}
              </FloatCard>

              <FloatCard
                style={{ bottom: 60, left: 10, width: 160, background: COLORS.ink }}
              >
                <Label light>MD 실무 경력</Label>
                <BigNum light>7 Yrs</BigNum>
                <Sub light>2019 – 2026</Sub>
              </FloatCard>

              <FloatCard
                style={{ bottom: 0, right: 0, width: 150, padding: "16px 18px" }}
              >
                <Label>웹디자인 실무 경력</Label>
                <BigNum>1 Yr</BigNum>
                <Sub>2018 – 2019</Sub>
              </FloatCard>
            </div>
          </div>
        )}
      </section>

      {/* 대표 작업 */}
      <section
        aria-labelledby="featured-title"
        style={{ padding: isMobile ? "48px 6% 64px" : "72px 8% 96px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                letterSpacing: "0.15em",
                color: COLORS.accentText,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Selected Work
            </p>
            <h2
              id="featured-title"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: isMobile ? 26 : 34,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: COLORS.ink,
              }}
            >
              대표 작업
            </h2>
          </div>
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault()
              onNav("portfolio")
            }}
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-ink"
            style={{
              display: "inline-flex",
              alignItems: "center",
              minHeight: 44,
              fontSize: 14,
              fontWeight: 500,
              color: COLORS.ink,
              textDecoration: "underline",
              textUnderlineOffset: 6,
              whiteSpace: "nowrap",
            }}
          >
            전체 보기 →
          </a>
        </div>

        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {FEATURED.map((project) => (
            <li key={project.id}>
              <FeaturedCard project={project} onOpen={() => onOpenProject(project.id)} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

function FeaturedCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const idx = SORTED_PROJECTS.findIndex((p) => p.id === project.id)
  const title = project.title.replaceAll("\n", " ")
  const isMd = project.filterCat === "md"

  return (
    <a
      href={`#detail/${idx}`}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return
        e.preventDefault()
        onOpen()
      }}
      className="group block overflow-hidden rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-ink"
      style={{ textDecoration: "none", color: COLORS.ink }}
    >
      <div
        className="flex items-center justify-center overflow-hidden"
        style={{ aspectRatio: "4 / 3", background: project.thumbBg }}
      >
        {project.thumbImage ? (
          <img
            src={project.thumbImage}
            alt={`${title} 대표 이미지`}
            className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : project.thumbSvg ? (
          <div
            aria-hidden="true"
            className="flex size-full items-center justify-center transition-transform duration-500 group-hover:scale-105 [&>svg]:h-24 [&>svg]:w-auto"
            dangerouslySetInnerHTML={{ __html: project.thumbSvg }}
          />
        ) : null}
      </div>
      <div style={{ padding: "20px 22px 24px" }}>
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            letterSpacing: "0.1em",
            color: COLORS.accentText,
            marginBottom: 8,
          }}
        >
          {isMd ? "MD" : "DESIGN"} · {project.year}
        </p>
        <h3
          style={{
            fontFamily: "'Outfit', 'Noto Sans KR', sans-serif",
            fontSize: 18,
            fontWeight: 700,
            lineHeight: 1.35,
            marginBottom: 8,
            wordBreak: "keep-all",
          }}
        >
          {title}
        </h3>
        <p
          className="line-clamp-2"
          style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.text, wordBreak: "keep-all" }}
        >
          {project.desc}
        </p>
      </div>
    </a>
  )
}

function Label({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      style={{
        fontSize: 12,
        letterSpacing: "0.04em",
        color: light ? "rgba(255,255,255,0.75)" : COLORS.muted,
        marginBottom: 8,
      }}
    >
      {children}
    </p>
  )
}

function BigNum({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 28,
        fontWeight: 700,
        color: light ? "#fff" : COLORS.ink,
        lineHeight: 1,
      }}
    >
      {children}
    </p>
  )
}

function Sub({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      style={{
        fontSize: 12,
        color: light ? "rgba(255,255,255,0.75)" : COLORS.muted,
        marginTop: 4,
      }}
    >
      {children}
    </p>
  )
}

function FloatCard({
  children,
  style,
  onClick,
  href,
  ariaLabel,
}: {
  children: React.ReactNode
  style: React.CSSProperties
  onClick?: () => void
  href?: string
  ariaLabel?: string
}) {
  const base: React.CSSProperties = {
    position: "absolute",
    background: "#fff",
    borderRadius: 16,
    padding: "20px 24px",
    boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
    ...style,
  }

  // 클릭 가능한 카드는 실제 링크로 만들어 호버·포커스·새 탭 열기를 지원
  if (onClick) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey) return
          e.preventDefault()
          onClick()
        }}
        className="block cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_14px_44px_rgba(0,0,0,0.14)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-ink"
        style={{ ...base, textDecoration: "none", color: "inherit" }}
      >
        {children}
      </a>
    )
  }
  return <div style={base}>{children}</div>
}
