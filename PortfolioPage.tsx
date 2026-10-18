import { useEffect, useRef, useState } from "react"
import { Button, Modal } from "@figma/astraui"
import { ArrowLeft, ArrowRight, ZoomIn } from "lucide-react"
import { GalleryImage, Project, SORTED_PROJECTS } from "./projectData"

interface PortfolioPageProps {
  onOpenDetail: (idx: number) => void
  view: PortfolioView
  onViewChange: (view: PortfolioView) => void
}

export type PortfolioView = "landing" | "md" | "design"

interface DesignWork {
  key: string
  image: GalleryImage
  project: Project
  imageIndex: number
  imageCount: number
}

const MD_PROJECTS = SORTED_PROJECTS.filter(
  (project) => project.filterCat === "md",
)

const DESIGN_PROJECTS = SORTED_PROJECTS.filter(
  (project) => project.filterCat === "web",
)

const DESIGN_WORKS: DesignWork[] = DESIGN_PROJECTS.flatMap((project) => {
  const images =
    project.gallery ??
    (project.thumbImage
      ? [{ src: project.thumbImage, aspect: "square" as const }]
      : [])

  return images.map((image, index) => ({
    key: `${project.id}-${index}`,
    image,
    project,
    imageIndex: index,
    imageCount: images.length,
  }))
})

const plainTitle = (project: Project) => project.title.replaceAll("\n", " ")

const workAlt = (work: DesignWork) =>
  work.imageCount > 1
    ? `${plainTitle(work.project)} (${work.imageIndex + 1}/${work.imageCount})`
    : plainTitle(work.project)

// 랜딩 카드 미리보기용 실제 작업물 썸네일 (프로젝트당 1장)
const MD_PREVIEW = MD_PROJECTS.slice(0, 2).map((project) => ({
  key: `md-${project.id}`,
  svg: project.thumbSvg,
  bg: project.thumbBg,
}))
const DESIGN_PREVIEW = DESIGN_PROJECTS.filter((p) => p.thumbImage)
  .slice(0, 4)
  .map((project) => ({
    key: `design-${project.id}`,
    image: project.thumbImage,
  }))

export function PortfolioPage({
  onOpenDetail,
  view,
  onViewChange,
}: PortfolioPageProps) {
  const [selectedWorkIndex, setSelectedWorkIndex] = useState<number | null>(
    null,
  )
  const touchStartX = useRef<number | null>(null)

  const openMdProject = (project: Project) => {
    const index = SORTED_PROJECTS.findIndex((item) => item.id === project.id)
    if (index >= 0) onOpenDetail(index)
  }

  const selectedWork =
    selectedWorkIndex === null ? null : DESIGN_WORKS[selectedWorkIndex]

  const moveLightbox = (direction: number) => {
    setSelectedWorkIndex((current) => {
      if (current === null) return null
      return (current + direction + DESIGN_WORKS.length) % DESIGN_WORKS.length
    })
  }

  // 라이트박스: 키보드 방향키 이동
  useEffect(() => {
    if (selectedWorkIndex === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") moveLightbox(-1)
      if (event.key === "ArrowRight") moveLightbox(1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selectedWorkIndex])

  // 라이트박스: 터치 스와이프 이동
  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX
  }
  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = event.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) > 50) moveLightbox(delta < 0 ? 1 : -1)
  }

  return (
    <main className="portfolio-page min-h-screen bg-portfolio-canvas pt-2xl">
      <div className="h-xl" aria-hidden="true" />

      <section className="mx-auto flex max-w-7xl flex-col gap-2xl p-2xl">
        <PortfolioHeader view={view} onBack={() => onViewChange("landing")} />

        {view === "landing" && (
          <div className="grid grid-cols-1 gap-xl lg:grid-cols-2">
            <CategoryCard
              eyebrow="E-COMMERCE OPERATION"
              title="MD PORTFOLIO"
              description="채널 운영, 매출 성장, 광고와 프로모션 성과를 프로젝트별로 확인합니다."
              meta={`${MD_PROJECTS.length} CASE STUDIES`}
              tone="md"
              onClick={() => onViewChange("md")}
              media={<MdPreview />}
            />
            <CategoryCard
              eyebrow="VISUAL & WEB DESIGN"
              title="DESIGN PORTFOLIO"
              description="웹, 배너, 카드뉴스와 상세페이지 작업물을 한 페이지에서 모아봅니다."
              meta={`${DESIGN_WORKS.length} WORKS`}
              tone="design"
              onClick={() => onViewChange("design")}
              media={<DesignPreview />}
            />
          </div>
        )}

        {view === "md" && (
          <div className="grid grid-cols-1 gap-xl md:grid-cols-2">
            {MD_PROJECTS.map((project) => (
              <MdProjectCard
                key={project.id}
                project={project}
                onClick={() => openMdProject(project)}
              />
            ))}
          </div>
        )}

        {/* 원본 비율을 살리는 masonry 배치 */}
        {view === "design" && (
          <div className="columns-2 gap-xl md:columns-3 lg:columns-4">
            {DESIGN_WORKS.map((work, index) => (
              <DesignWorkCard
                key={work.key}
                work={work}
                onClick={() => setSelectedWorkIndex(index)}
              />
            ))}
          </div>
        )}
      </section>

      <Modal
        isOpen={selectedWork !== null}
        onClose={() => setSelectedWorkIndex(null)}
        title={selectedWork ? plainTitle(selectedWork.project) : undefined}
        size="large"
        className="design-work-modal"
        footer={
          selectedWork ? (
            <div className="flex w-full items-center justify-between gap-xl rounded-corner-md bg-portfolio-soft p-lg">
              <span
                className="text-video-title text-portfolio-ink"
                aria-live="polite"
              >
                {selectedWorkIndex! + 1} / {DESIGN_WORKS.length}
              </span>
              <div className="flex gap-md">
                <Button
                  variant="neutral"
                  size="small"
                  className="design-modal-nav-button"
                  iconStart={<ArrowLeft size={16} />}
                  onClick={() => moveLightbox(-1)}
                >
                  이전
                </Button>
                <Button
                  variant="neutral"
                  size="small"
                  className="design-modal-nav-button"
                  iconEnd={<ArrowRight size={16} />}
                  onClick={() => moveLightbox(1)}
                >
                  다음
                </Button>
              </div>
            </div>
          ) : null
        }
      >
        {selectedWork && (
          <div
            className="flex items-start justify-center rounded-corner-md p-xl"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={selectedWork.image.src}
              alt={`${workAlt(selectedWork)} 확대 이미지`}
              className="h-auto w-full max-w-full rounded-corner-md bg-portfolio-soft object-contain"
            />
          </div>
        )}
      </Modal>
    </main>
  )
}

function PortfolioHeader({
  view,
  onBack,
}: {
  view: PortfolioView
  onBack: () => void
}) {
  // 영역 이름을 랜딩 카드와 동일하게 통일: MD PORTFOLIO / DESIGN PORTFOLIO
  const title =
    view === "md"
      ? "MD PORTFOLIO"
      : view === "design"
        ? "DESIGN PORTFOLIO"
        : "SELECTED WORKS"

  const description =
    view === "md"
      ? "채널별 운영 성과를 선택하면 프로젝트 상세 내용을 확인할 수 있습니다."
      : view === "design"
        ? "작업물을 선택하면 원본 비율로 확대해서 볼 수 있습니다. 방향키나 스와이프로 다음 작업물을 넘겨 보세요."
        : "상품 기획부터 채널 운영, 프로모션과 디자인까지 두 개의 포트폴리오로 정리했습니다."

  return (
    <div
      className={`portfolio-header flex flex-col gap-lg ${
        view === "design" ? "portfolio-header--design" : ""
      }`}
    >
      {view !== "landing" && (
        <div>
          <Button
            variant="subtle"
            size="small"
            className="portfolio-back-button"
            iconStart={<ArrowLeft size={24} />}
            onClick={onBack}
          >
            Portfolio로 돌아가기
          </Button>
        </div>
      )}
      <div className="flex flex-col gap-xs">
        <span
          className={`text-video-title font-sans ${
            view === "design" ? "text-background" : "text-portfolio-accent-text"
          }`}
        >
          E-COMMERCE MD · WEB DESIGN
        </span>
        <h1 className="text-title font-display text-portfolio-ink">{title}</h1>
        <p className="max-w-3xl text-label-sm text-portfolio-muted">
          {description}
        </p>
      </div>
    </div>
  )
}

function CategoryCard({
  eyebrow,
  title,
  description,
  meta,
  media,
  tone,
  onClick,
}: {
  eyebrow: string
  title: string
  description: string
  meta: string
  media: React.ReactNode
  tone: "md" | "design"
  onClick: () => void
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onClick()
        }
      }}
      className={`group cursor-pointer overflow-hidden rounded-corner-lg border border-border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-ink ${
        tone === "md"
          ? "portfolio-category-card--md"
          : "portfolio-category-card--design"
      }`}
    >
      <div className="aspect-video overflow-hidden bg-portfolio-soft">
        <div className="size-full transition-transform duration-500 group-hover:scale-105">
          {media}
        </div>
      </div>
      <div className="flex flex-col gap-xl p-xl">
        <div className="flex items-center justify-between gap-lg">
          <span
            className={`text-video-title ${
              tone === "design" ? "text-emerald-700" : "text-portfolio-accent-text"
            }`}
          >
            {eyebrow}
          </span>
          <span className="text-video-title text-portfolio-muted">{meta}</span>
        </div>
        <div className="flex items-end justify-between gap-xl">
          <div className="flex flex-col gap-xs">
            <div className="text-heading font-display text-portfolio-ink">
              {title}
            </div>
            <p className="text-label-sm text-portfolio-muted">{description}</p>
          </div>
          <span
            aria-hidden="true"
            className="shrink-0 rounded-corner-full bg-portfolio-ink p-lg text-on-brand transition-transform group-hover:translate-x-xs"
          >
            <ArrowRight size={24} />
          </span>
        </div>
      </div>
    </div>
  )
}

// MD 카드: 실제 채널(쿠팡·카카오 선물하기) 프로젝트 썸네일
function MdPreview() {
  return (
    <div className="grid size-full grid-cols-2 gap-md bg-portfolio-soft p-lg">
      {MD_PREVIEW.map((item) => (
        <div
          key={item.key}
          aria-hidden="true"
          className="flex items-center justify-center overflow-hidden rounded-corner-md [&>div>svg]:h-20 [&>div>svg]:w-auto"
          style={{ background: item.bg }}
        >
          {item.svg && (
            <div dangerouslySetInnerHTML={{ __html: item.svg }} />
          )}
        </div>
      ))}
    </div>
  )
}

// 디자인 카드: 실제 작업물 콜라주
function DesignPreview() {
  return (
    <div className="grid size-full grid-cols-4 gap-md bg-portfolio-sage p-lg">
      {DESIGN_PREVIEW.map((item) => (
        <div
          key={item.key}
          className="overflow-hidden rounded-corner-md bg-white"
        >
          <img
            src={item.image}
            alt=""
            aria-hidden="true"
            className="size-full object-cover object-top"
          />
        </div>
      ))}
    </div>
  )
}

function MdProjectCard({
  project,
  onClick,
}: {
  project: Project
  onClick: () => void
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onClick()
        }
      }}
      className="md-project-card group cursor-pointer overflow-hidden rounded-corner-lg border border-border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-ink"
    >
      <div className="flex aspect-video items-center justify-center overflow-hidden bg-portfolio-soft">
        {project.thumbImage ? (
          <img
            src={project.thumbImage}
            alt={plainTitle(project)}
            className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : project.thumbSvg ? (
          <div
            className="flex size-full items-center justify-center transition-transform duration-500 group-hover:scale-105"
            dangerouslySetInnerHTML={{ __html: project.thumbSvg }}
          />
        ) : null}
      </div>
      <div className="flex items-end justify-between gap-xl p-xl">
        <div className="flex flex-col gap-xs">
          <span className="text-video-title text-portfolio-accent-text">
            MD · {project.year}
          </span>
          <div className="whitespace-pre-line text-heading font-display text-portfolio-ink">
            {project.title}
          </div>
          <p className="text-label-sm text-portfolio-muted">{project.desc}</p>
        </div>
        <span
          aria-hidden="true"
          className="shrink-0 text-portfolio-accent transition-transform group-hover:translate-x-xs"
        >
          <ArrowRight size={24} />
        </span>
      </div>
    </div>
  )
}

function DesignWorkCard({
  work,
  onClick,
}: {
  work: DesignWork
  onClick: () => void
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${workAlt(work)} 확대해서 보기`}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onClick()
        }
      }}
      className="design-work-card group relative mb-xl cursor-zoom-in overflow-hidden rounded-corner-lg border border-border-primary break-inside-avoid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-ink"
    >
      {/* 원본 비율 유지. 매우 긴 상세페이지만 상단 일부로 제한 */}
      <div className="relative overflow-hidden bg-white p-md" style={{ maxHeight: 520 }}>
        <img
          src={work.image.src}
          alt={workAlt(work)}
          loading="lazy"
          className="h-auto w-full rounded-corner-md transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span
          aria-hidden="true"
          className="absolute right-lg top-lg rounded-corner-full bg-portfolio-ink p-sm text-on-brand opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <ZoomIn size={16} />
        </span>
      </div>
      <div className="flex flex-col gap-xs p-lg">
        <span className="text-video-title text-portfolio-accent-text">
          DESIGN · {work.project.year}
        </span>
        <div className="line-clamp-2 text-label-sm font-bold text-portfolio-ink">
          {plainTitle(work.project)}
        </div>
      </div>
    </div>
  )
}
