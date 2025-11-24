import { useState, useEffect } from "react";
import "./Fidelidade.scss";
import { Link } from "react-router-dom";
import { FaStar, FaGift, FaPaperPlane } from "react-icons/fa";

const quizPerguntas = [
  {
    pergunta:
      "Qual produto da L'Oréal é famoso por seu Sérum Preenchedor com Ácido Hialurônico?",
    opcoes: ["Vitamino Color", "Absolut Repair", "Revitalift"],
    respostaCorreta: 2,
  },
  {
    pergunta:
      "A linha 'Absolut Repair Molecular' da L'Oréal Professionnel foca em qual benefício principal?",
    opcoes: [
      "Proteção da cor",
      "Reparação profunda da estrutura do cabelo",
      "Controle de oleosidade",
    ],
    respostaCorreta: 1,
  },
];
const PONTUACAO_MAXIMA = quizPerguntas.length;

export default function Fidelidade() {
  const [step, setStep] = useState("initial");
  const [chatStep, setChatStep] = useState("askingName");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [cupom, setCupom] = useState(null);

  const addBotMessage = (text, delay = 1000) => {
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text }]);
    }, delay);
  };

  const handleStartChat = () => {
    setStep("chatting");
    addBotMessage("Que ótimo! Para começar, qual é o seu nome?", 0);
  };

  const handleStartQuiz = () => {
    setStep("playingQuiz");
    setPontuacao(0);
    setPerguntaAtual(0);
    setCupom(null);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const userMessage = { from: "user", text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    if (chatStep === "askingName") {
      setUserName(inputValue);
      setChatStep("askingEmail");
      addBotMessage(`Olá, ${inputValue}! ✨`);
      addBotMessage(
        "Agora, só precisamos do seu melhor e-mail para ter acesso a benefícios exclusivos."
      );
    } else if (chatStep === "askingEmail") {
      setUserEmail(inputValue);
      setStep("askToPlay");
      addBotMessage("Perfeito! Cadastro concluído!");
      addBotMessage(
        "Fique de olho no seu email (caixa de entrada ou spam) para mais notificações sobre lançamentos.",
        1200
      );
      addBotMessage(
        "Enquanto isso, que tal testar seus conhecimentos sobre produtos L'Oréal e concorrer a prêmios?",
        2500
      );
    }
    setInputValue("");
  };

  const salvarCupomNoBackend = async (cupomCodigo) => {
    console.log("Tentando salvar o cupom:", {
      cupom: cupomCodigo,
      nome: userName,
      email: userEmail,
    });
    try {
      const response = await fetch("http://localhost:3000/cupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigo: cupomCodigo,
          usuarioNome: userName,
          usuarioEmail: userEmail,
        }),
      });
      if (!response.ok) throw new Error("Resposta do servidor não foi OK");
      console.log("Cupom salvo com sucesso no backend!");
    } catch (error) {
      console.error("Erro ao salvar o cupom no backend:", error);
    }
  };

  const handleAnswerClick = (indexOpcao) => {
    const acertou = quizPerguntas[perguntaAtual].respostaCorreta === indexOpcao;
    if (acertou) {
      setPontuacao(pontuacao + 1);
    }

    const proximaPergunta = perguntaAtual + 1;
    if (proximaPergunta < quizPerguntas.length) {
      setPerguntaAtual(proximaPergunta);
    } else {
      setStep("quizFinished");
      if ((acertou ? pontuacao + 1 : pontuacao) === PONTUACAO_MAXIMA) {
        const novoCupom = `PASS-WIN-${Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase()}`;
        salvarCupomNoBackend(novoCupom);
        setCupom(novoCupom);
      }
    }
  };

  return (
    <section id="secao-fidelidade">
      <div className="fidelidade-card">
        {step === "initial" && (
          <>
            <FaGift className="fidelidade-icon" />
            <h2>Torne-se um Cliente Fidelidade</h2>
            <p>
              Ganhe descontos exclusivos, brindes especiais e muito mais. É
              rápido e gratuito!
            </p>
            <button className="fidelidade-cta" onClick={handleStartChat}>
              Quero ser!
            </button>
          </>
        )}

        {step === "chatting" && (
          <div className="chat-container">
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-bubble ${msg.from}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <form className="chat-input-form" onSubmit={handleSendMessage}>
              <input
                type={chatStep === "askingEmail" ? "email" : "text"}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  chatStep === "askingName"
                    ? "Digite seu nome..."
                    : "Digite seu e-mail..."
                }
                className="chat-input"
                autoFocus
              />
              <button type="submit" className="chat-send-btn">
                <FaPaperPlane />
              </button>
            </form>
          </div>
        )}

        {step === "playingQuiz" && (
          <div className="quiz-container">
            <div className="quiz-header">
              <span>
                Pergunta {perguntaAtual + 1}/{quizPerguntas.length}
              </span>
              <span>Pontuação: {pontuacao}</span>
            </div>
            <h3 className="quiz-pergunta">
              {quizPerguntas[perguntaAtual].pergunta}
            </h3>
            <div className="quiz-opcoes">
              {quizPerguntas[perguntaAtual].opcoes.map((opcao, index) => (
                <button
                  key={index}
                  className="quiz-opcao-btn"
                  onClick={() => handleAnswerClick(index)}
                >
                  {opcao}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "quizFinished" && (
          <div className="quiz-resultado">
            <h2>Quiz Finalizado!</h2>
            <p>
              Sua pontuação foi:{" "}
              <span className="pontuacao-final">
                {pontuacao}/{PONTUACAO_MAXIMA}
              </span>
            </p>

            {cupom ? (
              <div className="cupom-container">
                <FaStar className="fidelidade-icon" />
                <h3>PARABÉNS! PONTUAÇÃO MÁXIMA!</h3>
                <p>
                  Você é um expert em beleza! Como recompensa, retire um produto
                  na loja mais próxima usando o cupom abaixo:
                </p>
                <div className="cupom-codigo">{cupom}</div>
                <p className="print-sugestao">
                  (Dica: tire um print desta tela para não perder seu cupom!)
                </p>
              </div>
            ) : (
              <p>
                Quase lá! Tente novamente para alcançar a pontuação máxima e
                ganhar um prêmio!
              </p>
            )}

            {cupom ? (
              <Link to="/blackfriday" className="bf-redirect-link">
                <button className="bf-redirect-btn">
                  ÚLTIMA CHANCE! Corra para as ofertas de Black Friday!
                </button>
              </Link>
            ) : (
              <button className="fidelidade-cta" onClick={handleStartQuiz}>
                Jogar Novamente
              </button>
            )}
          </div>
        )}

        {step === "askToPlay" && (
          <div className="ask-to-play">
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-bubble ${msg.from}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="decision-buttons">
              <button className="fidelidade-cta" onClick={handleStartQuiz}>
                Sim, quero jogar!
              </button>
              <button
                className="fidelidade-cta secondary"
                onClick={() => setStep("declinedQuiz")}
              >
                Não, obrigado
              </button>
            </div>
          </div>
        )}

        {step === "declinedQuiz" && (
          <div className="completed-view">
            <h2>Tudo bem, {userName}!</h2>
            <p>
              Seu cadastro está feito! Que tal aproveitar uma oferta exclusiva
              enquanto isso?
            </p>
            <Link to="/blackfriday" className="bf-redirect-link">
              <button className="bf-redirect-btn">
                ÚLTIMA CHANCE! Corra para as ofertas de Black Friday!
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
