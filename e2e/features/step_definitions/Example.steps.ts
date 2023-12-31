import { Before, Given, Then, When } from '@cucumber/cucumber';
import { by, device, element, expect } from 'detox';

import testId from '../../../src/shared/constants/testIDs.constants';

Before(async () => {
  await device.launchApp();
});

Given('this is a given', () => {
  return 'passed';
});

When('this is a when', () => {
  return 'passed';
});

Then('this is a then', async () => {
  await expect(element(by.id(testId.TUNER_SCREEN))).toBeVisible();

  return 'passed';
});
