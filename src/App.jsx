import { useState, useEffect } from 'react';
import { Camera, Users, MapPin, Tv } from 'lucide-react';

const App = () => {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [charsRes, locsRes, epsRes] = await Promise.all([
        fetch('https://rickandmortyapi.com/api/character'),
        fetch('https://rickandmortyapi.com/api/location'),
        fetch('https://rickandmortyapi.com/api/episode')
      ]);

      const charsData = await charsRes.json();
      const locsData = await locsRes.json();
      const epsData = await epsRes.json();

      setCharacters(charsData.results.slice(0, 6));
      setLocations(locsData.results.slice(0, 20));
      setEpisodes(epsData.results.slice(0, 20));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const Navigation = () => (
    <nav className="bg-gradient-to-r from-green-600 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Camera className="text-white" size={32} />
            <span className="text-white text-xl font-bold">Rick & Morty Universe</span>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentRoute('home')}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentRoute === 'home'
                  ? 'bg-white text-green-600 font-semibold'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentRoute('characters')}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentRoute === 'characters'
                  ? 'bg-white text-green-600 font-semibold'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Characters
            </button>
            <button
              onClick={() => setCurrentRoute('locations')}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentRoute === 'locations'
                  ? 'bg-white text-green-600 font-semibold'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Locations
            </button>
            <button
              onClick={() => setCurrentRoute('episodes')}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentRoute === 'episodes'
                  ? 'bg-white text-green-600 font-semibold'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Episodes
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
            🛸 Rick & Morty Universe
          </h1>
          <p className="text-xl mb-6">
            Explora el multiverso infinito de Rick y Morty. Descubre personajes, 
            ubicaciones interdimensionales y episodios épicos de la serie más científica 
            y alocada del universo.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setCurrentRoute('characters')}
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-100 transition-all transform hover:scale-105"
            >
              Ver Personajes
            </button>
            <button
              onClick={() => setCurrentRoute('locations')}
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
                    <span>{char.status} - {char.species}</span>
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
                        {char.status}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">Especie:</span> {char.species}
                    </p>
                    <p>
                      <span className="font-semibold">Género:</span> {char.gender}
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
          <h1 className="text-4xl font-bold text-gray-800">Ubicaciones</h1>
        </div>
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
                      {loc.type}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Dimensión:</span> {loc.dimension}
                  </p>
                  <p>
                    <span className="font-semibold">Residentes:</span> {loc.residents.length}
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
      {currentRoute === 'home' && <HomePage />}
      {currentRoute === 'characters' && <CharactersPage />}
      {currentRoute === 'locations' && <LocationsPage />}
      {currentRoute === 'episodes' && <EpisodesPage />}
    </div>
  );
};

export default App;