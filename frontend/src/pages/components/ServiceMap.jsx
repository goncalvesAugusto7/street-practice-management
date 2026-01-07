import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";

import Loading from "../../components/LoadingIcon"

export default function ServiceMap() {
  const [loading, setLoading] = useState(true);
  const [centroid, setCentroid] = useState(null);
  const [locations, setLocations] = useState(null);

  const getLocations = async (event) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("http://localhost:8080/api/location");
        const data = await response.json();
        console.log(data);

        setLocations(data);
        resolve(data);
      } catch (error) {
        console.error("Erro ao pegar localizações: " + error);
        reject(error);
      }
    });
  };

  const getCentroid = (locations) => {
    try {
      let midLatitude = 0;
      locations.map((r, index) => (midLatitude += r.latitude));
      midLatitude /= locations.length;

      console.log("latitude média: " + midLatitude);

      let midLongitude = 0;
      locations.map((r, index) => (midLongitude += r.longitude));
      midLongitude /= locations.length;

      console.log("longitude média: " + midLongitude);

      setCentroid([midLatitude, midLongitude]);
    } catch (error) {
      console.log("Erro ao pegar centróide: " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocations()
      .then((locations) => getCentroid(locations))
      .catch((error) => console.log("Erro: " + error));
  }, []);

  if (loading) return(
    <div className="flex items-center justify-center">
      <Loading/>
    </div>
  );
  if (!locations) return <p>Nenhum local de atendimento encontrado</p>;

  return (
    <div className="bg-green-100 rounded-md p-2 border-green-700 border-2">
      <h2 className="text-2xl font-bold text-green-600 text-center mb-2">
        Mapa dos Atendimentos
      </h2>

      <MapContainer
        className="rounded-md leaflet-map"
        center={centroid}
        zoom={12}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {locations.map((local) => (
          <Marker key={local.id} position={[local.latitude, local.longitude]}>
            <Popup>{local.id}</Popup>
          </Marker>
        ))}
      </MapContainer>
      <p className="p-1 font-bold">
        Atendimentos registrados: {locations.length}
      </p>
    </div>
  );
}
