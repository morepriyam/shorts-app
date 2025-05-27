App.info({
    id: 'com.yourcompany.shortsapp',
    name: 'Shorts App',
    version: '1.0.0',
    description: 'A short-form video creation app'
  });
  
  // Essential iOS permissions in Info.plist
  // Only including permissions that are currently being used
  App.appendToConfig(`
    <platform name="ios">
      <!-- Camera permission - Currently used by camera preview -->
      <config-file target="*-Info.plist" parent="NSCameraUsageDescription">
        <string>Camera access is needed to record short videos</string>
      </config-file>

      <!-- Microphone permission - Required for video recording -->
      <config-file target="*-Info.plist" parent="NSMicrophoneUsageDescription">
        <string>Microphone access is needed to record audio in your videos</string>
      </config-file>
    </platform>
  `);
  
  // Essential Android permissions
  // Only the minimum required for camera preview
  App.accessRule('android.permission.CAMERA');           // Required for camera access
  App.accessRule('android.permission.RECORD_AUDIO');     // Required for video audio
  
  // Core app preferences
  App.setPreference('Orientation', 'default');          // Allow both portrait and landscape
  App.setPreference('SwiftVersion', '5.0');            // Use latest Swift version
  App.setPreference('deployment-target', '13.0');       // Minimum iOS version
  App.setPreference('WKWebViewOnly', 'true');          // Use modern WebView only
  
  // Camera plugin configuration
  App.configurePlugin('cordova-plugin-camera-preview', {
    THREAD_SAFE: true,                    // Enable thread safety
    USE_MAIN_THREAD: true,                // Run UI operations on main thread
    BACKGROUND_COLOR: '#000000',          // Black background for camera view
    ENABLE_HIGH_RESOLUTION: true          // Use highest available resolution
  }); 
  