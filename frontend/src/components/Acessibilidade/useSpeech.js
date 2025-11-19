import { useEffect, useRef, useState } from "react";

export default function useSpeech(defaultRate = 1) {
  const utterRef = useRef(null);
  const [voices, setVoices] = useState([]);
  const [rate, setRate] = useState(defaultRate);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState(null);

  useEffect(() => {
    function loadVoices() {
      const v = window.speechSynthesis.getVoices() || [];
      setVoices(v);
      if (v.length && !selectedVoiceURI) {
        const pt = v.find((x) => /pt(-|_)?br/i.test(x.lang));
        setSelectedVoiceURI(pt ? pt.voiceURI : v[0].voiceURI);
      }
    }
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (utterRef.current) utterRef.current.rate = rate;
  }, [rate]);

  const play = (text) => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.voiceURI === selectedVoiceURI);
    if (voice) u.voice = voice;
    u.rate = rate;

    u.onend = () => setIsPlaying(false);
    u.onerror = () => setIsPlaying(false);

    utterRef.current = u;
    window.speechSynthesis.speak(u);
    setIsPlaying(true);
  };

  const pause = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    }
  };

  const resume = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return {
    voices,
    selectedVoiceURI,
    setSelectedVoiceURI,
    rate,
    setRate,
    isPlaying,
    play,
    pause,
    resume,
    stop,
  };
}
