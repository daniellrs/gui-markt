"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiSpinnerGapBold } from "react-icons/pi";

export default function Cart() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState();
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [coupon, setCoupon] = useState("");

  const addCoupon = async () => {
    try {
      setLoadingCoupon(true);
      await api.cart.addCoupon(coupon);
      await getCart();
      setCoupon("");
    } finally {
      setLoadingCoupon(false);
    }
  };

  const buy = async () => {
    try {
      setLoadingBuy(true);
      await api.purchase.buy(cart.produtos.map((p) => p.id));
      router.push("/purchase");
    } finally {
      setLoadingBuy(false);
    }
  };

  const getCart = async () => {
    const cart = await api.cart.get();
    setCart(cart);
  };

  const getCartWithLoading = async () => {
    try {
      setLoading(true);
      getCart();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartWithLoading();
  }, []);

  console.log(cart);

  return (
    <div className="flex flex-col gap-8 min-h-[calc(100vh_-_70px)] w-full">
      {loading && (
        <div className="flex justify-center">
          <PiSpinnerGapBold className="animate-spin" size={24} />
        </div>
      )}

      {cart && (
        <div className="flex gap-8">
          <div className="flex flex-1 flex-col gap-4">
            {cart.produtos.map((produto) => (
              <div key={produto.id} className="flex gap-4">
                <div className="relative w-24 h-24 rounded-md overflow-hidden">
                  <Image
                    src={`data:image/png;base64,${produto.imagensDoProduto?.[0]}`}
                    className="object-contain object-center"
                    fill
                    alt="product image"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-bold">{produto.nome}</p>
                  <p className="text-zinc-400">{produto.descricao}</p>
                  <p>R$ {produto.valor.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 min-w-[20rem]">
            <div className="flex gap-2 items-end">
              <Input label="Cupom" value={coupon} onChange={setCoupon} />
              <Button onClick={addCoupon} loading={loadingCoupon}>
                Aplicar
              </Button>
            </div>
            <p>Valor: R$ {cart.valorParcial.toFixed(2)}</p>
            {cart.valorParcial !== cart.valorFinal && (
              <p>Valor com desconto: R$ {cart.valorFinal}</p>
            )}
            <Button onClick={buy} loading={loadingBuy}>
              Finalizar compra
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
