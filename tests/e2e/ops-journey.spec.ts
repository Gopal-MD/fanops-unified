import { test, expect } from "@playwright/test";

test.describe("FIFA 2026 Operations Real-Time Monitoring Journey", () => {
  test.beforeEach(async ({ page }) => {
    // Standard ops commands view size
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/ops", { waitUntil: "networkidle" });
  });

  test("should render operations layout and AI Brief command", async ({ page }) => {
    await expect(page.getByText("FIFA 26")).toBeVisible();
    await expect(page.getByText("Live MatchDay Overview")).toBeVisible();
    await expect(page.getByRole("button", { name: /ai brief/i })).toBeVisible();
  });

  test("should navigate through all operations tabs", async ({ page }) => {
    // Map View (default)
    await expect(page.locator("h2", { hasText: "Stadium Layout Map" })).toBeVisible();

    // Crowd Density Tab
    await page.getByRole("button", { name: "Crowd Density" }).click();
    await expect(page.getByText("Density over time")).toBeVisible();

    // Incidents Board Tab
    await page.getByRole("button", { name: "Incidents" }).click();
    await expect(page.getByText("New")).toBeVisible();
    await expect(page.getByText("Resolved", { exact: true })).toBeVisible();

    // Broadcast Tab
    await page.getByRole("button", { name: "Broadcast" }).click();
    await expect(page.getByText("Broadcast Center")).toBeVisible();

    // Volunteers Tab
    await page.getByRole("button", { name: "Volunteers" }).click();
    await expect(page.getByText("Volunteer Tracking")).toBeVisible();

    // Sustainability Tab
    await page.getByRole("button", { name: "Sustainability" }).click();
    await expect(page.getByText("Sustainability Operations")).toBeVisible();
  });

  test("should successfully open AI Brief panel", async ({ page }) => {
    const briefBtn = page.getByRole("button", { name: /ai brief/i });
    await briefBtn.click();
    await expect(page.getByText(/Groq AI Situation Brief/i)).toBeVisible({ timeout: 15_000 });
  });
});
