const DispatcherPlanet= {
    URL: 'https://swapi.dev/api//planets',
    getPlanetList: async () => {
        try {
            let allPlanets = [];
            let nextPageUrl = DispatcherPlanet.URL;

            while (nextPageUrl) {
                const response = await fetch(nextPageUrl, { method: 'GET' });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                allPlanets = allPlanets.concat(data.results);


                nextPageUrl = data.next;
            }

            return allPlanets

        } catch (error) {
            console.error('Error fetching planet list:', error);
            throw error;
        }
    },
    getPlanetById: async (id) => {
        try {
            const response = await fetch(`${DispatcherPlanet.URL}/${id}`, { method: 'GET' });
 
             if (!response.ok) {
                 throw new Error(`HTTP error! status: ${response.status}`);
             }
     
             const data = await response.json();
             return data;
         } catch (error) {
             console.error('Error fetching planet detail:', error);
             throw error;
         }
    },
    getFilmList: async (filmUrls) => {
        try {
            const filmNames = await Promise.all(
                filmUrls.map(async (filmUrl) => {
                    const response = await fetch(filmUrl);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    return data.title;
                })
            );
            return filmNames;
        } catch (error) {
            console.error("Error al obtener los títulos de las películas:", error);
            return [];
        }
    },
};

export default DispatcherPlanet;
