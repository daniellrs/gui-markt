"use client";

import { SiMarketo } from "react-icons/si";
import { Button } from "../button";
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { FiUser } from "react-icons/fi";

export const Header = () => {
  const router = useRouter();
  const interval = useRef();
  const [usuario, setUsuario] = useState();

  const checkToken = async () => {
    const token = localStorage.getItem("token");

    if (token && !usuario) {
      try {
        const user = await api.user.get();
        setUsuario(user);
      } catch (error) {}
    }
  };

  const startCheckTokenInterval = () => {
    clearInterval(interval.current);
    interval.current = setInterval(checkToken, 1000);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUsuario(undefined);
    router.push("/");
  };

  useEffect(() => {
    if (usuario) clearInterval(interval.current);
    else startCheckTokenInterval();
  }, [usuario]);

  useEffect(() => {
    checkToken();

    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <header className="flex justify-between items-center gap-4 w-full border-b py-3 px-6 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30">
      <a href="/" className="flex gap-2 justify-center items-center">
        <SiMarketo />
        Markt
      </a>
      <div className="flex gap-4 items-center">
        {usuario && (
          <>
            <div className="flex gap-2 justify-center items-center bg-zinc-800 py-2 px-3 rounded-3xl text-sm">
              <FiUser /> {usuario.nome}
            </div>
            <Button size="sm" href="/cart">
              Carrinho
            </Button>
            <Button size="sm" href="/address">
              Endereços
            </Button>
            <Button size="sm" onClick={logout}>
              Sair
            </Button>
          </>
        )}
        {!usuario && (
          <>
            <Button size="sm" href="/login">
              Entrar
            </Button>
            <Button size="sm" href="/signup">
              Cadastrar
            </Button>
          </>
        )}
      </div>
    </header>
  );
};
