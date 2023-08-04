import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Linking, PermissionsAndroid } from 'react-native';

import RNExitApp from 'react-native-exit-app';
import { ButtonProps } from 'react-native-paper';

import testID from '@/features/tuner/constants/testIDs.constants';
import { en, pt } from '@/features/tuner/i18n/supportedLanguages';
import { TunerPermissionsHandlerProps } from '@/features/tuner/types/tunerPermissionsHandlerProps.interface';
import ActionModal from '@/shared/components/ActionModal';
import checkMultiplePermissions from '@/shared/utils/checkMultiplePermissions.util';
import getI18n from '@/shared/utils/getI18n.util';
import requestPermissions from '@/shared/utils/requestPermissions.util';

const i18n = getI18n({ en, pt });
const permissions = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO];

function TunerPermissionsHandler({
  setArePermissionsGranted,
}: TunerPermissionsHandlerProps) {
  const [isPermissionErrorModalVisible, setIsPermissionErrorModalVisible] =
    useState(false);
  const [isPermissionDeniedModalVisible, setIsPermissionDeniedModalVisible] =
    useState(false);
  const [arePermissionsNeverAskAgain, setArePermissionsNeverAskAgain] =
    useState(false);

  function handlePermissionsDenied(): void {
    setIsPermissionErrorModalVisible(false);
    setIsPermissionDeniedModalVisible(true);
  }

  function handlePermissionsError(): void {
    setIsPermissionDeniedModalVisible(false);
    setIsPermissionErrorModalVisible(true);
  }

  function handlePermissionsNeverAskAgain(): void {
    setArePermissionsNeverAskAgain(true);
    setIsPermissionDeniedModalVisible(true);
    setIsPermissionErrorModalVisible(false);
  }

  function leaveApp(): void {
    RNExitApp.exitApp();
  }

  const handlePermissionsSuccess = useCallback(() => {
    setIsPermissionDeniedModalVisible(false);
    setIsPermissionErrorModalVisible(false);
    setArePermissionsNeverAskAgain(false);
    setArePermissionsGranted(true);
  }, [setArePermissionsGranted]);

  const requestMandatoryPermissions = useCallback(async () => {
    await requestPermissions(
      permissions,
      handlePermissionsSuccess,
      handlePermissionsDenied,
      handlePermissionsError,
      handlePermissionsNeverAskAgain,
    );
  }, [handlePermissionsSuccess]);

  const retryDeniedPermissions = useCallback(async () => {
    setIsPermissionDeniedModalVisible(false);
    setIsPermissionErrorModalVisible(false);

    if (!arePermissionsNeverAskAgain) {
      await requestMandatoryPermissions();
      return;
    }

    Linking.openSettings();
  }, [arePermissionsNeverAskAgain, requestMandatoryPermissions]);

  const retryErroredPermissions = useCallback(async () => {
    setIsPermissionErrorModalVisible(false);
    await requestMandatoryPermissions();
  }, [requestMandatoryPermissions]);

  useEffect(() => {
    async function handlePermissions(): Promise<void> {
      if (await checkMultiplePermissions(permissions)) {
        handlePermissionsSuccess();
        return;
      }

      await requestMandatoryPermissions();
    }

    handlePermissions();
  }, [handlePermissionsSuccess, requestMandatoryPermissions]);

  const deniedModalButtonsContent = useMemo(
    (): ButtonProps[] => [
      {
        mode: 'outlined',
        onPress: leaveApp,
        children: i18n.t('tunerScreen.permissions.denied.leaveButtonLabel'),
        testID: arePermissionsNeverAskAgain
          ? testID.TUNER_NEVER_ASK_PERMISSION_MODAL_LEAVE_BUTTON
          : testID.TUNER_DENIED_PERMISSION_MODAL_LEAVE_BUTTON,
        key: 1,
      },
      {
        mode: 'contained',
        onPress: retryDeniedPermissions,
        children: i18n.t(
          arePermissionsNeverAskAgain
            ? 'tunerScreen.permissions.neverAsk.retryButtonLabel'
            : 'tunerScreen.permissions.denied.retryButtonLabel',
        ),
        testID: arePermissionsNeverAskAgain
          ? testID.TUNER_NEVER_ASK_PERMISSION_MODAL_RETRY_BUTTON
          : testID.TUNER_DENIED_PERMISSION_MODAL_RETRY_BUTTON,
        key: 2,
      },
    ],
    [arePermissionsNeverAskAgain, retryDeniedPermissions],
  );

  const errorModalButtonsContent = useMemo(
    (): ButtonProps[] => [
      {
        mode: 'contained',
        onPress: retryErroredPermissions,
        children: i18n.t('tunerScreen.permissions.error.retryButtonLabel'),
        testID: testID.TUNER_ERROR_PERMISSION_MODAL_RETRY_BUTTON,
        key: 1,
      },
    ],
    [retryErroredPermissions],
  );

  return (
    <>
      <ActionModal
        buttons={deniedModalButtonsContent}
        description={i18n.t(
          arePermissionsNeverAskAgain
            ? 'tunerScreen.permissions.neverAsk.description'
            : 'tunerScreen.permissions.denied.description',
        )}
        dismissableBackButton={false}
        overlayAccessibilityLabel={i18n.t(
          'tunerScreen.permissions.denied.overlayLabel',
        )}
        testID={testID.TUNER_DENIED_PERMISSION_MODAL}
        title={i18n.t('tunerScreen.permissions.denied.title')}
        visible={isPermissionDeniedModalVisible}
      />

      <ActionModal
        buttons={errorModalButtonsContent}
        description={i18n.t('tunerScreen.permissions.error.description')}
        dismissable={false}
        dismissableBackButton={false}
        overlayAccessibilityLabel={i18n.t(
          'tunerScreen.permissions.error.overlayLabel',
        )}
        testID={testID.TUNER_ERROR_PERMISSION_MODAL}
        title={i18n.t('tunerScreen.permissions.error.title')}
        visible={isPermissionErrorModalVisible}
      />
    </>
  );
}

export default TunerPermissionsHandler;
