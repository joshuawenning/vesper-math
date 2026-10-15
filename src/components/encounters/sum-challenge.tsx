import type { Challenge } from '@/lib/types';

export default function SumChallenge({ challenge, selected, onChange }: { challenge: Extract<Challenge, { kind: 'sum' }>; selected: number[]; onChange: (selected: number[]) => void }) {
  return <div className="toolbox"><div className="planks">{challenge.planks.map(length => <button type="button" key={length} className={`plank ${selected.includes(length) ? 'selected' : ''}`} style={{ width: 45 + length * 9 }} aria-pressed={selected.includes(length)} onClick={() => onChange(selected.includes(length) ? selected.filter(n => n !== length) : selected.length < challenge.count ? [...selected, length] : selected)}>{length} ft</button>)}</div><p className="meter" aria-live="polite">{selected.length} of {challenge.count} planks · <strong>{selected.reduce((a, b) => a + b, 0)} / {challenge.target} {challenge.unit}</strong></p></div>;
}
