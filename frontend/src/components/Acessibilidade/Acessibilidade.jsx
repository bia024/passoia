import React, { useEffect, useRef, useState } from "react";
import "./acessibilidade.scss";
import ReaderControls from "./ReaderControls";
import { logEvent } from "./accessibilityLogger";

export default function Acessibilidade() {
  const [open, setOpen] = useState(false);
  const [readerOpen, setReaderOpen] = useState(false);

  const panelRef = useRef(null);
  const firstFocusable = useRef(null);
  const lastFocusable = useRef(null);

  useEffect(() => {
    if (open) {
      const focusable = panelRef.current
        ? panelRef.current.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
          )
        : [];

      if (focusable.length > 0) {
        firstFocusable.current = focusable[0];
        lastFocusable.current = focusable[focusable.length - 1];
        firstFocusable.current.focus();
      }

      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    function handleKey(e) {
      if (!open) return;

      if (e.key === "Escape") {
        setOpen(false);
        logEvent("close_menu", "escape");
      }

      if (e.key === "Tab") {
        if (!firstFocusable.current || !lastFocusable.current) return;

        if (e.shiftKey && document.activeElement === firstFocusable.current) {
          e.preventDefault();
          lastFocusable.current.focus();
        } else if (
          !e.shiftKey &&
          document.activeElement === lastFocusable.current
        ) {
          e.preventDefault();
          firstFocusable.current.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  const toggleMenu = () => {
    setOpen((prev) => {
      const next = !prev;
      logEvent(next ? "open_menu" : "close_menu", "toggle");
      return next;
    });
  };

  const openReader = () => {
    setReaderOpen(true);
  };

  const closeReader = () => {
    setReaderOpen(false);
  };

  const readSelection = () => {
    const sel =
      (window.getSelection && window.getSelection().toString()) || "";

    if (!sel) {
      alert("Selecione o texto para ler.");
      return;
    }

    const ev = new CustomEvent("a11y-read-selection", { detail: { text: sel } });
    window.dispatchEvent(ev);
  };

  return (
    <>
      <div className="a11y-floating">
        <button
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={toggleMenu}
          aria-label="Opções de acessibilidade"
          className="a11y-btn"
        >
          ♿
        </button>
      </div>

      {open && (
        <div
          className="a11y-backdrop"
          onClick={() => setOpen(false)}
        />
      )}

      {open && (
        <div
          ref={panelRef}
          className="a11y-panel"
          role="dialog"
          aria-modal="true"
        >
          <button
            className="a11y-close"
            onClick={() => setOpen(false)}
            aria-label="Fechar painel"
          >
            ✖
          </button>

          <h3 className="a11y-title">Acessibilidade</h3>

          <div className="a11y-actions">
            <button
              onClick={() => {
                document.documentElement.style.fontSize = "110%";
              }}
            >
              A+
            </button>

            <button
              onClick={() => {
                document.documentElement.style.fontSize = "90%";
              }}
            >
              A−
            </button>

            <button
              onClick={() => document.body.classList.toggle("high-contrast")}
            >
              Contraste
            </button>

            <button onClick={readSelection}>Ler seleção</button>

            <button onClick={openReader}>Abrir leitor</button>

            <button
              onClick={() => {
                const btn = document.querySelector("[vw-access-button]");
                if (btn) btn.click();
              }}
            >
              LIBRAS
            </button>
          </div>

          <small className="a11y-footer">
            Preferências salvas automaticamente
          </small>
        </div>
      )}

        {readerOpen && <ReaderControls onClose={closeReader} />}
    </>
  );
}
