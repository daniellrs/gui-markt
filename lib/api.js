import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const api = {
  auth: {
    login: async ({ email, senha }) => {
      const { data } = await instance.post("auth", { email, senha });
      return data;
    },
  },
  user: {
    signup: async ({ nome, cpf, email, senha }) => {
      const { data } = await instance.post("usuarios", {
        nome,
        cpf,
        email,
        senha,
      });
      return data;
    },
    get: async () => {
      const { data } = await instance.get("usuarios/usuario-logado");
      return data;
    },
  },
  address: {
    getAll: async () => {
      const { data } = await instance.get("enderecos/usuario");
      return data;
    },
    findById: async (id) => {
      const { data } = await instance.get(`enderecos/${id}/id`);
      return data;
    },
    markAsPrimary: async (id) => {
      const { data } = await instance.patch(
        `enderecos/${id}/endereco-principal`
      );
      return data;
    },
    delete: async (id) => {
      const { data } = await instance.delete("enderecos", {
        data: {
          idEndereco: id,
        },
      });
      return data;
    },
    update: async ({
      id,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
    }) => {
      const { data } = await instance.put(`enderecos/${id}/id`, {
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
      });
      return data;
    },
    create: async ({
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
    }) => {
      const { data } = await instance.post("enderecos", {
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
      });
      return data;
    },
  },
  category: {
    getAll: async () => {
      const { data } = await instance.get("categorias");
      return data;
    },
  },
  product: {
    findById: async (id) => {
      const { data } = await instance.get(`produtos/${id}/id-produto`);
      return data;
    },
    findByCategoryId: async (id) => {
      const { data } = await instance.get(`produtos/${id}/id-categoria`);
      return data;
    },
    addToCard: async (id) => {
      const { data } = await instance.post("produtos/carrinho", {
        id,
      });
      return data;
    },
  },
  cart: {
    get: async () => {
      const { data } = await instance.get("carrinhos");
      return data;
    },
    removeProduct: async (id) => {
      const { data } = await instance.patch("carrinhos", {
        id,
      });
      return data;
    },
    addCoupon: async (id) => {
      const { data } = await instance.patch("carrinhos/cupom", {
        id,
      });
      return data;
    },
  },
  question: {
    add: async ({ id, titulo }) => {
      const { data } = await instance.post("perguntas", { id, titulo });
      return data;
    },
    reply: async ({ id, resposta }) => {
      const { data } = await instance.post("perguntas/responde-pergunta", {
        id,
        resposta,
      });
      return data;
    },
  },
  review: {
    add: async ({ idProduto, titulo, descricao, avaliacao }) => {
      const { data } = await instance.post("opinioes", {
        idProduto,
        titulo,
        descricao,
        avaliacao,
      });
      return data;
    },
  },
  purchase: {
    buy: async (ids, idCupom) => {
      const produtosEQuantidade = {};

      ids.forEach((id) => (produtosEQuantidade[id] = 1));

      const { data } = await instance.post("compras", {
        produtosEQuantidade,
        idCupom,
      });

      return data;
    },
  },
};
