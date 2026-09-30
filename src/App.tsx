import { ConnectionInfoCard } from './components/ConnectionInfoCard'
import { IpDisplay } from './components/IpDisplay'
import { PrivacyNotice } from './components/PrivacyNotice'
import { TorGuide } from './components/TorGuide'
import { useClientIp } from './hooks/useClientIp'

function App() {
  const { status, ip, detectedAt, refresh } = useClientIp()

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 bg-[#050506] px-6 py-12 sm:gap-12 sm:py-16">
      <div className="flex flex-col items-center gap-2">
        <p className="font-mono text-xs font-bold tracking-[0.3em] text-zinc-400 sm:text-sm">
          컴퓨터네트워크 9조
        </p>
        <p className="font-mono text-[11px] tracking-[0.4em] text-zinc-600 sm:text-xs">
          네트워크 데모
        </p>
      </div>

      <IpDisplay status={status} ip={ip} onRefresh={refresh} />

      <ConnectionInfoCard ip={ip} detectedAt={detectedAt} />

      <TorGuide />

      <PrivacyNotice />
    </main>
  )
}

export default App
