import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import styles from './Cadastro.scss';

// Schema de validação
const cadastroSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export default function Cadastro() {

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting, isSubmitSuccessful } 
  } = useForm({
    resolver: zodResolver(cadastroSchema),
  });

  // Função que envia ao backend
  async function onSubmit(data) {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Falha ao cadastrar");
      }

      const result = await response.json();
      console.log("Usuário cadastrado:", result);

      return result;

    } catch (error) {
      console.error("Erro no cadastro:", error);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1>Cadastro</h1>

        {isSubmitSuccessful && (
          <div className={styles.success}>
            Cadastro realizado com sucesso!
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>

          {/* Nome */}
          <label>
            <span>Nome</span>
            <input 
              {...register('nome')} 
              aria-invalid={errors.nome ? 'true' : 'false'}
            />
            {errors.nome && <small role="alert">{errors.nome.message}</small>}
          </label>

          {/* Email */}
          <label>
            <span>E-mail</span>
            <input 
              {...register('email')} 
              type="email" 
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && <small role="alert">{errors.email.message}</small>}
          </label>

          {/* Senha */}
          <label>
            <span>Senha</span>
            <input 
              {...register('senha')} 
              type="password" 
              aria-invalid={errors.senha ? 'true' : 'false'}
            />
            {errors.senha && <small role="alert">{errors.senha.message}</small>}
          </label>

          {/* Botão */}
          <button type="submit" className={styles.cta} disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Criar conta'}
          </button>

        </form>
      </div>
    </main>
  );
}
