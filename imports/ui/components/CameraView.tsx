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
  const [isLoading, setIsLoading] = useState(false);
  const [activeCamera, setActiveCamera] = useState<"BACK" | "FRONT">("BACK");

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const calculateDimensions = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    return {
      x: 0,
      y: 0,
      width: screenWidth,
      height: screenHeight,
    };
  };

  const startCamera = async () => {
    try {
      setIsLoading(true);
      const dimensions = calculateDimensions();
      const options = {
        ...dimensions,
        camera: window.CameraPreview.CAMERA_DIRECTION.BACK,
        toBack: true,
        tapPhoto: true,
        tapFocus: true,
        previewDrag: false,
        alpha: 1,
      };

      await window.CameraPreview.startCamera(options);
      setIsCameraStarted(true);
    } catch (error) {
      console.error("Failed to start camera:", error);
    } finally {
      setIsLoading(false);
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
    if (isLoading) return;

    try {
      setIsLoading(true);
      await window.CameraPreview.switchCamera();
      setActiveCamera((prev) => (prev === "BACK" ? "FRONT" : "BACK"));
    } catch (error) {
      console.error("Failed to switch camera:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-1 bg-transparent">
      <div className="absolute inset-x-0 bottom-20 flex items-center justify-center">
        <button
          onClick={switchCamera}
          disabled={isLoading}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white/30"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
      </div>
    </div>
  );
};
