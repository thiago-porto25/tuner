import { I18n } from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

import getI18n from '@/shared/utils/getI18n.util';

const ptLocale = {
  languageCode: 'pt',
  countryCode: 'BR',
  languageTag: 'pt-BR',
  isRTL: false,
};

const enLocale = {
  languageCode: 'en',
  countryCode: 'US',
  languageTag: 'en-US',
  isRTL: false,
};

const getLocalesSpy = jest
  .spyOn(RNLocalize, 'getLocales')
  .mockReturnValue([enLocale, ptLocale]);

jest.mock('i18n-js', () => ({
  I18n: jest.fn().mockImplementation(() => ({
    t: jest.fn(),
  })),
}));

describe('getI18n', () => {
  const mockedI18n = I18n as jest.MockedClass<typeof I18n>;
  const en = { message1: 'Hello', message2: 'World' };
  const pt = { message1: 'Olá', message2: 'Mundo' };

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    getLocalesSpy.mockRestore();
  });

  it('should create an instance of I18n with the correct config', () => {
    getI18n({ en, pt });

    expect(mockedI18n).toHaveBeenCalledTimes(1);
    expect(mockedI18n).toHaveBeenCalledWith(
      { en, pt, ptBr: pt },
      { enableFallback: true, locale: 'en' },
    );
  });

  it('should use the language code from the first locale', () => {
    getLocalesSpy.mockReturnValueOnce([ptLocale, enLocale]);

    getI18n({ en, pt });

    expect(getLocalesSpy).toHaveBeenCalledTimes(1);
    expect(getLocalesSpy).toHaveReturnedWith([ptLocale, enLocale]);
  });
});
