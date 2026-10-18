import { useIsMobile } from "../hooks/useMediaQuery";
import careerPdf from "../../imports/Career_Description.pdf";
import { COLORS } from "./tokens";

// isTablet = viewport < 1024px (covers iPad)
const useIsTabletLocal = () => useIsMobile(1024);

const SKILLS_DESIGN = ["Photoshop", "Illustrator", "HTML/CSS"];
const SKILLS_MD = [
  "상품 운영",
  "프로모션 운영",
  "브랜드/채널 분석",
  "카테고리 운영",
  "매출·데이터 분석",
  "Excel·Google Sheets",
  "쿠팡 로켓그로스 운영",
  "광고 운영",
  "플레이오토",
];

interface Experience {
  company: string;
  period: string;
  role: string;
  desc: string;
  channels?: string;
  result?: string; // 성과 한 줄 (숫자)
}

const EXPERIENCE: Experience[] = [
  {
    company: "(주)준주얼리",
    period: "2019.06 — 2026.04",
    role: "온라인 MD / Web Designer (과장)",
    desc: "상품등록&관리, 이커머스 채널 프로모션 진행, 매출 및 수수료, 광고 ROAS 통계",
    channels: "[ 쿠팡/카카오 선물하기/지마켓/옥션/11번가 등 다수 채널 운영 ]",
    result: "쿠팡 채널 누적 매출 +618% (2020–2025)",
  },
  {
    company: "(주)에이치디아이엔씨",
    period: "2018.06 — 2019.03",
    role: "Web Designer (사원)",
    desc: "브랜드 사이트 운영(리뉴얼), 브랜드 SNS 이벤트 페이지/카드뉴스 디자인, 체험단 블로그 관리",
  },
  {
    company: "이티엔이티",
    period: "2018.03 — 2018.05",
    role: "Web Designer (사원)",
    desc: "이벤트 페이지, 모바일 및 PC 이벤트 배너 디자인",
  },
  {
    company: "이엠씨(EMC)",
    period: "2014.10 — 2015.01",
    role: "예약관리 (사원)",
    desc: "예약관리 및 상담",
  },
];

export function AboutPage() {
  const isMobile = useIsMobile();
  const isTablet = useIsTabletLocal();

  return (
    <main style={{ paddingTop: 64 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        {/* Left — 소개 + 경력 (채용 담당자가 가장 먼저 찾는 정보) */}
        <div
          style={{
            padding: isMobile
              ? "60px 6% 40px"
              : isTablet
                ? "60px 4% 60px 5%"
                : "80px 5% 80px 8%",
            borderRight: isMobile ? "none" : "1px solid rgba(0,0,0,0.08)",
            borderBottom: isMobile ? "1px solid rgba(0,0,0,0.08)" : "none",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 13,
              letterSpacing: "0.15em",
              color: COLORS.accentText,
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            About Me
          </p>
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(28px, 3.5vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: 24,
              color: COLORS.ink,
              wordBreak: "keep-all",
            }}
          >
            안녕하세요,
            <br />
            저는 <span style={{ color: COLORS.accentLarge }}>이커머스 MD</span>
            <br />
            <span style={{ color: COLORS.accentLarge }}>&amp; 웹디자이너</span>
            입니다.
          </h1>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.9,
              fontWeight: 400,
              color: COLORS.text,
              marginBottom: 48,
              maxWidth: 520,
              wordBreak: "keep-all",
            }}
          >
            채널 운영부터 디자인까지 직접 수행합니다. 사용자 경험을 중심으로 한
            디자인과 데이터 기반의 채널 운영을 통해 브랜드의 온라인 경험을
            개선하고 비즈니스 성과를 만들어왔습니다.
          </p>

          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              marginBottom: 24,
              paddingBottom: 12,
              borderBottom: `1.5px solid ${COLORS.ink}`,
              color: COLORS.ink,
            }}
          >
            Experience
          </h2>
          {EXPERIENCE.map((exp) => (
            <div key={exp.company} style={{ marginBottom: 28 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  columnGap: 16,
                  marginBottom: 6,
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.ink }}>
                  {exp.company}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 12,
                    color: COLORS.muted,
                    whiteSpace: "nowrap",
                  }}
                >
                  {exp.period}
                </span>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: COLORS.accentText,
                  fontWeight: 600,
                  marginBottom: 6,
                  letterSpacing: "0.02em",
                }}
              >
                {exp.role}
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: COLORS.text,
                  lineHeight: 1.75,
                  fontWeight: 400,
                  wordBreak: "keep-all",
                }}
              >
                {exp.desc}
              </p>
              {exp.result && (
                <p
                  style={{
                    fontSize: 14,
                    color: COLORS.ink,
                    fontWeight: 700,
                    marginTop: 8,
                  }}
                >
                  <span aria-hidden="true">↑ </span>
                  {exp.result}
                </p>
              )}
              {exp.channels && (
                <p
                  style={{
                    fontSize: 13,
                    color: COLORS.accentText,
                    fontWeight: 500,
                    marginTop: 6,
                    wordBreak: "keep-all",
                  }}
                >
                  {exp.channels}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Right — 스킬 + 연락처 */}
        <div
          style={{
            padding: isMobile
              ? "40px 6% 60px"
              : isTablet
                ? "60px 5% 60px 4%"
                : "80px 8% 80px 5%",
          }}
        >
          <SkillGroup title="MD Skills" tags={SKILLS_MD} />
          <SkillGroup title="Design Skills" tags={SKILLS_DESIGN} />

          <h2
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: COLORS.muted,
              marginBottom: 16,
            }}
          >
            Contact
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <ContactItem icon="✉" text="frffdu0@naver.com" href="mailto:frffdu0@naver.com" />
            <ContactItem icon="→" text="경력기술서 (PDF)" href={careerPdf} external />
          </div>
        </div>
      </div>
    </main>
  );
}

function SkillGroup({ title, tags }: { title: string; tags: string[] }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 12,
          fontWeight: 400,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: COLORS.muted,
          marginBottom: 16,
        }}
      >
        {title}
      </h2>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {tags.map((tag) => (
          <li
            key={tag}
            style={{
              padding: "8px 16px",
              border: "1.5px solid rgba(0,0,0,0.12)",
              fontSize: 13,
              color: COLORS.ink,
              letterSpacing: "0.02em",
              fontFamily: "'Noto Sans KR', sans-serif",
            }}
          >
            {tag}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ContactItem({
  icon,
  text,
  href,
  external,
}: {
  icon: string;
  text: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-ink"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        minHeight: 44,
        fontSize: 14,
        color: COLORS.ink,
        textDecoration: "none",
        fontFamily: "'Noto Sans KR', sans-serif",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 36,
          height: 36,
          border: "1.5px solid rgba(0,0,0,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      {text}
    </a>
  );
}
