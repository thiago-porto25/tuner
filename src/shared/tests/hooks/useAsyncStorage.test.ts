import AsyncStorage from '@react-native-async-storage/async-storage';

import AsyncStorageKeys from '@/shared/constants/asyncStorageKeys.constants';
import useAsyncStorage from '@/shared/hooks/useAsyncStorage';

describe('useAsyncStorage', () => {
  const { getData, storeData } = useAsyncStorage();

  it('should get data from AsyncStorage correctly', async () => {
    const key = AsyncStorageKeys.__EXISTENT_KEY__;
    const mockValue = 'exampleValue';

    // @ts-ignore - mockResolvedValueOnce is not recognized by TS
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockValue));

    const result = await getData<string>(key);

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toEqual(mockValue);
  });

  it('should return null when getting data does not exist in AsyncStorage', async () => {
    const key = AsyncStorageKeys.__NON_EXISTENT_KEY__;

    // @ts-ignore - mockResolvedValueOnce is not recognized by TS
    AsyncStorage.getItem.mockResolvedValueOnce(null);

    const result = await getData<string>(key);

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toBeNull();
  });

  it('should handle errors when getting data from AsyncStorage', async () => {
    const key = AsyncStorageKeys.__EXAMPLE_KEY__;

    // @ts-ignore - mockResolvedValueOnce is not recognized by TS
    AsyncStorage.getItem.mockRejectedValueOnce(new Error('Some error'));

    const result = await getData<string>(key);

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toBeNull();
  });

  it('should store data in AsyncStorage correctly', async () => {
    const key = AsyncStorageKeys.__EXAMPLE_KEY__;
    const value = 'exampleValue';

    await storeData(key, value);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value),
    );
  });

  it('should handle errors when storing data in AsyncStorage', async () => {
    const key = AsyncStorageKeys.__EXAMPLE_KEY__;
    const value = 'exampleValue';

    // @ts-ignore - mockResolvedValueOnce is not recognized by TS
    AsyncStorage.setItem.mockRejectedValueOnce(new Error('Some error'));

    await storeData(key, value);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value),
    );
  });
});
