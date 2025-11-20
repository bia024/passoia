import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext.jsx';
import '../Cadastro/Cadastro.scss'; // Reutilizando o mesmo estilo do cadastro

// Schema de validação para o login
const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(1, "Senha é obrigatória"),
});

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [status, setStatus] = useState({ error: '' });

  async function onSubmit(data) {
    setStatus({ error: '' });
    try {
      const response = await axios.post("http://localhost:3000/users/login", data);
      login(response.data.token);
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Falha no login. Verifique suas credenciais.";
      setStatus({ error: errorMessage });
    }
  }

  return (
    <main className="page">
      <div className="card">
        <h1>Acesse sua Conta</h1>
        <p className="description">Que bom te ver de volta!</p>

        {status.error && <div className="error">{status.error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>

          {/* Email */}
          <div className="inputGroup">
            <label>
              <span>E-mail</span>
              <input
                {...register('email')}
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
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>

        </form>
      </div>
    </main>
  );
}
