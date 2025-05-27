import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    CameraPreview: {
      startCamera: (options: any) => Promise<void>;
      stopCamera: () => Promise<void>;
      switchCamera: () => Promise<void>;
      CAMERA_DIRECTION: {
        BACK: string;
        FRONT: string;
      };
    };
  }
}

export const CameraPreview = () => {
  const [isCameraStarted, setIsCameraStarted] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const calculateDimensions = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // In portrait mode, use full screen dimensions
    return {
      x: 0,
      y: 0,
      width: screenWidth,
      height: screenHeight,
    };
  };

  const startCamera = async () => {
    try {
      const dimensions = calculateDimensions();
      const options = {
        ...dimensions,
        camera: window.CameraPreview.CAMERA_DIRECTION.BACK,
        toBack: false,
        tapPhoto: true,
        tapFocus: true,
        previewDrag: false,
        storeToFile: false,
        disableExifHeaderStripping: false,
        rotateWhenOrientationChanged: false,
        alpha: 1,
      };

      await window.CameraPreview.startCamera(options);
      setIsCameraStarted(true);
    } catch (error) {
      console.error("Failed to start camera:", error);
    }
  };

  const stopCamera = async () => {
    try {
      await window.CameraPreview.stopCamera();
      setIsCameraStarted(false);
    } catch (error) {
      console.error("Failed to stop camera:", error);
    }
  };

  const switchCamera = async () => {
    try {
      await window.CameraPreview.switchCamera();
    } catch (error) {
      console.error("Failed to switch camera:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black">
      <div className="relative h-full w-full">
        {isCameraStarted && (
          <div className="absolute right-0 bottom-6 left-0 z-10 flex justify-center space-x-4">
            <button
              onClick={switchCamera}
              className="rounded-full bg-white/20 p-4 backdrop-blur-sm transition-all hover:bg-white/30 active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
