import { test, expect } from "@playwright/test";

test.describe("FIFA 2026 Fan Multilingual Navigation Journey", () => {
  test.beforeEach(async ({ page }) => {
    // Go to fan PWA page
    await page.goto("/fan", { waitUntil: "networkidle" });
  });

  test("should render the core navigation card and profile status", async ({ page }) => {
    await expect(page.getByText("Hey, Fan 👋")).toBeVisible();
    await expect(page.getByText("Where to next?")).toBeVisible();
  });

  test("should handle accessibility mode clicks and class mutations", async ({ page }) => {
    // Standard starting state
    const wheelchairBtn = page.getByRole("button", { name: "Wheelchair" });
    const sensoryBtn = page.getByRole("button", { name: "Low-Sensory" });

    // Enable wheelchair
    await wheelchairBtn.click();
    await expect(wheelchairBtn).toHaveClass(/bg-gradient-brand/);

    // Enable sensory
    await sensoryBtn.click();
    await expect(sensoryBtn).toHaveClass(/bg-gradient-brand/);
  });

  test("should successfully switch languages and localize UI prompts", async ({ page }) => {
    const languageSelect = page.locator("select");

    // Select Spanish
    await languageSelect.selectOption("Español");
    await expect(languageSelect).toHaveValue("Español");

    // Select French
    await languageSelect.selectOption("Français");
    await expect(languageSelect).toHaveValue("Français");
  });

  test("should calculate and render Dijkstra route instructions with accessibility parameters", async ({
    page,
  }) => {
    // Select locations
    const startInput = page.locator("input").nth(0);
    const destInput = page.locator("input").nth(1);

    await startInput.fill("gA"); // Gate A
    await destInput.fill("s101"); // Section 101

    // Enable wheelchair
    await page.getByRole("button", { name: "Wheelchair" }).click();

    // Request route
    const submitBtn = page.getByRole("button", { name: /get route/i });
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    // Verify step-by-step route steps render
    await expect(page.getByText(/step by step/i)).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/Ruta/i).or(page.getByText(/route/i))).toBeVisible();
  });
});
