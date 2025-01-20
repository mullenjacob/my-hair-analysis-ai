"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Camera, RefreshCw } from "lucide-react";

interface CameraProps {
  onCapture: (imageData: string) => void;
}

export function CameraComponent({ onCapture }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        },
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        setError("");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to access camera. Please check permissions."
      );
      setIsStreaming(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  }, []);

  const captureImage = useCallback(() => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL("image/jpeg");
      onCapture(imageData);
      stopCamera();
    }
  }, [onCapture, stopCamera]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="flex flex-col items-center gap-4">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
        {!isStreaming ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <Camera className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Click "Start Camera" to begin
            </p>
          </div>
        ) : null}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className={`h-full w-full object-cover ${
            isStreaming ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="flex gap-2">
        {!isStreaming ? (
          <Button onClick={startCamera} size="lg">
            <Camera className="mr-2 h-4 w-4" />
            Start Camera
          </Button>
        ) : (
          <>
            <Button onClick={captureImage} size="lg" variant="default">
              <Camera className="mr-2 h-4 w-4" />
              Capture Photo
            </Button>
            <Button onClick={startCamera} size="lg" variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </>
        )}
      </div>
    </div>
  );
}