# 디자인 개선 적용 파일 (크리틱 반영)

프로젝트 루트에 같은 경로로 덮어쓰면 됩니다.

- src/app/components/tokens.ts        (신규) 공통 색상 토큰 + 대비비 주석
- src/app/components/Nav.tsx          href 링크, aria 속성, 44px 터치 영역, 현재 페이지 밑줄
- src/app/components/HomePage.tsx     대비 개선, 모바일 성과 노출, 대표 작업 섹션, 카드 어포던스, 값 계산화
- src/app/components/AboutPage.tsx    경력 좌측 이동, 오탈자, 빈 링크 정리, 성과 한 줄, 대비 개선
- src/app/components/PortfolioPage.tsx 실제 썸네일 카드, masonry, 키보드·스와이프, selectedStyle 제거, 이름 통일
- src/styles/theme.css                accent-text 토큰 추가, muted 색 진하게, 모달 버튼 대비

DetailPage.tsx는 이번에 수정하지 않았습니다.
