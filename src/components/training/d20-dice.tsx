export default function D20Dice({
  a,
  b,
  round,
  onRoll,
}: {
  a: number;
  b: number;
  round: number;
  onRoll: (index: 0 | 1) => void;
}) {
  return (
    <fieldset className="my-5">
      <legend className="text-sm font-medium">Your D20s · tap either die to reroll it</legend>
      <div className="mt-3 flex justify-center gap-5">
        {([a, b] as const).map((value, index) => (
          <button
            key={`${round}-${index}`}
            type="button"
            onClick={() => onRoll(index as 0 | 1)}
            aria-label={`Roll ${index === 0 ? 'left' : 'right'} D20, currently ${value}`}
            className="size-28 rounded-xl text-[#385a48] hover:text-[#775a26] motion-safe:animate-dice-settle"
          >
            <svg
              viewBox="0 0 100 100"
              aria-hidden="true"
              className="size-full fill-[#dce3cf] stroke-current [stroke-linejoin:round] [stroke-width:1.6]"
            >
              <path d="m50 5 40 23v45L50 96 10 73V28Zm0 0L27 35l23 43 23-43ZM10 28l17 7-17 38m80-45-17 7 17 38M10 73l40 5 40-5M50 78v18M27 35h46" />
              <text
                x="50"
                y="56"
                textAnchor="middle"
                className="fill-current stroke-none font-story text-[25px] font-semibold"
              >
                {value}
              </text>
            </svg>
          </button>
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-[#43533e]">
        Each die has 20 equally likely faces. The roll sets the question; your reasoning earns
        Resolve.
      </p>
    </fieldset>
  );
}
