# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

## Commit Message Guidelines

- feat: 새로운 기능 추가
- fix: 버그 수정
- docs: 문서 변경 (README, 문서 등)
- style: 코드 포맷, 세미콜론 누락 등 (기능 변화 없음)
- refactor: 코드 리팩토링 (기능 변화 없음)
- test: 테스트 추가 또는 수정
- chore: 빌드 프로세스 또는 보조 도구 변경
- create: 새로운 파일이나 디렉토리 생성
- ui: UI 수정 또는 개선
