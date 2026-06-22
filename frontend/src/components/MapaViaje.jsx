import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { GOOGLE_MAPS_LIBRARIES } from "../config/googleMaps";

const containerStyle = {
  width: "100%",
  height: "450px",
  borderRadius: "16px",
};

const centroLima = {
  lat: -12.0464,
  lng: -77.0428,
};

export default function MapaViaje({
  origen = null,
  destino = null,
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  if (!isLoaded) {
    return (
      <div className="h-[450px] flex items-center justify-center bg-gray-100 rounded-2xl">
        Cargando mapa...
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={origen || centroLima}
      zoom={13}
    >
      {origen && (
        <Marker
          position={origen}
          label="O"
        />
      )}

      {destino && (
        <Marker
          position={destino}
          label="D"
        />
      )}
    </GoogleMap>
  );
}


