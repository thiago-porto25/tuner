import React, { useEffect } from 'react';
import { View } from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { resetPreferencesStateAction } from '@/features/preferences/store/preferences.slice';
import Tuner from '@/features/tuner/screens/Tuner';
import routeNames from '@/shared/constants/routeNames.constants';
import testID from '@/shared/constants/testIDs.constants';
import useAppDispatch from '@/shared/hooks/useAppDispatch';

const Tab = createMaterialBottomTabNavigator();

function TestSettings() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetPreferencesStateAction());
  }, [dispatch]);

  return <View testID={testID.PREFERENCES_SCREEN} />;
}

export default function Routes() {
  return (
    <Tab.Navigator initialRouteName={routeNames.TUNER}>
      <Tab.Screen
        component={Tuner}
        name={routeNames.TUNER}
        options={{ tabBarTestID: testID.TUNER_TAB_BUTTON }}
      />
      <Tab.Screen
        component={TestSettings}
        name={routeNames.PREFERENCES}
        options={{ tabBarTestID: testID.PREFERENCES_TAB_BUTTON }}
      />
    </Tab.Navigator>
  );
}
