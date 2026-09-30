import { useCallback, useEffect, useRef, useState } from 'react'

export type IpStatus = 'loading' | 'success' | 'error'

interface ClientIpState {
  status: IpStatus
  ip: string | null
  detectedAt: Date | null
}

interface IpResponse {
  ip: string | null
}

export function useClientIp() {
  const [state, setState] = useState<ClientIpState>({
    status: 'loading',
    ip: null,
    detectedAt: null,
  })
  const requestId = useRef(0)

  const fetchIp = useCallback(async () => {
    const currentRequestId = ++requestId.current
    setState((prev) => ({ ...prev, status: 'loading' }))

    try {
      const response = await fetch('/api/ip', { cache: 'no-store' })
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)

      const data = (await response.json()) as IpResponse
      if (currentRequestId !== requestId.current) return
      if (!data.ip) throw new Error('IP missing from response')

      setState({ status: 'success', ip: data.ip, detectedAt: new Date() })
    } catch {
      if (currentRequestId !== requestId.current) return
      setState({ status: 'error', ip: null, detectedAt: null })
    }
  }, [])

  useEffect(() => {
    fetchIp()
  }, [fetchIp])

  return { ...state, refresh: fetchIp }
}
