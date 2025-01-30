const DispatcherCharacter = {
    URL: 'https://swapi.dev/api/people',
    getCharacterList: async () => {
        try {
            let allCharacters = [];
            let nextPageUrl = DispatcherCharacter.URL;

            while (nextPageUrl) {
                const response = await fetch(nextPageUrl, { method: 'GET' });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                allCharacters = allCharacters.concat(data.results);


                nextPageUrl = data.next;
            }

            return allCharacters

        } catch (error) {
            console.error('Error fetching character list:', error);
            throw error;
        }
    },
    getCharacterById: async (id) => {
        try {
           const response = await fetch(`${DispatcherCharacter.URL}/${id}`, { method: 'GET' });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching character detail:', error);
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

export default DispatcherCharacter;
