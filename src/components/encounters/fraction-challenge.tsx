import type { Challenge, Support } from '@/lib/types';

export default function FractionChallenge({ challenge, fill, support, onChange }: { challenge: Extract<Challenge, { kind: 'fraction' }>; fill: number; support: Support; onChange: (fill: number) => void }) {
  return <div className="toolbox"><div className="reservoir"><div className="vessel" role="img" aria-label={`Cistern ${fill} of ${challenge.denominator} equal parts full`}>
    {Array.from({ length: challenge.denominator }, (_, i) => <div key={i} className={`quarter ${i < fill ? 'filled' : ''}`} style={{ height: `${100 / challenge.denominator}%` }}/>) }
    <div className="target-line" style={{ top: `${100 - challenge.target / challenge.denominator * 100}%` }}/></div>
    <div><div className="fraction-number" aria-live="polite">{fill}/{challenge.denominator}<small>Target: {challenge.target}/{challenge.denominator} full</small></div><div className="actions"><button className="secondary" type="button" disabled={fill === 0} aria-label="Remove one quarter" onClick={() => onChange(fill - 1)}>− ¼</button><button className="secondary" type="button" disabled={fill === challenge.denominator} aria-label="Add one quarter" onClick={() => onChange(fill + 1)}>+ ¼</button></div></div>
  </div>{support === 'guided' && <p className="meter">Four equal parts make one whole. The gold line marks ¾.</p>}</div>;
}
