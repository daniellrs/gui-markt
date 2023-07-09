"use client";

import { Button } from "@/components/button";
import { ViewBox } from "@/components/viewBox";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";

export default function SignUp() {
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState();

  const getAddresses = async () => {
    try {
      setLoading(true);
      const addresses = await api.address.getAll();
      setAddresses(addresses || []);
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (id) => {
    try {
      setLoading(true);
      await api.address.delete(id);
      await getAddresses();
    } finally {
      setLoading(false);
    }
  };

  const markAddressAsPrimary = async (id) => {
    try {
      setLoading(true);
      await api.address.markAsPrimary(id);
      await getAddresses();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAddresses();
  }, []);

  return (
    <ViewBox
      title="Endereços"
      buttonText="Cadastrar novo"
      href="/address/form"
      loading={loading}
    >
      <div className="flex flex-col gap-4">
        {!addresses?.length && (
          <p className="text-center text-zinc-400">
            Nenhum endereço cadastrado
          </p>
        )}
        {addresses?.map((a) => (
          <a
            key={a.id}
            href={`/address/form/${a.id}`}
            className="flex items-center p-4 border border-zinc-700 bg-zinc-800 rounded-lg"
          >
            <div className="flex-1">
              {a.enderecoPrincipal && (
                <p className="text-sm text-green-400 mb-2">
                  Endereço principal
                </p>
              )}
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
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
              }}
              className="flex flex-col gap-2 min-w-[1rem]"
            >
              <Button size="sm" onClick={() => deleteAddress(a.id)}>
                <BsTrashFill className="text-zinc-400" />
              </Button>
              <Button
                size="sm"
                onClick={() => markAddressAsPrimary(a.id)}
                disabled={a.enderecoPrincipal}
              >
                <AiFillStar className="text-zinc-400" size={18} />
              </Button>
            </div>
          </a>
        ))}
      </div>
    </ViewBox>
  );
}
