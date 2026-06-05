Screeny aplikacji wygenerowane automatycznie (Playwright).
Ponowne wygenerowanie:
  cd frontend
  # ustaw VITE_* z .env.example + VITE_SCREENSHOT_MODE=true
  npm run build && npx vite preview --host 127.0.0.1 --port 4173
  # w drugim terminalu:
  $env:BASE_URL="http://127.0.0.1:4173"; npm run capture-screenshots
