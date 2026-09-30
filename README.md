# Network Demo — Your Visible IP

Tor 네트워크 발표용 실습 사이트. 서버가 관측한 클라이언트의 공인 IP를 화면에 표시하여, 일반 브라우저와 Tor Browser에서의 차이를 시연한다.

- IP는 저장/기록하지 않으며, 외부 IP 조회 API로 전송하지 않는다.
- `/api/ip`는 Vercel이 신뢰하는 `x-vercel-forwarded-for` → `x-forwarded-for` → `x-real-ip` → 소켓 주소 순으로 클라이언트 IP를 읽어 그대로 반환한다 (`api/_utils/extractClientIp.ts`).

## 로컬 실행

```bash
npm install
npm run dev
```

`http://localhost:5173` 접속. `vite.config.ts`의 개발용 미들웨어가 `/api/ip`를 로컬에서도 동작시키지만, localhost에서는 루프백 주소(`::1` 등)가 표시되는 것이 정상이다. 실제 공인 IP 비교는 배포 후 확인한다.

## Vercel 배포

```bash
npm i -g vercel   # 최초 1회
vercel            # 로그인 및 프로젝트 연결, 프리뷰 배포
vercel --prod     # 프로덕션 배포
```

또는 GitHub 저장소를 Vercel 프로젝트로 연결하면 push 시 자동 배포된다. 별도 설정 없이 Vite 빌드(`npm run build`)와 `api/ip.ts` 서버리스 함수가 함께 배포된다.

배포 후:
1. Chrome 등 일반 브라우저로 접속 → `YOUR VISIBLE IP`에 실제 공인 IP 표시
2. Tor Browser로 같은 URL 접속 → Tor exit relay IP 표시
3. Tor Browser에서 New Identity 실행 후 REFRESH 버튼으로 재조회하면 다른 exit relay IP가 표시될 수 있다
