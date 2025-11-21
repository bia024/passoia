import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import InputMask from "react-input-mask";
import "./Cadastro.scss";
import { useAuth } from "../../AuthContext";

const USER_TYPES = {
  CONSUMIDOR: "consumidor",
  PANELISTA: "panelista",
  PARCEIRO: "parceiro",
};

const baseSchema = {
  cep: z.string().regex(/^\d{5}-\d{3}$/, "CEP inválido"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  telefone: z.string().min(10, "Telefone inválido"),
  endereco: z.string().min(5, "Endereço é obrigatório"),
  bairro: z.string().min(3, "Bairro é obrigatório"),
  cidade: z.string().min(3, "Cidade é obrigatória"),
  estado: z.string().min(2, "Estado é obrigatório"),
};

const pessoaFisicaSchema = z.object({
  ...baseSchema,
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
});

const parceiroSchema = z.object({
  ...baseSchema,
  nomeEmpresa: z.string().min(2, "Nome da empresa é obrigatório"),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ inválido"),
});

const InputField = ({ name, label, register, error, mask, ...rest }) => (
  <div className="inputGroup">
    <label>
      <span>{label}</span>
      {mask ? (
        <InputMask mask={mask} {...register(name)} {...rest}>
          {(inputProps) => <input {...inputProps} className="input" />}
        </InputMask>
      ) : (
        <input {...register(name)} className="input" {...rest} />
      )}
    </label>
    {error && <small className="error">{error.message}</small>}
  </div>
);

const PhoneField = ({ register, error }) => (
  <div className="inputGroup">
    <label>
      <span>Telefone</span>
      <div className="phone-field-wrapper">
        <select className="country-code" defaultValue="+55">
          <option value="+55">🇧🇷 Brasil (+55)</option>
          <option value="+1">🇺🇸 EUA (+1)</option>
          <option value="+351">🇵🇹 Portugal (+351)</option>
          <option value="+44">🇬🇧 Reino Unido (+44)</option>
          <option value="+34">🇪🇸 Espanha (+34)</option>
          <option value="+33">🇫🇷 França (+33)</option>
          <option value="+49">🇩🇪 Alemanha (+49)</option>
          <option value="+39">🇮🇹 Itália (+39)</option>
          <option value="+81">🇯🇵 Japão (+81)</option>
          <option value="+54">🇦🇷 Argentina (+54)</option>
        </select>
        <InputField
          name="telefone"
          mask="(99) 99999-9999"
          register={register}
          error={error}
        />
      </div>
    </label>
  </div>
);

const CommonFields = ({ register, errors, setValue }) => (
  <>
    <InputField
      name="cep"
      label="CEP"
      mask="99999-999"
      register={register}
      error={errors.cep}
    />
    <InputField
      name="email"
      label="E-mail"
      type="email"
      register={register}
      error={errors.email}
    />
    <InputField
      name="senha"
      label="Senha"
      type="password"
      register={register}
      error={errors.senha}
    />
    <PhoneField register={register} error={errors.telefone} />
    <InputField
      name="endereco"
      label="Endereço"
      register={register}
      error={errors.endereco}
    />
    <InputField
      name="bairro"
      label="Bairro"
      register={register}
      error={errors.bairro}
    />
    <InputField
      name="cidade"
      label="Cidade"
      register={register}
      error={errors.cidade}
    />
    <InputField
      name="estado"
      label="Estado"
      register={register}
      error={errors.estado}
    />
  </>
);

const ConsumidorPanelistaForm = ({ register, errors, setValue }) => (
  <>
    <InputField
      name="nome"
      label="Nome Completo"
      register={register}
      error={errors.nome}
    />
    <InputField
      name="cpf"
      label="CPF"
      mask="999.999.999-99"
      register={register}
      error={errors.cpf}
    />
    <CommonFields register={register} errors={errors} setValue={setValue} />
  </>
);

const ParceiroForm = ({ register, errors, setValue }) => (
  <>
    <InputField
      name="nomeEmpresa"
      label="Nome da Empresa"
      register={register}
      error={errors.nomeEmpresa}
    />
    <InputField
      name="cnpj"
      label="CNPJ"
      mask="99.999.999/9999-99"
      register={register}
      error={errors.cnpj}
    />
    <CommonFields register={register} errors={errors} setValue={setValue} />
  </>
);

export default function Cadastro() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userType, setUserType] = useState(null);
  const [status, setStatus] = useState({ success: "", error: "" });

  const getSchema = () => {
    switch (userType) {
      case USER_TYPES.CONSUMIDOR:
      case USER_TYPES.PANELISTA:
        return pessoaFisicaSchema;
      case USER_TYPES.PARCEIRO:
        return parceiroSchema;
      default:
        return z.object({});
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(getSchema()),
    context: { userType },
  });

  const cepValue = watch("cep");
  useEffect(() => {
    const fetchAddress = async (cep) => {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        const { logradouro, bairro, localidade, uf } = response.data;
        if (logradouro)
          setValue("endereco", logradouro, { shouldValidate: true });
        if (bairro) setValue("bairro", bairro, { shouldValidate: true });
        if (localidade)
          setValue("cidade", localidade, { shouldValidate: true });
        if (uf) setValue("estado", uf, { shouldValidate: true });
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    };

    const unmaskedCep = cepValue?.replace(/\D/g, "");
    if (unmaskedCep?.length === 8) {
      fetchAddress(unmaskedCep);
    }
  }, [cepValue, setValue]);

  useEffect(() => {
    reset();
    setStatus({ success: "", error: "" });
  }, [userType, reset]);

  async function onSubmit(data) {
    setStatus({ success: "", error: "" });
    try {
      const payload = { ...data, tipo: userType };
      const response = await axios.post(
        "http://localhost:3000/users/cadastro",
        payload
      );
      if (response.data.token) {
        login(response.data.token);
      }
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Falha ao cadastrar. Tente novamente.";
      setStatus({ success: "", error: errorMessage });
    }
  }

  if (!userType) {
    return (
      <main className="page">
        <div className="card">
          <h1>Crie sua Conta</h1>
          <p className="description">Como você gostaria de se cadastrar?</p>
          <div className="user-type-selection">
            <button
              onClick={() => setUserType(USER_TYPES.CONSUMIDOR)}
              className="cta"
            >
              Sou Consumidor
            </button>
            <button
              onClick={() => setUserType(USER_TYPES.PANELISTA)}
              className="cta secondary"
            >
              Quero ser Panelista
            </button>
            <button
              onClick={() => setUserType(USER_TYPES.PARCEIRO)}
              className="cta secondary"
            >
              Quero ser Parceiro
            </button>
          </div>
          <div className="redirect-link">
            <p>
              Já tem uma conta? <Link to="/login">Faça login</Link>
            </p>
          </div>
        </div>
      </main>
    );
  }

  const getTitle = () => {
    switch (userType) {
      case USER_TYPES.CONSUMIDOR:
        return "Cadastro de Consumidor";
      case USER_TYPES.PANELISTA:
        return "Cadastro de Panelista";
      case USER_TYPES.PARCEIRO:
        return "Cadastro de Parceiro";
      default:
        return "Crie sua Conta";
    }
  };

  return (
    <main className="page">
      <div className="card">
        <button onClick={() => setUserType(null)} className="back-button">
          ← Voltar
        </button>
        <h1>{getTitle()}</h1>
        <p className="description">Preencha os dados para criar sua conta.</p>

        {status.error && <div className="error">{status.error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
          {(userType === USER_TYPES.CONSUMIDOR ||
            userType === USER_TYPES.PANELISTA) && (
            <ConsumidorPanelistaForm
              register={register}
              errors={errors}
              setValue={setValue}
            />
          )}
          {userType === USER_TYPES.PARCEIRO && (
            <ParceiroForm
              register={register}
              errors={errors}
              setValue={setValue}
            />
          )}
          <button type="submit" className="cta" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Criar Conta"}
          </button>
        </form>

        <div className="redirect-link">
          <p>
            Já tem uma conta? <Link to="/login">Faça login</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
