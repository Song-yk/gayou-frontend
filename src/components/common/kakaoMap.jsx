import { useEffect, useRef } from 'react';
import { Controller } from 'react-hook-form';

function KakaoMap(props) {
  const { kakao } = window;
  const { width, height, name, control, center } = props;
  const mapRef = useRef(null);

  useEffect(() => {
    if (kakao && kakao.maps) {
      const container = mapRef.current;
      const options = {
        center: new kakao.maps.LatLng(36.3504119, 127.3845475),
        level: 2,
      };
      const map = new kakao.maps.Map(container, options);
      var bounds = new kakao.maps.LatLngBounds();

      const waypoints = [];
      center.forEach((location, index) => {
        var imageSrc =
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
          imageSize = new kakao.maps.Size(36, 37),
          imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691),
            spriteOrigin: new kakao.maps.Point(0, index * 46 + 10),
            offset: new kakao.maps.Point(13, 37),
          },
          markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions
          );
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(location.mapx, location.mapy),
          image: markerImage,
        });
        marker.setMap(map);
        bounds.extend(new kakao.maps.LatLng(location.mapx, location.mapy));

        if (index != 0 && index != center.length - 1) {
          waypoints.push({
            name: `name${index}`,
            x: location.mapy,
            y: location.mapx,
          });
        }
      });

      map.setBounds(bounds);

      const VITE_KAKAO_MAP_REST_API_KEY = import.meta.env
        .VITE_KAKAO_MAP_REST_API_KEY;
      const url = 'https://apis-navi.kakaomobility.com/v1/waypoints/directions';

      const origin = { x: center[0].mapy, y: center[0].mapx };
      const destination = {
        x: center[center.length - 1].mapy,
        y: center[center.length - 1].mapx,
      };

      const headers = {
        Authorization: `KakaoAK ${VITE_KAKAO_MAP_REST_API_KEY}`,
        'Content-Type': 'application/json',
      };

      const data = {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
      };

      const fetchData = async () => {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
          });

          const resData = await response.json();

          console.log(resData);

          const linePath = [];
          resData.routes[0].sections.forEach(section => {
            section.roads.forEach(router => {
              if (router.vertexes && router.vertexes.length > 0) {
                for (let i = 0; i < router.vertexes.length; i += 2) {
                  // Ensure we don't go out of bounds
                  if (i + 1 < router.vertexes.length) {
                    // Add the coordinates to the path
                    linePath.push(
                      new kakao.maps.LatLng(
                        router.vertexes[i + 1],
                        router.vertexes[i]
                      )
                    );
                  }
                }
              } else {
                console.error(
                  'Unexpected structure for vertexes:',
                  router.vertexes
                );
              }
            });
          });

          var polyline = new kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 3,
            strokeColor: 'red',
            strokeOpacity: 1,
            strokeStyle: 'solid',
          });
          polyline.setMap(map);
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchData();
    }
  }, [center]);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <div>
          <div
            ref={mapRef}
            id="map"
            style={{ width: width || '100%', height: height || '582px' }}
          ></div>
          {error && <span>{error.message}</span>}
        </div>
      )}
    />
  );
}

export default KakaoMap;
