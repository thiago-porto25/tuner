import { Permission, PermissionsAndroid } from 'react-native';

export default async function checkMultiplePermissions(
  permissions: Permission[],
): Promise<boolean> {
  return (
    await Promise.all(permissions.map(p => PermissionsAndroid.check(p)))
  ).every(granted => granted);
}
