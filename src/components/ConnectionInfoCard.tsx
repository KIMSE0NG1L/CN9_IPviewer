interface ConnectionInfoCardProps {
  ip: string | null
  detectedAt: Date | null
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800 py-2.5 last:border-b-0">
      <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase sm:text-xs">
        {label}
      </span>
      <span className="font-mono text-sm text-zinc-200 tabular-nums sm:text-base">{value}</span>
    </div>
  )
}

export function ConnectionInfoCard({ ip, detectedAt }: ConnectionInfoCardProps) {
  return (
    <div className="w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-950/60 px-5 py-1 backdrop-blur-sm">
      <Row label="IP 주소" value={ip ?? '—'} />
      <Row label="프로토콜" value="HTTPS" />
      <Row label="네트워크" value="Vercel Edge" />
      <Row label="감지 시각" value={detectedAt ? detectedAt.toLocaleTimeString('ko-KR') : '—'} />
    </div>
  )
}
