import { useState, useEffect } from 'react';
import { Camera, Users, MapPin, Tv } from 'lucide-react';

const App = () => {
  const [currentRoute, setCurrentRoute] = useState('inicio');
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);

  // IDs de ubicaciones más reconocidas de la serie
  const famousLocationIds = [1, 2, 3, 5, 6, 7, 8, 9, 11];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const charsRes = await fetch('https://rickandmortyapi.com/api/character');
      const charsData = await charsRes.json();
      
      // Filtrar para excluir a "Abadango Cluster Princess"
      const filteredChars = charsData.results.filter(char => 
        char.name !== 'Abadango Cluster Princess'
      ).slice(0, 6);

      // Obtener ubicaciones específicas (las más reconocidas)
      const locationPromises = famousLocationIds.map(id =>
        fetch(`https://rickandmortyapi.com/api/location/${id}`).then(res => res.json())
      );
      const locsData = await Promise.all(locationPromises);

      const epsRes = await fetch('https://rickandmortyapi.com/api/episode');
      const epsData = await epsRes.json();

      setCharacters(filteredChars);
      setLocations(locsData);
      setEpisodes(epsData.results.slice(0, 20));
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
    setLoading(false);
  };

  const translateStatus = (status) => {
    const translations = {
      'Alive': 'Vivo',
      'Dead': 'Muerto',
      'unknown': 'Desconocido'
    };
    return translations[status] || status;
  };

  const translateSpecies = (species) => {
    const translations = {
      'Human': 'Humano',
      'Alien': 'Alienígena',
      'Humanoid': 'Humanoide',
      'Robot': 'Robot',
      'Cronenberg': 'Cronenberg',
      'Mythological Creature': 'Criatura Mitológica',
      'Animal': 'Animal',
      'Poopybutthole': 'Poopybutthole',
      'unknown': 'Desconocido'
    };
    return translations[species] || species;
  };

  const translateGender = (gender) => {
    const translations = {
      'Male': 'Masculino',
      'Female': 'Femenino',
      'Genderless': 'Sin género',
      'unknown': 'Desconocido'
    };
    return translations[gender] || gender;
  };

  const translateLocationType = (type) => {
    const translations = {
      'Planet': 'Planeta',
      'Cluster': 'Cúmulo',
      'Space station': 'Estación espacial',
      'Microverse': 'Microverso',
      'TV': 'TV',
      'Resort': 'Resort',
      'Fantasy town': 'Ciudad de fantasía',
      'Dream': 'Sueño',
      'Dimension': 'Dimensión',
      'unknown': 'Desconocido',
      'Menagerie': 'Zoológico',
      'Game': 'Juego',
      'Customs': 'Aduana',
      'Daycare': 'Guardería',
      'Dwarf planet (Celestial Dwarf)': 'Planeta enano',
      'Miniverse': 'Miniverso',
      'Teenyverse': 'Teenyverso',
      'Box': 'Caja',
      'Spacecraft': 'Nave espacial',
      'Artificially generated world': 'Mundo generado artificialmente',
      'Machine': 'Máquina',
      'Arcade': 'Arcade',
      'Memory': 'Memoria',
      'Hell': 'Infierno',
      'Police Department': 'Departamento de policía',
      'Reality': 'Realidad',
      'Death Star': 'Estrella de la muerte',
      'Base': 'Base'
    };
    return translations[type] || type;
  };

  const translateDimension = (dimension) => {
    const translations = {
      'Dimension C-137': 'Dimensión C-137',
      'unknown': 'Desconocida',
      'Post-Apocalyptic Dimension': 'Dimensión Post-Apocalíptica',
      'Replacement Dimension': 'Dimensión de Reemplazo',
      'Cronenberg Dimension': 'Dimensión Cronenberg',
      'Fantasy Dimension': 'Dimensión de Fantasía',
      'Dimension 5-126': 'Dimensión 5-126',
      'Testicle Monster Dimension': 'Dimensión del Monstruo Testículo'
    };
    return translations[dimension] || dimension;
  };

  const Navigation = () => (
    <nav className="bg-gradient-to-r from-green-600 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Camera className="text-white" size={32} />
            <span className="text-white text-xl font-bold">Universo Rick & Morty</span>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentRoute('inicio')}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentRoute === 'inicio'
                  ? 'bg-white text-green-600 font-semibold'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => setCurrentRoute('personajes')}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentRoute === 'personajes'
                  ? 'bg-white text-green-600 font-semibold'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Personajes
            </button>
            <button
              onClick={() => setCurrentRoute('ubicaciones')}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentRoute === 'ubicaciones'
                  ? 'bg-white text-green-600 font-semibold'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Ubicaciones
            </button>
            <button
              onClick={() => setCurrentRoute('episodios')}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentRoute === 'episodios'
                  ? 'bg-white text-green-600 font-semibold'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Episodios
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="relative bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 animate-pulse">
            🛸 Universo Rick & Morty
          </h1>
          <p className="text-xl mb-6">
            Explora el multiverso infinito de Rick y Morty. Descubre personajes, 
            ubicaciones interdimensionales y episodios épicos de la serie más científica 
            y alocada del universo.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setCurrentRoute('personajes')}
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-100 transition-all transform hover:scale-105"
            >
              Ver Personajes
            </button>
            <button
              onClick={() => setCurrentRoute('ubicaciones')}
              className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all"
            >
              Explorar Ubicaciones
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Personajes Destacados
        </h2>
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Cargando personajes...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((char) => (
              <div
                key={char.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{char.name}</h3>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        char.status === 'Alive'
                          ? 'bg-green-500'
                          : char.status === 'Dead'
                          ? 'bg-red-500'
                          : 'bg-gray-500'
                      }`}
                    ></span>
                    <span>{translateStatus(char.status)} - {translateSpecies(char.species)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const CharactersPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-3 mb-8">
          <Users className="text-green-600" size={40} />
          <h1 className="text-4xl font-bold text-gray-800">Personajes</h1>
        </div>
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Cargando personajes...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((char) => (
              <div
                key={char.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all"
              >
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{char.name}</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      <span className="font-semibold">Estado:</span>{' '}
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          char.status === 'Alive'
                            ? 'bg-green-100 text-green-800'
                            : char.status === 'Dead'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {translateStatus(char.status)}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">Especie:</span> {translateSpecies(char.species)}
                    </p>
                    <p>
                      <span className="font-semibold">Género:</span> {translateGender(char.gender)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const LocationsPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-3 mb-8">
          <MapPin className="text-blue-600" size={40} />
          <h1 className="text-4xl font-bold text-gray-800">Ubicaciones Más Reconocidas</h1>
        </div>
        <p className="text-gray-600 mb-8 text-center">
          Las 9 ubicaciones más icónicas del universo de Rick & Morty
        </p>
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Cargando ubicaciones...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3">{loc.name}</h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-semibold">Tipo:</span>{' '}
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {translateLocationType(loc.type)}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Dimensión:</span> {translateDimension(loc.dimension)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const EpisodesPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-3 mb-8">
          <Tv className="text-purple-600" size={40} />
          <h1 className="text-4xl font-bold text-gray-800">Episodios</h1>
        </div>
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Cargando episodios...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map((ep) => (
              <div
                key={ep.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3">{ep.name}</h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-semibold">Episodio:</span>{' '}
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                      {ep.episode}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Fecha de emisión:</span> {ep.air_date}
                  </p>
                  <p>
                    <span className="font-semibold">Personajes:</span> {ep.characters.length}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      {currentRoute === 'inicio' && <HomePage />}
      {currentRoute === 'personajes' && <CharactersPage />}
      {currentRoute === 'ubicaciones' && <LocationsPage />}
      {currentRoute === 'episodios' && <EpisodesPage />}
    </div>
  );
};

export default App;