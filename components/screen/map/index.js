import { GoogleMap, Marker, InfoWindow, useJsApiLoader, LoadScript } from "@react-google-maps/api";
import { Suspense, Fragment, useState, useEffect, useRef } from "react";
import * as S from "./styles";

const lib = ["places"];
const id = ["83c2d4fd41866ca3"];
const ZOOM = 13;

export default function MapEl({ searchText, addressLength }) {
  const mapRef = useRef();

  const [center, setCenter] = useState({ lat: 48.331986138160154, lng: 14.317360876823411 });

  const [executeSearchText, setExecuteSearchText] = useState(searchText);

  const timeoutRef = useRef();
  useEffect(() => {
    try {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setExecuteSearchText(searchText);
      }, 1 * 1000);
      return () => timeoutRef.current && clearTimeout(timeoutRef.current);
    } catch (e) {
      console.log(e);
    }
  }, [searchText]);

  useEffect(() => {
    if (!executeSearchText || executeSearchText.length === 0) return;
    if (!mapRef.current) return;
    performSearch(executeSearchText);
  }, [executeSearchText]);

  function performSearch(text) {
    let map = mapRef.current;
    let request = {
      query: text,
      fields: ["name", "geometry"],
    };

    let service = new window.google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setCenter(results[0].geometry.location);
      }
    });
  }

  function onLoad(map) {
    mapRef.current = map;
  }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN} libraries={lib} mapIds={id}>
      <S.MapEl>
        <S.SingleMap
          style={{
            top: "0",
            left: "0",
          }}
        >
          <Suspense fallback={null}>
            <GoogleMap
              center={center}
              zoom={ZOOM}
              onLoad={onLoad}
              mapContainerStyle={{
                height: "100%",
                width: "100%",
              }}
              options={{
                backgroundColor: "blue",
                disableZoomControl: true,
                mapId: "83c2d4fd41866ca3",
                fullscreenControl: false,
                disableDefaultUI: true,
              }}
            />
          </Suspense>
        </S.SingleMap>
        {new Array(15).fill(0).map((_, i) => (
          <Fragment key={i}>
            {i < addressLength && (
              <S.SingleMap
                style={{
                  top: `${Math.floor((i + 1) / 4) * 25}vh`,
                  left: `${((i + 1) % 4) * 25}vw`,
                  transform: `scaleX(${(i + 1) % 2 === 0 ? 1 : -1}) scaleY(${Math.floor((i + 1) / 4) % 2 === 0 ? 1 : -1})`,
                }}
              >
                <SingleMap center={center} idx={i} />
              </S.SingleMap>
            )}
          </Fragment>
        ))}
      </S.MapEl>
    </LoadScript>
  );
}

function SingleMap({ center, idx }) {
  const [delayedCenter, setDelayedCenter] = useState(center);

  useEffect(() => {
    if (center) {
      const timeout = setTimeout(() => {
        setDelayedCenter(center);
      }, idx * 100);
      return () => clearTimeout(timeout);
    }
  }, [center]);

  return (
    <Suspense fallback={null}>
      <GoogleMap
        center={center}
        zoom={ZOOM}
        mapContainerStyle={{
          height: "100%",
          width: "100%",
        }}
        options={{
          backgroundColor: "blue",
          disableZoomControl: true,
          mapId: "83c2d4fd41866ca3",
          fullscreenControl: false,
          disableDefaultUI: true,
        }}
      />
    </Suspense>
  );
}
