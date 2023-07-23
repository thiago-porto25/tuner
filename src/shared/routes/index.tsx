import { useEffect } from 'react';
import React, { PermissionsAndroid, View } from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { styled } from 'styled-components/native';

import { resetPreferencesStateAction } from '@/features/preferences/store/preferences.slice';
import { resetTunerStateAction } from '@/features/tuner/store/tuner.slice';
import routeNames from '@/shared/constants/routeNames.constants';
import testID from '@/shared/constants/testIDs.constants';
import useAppDispatch from '@/shared/hooks/useAppDispatch';
import requestPermissions from '@/shared/utils/requestPermissions.util';

const Tab = createMaterialBottomTabNavigator();

const StyledView = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 20px;
  width: 20px;
`;

function TestTuner() {
  const dispatch = useAppDispatch();

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
    dispatch(resetTunerStateAction());
  }, [dispatch]);

  return (
    <View
      testID={testID.TUNER_SCREEN}
      style={{ flex: 1, backgroundColor: 'red' }}>
      <StyledView />
    </View>
  );
}

function TestSettings() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetPreferencesStateAction());
  }, [dispatch]);

  return (
    <View
      testID={testID.PREFERENCES_SCREEN}
      style={{ flex: 1, backgroundColor: 'black' }}
    />
  );
}

export default function Routes() {
  return (
    <Tab.Navigator initialRouteName={routeNames.TUNER}>
      <Tab.Screen
        name={routeNames.TUNER}
        component={TestTuner}
        options={{ tabBarTestID: testID.TUNER_TAB_BUTTON }}
      />
      <Tab.Screen
        name={routeNames.PREFERENCES}
        component={TestSettings}
        options={{ tabBarTestID: testID.PREFERENCES_TAB_BUTTON }}
      />
    </Tab.Navigator>
  );
}
