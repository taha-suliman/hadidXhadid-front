// Map Tailwind size classes to px values
const sizeMap = {
  'text-xs':   '12px',
  'text-sm':   '13px',
  'text-base': '16px',
  'text-lg':   '18px',
  'text-xl':   '20px',
  'text-2xl':  '24px',
}

export default function StarRating({ rating, max = 5, size = '14px' }) {
  const fontSize = sizeMap[size] || size
  return (
    <span style={{ color: '#FFC107', fontSize, letterSpacing: 1, lineHeight: 1 }}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i}>{i < Math.round(rating) ? '★' : '☆'}</span>
      ))}
    </span>
  )
}
