import { Permission, PermissionsAndroid } from 'react-native';

import checkMultiplePermissions from '@/shared/utils/checkMultiplePermissions.util';

jest.mock('react-native', () => ({
  PermissionsAndroid: {
    check: jest.fn(),
    PERMISSIONS: {
      CAMERA: 'android.permission.CAMERA',
      READ_CONTACTS: 'android.permission.READ_CONTACTS',
    },
  },
}));

describe('checkMultiplePermissions', () => {
  const MockedPermissionsAndroid = PermissionsAndroid as jest.Mocked<
    typeof PermissionsAndroid
  >;
  const permissionsToCheck: Permission[] = [
    MockedPermissionsAndroid.PERMISSIONS.CAMERA,
    MockedPermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  ];

  beforeEach(() => {
    MockedPermissionsAndroid.check.mockReset();
  });

  it('checks multiple permissions correctly when all are granted', async () => {
    MockedPermissionsAndroid.check.mockResolvedValueOnce(true);
    MockedPermissionsAndroid.check.mockResolvedValueOnce(true);

    const result = await checkMultiplePermissions(permissionsToCheck);

    expect(MockedPermissionsAndroid.check).toHaveBeenCalledWith(
      MockedPermissionsAndroid.PERMISSIONS.CAMERA,
    );
    expect(MockedPermissionsAndroid.check).toHaveBeenCalledWith(
      MockedPermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    );
    expect(result).toBe(true);
  });

  it('checks multiple permissions correctly when some are not granted', async () => {
    MockedPermissionsAndroid.check.mockResolvedValueOnce(true);
    MockedPermissionsAndroid.check.mockResolvedValueOnce(false);

    const result = await checkMultiplePermissions(permissionsToCheck);

    expect(MockedPermissionsAndroid.check).toHaveBeenCalledWith(
      MockedPermissionsAndroid.PERMISSIONS.CAMERA,
    );
    expect(MockedPermissionsAndroid.check).toHaveBeenCalledWith(
      MockedPermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    );
    expect(result).toBe(false);
  });

  it('checks multiple permissions correctly when none are granted', async () => {
    MockedPermissionsAndroid.check.mockResolvedValueOnce(false);
    MockedPermissionsAndroid.check.mockResolvedValueOnce(false);

    const result = await checkMultiplePermissions(permissionsToCheck);

    expect(MockedPermissionsAndroid.check).toHaveBeenCalledWith(
      MockedPermissionsAndroid.PERMISSIONS.CAMERA,
    );
    expect(MockedPermissionsAndroid.check).toHaveBeenCalledWith(
      MockedPermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    );
    expect(result).toBe(false);
  });
});
