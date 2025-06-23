"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

// This will be populated on the client
let SpeechRecognition: any = null;

export const useSpeechRecognition = (onResult: (transcript: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSupport, setHasSupport] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Use refs to hold the latest value of the callback and listening state
  // This allows our main useEffect to run only once while still accessing fresh state.
  const onResultRef = useRef(onResult);
  const isListeningRef = useRef(isListening);

  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);


  useEffect(() => {
    // This effect runs once on mount to set up the speech recognition object
    if (typeof window === 'undefined') return;

    SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setHasSupport(false);
      return;
    }
    setHasSupport(true);

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    recognition.onresult = (event: any) => {
      const last = event.results.length - 1;
      const transcript = event.results[last][0].transcript.trim();
      onResultRef.current(transcript);
    };

    recognition.onerror = (event: any) => {
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        setError(`Speech recognition error: ${event.error}`);
      }
      // If there's an error, we should stop listening.
      setIsListening(false);
    };
    
    recognition.onend = () => {
      // If recognition ends, but our state says we should still be listening,
      // it means it stopped unexpectedly. So, we restart it.
      if (isListeningRef.current) {
        recognition.start();
      }
    };

    // Cleanup on unmount
    return () => {
      recognition.abort();
    };
  }, []); // Empty dependency array ensures this runs only once.

  // These callbacks are now stable and won't change on re-renders, preventing errors.
  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
        recognitionRef.current.start();
        setIsListening(true);
        setError(null);
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
      if (recognitionRef.current && isListening) {
          recognitionRef.current.stop(); // This will trigger onend, but isListeningRef will be false
          setIsListening(false);
      }
  }, [isListening]);


  return { isListening, error, startListening, stopListening, hasSupport };
};
