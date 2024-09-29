import { useEffect, useRef, useCallback } from 'react';
import { Controller } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box } from '@mui/material';

function KakaoMap(props) {
  const { kakao } = window;
  const center = props.center;
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (kakao && kakao.maps && center && center.length > 0) {
      const container = mapRef.current;

      if (!container) {
        return;
      }

      const options = {
        center: new kakao.maps.LatLng(center[0].mapy, center[0].mapx),
        level: 2,
      };

      const map = new kakao.maps.Map(container, options);
      mapInstance.current = map;

      const bounds = new kakao.maps.LatLngBounds();
      const waypoints = [];

      center.forEach((location, index) => {
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
        const imageSize = new kakao.maps.Size(36, 37);
        const imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691),
          spriteOrigin: new kakao.maps.Point(0, index * 46 + 10),
          offset: new kakao.maps.Point(13, 37),
        };

        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
        const markerPosition = new kakao.maps.LatLng(location.mapy, location.mapx);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        marker.setMap(map);
        bounds.extend(markerPosition);

        if (index !== 0 && index !== center.length - 1) {
          waypoints.push({
            name: `name${index}`,
            x: location.mapx,
            y: location.mapy,
          });
        }
      });

      map.setBounds(bounds);

      const VITE_KAKAO_MAP_REST_API_KEY = import.meta.env.VITE_KAKAO_MAP_REST_API_KEY;
      const url = 'https://apis-navi.kakaomobility.com/v1/waypoints/directions';

      const origin = { x: center[0].mapx, y: center[0].mapy };
      const destination = {
        x: center[center.length - 1].mapx,
        y: center[center.length - 1].mapy,
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

          if (!resData.routes || resData.routes.length === 0) {
            return;
          }

          const linePath = [];
          resData.routes[0].sections.forEach(section => {
            section.roads.forEach(router => {
              if (router.vertexes && router.vertexes.length > 0) {
                for (let i = 0; i < router.vertexes.length; i += 2) {
                  if (i + 1 < router.vertexes.length) {
                    linePath.push(new kakao.maps.LatLng(router.vertexes[i + 1], router.vertexes[i]));
                  }
                }
              }
            });
          });

          const polyline = new kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 3,
            strokeColor: 'red',
            strokeOpacity: 1,
            strokeStyle: 'solid',
          });

          try {
            polyline.setMap(map);
          } catch (error) {}
        } catch (error) {}
      };

      fetchData();
    }
  }, [kakao, center]);

  const setMapType = useCallback(maptype => {
    if (mapInstance.current) {
      const map = mapInstance.current;
      const roadmapControl = document.getElementById('btnRoadmap');
      const skyviewControl = document.getElementById('btnSkyview');
      if (maptype === 'roadmap') {
        map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
        roadmapControl.className = 'selected_btn';
        skyviewControl.className = 'custom_type_btn';
      } else {
        map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
        skyviewControl.className = 'selected_btn';
        roadmapControl.className = 'custom_type_btn';
      }
    }
  }, []);

  const zoomIn = useCallback(() => {
    if (mapInstance.current) {
      const map = mapInstance.current;
      map.setLevel(map.getLevel() - 1);
    }
  }, []);

  const zoomOut = useCallback(() => {
    if (mapInstance.current) {
      const map = mapInstance.current;
      map.setLevel(map.getLevel() + 1);
    }
  }, []);

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="map_wrap">
          <div ref={mapRef} id="map" style={{ width: props.width || '100%', height: props.height || '670px' }}></div>
          <div className="custom_typecontrol radius_border">
            <span id="btnRoadmap" className="selected_btn" onClick={() => setMapType('roadmap')}>
              지도
            </span>
            <span id="btnSkyview" className="custom_type_btn" onClick={() => setMapType('skyview')}>
              스카이뷰
            </span>
          </div>
          {props.editModeData}
          <div className="custom_zoomcontrol radius_border">
            <span onClick={zoomIn}>
              <AddIcon alt="확대" />
            </span>
            <span onClick={zoomOut}>
              <RemoveIcon alt="축소" />
            </span>
          </div>
          {error && <span>{error.message}</span>}
        </div>
      )}
    />
  );
}

export default KakaoMap;
