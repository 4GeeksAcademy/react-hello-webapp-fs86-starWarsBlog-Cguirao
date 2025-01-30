import DispatcherCharacter from "../DispatcherCharacter";
import DispatcherPlanet from "../DispatcherPlanet";
import DispatcherVehicle from "../DispatcherVehicle";

const fetchList = async (storeKey, dispatcher, setStore, getStore) => {
  const store = getStore();
  if (store[storeKey].length === 0) {
    try {
      const list = await dispatcher();
      setStore({
        ...store,
        [storeKey]: list,
      });
    } catch (error) {
      console.error(`Error al obtener la lista de ${storeKey}:`, error);
    }
  } else {
    console.log(`Los ${storeKey} ya están cargados en el store.`);
  }
};

const getById = async (id, dispatcher, errorMessage) => {
  if (!id) {
    throw new Error(errorMessage);
  }
  try {
    const details = await dispatcher(id);
    return details;
  } catch (error) {
    console.error(errorMessage, error);
    throw error;
  }
};

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white"
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white"
        }
      ],
      characterList: [],
      vehicleList: [],
      planetList: [],
      favoriteList: []
    },
    actions: {
      getCharacterList: () => fetchList("characterList", DispatcherCharacter.getCharacterList, setStore, getStore),
      getCharacterById: (id) => getById(id, DispatcherCharacter.getCharacterById, "Error al obtener los detalles del personaje"),

      getVehicleList: () => fetchList("vehicleList", DispatcherVehicle.getVehicleList, setStore, getStore),
      getVehicleById: (id) => getById(id, DispatcherVehicle.getVehicleById, "Error al obtener los detalles del vehículo"),

      getPlanetList: () => fetchList("planetList", DispatcherPlanet.getPlanetList, setStore, getStore),
      getPlanetById: (id) => getById(id, DispatcherPlanet.getPlanetById, "Error al obtener los detalles del planeta"),

      addToFavorites: (item) => {
        const store = getStore();
        if (!store.favoriteList.some(fav => fav.url === item.url)) {
          setStore({
            ...store,
            favoriteList: [...store.favoriteList, item],
          });
        } else {
          console.log("El elemento ya está en favoritos");
        }
      },

      removeFromFavorites: (url) => {
        const store = getStore();
        setStore({
          ...store,
          favoriteList: store.favoriteList.filter(fav => fav.url !== url),
        });
      },

      getFilmsOfCharacter: async (filmUrls) => {
        try {
          return await DispatcherCharacter.getFilmList(filmUrls);
        } catch (error) {
          console.error("Error al obtener los títulos de las películas de personajes:", error);
          return [];
        }
      },

      getFilmsOfPlanet: async (filmUrls) => {
        try {
          return await DispatcherPlanet.getFilmList(filmUrls);
        } catch (error) {
          console.error("Error al obtener los títulos de las películas de planetas:", error);
          return [];
        }
      },

      getFilmsOfVehicle: async (filmUrls) => {
        try {
          return await DispatcherVehicle.getFilmList(filmUrls);
        } catch (error) {
          console.error("Error al obtener los títulos de las películas de vehículos:", error);
          return [];
        }
      }
    }
  };
};

export default getState;
