"use client";

import { Input } from "@/components/input";
import { RequestErrors } from "@/components/requestErrors";
import { useRequestErrors } from "@/components/requestErrors/useRequestErrors";
import { ViewBox } from "@/components/viewBox";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const { errors, verifyErrors, clearErrors } = useRequestErrors();

  const onSubmit = async () => {
    try {
      clearErrors();
      setLoading(true);
      const { token } = await api.login({ email, senha });
      localStorage.setItem("token", token);
      router.push("/");
    } catch (error) {
      verifyErrors(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ViewBox
      title="Entrar"
      buttonText="Enviar"
      onSubmit={onSubmit}
      loading={loading}
    >
      <div className="flex flex-col gap-6">
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
