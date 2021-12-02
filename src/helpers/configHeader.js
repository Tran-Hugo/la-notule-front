import store from "../store";
// Single responsability principle (SOLID)
export default {
  config: () => {
    const config = {
      headers: {
        Authorization: "Bearer " + store.getters.getToken,
      },
    };
    return config;
  },
  domain: "https://127.0.0.1:8000",
  //domain:'https://api.la-notule.fr'
};
