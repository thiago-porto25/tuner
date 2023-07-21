import type { Permission } from 'react-native';
import { PermissionsAndroid, Platform } from 'react-native';

export default async function requestPermissions(
  permissions: Permission[],
  successCallback?: () => void,
  deniedCallback?: () => void,
  errorCallback?: () => void,
) {
  if (Platform.OS === 'android') {
    try {
      const grants = await PermissionsAndroid.requestMultiple([...permissions]);

      const hasDeniedPermission = permissions.some(
        permission => grants[permission] !== PermissionsAndroid.RESULTS.GRANTED,
      );

      if (hasDeniedPermission) {
        if (deniedCallback) deniedCallback();
        return;
      }

      if (successCallback) successCallback();
    } catch (err) {
      if (errorCallback) errorCallback();
    }
  }
}
