import { test, expect } from '@playwright/test';

test('create subject area', async ({ page }) => {
  await page.goto('/start');
  await page.getByRole('button', { name: 'Создать предметную область' }).click();
  await page.getByPlaceholder('Название').fill('Новая ПО');
  await page.getByPlaceholder('Описание').fill('Описание новой ПО');
  await page.getByRole('button', { name: 'Создать' }).click();
});

test('open subject area', async ({ page }) => {
  await page.goto('/start');
  await page.getByRole('button', { name: 'Открыть предметную область' }).click();
  await page.getByText('Пошив шляп').click();
  await page.getByRole('button', { name: 'Выбрать' }).click();

  await page.goto('/work-field');
  await expect(page.getByText('"Пошив шляп"', { exact: true })).toBeVisible();
});

test('open project and add node', async ({ page }) => {
  await page.goto('/start');
  await page.getByRole('button', { name: 'Открыть предметную область' }).click();
  await page.getByText('Пошив шляп').click();
  await page.getByRole('button', { name: 'Выбрать' }).click();

  await page.goto('/work-field');
  await expect(page.getByText('Модели', { exact: true })).toBeVisible();
  await page.getByText('Модели', { exact: true }).click();
  await expect(page.getByText('Работа цеха', { exact: true })).toBeVisible();
  await page.getByText('Работа цеха').click();

  await page.getByRole('button', { name: 'Модель' }).click();
  await expect(page.getByText('Добавить узел', { exact: true })).toBeEnabled();
  await page.getByText('Добавить узел').click();

});

test('open project and start simulation', async ({ page, context }, testInfo) => {
  const startTime = Date.now();

  await page.goto('/start');
  await page.getByRole('button', { name: 'Открыть предметную область' }).click();
  await page.getByText('Пошив шляп').click();
  await page.getByRole('button', { name: 'Выбрать' }).click();

  await page.goto('/work-field');
  await expect(page.getByText('Модели', { exact: true })).toBeVisible();
  await page.getByText('Модели', { exact: true }).click();
  await expect(page.getByText('Работа цеха', { exact: true })).toBeVisible();
  await page.getByText('Работа цеха').click();

  await page.getByRole('button', { name: 'Проигрывание' }).click();
  await expect(page.getByRole('button', { name: 'Старт' })).toBeEnabled();
  await page.getByRole('button', { name: 'Старт' }).click();

  const endTime = Date.now();
  console.log(`Тест ${testInfo.workerIndex} завершился за ${(endTime - startTime) / 1000}s`);
});

test('start simulation and download excel', async ({ page }) => {
  await page.goto('/start');
  await page.getByRole('button', { name: 'Открыть предметную область' }).click();
  await page.getByText('Пошив шляп').click();
  await page.getByRole('button', { name: 'Выбрать' }).click();

  await page.goto('/work-field');
  await expect(page.getByText('Модели', { exact: true })).toBeVisible();
  await page.getByText('Модели', { exact: true }).click();
  await expect(page.getByText('Работа цеха', { exact: true })).toBeVisible();
  await page.getByText('Работа цеха').click();

  await page.getByRole('button', { name: 'Проигрывание' }).click();
  await expect(page.getByRole('button', { name: 'Старт' })).toBeEnabled();
  await page.getByRole('button', { name: 'Старт' }).click();

  await page.getByRole('button', { name: 'Проигрывание' }).click();
  await expect(page.getByRole('button', { name: 'Скачать файл статистики .xlsx' })).toBeEnabled();
  await page.getByRole('button', { name: 'Скачать файл статистики .xlsx' }).click();
});
