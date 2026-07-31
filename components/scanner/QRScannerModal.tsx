'use client';

import React, { useState, useEffect, useRef } from 'react';
import jsQR from 'jsqr';
import {
  Camera,
  Upload,
  X,
  Copy,
  Check,
  ExternalLink,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Wifi,
  Globe,
  Contact,
  Mail,
  MessageSquare,
  FileText,
  Volume2,
  VolumeX,
  ArrowRight,
  AlertCircle,
  Download,
} from 'lucide-react';
import { useLanguage } from '../providers/LanguageProvider';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyToGenerator?: (scannedData: string) => void;
}

export function QRScannerModal({ isOpen, onClose, onApplyToGenerator }: QRScannerModalProps) {
  const { dict } = useLanguage();
  const [activeTab, setActiveTab] = useState<'camera' | 'upload'>('camera');
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [decodedResult, setDecodedResult] = useState<{ text: string; format?: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashOn, setFlashOn] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sound beep synthesizer using Web Audio API
  const playBeep = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Audio context error ignore
    }
  };

  // Start Camera Stream
  const startCamera = async () => {
    setCameraError(null);
    setHasCameraPermission(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Camera access is not supported by your browser or environment.');
        setHasCameraPermission(false);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        setHasCameraPermission(true);
        setIsScanning(true);
      }
    } catch (err: unknown) {
      console.error('Camera error:', err);
      const errorMsg = err instanceof Error ? err.message : 'Unable to access camera';
      setCameraError(errorMsg.includes('Permission denied') ? 'Camera permission was denied. Please allow camera access in browser settings.' : 'Could not initialize camera feed.');
      setHasCameraPermission(false);
      setIsScanning(false);
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  // Continuous frame scanning loop
  const scanFrame = () => {
    if (!videoRef.current || videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA) {
      if (isOpen && activeTab === 'camera' && !decodedResult) {
        animFrameRef.current = requestAnimationFrame(scanFrame);
      }
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    canvasRef.current = canvas;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'attemptBoth',
      });

      if (code && code.data && code.data.trim()) {
        playBeep();
        setDecodedResult({ text: code.data });
        stopCamera();
        return;
      }
    }

    if (isOpen && activeTab === 'camera' && !decodedResult) {
      animFrameRef.current = requestAnimationFrame(scanFrame);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isOpen && activeTab === 'camera' && !decodedResult) {
      const timer = setTimeout(() => {
        if (isMounted) startCamera();
      }, 0);
      return () => {
        isMounted = false;
        clearTimeout(timer);
        stopCamera();
      };
    } else {
      const timer = setTimeout(() => {
        stopCamera();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, activeTab, decodedResult]);

  useEffect(() => {
    if (isScanning && !decodedResult) {
      animFrameRef.current = requestAnimationFrame(() => scanFrame());
    }
  }, [isScanning, decodedResult]);

  // Decode Image File
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'attemptBoth',
          });

          if (code && code.data) {
            playBeep();
            setDecodedResult({ text: code.data });
          } else {
            alert('No valid QR code could be detected in this image. Please try a clearer or higher resolution photo.');
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = () => {
    if (!decodedResult) return;
    navigator.clipboard.writeText(decodedResult.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetScan = () => {
    setDecodedResult(null);
    if (activeTab === 'camera') {
      startCamera();
    }
  };

  if (!isOpen) return null;

  // Smart detect scanned type
  const isUrl = decodedResult?.text.startsWith('http://') || decodedResult?.text.startsWith('https://');
  const isWifi = decodedResult?.text.startsWith('WIFI:');
  const isVcard = decodedResult?.text.startsWith('BEGIN:VCARD');
  const isEmail = decodedResult?.text.startsWith('mailto:') || decodedResult?.text.startsWith('MATMSG:');
  const isSms = decodedResult?.text.startsWith('smsto:') || decodedResult?.text.startsWith('sms:');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4 dark:border-slate-800 dark:bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <Camera className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                QR Code Camera Scanner
              </h2>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Decode QR codes instantly via webcam or image upload
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
              title={soundEnabled ? 'Mute Scan Sound' : 'Enable Scan Sound'}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4 text-blue-600" /> : <VolumeX className="h-4 w-4 text-slate-400" />}
            </button>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        {!decodedResult && (
          <div className="flex border-b border-slate-200 bg-slate-100/60 p-1 dark:border-slate-800 dark:bg-slate-950">
            <button
              onClick={() => setActiveTab('camera')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-xs font-semibold transition-colors ${
                activeTab === 'camera'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Camera className="h-4 w-4 text-blue-500" />
              <span>Use Camera Feed</span>
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-xs font-semibold transition-colors ${
                activeTab === 'upload'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Upload className="h-4 w-4 text-indigo-500" />
              <span>Upload QR Image</span>
            </button>
          </div>
        )}

        {/* Main Content Area */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* DECODED RESULT VIEW */}
          {decodedResult ? (
            <div className="space-y-5 animate-in zoom-in-95 duration-200">
              <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 dark:bg-emerald-950/40 dark:border-emerald-900/60">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md shadow-emerald-500/20">
                  <Check className="h-6 w-6 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
                    QR Code Decoded Successfully!
                  </h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400">
                    Target payload extracted in client-side memory.
                  </p>
                </div>
              </div>

              {/* Payload Details Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    {isUrl && <Globe className="h-4 w-4 text-blue-500" />}
                    {isWifi && <Wifi className="h-4 w-4 text-sky-500" />}
                    {isVcard && <Contact className="h-4 w-4 text-indigo-500" />}
                    {isEmail && <Mail className="h-4 w-4 text-orange-500" />}
                    {isSms && <MessageSquare className="h-4 w-4 text-emerald-500" />}
                    {!isUrl && !isWifi && !isVcard && !isEmail && !isSms && <FileText className="h-4 w-4 text-slate-500" />}
                    <span>Decoded Payload Content:</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400">
                    {isUrl ? 'URL Web Link' : isWifi ? 'Wi-Fi Network' : isVcard ? 'vCard Contact' : isEmail ? 'Email Address' : isSms ? 'SMS Message' : 'Plain Text'}
                  </span>
                </div>

                <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-800 break-all dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 max-h-48 overflow-y-auto">
                  {decodedResult.text}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  onClick={handleCopy}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-slate-500" />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy Payload'}</span>
                </button>

                {isUrl && (
                  <a
                    href={decodedResult.text}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Open Link in New Tab</span>
                  </a>
                )}

                {onApplyToGenerator && (
                  <button
                    onClick={() => {
                      onApplyToGenerator(decodedResult.text);
                      onClose();
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Re-encode in Generator</span>
                  </button>
                )}
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={handleResetScan}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Scan Another QR Code</span>
                </button>
              </div>
            </div>
          ) : activeTab === 'camera' ? (
            /* CAMERA SCANNER VIEW */
            <div className="space-y-4">
              <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-2xl border-2 border-slate-300 bg-slate-950 dark:border-slate-700 shadow-inner flex items-center justify-center">
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  playsInline
                  muted
                />

                {/* Scanning Frame Overlay HUD */}
                {hasCameraPermission && (
                  <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                    {/* Darkened vignette around target rectangle */}
                    <div className="relative h-56 w-56 rounded-3xl border-2 border-blue-500/80 bg-blue-500/10 shadow-[0_0_0_9999px_rgba(15,23,42,0.5)]">
                      {/* Animated Laser Scanning Line */}
                      <div className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_8px_#3b82f6] animate-[scan_2s_ease-in-out_infinite]" />
                      {/* Corner Target Markers */}
                      <div className="absolute -top-1 -left-1 h-6 w-6 border-t-4 border-l-4 border-blue-500 rounded-tl-xl" />
                      <div className="absolute -top-1 -right-1 h-6 w-6 border-t-4 border-r-4 border-blue-500 rounded-tr-xl" />
                      <div className="absolute -bottom-1 -left-1 h-6 w-6 border-b-4 border-l-4 border-blue-500 rounded-bl-xl" />
                      <div className="absolute -bottom-1 -right-1 h-6 w-6 border-b-4 border-r-4 border-blue-500 rounded-br-xl" />
                    </div>
                    <span className="mt-4 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                      Center QR code inside frame
                    </span>
                  </div>
                )}

                {/* Camera Permission Error State */}
                {hasCameraPermission === false && (
                  <div className="p-6 text-center space-y-3 bg-slate-900 text-white">
                    <AlertCircle className="h-10 w-10 text-amber-400 mx-auto" />
                    <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                      {cameraError || 'Camera permissions are required to scan QR codes.'}
                    </p>
                    <button
                      onClick={startCamera}
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Retry Camera Access</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Client-Side Scan (No images sent to servers)</span>
                </span>
                <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400">
                  Live View
                </span>
              </div>
            </div>
          ) : (
            /* FILE UPLOAD VIEW */
            <div className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/80 p-10 text-center hover:border-blue-500 hover:bg-blue-50/40 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-blue-500/80 dark:hover:bg-blue-950/20 transition-all cursor-pointer"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300 group-hover:scale-110 transition-transform">
                  <Upload className="h-6 w-6" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-slate-800 dark:text-slate-200">
                  Select or Drag & Drop QR Image
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                  Supports PNG, JPG, WEBP, or SVG image files saved on your device
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Instant local decoding powered by HTML5 Canvas</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
