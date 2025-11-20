import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios'; // Importar o axios
import { useNavigate } from 'react-router-dom';
import './Cadastro.scss'; // Mantendo a importação do seu SCSS
import { useAuth } from '../../AuthContext';

// Schema de validação
const cadastroSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export default function Cadastro() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { 
    register, 
    handleSubmit, 
    reset, // Adicionar reset para limpar o formulário
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(cadastroSchema),
  });

  // Estado para gerenciar sucesso e erro
  const [status, setStatus] = useState({ success: '', error: '' });

  // Função que envia ao backend
  async function onSubmit(data) {
    setStatus({ success: '', error: '' }); // Limpa o status anterior
    try {
      // URL CORRETA e usando AXIOS
      const response = await axios.post("http://localhost:3000/users/cadastro", data);

      // Se a resposta tiver um token, faz o login
      if (response.data.token) {
        login(response.data.token);
      }

      navigate('/'); // Redireciona para a página principal
    } catch (error) {
      // Pega a mensagem de erro do backend (ex: "E-mail já cadastrado")
      const errorMessage = error.response?.data?.error || "Falha ao cadastrar. Tente novamente.";
      setStatus({ success: '', error: errorMessage });
    }
  }

  return (
    <main className="page">
      <div className="card">
        <h1>Crie sua Conta</h1>
        <p className="description">Comece sua jornada conosco hoje mesmo.</p>

        {/* Mensagens dinâmicas de sucesso e erro */}
        {status.success && <div className="success">{status.success}</div>}
        {status.error && <div className="error">{status.error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>

          {/* Nome */}
          <div className="inputGroup">
            <label>
              <span>Nome Completo</span>
              <input 
                {...register('nome')} 
                className="input"
                aria-invalid={errors.nome ? 'true' : 'false'}
              />
              {errors.nome && <small className="error">{errors.nome.message}</small>}
            </label>
          </div>

          {/* Email */}
          <div className="inputGroup">
            <label>
              <span>E-mail</span>
              <input 
                {...register('email')} // Mantém apenas o register
                type="email" 
                className="input"
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && <small className="error">{errors.email.message}</small>}
            </label>
          </div>

          {/* Senha */}
          <div className="inputGroup">
            <label>
              <span>Senha</span>
              <input 
                {...register('senha')} 
                type="password" 
                className="input"
                aria-invalid={errors.senha ? 'true' : 'false'}
              />
              {errors.senha && <small className="error">{errors.senha.message}</small>}
            </label>
          </div>

          {/* Botão */}
          <button type="submit" className="cta" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Criar Conta'}
          </button>

        </form>
      </div>
    </main>
  );
}
