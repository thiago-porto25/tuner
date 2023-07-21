import { useEffect } from 'react';
import React, { PermissionsAndroid, View } from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import routeNames from '@/shared/constants/routeNames.constants';
import requestPermissions from '@/shared/utils/requestPermissions.util';

const Tab = createMaterialBottomTabNavigator();

function TestTuner() {
  function requestMandatoryPermissions(): void {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ];

    // function handlePermissionsDenied(): void {
    //   // TODO: update a slice to show a message to the user that the permissions are required in the app
    // }

    // function handlePermissionsError(): void {
    //   // TODO: handle error, update a slice to show a message to the user that the permissions are required in the app
    // }

    requestPermissions(permissions);
  }

  useEffect(() => {
    requestMandatoryPermissions();
  }, []);

  return (
    <View
      testID={routeNames.TUNER}
      style={{ flex: 1, backgroundColor: 'red' }}
    />
  );
}

function TestSettings() {
  return (
    <View
      testID={routeNames.PREFERENCES}
      style={{ flex: 1, backgroundColor: 'black' }}
    />
  );
}

export default function Routes() {
  return (
    <Tab.Navigator initialRouteName={routeNames.TUNER}>
      <Tab.Screen name={routeNames.TUNER} component={TestTuner} />
      <Tab.Screen name={routeNames.PREFERENCES} component={TestSettings} />
    </Tab.Navigator>
  );
}
