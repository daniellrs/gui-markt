"use client";

import { Input } from "@/components/input";
import { RequestErrors } from "@/components/requestErrors";
import { useRequestErrors } from "@/components/requestErrors/useRequestErrors";
import { ViewBox } from "@/components/viewBox";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const AddressFormView = ({ id }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const { errors, verifyErrors, clearErrors } = useRequestErrors();

  const loadAddress = async () => {
    try {
      setLoading(true);
      const address = await api.address.findById(id);
      setCep(address.cep);
      setLogradouro(address.logradouro);
      setNumero(address.numero);
      setComplemento(address.complemento);
      setBairro(address.bairro);
      setCidade(address.cidade);
      setEstado(address.estado);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    try {
      clearErrors();
      setLoading(true);

      const data = {
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
      };

      if (id) await api.address.update({ id, ...data });
      else await api.address.create(data);

      router.push("/address");
    } catch (error) {
      verifyErrors(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadAddress();
  }, [id]);

  return (
    <ViewBox
      title={id ? "Editar endereço" : "Novo endereço"}
      buttonText="Salvar"
      onSubmit={onSubmit}
      loading={loading}
    >
      <div className="flex flex-col gap-6">
        <Input
          label="CEP"
          value={cep}
          onChange={setCep}
          type="number"
          className="clearInput"
        />
        <Input label="Logradouro" value={logradouro} onChange={setLogradouro} />
        <Input label="Número" value={numero} onChange={setNumero} />
        <Input
          label="Complemento"
          value={complemento}
          onChange={setComplemento}
        />
        <Input label="Bairro" value={bairro} onChange={setBairro} />
        <Input label="Cidade" value={cidade} onChange={setCidade} />
        <Input label="Estado" value={estado} onChange={setEstado} />
        <RequestErrors className="mt-4" errors={errors} />
      </div>
    </ViewBox>
  );
};
