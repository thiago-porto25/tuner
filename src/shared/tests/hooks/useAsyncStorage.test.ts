import AsyncStorage from '@react-native-async-storage/async-storage';

import AsyncStorageKeys from '@/shared/constants/asyncStorageKeys.constants';
import useAsyncStorage from '@/shared/hooks/useAsyncStorage';

describe('useAsyncStorage', () => {
  const mockedAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;
  const { getData, storeData } = useAsyncStorage();

  it('should get data from AsyncStorage correctly', async () => {
    const key = AsyncStorageKeys.__EXISTENT_KEY__;
    const mockValue = 'exampleValue';

    mockedAsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockValue));

    const result = await getData<string>(key);

    expect(mockedAsyncStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toEqual(mockValue);
  });

  it('should return null when getting data does not exist in AsyncStorage', async () => {
    const key = AsyncStorageKeys.__NON_EXISTENT_KEY__;

    mockedAsyncStorage.getItem.mockResolvedValueOnce(null);

    const result = await getData<string>(key);

    expect(mockedAsyncStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toBeNull();
  });

  it('should handle errors when getting data from AsyncStorage', async () => {
    const key = AsyncStorageKeys.__EXAMPLE_KEY__;

    mockedAsyncStorage.getItem.mockRejectedValueOnce(new Error('Some error'));

    const result = await getData<string>(key);

    expect(mockedAsyncStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toBeNull();
  });

  it('should store data in AsyncStorage correctly', async () => {
    const key = AsyncStorageKeys.__EXAMPLE_KEY__;
    const value = 'exampleValue';

    await storeData(key, value);

    expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value),
    );
  });

  it('should handle errors when storing data in AsyncStorage', async () => {
    const key = AsyncStorageKeys.__EXAMPLE_KEY__;
    const value = 'exampleValue';

    mockedAsyncStorage.setItem.mockRejectedValueOnce(new Error('Some error'));

    await storeData(key, value);

    expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value),
    );
  });
});
