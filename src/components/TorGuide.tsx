const STEPS = [
  '일반 브라우저에서 이 페이지를 연다.',
  '표시된 IP 주소를 기록한다.',
  'Tor 브라우저에서 같은 페이지를 연다.',
  '두 IP 주소를 비교한다.',
  'Tor 브라우저에서 New Identity를 실행한 뒤 다시 확인한다.',
]

export function TorGuide() {
  return (
    <section className="w-full max-w-2xl border-t border-zinc-800 pt-8">
      <h2 className="text-center font-mono text-sm tracking-[0.2em] text-zinc-300 sm:text-base">
        Tor는 웹사이트에 보이는 정보를 어떻게 바꾸는가
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-zinc-500">
        웹사이트는 보통 사용자의 인터넷 연결과 연결된 공인 IP 주소를 확인합니다. Tor 네트워크를
        통해 이 페이지에 접속하면, 웹사이트는 대신 Tor 출구 릴레이(exit relay)의 IP 주소를 보게
        됩니다.
      </p>

      <div className="mx-auto mt-6 flex max-w-sm flex-col items-stretch gap-2 font-mono text-xs sm:text-sm">
        <div className="flex items-center justify-between rounded border border-zinc-800 bg-zinc-950/60 px-4 py-2.5">
          <span className="text-zinc-400">일반 브라우저</span>
          <span className="text-zinc-600">→</span>
          <span className="text-zinc-200">내 네트워크 IP</span>
        </div>
        <div className="flex items-center justify-between rounded border border-zinc-800 bg-zinc-950/60 px-4 py-2.5">
          <span className="text-zinc-400">Tor 브라우저</span>
          <span className="text-zinc-600">→</span>
          <span className="text-emerald-400">Tor 출구 릴레이 IP</span>
        </div>
      </div>

      <ol className="mx-auto mt-6 max-w-md space-y-2 font-mono text-xs text-zinc-500 sm:text-sm">
        {STEPS.map((step, index) => (
          <li key={step} className="flex gap-3">
            <span className="text-zinc-600 tabular-nums">{index + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
