
App.info({
    id: 'com.yourcompany.shortsapp',
    name: 'Shorts App',
    version: '1.0.0'
  });
  
  // Set PhoneGap/Cordova preferences
  App.setPreference('Orientation', 'default');
  
  // iOS permissions
  App.info({
    ios: {
      NSCameraUsageDescription: 'This app needs camera access to take photos and videos',
      NSMicrophoneUsageDescription: 'This app needs microphone access to record videos'
    }
  });
  
  // Android permissions
  App.accessRule('android.permission.CAMERA');
  App.accessRule('android.permission.RECORD_AUDIO');
  App.accessRule('android.permission.MODIFY_AUDIO_SETTINGS');
  
  // Configure camera preview plugin
  App.configurePlugin('cordova-plugin-camera-preview'); 
  