export default function BrandMark() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="size-9 shrink-0 fill-none stroke-current tablet:size-10"
      strokeWidth="1.2"
      strokeLinejoin="round"
    >
      <circle cx="16" cy="16" r="14.5" />
      <g className="origin-center motion-safe:animate-spin motion-safe:[animation-duration:90s]">
        <path d="m16 6 2.5 7.5L26 16l-7.5 2.5L16 26l-2.5-7.5L6 16l7.5-2.5Z" />
        <circle cx="16" cy="16" r="2.7" />
      </g>
    </svg>
  );
}
