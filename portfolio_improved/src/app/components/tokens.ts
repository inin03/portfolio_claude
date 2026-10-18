// 공통 색상 토큰 — 페이지별 인라인 hex 값을 한 곳으로 모읍니다.
// 대비비는 배경 #faf9f7 기준 (WCAG 2.1 AA: 일반 텍스트 4.5:1, 24px 이상 큰 텍스트 3:1)
export const COLORS = {
  canvas: "#faf9f7",
  ink: "#1a1a1a", // 16.5:1
  text: "#555555", // 7.1:1  본문
  muted: "#666666", // 5.5:1  보조 텍스트
  accent: "#c8a882", // 2.1:1  장식 전용(배경·아이콘·구분선). 텍스트에는 쓰지 않기
  accentLarge: "#a67c52", // 3.5:1  24px 이상 큰 제목용
  accentText: "#8a6a3f", // 4.7:1  작은 텍스트용 골드
} as const
