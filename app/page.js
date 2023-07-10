"use client";

import { Button } from "@/components/button";
import { Categories } from "@/components/categories";
import { api } from "@/lib/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiSpinnerGapBold } from "react-icons/pi";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState();

  const getCategories = async () => {
    try {
      setLoading(true);
      const categories = await api.category.getAll();
      setCategories(categories);
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async () => {
    try {
      setLoading(true);
      const products = await api.product.findByCategoryId(category.id);
      setProducts(products);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (category) getProducts();
  }, [category]);

  return (
    <div className="flex flex-col gap-4 min-h-[calc(100vh_-_70px)] w-full">
      <div className="flex flex-col justify-center items-center">
        <Categories categories={categories} onChange={setCategory} autoSelect />
        {loading && (
          <div className="flex justify-center">
            <PiSpinnerGapBold className="animate-spin" size={24} />
          </div>
        )}
      </div>
      <div className="flex gap-4 flex-wrap mt-8 flex-shrink justify-center">
        {!loading &&
          products?.map((product) => (
            <Button
              key={product.id}
              className="!justify-start !items-start !flex-col flex-1 !min-w-[18rem] !max-w-[22rem] !p-0"
              href={`/product/${product.id}`}
            >
              <div className="relative w-full h-48 overflow-hidden rounded-md">
                <Image
                  src={`data:image/png;base64,${product.imagensDoProduto?.[0]}`}
                  className="object-cover object-center"
                  fill
                  alt="product image"
                />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <p className="text-sm font-bold">{product.nome}</p>
                <p className="text-sm text-zinc-300">{product.descricao}</p>
                <p>R$ {product.valor.toFixed(2)}</p>
              </div>
            </Button>
          ))}
      </div>
    </div>
  );
}
