import type { Permission } from 'react-native';
import { PermissionsAndroid } from 'react-native';

export default async function requestPermissions(
  permissions: Permission[],
  successCallback?: () => void,
  deniedCallback?: () => void,
  errorCallback?: () => void,
  neverAskAgainCallback?: () => void,
) {
  try {
    const grants = await PermissionsAndroid.requestMultiple([...permissions]);

    const hasNeverAskAgainPermission = permissions.some(
      permission =>
        grants[permission] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN,
    );

    if (hasNeverAskAgainPermission) {
      if (neverAskAgainCallback) neverAskAgainCallback();
      return;
    }

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
