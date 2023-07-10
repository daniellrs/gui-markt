"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiSpinnerGapBold } from "react-icons/pi";

const Tag = ({ text }) => {
  return (
    <div className="py-2 px-3 rounded-3xl bg-zinc-800 border border-zinc-700 text-sm">
      {text}
    </div>
  );
};

export default function Product({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [question, setQuestion] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewGrade, setReviewGrade] = useState("1");
  const [product, setProduct] = useState();

  const addQuestion = async () => {
    try {
      setLoadingQuestion(true);
      setQuestion("");
      await api.question.add({
        id: product.id,
        titulo: question,
      });
      await getProduct();
    } finally {
      setLoadingQuestion(false);
    }
  };

  const addReview = async () => {
    try {
      setLoadingQuestion(true);
      setReviewTitle("");
      setReviewDescription("");
      setReviewGrade("1");
      await api.review.add({
        idProduto: product.id,
        titulo: reviewTitle,
        descricao: reviewDescription,
        avaliacao: Number(reviewGrade || "1"),
      });
      await getProduct();
    } finally {
      setLoadingQuestion(false);
    }
  };

  const addToCart = async () => {
    try {
      setLoadingAddToCart(true);
      await api.product.addToCard(product.id);
      router.push("/cart");
    } finally {
      setLoadingAddToCart(false);
    }
  };

  const getProductWithLoading = async () => {
    try {
      setLoading(true);
      await getProduct();
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async () => {
    const product = await api.product.findById(params.id);
    setProduct(product);
  };

  useEffect(() => {
    getProductWithLoading();
  }, [params]);

  return (
    <div className="flex flex-col gap-8 min-h-[calc(100vh_-_70px)] w-full">
      {loading && (
        <div className="flex justify-center">
          <PiSpinnerGapBold className="animate-spin" size={24} />
        </div>
      )}
      {product && (
        <>
          <div className="flex gap-4">
            <div className="relative flex-1 h-96 overflow-hidden rounded-md bg-black">
              <Image
                src={`data:image/png;base64,${product.imagensDoProduto?.[0]}`}
                className="object-contain object-center"
                fill
                alt="product image"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-bold">{product.nome}</p>
              <p>{product.descricao}</p>
              <p>R$ {product.valor.toFixed(2)}</p>
              <Button onClick={addToCart} loading={loadingAddToCart}>
                Adicionar ao carrinho
              </Button>

              <div className="flex gap-2 flex-wrap max-w-[24rem]">
                <Tag text={`Categoria: ${product.nomeCategoria}`} />
                {Object.entries(product.caracteristicas).map(([key, value]) => (
                  <Tag key={key} text={`${key}: ${value}`} />
                ))}
              </div>
            </div>
          </div>
          <hr className="border-zinc-600" />
          <div className="flex gap-8">
            <div className="flex-1">
              <p className="text-lg">Perguntas</p>
              {!product.perguntas.length ? (
                <p className="text-zinc-400">Nenhuma pergunta</p>
              ) : (
                <div className="flex flex-col gap-3 mt-4">
                  {product.perguntas.map((q) => (
                    <div
                      key={q.id}
                      className="flex flex-col gap-2 p-3 bg-zinc-800 rounded-md"
                    >
                      <div className="flex gap-4 justify-between text-sm">
                        <p className="font-bold">{q.nomeUsuario}</p>
                        <p className="text-zinc-500">
                          {new Date(q.dataPergunta).toDateString()}
                        </p>
                      </div>
                      <p>{q.titulo}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-end gap-4 mt-4">
                <Input
                  placeholder="Escreva uma pergunta do produto"
                  className="w-full"
                  value={question}
                  onChange={setQuestion}
                />
                <Button onClick={addQuestion} loading={loadingQuestion}>
                  Adicionar
                </Button>
              </div>
            </div>
            <div className="border-l border-zinc-600" />
            <div className="flex-1">
              <p className="text-lg">Avaliações</p>
              {!product.opinioes.length && (
                <p className="text-zinc-400">Nenhuma avaliação</p>
              )}

              <div className="flex flex-col gap-4 mt-4">
                <Input
                  placeholder="Título da avaliação"
                  className="w-full"
                  value={reviewTitle}
                  onChange={setReviewTitle}
                />
                <textarea
                  className="bg-zinc-700 p-4 rounded-lg outline-transparent"
                  placeholder="Escreva uma descrição do produto"
                  value={reviewDescription}
                  onChange={(e) => setReviewDescription(e.target.value)}
                />
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={reviewGrade}
                  onChange={(e) => setReviewGrade(e.target.value)}
                />
                <Button onClick={addReview}>Adicionar</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
