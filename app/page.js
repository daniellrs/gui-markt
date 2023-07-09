"use client";

import { Categories } from "@/components/categories";
import { api } from "@/lib/api";
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
    <div className="flex flex-col gap-4 min-h-[calc(100vh_-_70px)]">
      <Categories categories={categories} onChange={setCategory} autoSelect />
      {loading && (
        <div className="flex justify-center">
          <PiSpinnerGapBold className="animate-spin" size={24} />
        </div>
      )}
      {!loading &&
        products?.map((product) => <div key={product.id}>{product.name}</div>)}
    </div>
  );
}
