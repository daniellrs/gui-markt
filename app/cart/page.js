"use client";

import { Button } from "@/components/button";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Cart() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState();

  const getCart = async () => {
    try {
      setLoading(true);
      const cart = await api.cart.get();
      setCart(cart);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  console.log(cart);

  return <Button size="sm">Eae</Button>;
}
