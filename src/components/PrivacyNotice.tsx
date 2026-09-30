export function PrivacyNotice() {
  return (
    <footer className="w-full max-w-2xl border-t border-zinc-800 pt-6 text-center">
      <p className="font-mono text-[11px] text-zinc-600 sm:text-xs">
        이 데모는 사용자의 IP 주소나 접속 기록을 저장하지 않습니다.
      </p>
      <p className="mt-1 font-mono text-[11px] text-zinc-700 sm:text-xs">
        Tor와 네트워크 프라이버시 이해를 위한 교육용 시연입니다.
      </p>
    </footer>
  )
}
