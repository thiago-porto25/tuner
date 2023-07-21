import { I18n } from 'i18n-js';
import { getLocales } from 'react-native-localize';

import type { IndexSignatureAny } from '@/shared/types/indexSignatureAny.interface';

interface GetI18nArgs {
  en: IndexSignatureAny;
  pt: IndexSignatureAny;
}

export default function getI18n({ en, pt }: GetI18nArgs) {
  return new I18n(
    { en, pt, ptBr: pt },
    { enableFallback: true, locale: getLocales()[0].languageCode },
  );
}
