
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface VoiceSearchProps {
  onResult: (transcript: string) => void;
}

export function VoiceSearch({ onResult }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  // Check if browser supports speech recognition
  useEffect(() => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      setIsSupported(false);
      console.warn("Speech recognition not supported by this browser");
    }
  }, []);

  const toggleListening = () => {
    if (!isSupported) {
      toast({
        title: "Not Supported",
        description: "Voice search is not supported in your browser",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      stopListening();
      return;
    }

    setIsListening(true);
    
    // Speech recognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Configure recognition
    recognition.lang = language === "fr" ? "fr-FR" : 
                      language === "es" ? "es-ES" : 
                      language === "ar" ? "ar-SA" : "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      toast({
        title: "Voice search",
        description: `"${transcript}"`,
      });
      setIsListening(false);
    };
    
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      toast({
        title: "Voice recognition error",
        description: event.error,
        variant: "destructive",
      });
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.stop();
  };

  if (!isSupported) {
    return null;
  }

  return (
    <Button
      size="icon"
      variant={isListening ? "default" : "outline"}
      onClick={toggleListening}
      className={`${isListening ? "animate-pulse bg-red-500 hover:bg-red-600" : ""}`}
      title={t("searchByVoice")}
      aria-label={t("searchByVoice")}
    >
      {isListening ? (
        <MicOff className="h-4 w-4" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  );
}

// Add TypeScript definitions for the Speech Recognition API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
