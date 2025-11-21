// src/components/Acessibilidade/ReaderControls.jsx
import React, { useEffect, useState } from "react";
import "./ReaderControls.scss";
import useSpeech from "./useSpeech";
import { logEvent } from "./accessibilityLogger";

export default function ReaderControls({ onClose }) {
  const savedRate = parseFloat(localStorage.getItem("a11y_rate") || "1");
  const savedVoice = localStorage.getItem("a11y_voice") || null;

  const {
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
  } = useSpeech(savedRate);

  const [voiceLabel, setVoiceLabel] = useState("");

  useEffect(() => {
    if (savedVoice) setSelectedVoiceURI(savedVoice);
    // OBSERVAÇÃO, NÃO ESQUECER.:eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (selectedVoiceURI) {
      localStorage.setItem("a11y_voice", selectedVoiceURI);
      const v = voices.find((x) => x.voiceURI === selectedVoiceURI);
      setVoiceLabel(v ? `${v.name} ${v.lang}` : "");
    }
  }, [selectedVoiceURI, voices]);

  useEffect(() => {
    localStorage.setItem("a11y_rate", String(rate));
  }, [rate]);

  const playMain = () => {
    const main = document.querySelector("main");
    const text = main ? main.innerText : document.body.innerText;
    play(text);
    logEvent("play", "main", { rate, voice: selectedVoiceURI });
  };

  const playSelection = () => {
    const sel = (window.getSelection && window.getSelection().toString()) || "";
    if (!sel) {
      alert("Selecione o texto que deseja ouvir e clique em 'Ler seleção'.");
      return;
    }
    play(sel);
    logEvent("play", "selection", {
      length: sel.length,
      rate,
      voice: selectedVoiceURI,
    });
  };

  const handlePause = () => {
    pause();
    logEvent("pause", "", {});
  };
  const handleResume = () => {
    resume();
    logEvent("resume", "", {});
  };
  const handleStop = () => {
    stop();
    logEvent("stop", "", {});
  };

  return (
    <section className="reader-controls-panel" aria-label="Controles do leitor">
      <header className="reader-header">
        <h4>Leitor de Tela</h4>
        <button
          className="reader-close"
          onClick={onClose}
          aria-label="Fechar leitor"
        >
          ✖
        </button>
      </header>

      <div className="reader-row">
        <label htmlFor="a11y-voices">Voz</label>
        <select
          id="a11y-voices"
          value={selectedVoiceURI || ""}
          onChange={(e) => setSelectedVoiceURI(e.target.value)}
          aria-label="Selecionar voz"
        >
          {voices.map((v) => (
            <option key={v.voiceURI} value={v.voiceURI}>
              {v.name} {v.lang ? `(${v.lang})` : ""}
            </option>
          ))}
        </select>
        <div className="voice-note">{voiceLabel}</div>
      </div>

      <div className="reader-row">
        <label htmlFor="a11y-rate">Velocidade: {rate.toFixed(1)}x</label>
        <input
          id="a11y-rate"
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
          aria-valuemin="0.5"
          aria-valuemax="2"
        />
      </div>

      <div className="reader-actions">
        <button onClick={playMain} aria-label="Ler conteúdo principal">
          ▶ Ler principal
        </button>
        <button onClick={playSelection} aria-label="Ler seleção de texto">
          ▶ Ler seleção
        </button>
        <button onClick={handlePause} aria-label="Pausar leitura">
          ⏸ Pausar
        </button>
        <button onClick={handleResume} aria-label="Retomar leitura">
          ▶ Retomar
        </button>
        <button onClick={handleStop} aria-label="Parar leitura">
          ⛔ Parar
        </button>
      </div>

      <footer className="reader-foot">
        <small>Preferências salvas no navegador</small>
      </footer>
    </section>
  );
}
