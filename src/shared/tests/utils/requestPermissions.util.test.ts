import { PermissionsAndroid } from 'react-native';

import requestPermissions from '@/shared/utils/requestPermissions.util';

jest.mock('react-native', () => ({
  PermissionsAndroid: {
    requestMultiple: jest.fn(),
    RESULTS: {
      GRANTED: 'granted',
      DENIED: 'denied',
    },
  },
}));

describe('requestPermissions', () => {
  const mockedPermissionsAndroid = PermissionsAndroid as jest.Mocked<
    typeof PermissionsAndroid
  >;
  const permissions = ['permission1', 'permission2'];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should request permissions when all permissions are granted', async () => {
    mockedPermissionsAndroid.requestMultiple.mockResolvedValueOnce({
      permission1: PermissionsAndroid.RESULTS.GRANTED,
      permission2: PermissionsAndroid.RESULTS.GRANTED,
    });

    await requestPermissions(permissions);

    expect(mockedPermissionsAndroid.requestMultiple).toHaveBeenCalledWith(
      permissions,
    );
  });

  it('should request permissions and call successCallback when all permissions are granted', async () => {
    const successCallback = jest.fn();

    mockedPermissionsAndroid.requestMultiple.mockResolvedValueOnce({
      permission1: PermissionsAndroid.RESULTS.GRANTED,
      permission2: PermissionsAndroid.RESULTS.GRANTED,
    });

    await requestPermissions(permissions, successCallback);

    expect(mockedPermissionsAndroid.requestMultiple).toHaveBeenCalledWith(
      permissions,
    );
    expect(successCallback).toHaveBeenCalled();
  });

  it('should request permissions when at least one permission is denied', async () => {
    mockedPermissionsAndroid.requestMultiple.mockResolvedValueOnce({
      permission1: PermissionsAndroid.RESULTS.DENIED,
      permission2: PermissionsAndroid.RESULTS.GRANTED,
    });

    await requestPermissions(permissions);

    expect(mockedPermissionsAndroid.requestMultiple).toHaveBeenCalledWith(
      permissions,
    );
  });

  it('should request permissions and call deniedCallback when at least one permission is denied', async () => {
    const deniedCallback = jest.fn();

    mockedPermissionsAndroid.requestMultiple.mockResolvedValueOnce({
      permission1: PermissionsAndroid.RESULTS.DENIED,
      permission2: PermissionsAndroid.RESULTS.GRANTED,
    });

    await requestPermissions(permissions, undefined, deniedCallback);

    expect(mockedPermissionsAndroid.requestMultiple).toHaveBeenCalledWith(
      permissions,
    );
    expect(deniedCallback).toHaveBeenCalled();
  });

  it('should handle errors when an error occurs', async () => {
    mockedPermissionsAndroid.requestMultiple.mockRejectedValueOnce(
      new Error('Some error'),
    );

    await requestPermissions(permissions);

    expect(mockedPermissionsAndroid.requestMultiple).toHaveBeenCalledWith(
      permissions,
    );
  });

  it('should handle errors and call errorCallback when an error occurs', async () => {
    const errorCallback = jest.fn();

    mockedPermissionsAndroid.requestMultiple.mockRejectedValueOnce(
      new Error('Some error'),
    );

    await requestPermissions(permissions, undefined, undefined, errorCallback);

    expect(mockedPermissionsAndroid.requestMultiple).toHaveBeenCalledWith(
      permissions,
    );
    expect(errorCallback).toHaveBeenCalled();
  });
});
