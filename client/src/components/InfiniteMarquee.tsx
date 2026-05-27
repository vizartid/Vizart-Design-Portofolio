import './InfiniteMarquee.css';

interface MarqueeItem {
  text: string;
  color: string;
}

const roles: MarqueeItem[] = [
  { text: 'Fullstack Developer', color: '#3B82F6' },
  { text: 'AI Engineer', color: '#8B5CF6' },
  { text: 'ML Engineer', color: '#EC4899' },
  { text: 'DevOps Engineer', color: '#10B981' },
  { text: 'Network Engineer', color: '#F59E0B' },
  { text: 'UI/UX Designer', color: '#6366F1' },
  { text: 'Logo Designer', color: '#EF4444' },
  { text: 'Software Developer', color: '#14B8A6' },
];

export default function InfiniteMarquee() {
  const doubled = [...roles, ...roles];

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        <div className="marquee-group">
          {doubled.map((item, i) => (
            <div className="marquee-item" key={i}>
              <div
                className="marquee-dot"
                style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
              />
              <span className="marquee-text">{item.text}</span>
            </div>
          ))}
        </div>
        <div className="marquee-group" aria-hidden="true">
          {doubled.map((item, i) => (
            <div className="marquee-item" key={`dup-${i}`}>
              <div
                className="marquee-dot"
                style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
              />
              <span className="marquee-text">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
