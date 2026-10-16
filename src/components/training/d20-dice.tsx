export default function D20Dice({ a, b, round }: { a: number; b: number; round: number }) {
  return (
    <figure className="my-4">
      <div className="flex justify-center gap-4">
        {[a, b].map((value, index) => (
          <svg
            key={`${round}-${index}`}
            viewBox="0 0 100 100"
            role="img"
            aria-label={`D20 showing ${value}`}
            className="size-24 fill-[#dce3cf] stroke-[#385a48] motion-safe:animate-dice-settle [stroke-linejoin:round] [stroke-width:1.6]"
          >
            <path d="m50 5 40 23v45L50 96 10 73V28Zm0 0L27 35l23 43 23-43ZM10 28l17 7-17 38m80-45-17 7 17 38M10 73l40 5 40-5M50 78v18M27 35h46" />
            <text
              x="50"
              y="56"
              textAnchor="middle"
              className="fill-[#385a48] stroke-none font-story text-[25px] font-semibold"
            >
              {value}
            </text>
          </svg>
        ))}
      </div>
    </figure>
  );
}
