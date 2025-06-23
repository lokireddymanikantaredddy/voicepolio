"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

// This will be populated on the client
let SpeechRecognition: any = null;

export const useSpeechRecognition = (onResult: (transcript: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSupport, setHasSupport] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Client-side only check
    SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      setHasSupport(false);
      return;
    }
    setHasSupport(true);

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.onerror = (event: any) => {
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        setError(`Speech recognition error: ${event.error}`);
      }
      setIsListening(false);
    };
    
    recognition.onend = () => {
        setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onResult]);
  
  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
        recognitionRef.current.start();
        setIsListening(true);
        setError(null);
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
      if (recognitionRef.current && isListening) {
          recognitionRef.current.stop();
          setIsListening(false);
      }
  }, [isListening]);

  return { isListening, error, startListening, stopListening, hasSupport };
};
