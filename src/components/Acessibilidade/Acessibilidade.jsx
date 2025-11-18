//MANTER ESSE import { useState } from "react";
// import "./Acessibilidade.scss";

// export default function Acessibilidade() {
//   const [contrasteAtivo, setContrasteAtivo] = useState(false);
//   const [fonte, setFonte] = useState(100);
//   const [lendo, setLendo] = useState(false);

//   // Aumentar fonte
//   const aumentarFonte = () => {
//     const novaFonte = Math.min(fonte + 10, 200);
//     setFonte(novaFonte);
//     document.documentElement.style.fontSize = novaFonte + "%";
//   };

//   // Diminuir fonte
//   const diminuirFonte = () => {
//     const novaFonte = Math.max(fonte - 10, 70);
//     setFonte(novaFonte);
//     document.documentElement.style.fontSize = novaFonte + "%";
//   };

//   // Contraste alto
//   const toggleContraste = () => {
//     setContrasteAtivo(!contrasteAtivo);
//     document.body.classList.toggle("alto-contraste");
//   };

//   // Leitura da tela
//   const lerPagina = () => {
//     const texto = document.body.innerText;
//     const utterance = new SpeechSynthesisUtterance(texto);
//     utterance.lang = "pt-BR";
//     utterance.rate = 1;

//     window.speechSynthesis.cancel();
//     window.speechSynthesis.speak(utterance);
//     setLendo(true);

//     utterance.onend = () => setLendo(false);
//   };

//   // Pausar leitura
//   const pararLeitura = () => {
//     window.speechSynthesis.cancel();
//     setLendo(false);
//   };

//   return (
//     <div className="acessibilidade-container">
//       <button onClick={aumentarFonte} aria-label="Aumentar fonte (Zoom)">
//         A+
//       </button>

//       <button onClick={diminuirFonte} aria-label="Diminuir fonte">
//         A-
//       </button>

//       <button
//         onClick={toggleContraste}
//         aria-label="Ativar alto contraste"
//         className={contrasteAtivo ? "ativo" : ""}
//       >
//         Contraste
//       </button>

//       {!lendo ? (
//         <button onClick={lerPagina} aria-label="Ler toda a página">
//           Ler Página
//         </button>
//       ) : (
//         <button onClick={pararLeitura} aria-label="Parar leitura">
//           Parar
//         </button>
//       )}

//       <button
//   onClick={() => {
//     const btn = document.querySelector("[vw-access-button]");
//     if (btn) btn.click();
//   }}
//   aria-label="Ativar libras"
// >
//   LIBRAS
// </button>
// <button
//   className="btn-vlibras-flutuante"
//   onClick={() => {
//     const btn = document.querySelector("[vw-access-button]");
//     if (btn) btn.click();
//   }}
//   aria-label="Ativar VLibras"
// >
//   🤟
// </button>

//     </div>
//   );
// } MANTER ESSE




// penultima
// import { useState } from "react";
// import "./Acessibilidade.scss";
// import ReaderControls from "./ReaderControls";


// export default function Acessibilidade() {
//   const [contrasteAtivo, setContrasteAtivo] = useState(false);
//   const [fonte, setFonte] = useState(100);
//   const [modalAberto, setModalAberto] = useState(false);
//   const [readerAberto, setReaderAberto] = useState(false);

//   const aumentarFonte = () => {
//     const nova = Math.min(fonte + 10, 200);
//     setFonte(nova);
//     document.documentElement.style.fontSize = nova + "%";
//   };

//   const diminuirFonte = () => {
//     const nova = Math.max(fonte - 10, 70);
//     setFonte(nova);
//     document.documentElement.style.fontSize = nova + "%";
//   };

//   const toggleContraste = () => {
//     setContrasteAtivo(!contrasteAtivo);
//     document.body.classList.toggle("alto-contraste");
//   };

//   return (
//     <>
//       {/* Botão fixo no canto da tela */}
//       <div className="acess-btn">
//         <button
//           onClick={() => setModalAberto(true)}
//           aria-label="Abrir menu de acessibilidade"
//         >
//           ⚙️
//         </button>
//       </div>

//       {/* Modal principal */}
//       {modalAberto && (
//         <div className="acess-modal">
//           <div className="acess-content">
//             <button className="fechar" onClick={() => setModalAberto(false)}>✖</button>
//             <h2>Acessibilidade</h2>

//             <div className="grupo">
//               <button onClick={aumentarFonte}>🔍➕ Aumentar Fonte</button>
//               <button onClick={diminuirFonte}>🔍➖ Diminuir Fonte</button>

//               <button
//                 onClick={toggleContraste}
//                 className={contrasteAtivo ? "ativo" : ""}
//               >
//                 ⚫⚪ Contraste
//               </button>
//             </div>

//             <div className="grupo">
//               <button onClick={() => setReaderAberto(true)}>🔊 Abrir Leitor de Tela</button>
//             </div>

//             <div className="grupo">
//               <button
//                 onClick={() => {
//                   const btn = document.querySelector("[vw-access-button]");
//                   if (btn) btn.click();
//                 }}
//               >
//                 🤟 VLibras
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Painel avançado de leitura */}
//       {readerAberto && (
//         <ReaderControls onClose={() => setReaderAberto(false)} />
//       )}
//     </>
//   );
// }





// penultimo// src/components/Acessibilidade/Acessibilidade.jsx
// import React, { useEffect, useRef, useState } from "react";
// import "./Acessibilidade.scss";
// import ReaderControls from "./ReaderControls";
// import { logEvent } from "./accessibilityLogger";

// /**
//  * Modal accessibility with focus trap and keyboard support
//  */
// export default function Acessibilidade() {
//   const [open, setOpen] = useState(false);
//   const [readerOpen, setReaderOpen] = useState(false);
//   const panelRef = useRef(null);
//   const firstFocusable = useRef(null);
//   const lastFocusable = useRef(null);

//   useEffect(() => {
//     if (open) {
//       logEvent("open_menu", "accessibility menu opened");
//       // focus trap: find focusable elements inside panel
//       const focusable = panelRef.current
//         ? panelRef.current.querySelectorAll(
//             'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
//           )
//         : [];
//       if (focusable.length) {
//         firstFocusable.current = focusable[0];
//         lastFocusable.current = focusable[focusable.length - 1];
//         firstFocusable.current.focus();
//       }
//       // prevent body scroll
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [open]);

//   useEffect(() => {
//     function handleKey(e) {
//       if (!open) return;
//       if (e.key === "Escape") {
//         setOpen(false);
//         logEvent("close_menu", "escape");
//       }
//       if (e.key === "Tab") {
//         // focus trap
//         if (!firstFocusable.current || !lastFocusable.current) return;
//         if (e.shiftKey && document.activeElement === firstFocusable.current) {
//           e.preventDefault();
//           lastFocusable.current.focus();
//         } else if (!e.shiftKey && document.activeElement === lastFocusable.current) {
//           e.preventDefault();
//           firstFocusable.current.focus();
//         }
//       }
//     }
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [open]);

//   const toggleMenu = () => {
//     setOpen((s) => {
//       const next = !s;
//       logEvent(next ? "open_menu" : "close_menu", "toggle button");
//       return next;
//     });
//   };

//   const openReader = () => {
//     setReaderOpen(true);
//     logEvent("open_reader", "reader opened from menu");
//   };

//   const closeReader = () => {
//     setReaderOpen(false);
//     logEvent("close_reader", "reader closed");
//   };

//   // ler seleção (usado também fora do reader)
//   const readSelection = () => {
//     const sel = (window.getSelection && window.getSelection().toString()) || "";
//     if (!sel) {
//       alert("Selecione o texto que deseja ouvir.");
//       return;
//     }
//     // dispatch a custom event so ReaderControls could optionally listen
//     const ev = new CustomEvent("a11y-read-selection", { detail: { text: sel } });
//     window.dispatchEvent(ev);
//     logEvent("read_selection", "user requested read selection", { length: sel.length });
//   };

//   return (
//     <>
//       <div className="a11y-floating">
//         <button
//           className="a11y-button"
//           aria-haspopup="dialog"
//           aria-expanded={open}
//           aria-controls="a11y-panel"
//           onClick={toggleMenu}
//           aria-label="Abrir opções de acessibilidade"
//         >
//           ♿
//         </button>
//       </div>

//       {open && (
//         <div className="a11y-backdrop" role="presentation" onClick={() => setOpen(false)} />
//       )}

//       {open && (
//         <div
//           id="a11y-panel"
//           className="a11y-panel"
//           role="dialog"
//           aria-modal="true"
//           aria-label="Painel de acessibilidade"
//           ref={panelRef}
//         >
//           <div className="a11y-panel-inner">
//             <button className="a11y-close" onClick={() => setOpen(false)} aria-label="Fechar painel">
//               ✖
//             </button>

//             <h3 className="a11y-title">Acessibilidade</h3>

//             <div className="a11y-actions">
//               <button onClick={() => { document.documentElement.style.fontSize = "110%"; logEvent("font","increase"); }}>A+</button>
//               <button onClick={() => { document.documentElement.style.fontSize = "90%"; logEvent("font","decrease"); }}>A−</button>
//               <button onClick={() => { document.body.classList.toggle("high-contrast"); logEvent("contrast","toggle"); }}>
//                 Contraste
//               </button>

//               <button onClick={readSelection}>Ler seleção</button>

//               <button onClick={openReader}>Abrir leitor</button>

//               <button
//                 onClick={() => {
//                   const btn = document.querySelector("[vw-access-button]");
//                   if (btn) btn.click();
//                 }}
//               >
//                 LIBRAS
//               </button>
//             </div>

//             <div className="a11y-footer">
//               <small>Preferências são salvas automaticamente no navegador.</small>
//             </div>
//           </div>
//         </div>
//       )}

//       {readerOpen && <ReaderControls onClose={closeReader} />}
//     </>
//   );
// }







// import { useState } from "react";
// import "./Acessibilidade.scss";

// export default function Acessibilidade() {
//   const [contrasteAtivo, setContrasteAtivo] = useState(false);
//   const [fonte, setFonte] = useState(100);
//   const [lendo, setLendo] = useState(false);
//   const [modalAberto, setModalAberto] = useState(false);

//   const aumentarFonte = () => {
//     const novaFonte = Math.min(fonte + 10, 200);
//     setFonte(novaFonte);
//     document.documentElement.style.fontSize = novaFonte + "%";
//   };

//   const diminuirFonte = () => {
//     const novaFonte = Math.max(fonte - 10, 70);
//     setFonte(novaFonte);
//     document.documentElement.style.fontSize = novaFonte + "%";
//   };

//   const toggleContraste = () => {
//     setContrasteAtivo(!contrasteAtivo);
//     document.body.classList.toggle("alto-contraste");
//   };

//   const lerSecao = (id) => {
//     const secao = document.getElementById(id);
//     if (!secao) return;

//     const texto = secao.innerText;
//     const utterance = new SpeechSynthesisUtterance(texto);
//     utterance.lang = "pt-BR";
//     utterance.rate = 1;

//     window.speechSynthesis.cancel();
//     window.speechSynthesis.speak(utterance);
//     setLendo(true);

//     utterance.onend = () => setLendo(false);
//   };

//   const lerPagina = () => {
//     const texto = document.body.innerText;
//     const utterance = new SpeechSynthesisUtterance(texto);
//     utterance.lang = "pt-BR";
//     utterance.rate = 1;

//     window.speechSynthesis.cancel();
//     window.speechSynthesis.speak(utterance);
//     setLendo(true);

//     utterance.onend = () => setLendo(false);
//   };

//   const pararLeitura = () => {
//     window.speechSynthesis.cancel();
//     setLendo(false);
//   };

//   return (
//     <>
//       <div className="acessibilidade-container">
//         <button onClick={() => setModalAberto(true)} aria-label="Abrir menu de acessibilidade">
//           ⚙️
//         </button>
//       </div>

//       {modalAberto && (
//         <div className="modal-acessibilidade">
//           <div className="modal-content">
//             <button className="fechar" onClick={() => setModalAberto(false)}>✖</button>

//             <h2>Acessibilidade</h2>

//             <div className="grupo-botoes">
//               <button onClick={aumentarFonte} aria-label="Aumentar fonte">🔍➕ Aumentar Fonte</button>
//               <button onClick={diminuirFonte} aria-label="Diminuir fonte">🔍➖ Diminuir Fonte</button>

//               <button
//                 onClick={toggleContraste}
//                 aria-label="Ativar contraste alto"
//                 className={contrasteAtivo ? "ativo" : ""}
//               >
//                 ⚫⚪ Contraste
//               </button>

//               {!lendo ? (
//                 <button onClick={lerPagina} aria-label="Ler página inteira">🔊 Ler Página</button>
//               ) : (
//                 <button onClick={pararLeitura} aria-label="Parar leitura">⛔ Parar Leitura</button>
//               )}

//               <button onClick={() => lerSecao("destaques")} aria-label="Ler seção de destaques">
//                 📑 Ler Seção Destaques
//               </button>

//               <button
//                 onClick={() => {
//                   const btn = document.querySelector("[vw-access-button]");
//                   if (btn) btn.click();
//                 }}
//                 aria-label="Ativar VLibras"
//               >
//                 🤟 LIBRAS
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



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

  /* --------------------------------------
    Focus Trap + evitar scroll
  -------------------------------------- */
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

  /* --------------------------------------
    ESC para fechar + Tab Trap
  -------------------------------------- */
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

  /* --------------------------------------
    Ações
  -------------------------------------- */
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
      {/* Botão flutuante */}
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

      {/* Backdrop */}
      {open && (
        <div
          className="a11y-backdrop"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Painel */}
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

      {/* Reader */}
      {readerOpen && <ReaderControls onClose={closeReader} />}
    </>
  );
}
