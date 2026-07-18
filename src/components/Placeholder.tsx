export default function Placeholder({ label, h = 160 }: { label: string; h?: number | string }) {
  return <div className="ph" style={{ height: h, width: '100%' }}>{label}</div>;
}
