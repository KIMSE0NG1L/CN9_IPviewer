import { useState } from 'react'
import type { IpStatus } from '../hooks/useClientIp'

interface IpDisplayProps {
  status: IpStatus
  ip: string | null
  onRefresh: () => void
}

const STATUS_COPY: Record<IpStatus, string> = {
  loading: '연결 확인 중...',
  success: '연결 감지됨',
  error: 'IP를 감지할 수 없음',
}

export function IpDisplay({ status, ip, onRefresh }: IpDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!ip) return
    try {
      await navigator.clipboard.writeText(ip)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard access denied by the browser; nothing sensitive to fall back to.
    }
  }

  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-xs font-mono tracking-[0.3em] text-zinc-500 sm:text-sm">
        당신에게 보이는 IP
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <h1
          className={`font-mono font-bold tracking-tight break-all tabular-nums sm:break-normal ${
            status === 'success'
              ? 'text-emerald-400'
              : 'text-zinc-600'
          } text-4xl sm:text-6xl md:text-7xl lg:text-8xl`}
        >
          {status === 'success' && ip}
          {status === 'loading' && '···.···.···.···'}
          {status === 'error' && '신호 없음'}
        </h1>
      </div>

      <div className="mt-5 flex items-center gap-2 font-mono text-xs tracking-widest uppercase sm:text-sm">
        <span
          className={`h-2 w-2 rounded-full ${
            status === 'success'
              ? 'bg-emerald-400'
              : status === 'error'
                ? 'bg-red-500'
                : 'bg-amber-400'
          }`}
        />
        <span
          className={
            status === 'success'
              ? 'text-emerald-400'
              : status === 'error'
                ? 'text-red-400'
                : 'text-amber-400'
          }
        >
          {STATUS_COPY[status]}
        </span>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          onClick={handleCopy}
          disabled={status !== 'success'}
          className="rounded border border-zinc-700 bg-zinc-900/60 px-4 py-2 font-mono text-xs tracking-widest text-zinc-300 uppercase transition-colors hover:border-emerald-500 hover:text-emerald-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-zinc-700 disabled:hover:text-zinc-300"
        >
          {copied ? '복사됨!' : '복사'}
        </button>
        <button
          type="button"
          onClick={onRefresh}
          className="rounded border border-zinc-700 bg-zinc-900/60 px-4 py-2 font-mono text-xs tracking-widest text-zinc-300 uppercase transition-colors hover:border-emerald-500 hover:text-emerald-400"
        >
          새로고침
        </button>
      </div>
    </div>
  )
}
