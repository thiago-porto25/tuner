import AsyncStorage from '@react-native-async-storage/async-storage';

import AsyncStorageKeys from '@/shared/constants/asyncStorageKeys.constants';

export default function useAsyncStorage() {
  async function getData<T>(key: AsyncStorageKeys): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      // TODO: save error in core error slice.
      return null;
    }
  }

  async function storeData(
    key: AsyncStorageKeys,
    value: string,
  ): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      // TODO: save error in core error slice
    }
  }

  return { getData, storeData };
}
