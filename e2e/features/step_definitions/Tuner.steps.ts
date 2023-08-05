import { Before, Given, Then, When } from '@cucumber/cucumber';
import { device } from 'detox';

Before(async () => {
  await device.launchApp();
});

Given('this is a given', () => {
  return 'passed';
});

When('this is a when', () => {
  return 'passed';
});

Then('this is a then', () => {
  return 'passed';
});
