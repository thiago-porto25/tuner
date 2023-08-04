const en = {
  tunerScreen: {
    header: 'Tuner Pro',
    permissions: {
      neverAsk: {
        description:
          "To use this app, please grant microphone permission. It enables audio recording, which unlocks the app's full experience. Go to your device settings and grant permission for the app.",
        retryButtonLabel: 'Open settings',
      },
      denied: {
        overlayLabel: 'Clicking here does not close the modal.',
        title: 'Microphone permission required',
        description:
          "To use this app, please grant microphone permission. It enables audio recording, which unlocks the app's full experience.",
        leaveButtonLabel: 'Leave app',
        retryButtonLabel: 'Try again',
      },
      error: {
        overlayLabel: 'Clicking here does not close the modal.',
        title: 'Permission request error',
        description:
          'An error occurred while requesting permissions. Please try again to make sure the necessary permissions are granted for the app to function properly.',
        retryButtonLabel: 'Try again',
      },
    },
  },
};
const pt = {
  tunerScreen: {
    header: 'Afinador Pro',
    permissions: {
      neverAsk: {
        description:
          'Para usar este aplicativo, por favor, conceda permissão de acesso ao microfone. Isso possibilita a gravação de áudio, o que desbloqueia a experiência completa do aplicativo. Vá para as configurações do seu dispositivo e conceda permissão para o aplicativo.',
        retryButtonLabel: 'Abrir configurações',
      },
      denied: {
        overlayLabel: 'Clicar aqui não fecha o modal.',
        title: 'Permissão de microfone necessária',
        description:
          'Para usar este aplicativo, por favor, conceda permissão de acesso ao microfone. Isso possibilita a gravação de áudio, o que desbloqueia a experiência completa do aplicativo.',
        leaveButtonLabel: 'Sair do aplicativo',
        retryButtonLabel: 'Tentar novamente',
      },
      error: {
        overlayLabel: 'Clicar aqui não fecha o modal.',
        title: 'Erro ao solicitar permissão',
        description:
          'Um erro ocorreu ao solicitar permissões. Por favor, tente novamente para garantir que as permissões necessárias sejam concedidas para o aplicativo funcionar corretamente.',
        retryButtonLabel: 'Tentar novamente',
      },
    },
  },
};

export { en, pt };
