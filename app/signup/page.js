"use client";

import { Input } from "@/components/input";
import { RequestErrors } from "@/components/requestErrors";
import { useRequestErrors } from "@/components/requestErrors/useRequestErrors";
import { ViewBox } from "@/components/viewBox";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const { errors, verifyErrors, clearErrors } = useRequestErrors();

  const onSubmit = async () => {
    try {
      clearErrors();
      setLoading(true);
      await api.user.signup({ nome, cpf, email, senha });
      router.push("/login");
    } catch (error) {
      verifyErrors(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ViewBox
      title="Novo usuário"
      buttonText="Enviar"
      onSubmit={onSubmit}
      loading={loading}
    >
      <div className="flex flex-col gap-6">
        <Input label="Nome" value={nome} onChange={setNome} />
        <Input
          label="CPF"
          value={cpf}
          onChange={setCpf}
          type="number"
          className="clearInput"
        />
        <Input label="Email" value={email} onChange={setEmail} type="email" />
        <Input
          label="Senha"
          value={senha}
          onChange={setSenha}
          type="password"
        />
        <RequestErrors className="mt-4" errors={errors} />
      </div>
    </ViewBox>
  );
}
