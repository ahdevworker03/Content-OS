test.afterEach(async ({ page }) => {
  await requestReset(page, e2eOwner.email);
  await page.goto(await readLatestResetUrl(e2eOwner.email));
  await confirmReset(page, e2eOwner.password);
});

test("seeded owner password remains available after the reset scenario", async ({
  page,
}) => {
  await page.goto("/login");
  await login(page, e2eOwner.password);
  await expect(page).toHaveURL(/\/$/);
});
