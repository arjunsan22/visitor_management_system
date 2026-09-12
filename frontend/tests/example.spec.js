
import { test, expect } from '@playwright/test';

test('Visitor Management System Home Page Test', async ({ page }) => {
  // 1. playwrite entering to site 
  await page.goto('http://localhost:5173');

  // 2. checking website title name is correct or not 
  await expect(page).toHaveTitle(/vms/i);
  
  await page.pause();
});
