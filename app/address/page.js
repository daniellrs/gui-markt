"use client";

import { ViewBox } from "@/components/viewBox";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [addresses, setAddresses] = useState();

  const getAddresses = async () => {
    const addresses = await api.address.getAll();
    setAddresses(addresses || []);
  };

  useEffect(() => {
    getAddresses();
  }, []);

  return (
    <ViewBox title="Endereços" buttonText="Cadastrar novo" href="/address/form">
      <div className="flex flex-col gap-4">
        {addresses?.map((a) => (
          <a
            key={a.id}
            href={`/address/form/${a.id}`}
            className="p-4 border border-zinc-700 bg-zinc-800 rounded-lg"
          >
            <p>
              {[a.cep, a.logradouro, a.numero, a.complemento]
                .filter((i) => i !== undefined && i !== "")
                .join(", ")}
            </p>
            <p>
              {[a.bairro, a.cidade, a.estado]
                .filter((i) => i !== undefined && i !== "")
                .join(", ")}
            </p>
          </a>
        ))}
      </div>
    </ViewBox>
  );
}
