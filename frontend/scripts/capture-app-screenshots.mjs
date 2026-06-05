import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../../docs/screenshots/app');
const BASE_URL = process.env.BASE_URL ?? 'http://127.0.0.1:5173';

const VIEWPORT = { width: 1440, height: 900 };

async function snap(page, filename) {
  const filePath = path.join(OUT_DIR, filename);
  await page.screenshot({ path: filePath, fullPage: false });
  console.log(`saved ${filename}`);
}

async function waitForApp(page) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
}

async function openSignInModal(page) {
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('dialog').waitFor({ state: 'visible' });
  await page.waitForTimeout(500);
}

async function capturePublicViews(page) {
  await page.goto(BASE_URL);
  await waitForApp(page);
  await snap(page, 'landing.png');

  await page.goto(`${BASE_URL}/search`);
  await waitForApp(page);
  await snap(page, 'search.png');

  await page.goto(`${BASE_URL}/offer/7?Guests=1`);
  await waitForApp(page);
  await snap(page, 'offer.png');

  await page.goto(
    `${BASE_URL}/booking/checkout?offerId=7&CheckInDate=2026-07-10&CheckOutDate=2026-07-14&Guests=2`,
  );
  await waitForApp(page);
  await snap(page, 'checkout.png');

  await page.goto(`${BASE_URL}/booking/confirmation`);
  await waitForApp(page);
  await snap(page, 'booking-confirmation.png');

  await page.goto(`${BASE_URL}/my-bookings`);
  await waitForApp(page);
  await snap(page, 'my-bookings.png');

  await page.goto(BASE_URL);
  await waitForApp(page);
  await openSignInModal(page);
  await snap(page, 'login-modal.png');
  await page.keyboard.press('Escape');
}

async function captureInbox(page) {
  await page.goto(`${BASE_URL}/inbox`);
  await waitForApp(page);
  await snap(page, 'inbox.png');
}

async function captureHostViews(page) {
  await page.goto(`${BASE_URL}/host/dashboard`);
  await waitForApp(page);
  await snap(page, 'host-dashboard.png');

  await page.goto(`${BASE_URL}/host/bookings`);
  await waitForApp(page);
  await snap(page, 'host-bookings.png');

  await page.goto(`${BASE_URL}/host/calendar`);
  await waitForApp(page);
  await snap(page, 'host-calendar.png');

  await page.goto(`${BASE_URL}/host/offers/add`);
  await waitForApp(page);
  await snap(page, 'host-add-offer.png');
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  try {
    await capturePublicViews(page);
    await captureInbox(page);
    await captureHostViews(page);
  } finally {
    await page.close();
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
