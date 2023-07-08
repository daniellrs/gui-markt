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
  login: async ({ email, senha }) => {
    const { data } = await instance.post("auth", { email, senha });
    return data;
  },
  signup: async ({ nome, cpf, email, senha }) => {
    const { data } = await instance.post("usuarios", {
      nome,
      cpf,
      email,
      senha,
    });
    return data;
  },
  getLoggedUser: async () => {
    const { data } = await instance.get("usuarios/usuario-logado");
    return data;
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
};
