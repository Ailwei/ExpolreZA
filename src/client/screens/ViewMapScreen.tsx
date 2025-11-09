import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { getCurrentLocation } from '../utils/location';

const { width, height } = Dimensions.get('window');

type Mode = 'driving' | 'foot' | 'bike';

const modeColors: Record<Mode, { color: string; lineStyle: 'solid' | 'dotted' }> = {
  driving: { color: 'red', lineStyle: 'solid' },
  foot: { color: 'red', lineStyle: 'dotted' },
  bike: { color: 'green', lineStyle: 'solid' },
};

const ViewMapScreen: React.FC = () => {
  const route = useRoute();
  const { lat: destLat, lng: destLng, title } = route.params as { lat?: number; lng?: number; title?: string };

  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [routeCoords, setRouteCoords] = useState<{ latitude: number; longitude: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>('driving');
  const [duration, setDuration] = useState<number | null>(null);

  const fetchRoute = async (
    profile: Mode,
    from: { latitude: number; longitude: number },
    to: { latitude: number; longitude: number }
  ) => {
    if (!from || !to) return;
    setLoading(true);
    try {
      const url = `https://router.project-osrm.org/route/v1/${profile}/${from.longitude},${from.latitude};${to.longitude},${to.latitude}?overview=full&geometries=geojson`;

      const res = await axios.get(url);
      const json = res.data;

      if (json.routes?.length) {
        const coords = json.routes[0].geometry.coordinates.map(([lng, lat]: [number, number]) => ({
          latitude: lat,
          longitude: lng,
        }));
        setRouteCoords(coords);
        setDuration(json.routes[0].duration);
      } else {
        console.warn('No routes returned from OSRM API.');
        setRouteCoords([]);
        setDuration(null);
      }
    } catch (err) {
      console.error('Error fetching route:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const pos: any = await getCurrentLocation();
      if (pos?.coords && destLat != null && destLng != null) {
        const { latitude, longitude } = pos.coords;
        setCurrentLocation({ latitude, longitude });
        await fetchRoute(mode, { latitude, longitude }, { latitude: destLat, longitude: destLng });
      } else {
        console.warn('Current location or destination not available.');
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (currentLocation && destLat != null && destLng != null) {
      fetchRoute(mode, currentLocation, { latitude: destLat, longitude: destLng });
    }
  }, [mode]);

  if (loading || !currentLocation) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  const formatDuration = (seconds: number) => {
    const mins = Math.ceil(seconds / 60);
    if (mins < 60) return `${mins} min`;
    const hrs = Math.floor(mins / 60);
    return `${hrs} h ${mins % 60} min`;
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={currentLocation} title="You are here" pinColor="blue" />
        {destLat != null && destLng != null && <Marker coordinate={{ latitude: destLat, longitude: destLng }} title={title || 'Destination'} />}
        <Polyline
          coordinates={routeCoords}
          strokeColor={modeColors[mode].color}
          strokeWidth={5}
          lineDashPattern={modeColors[mode].lineStyle === 'dotted' ? [10, 5] : undefined}
        />
      </MapView>

      <View style={styles.modeSelector}>
        {(['driving', 'foot', 'bike'] as Mode[]).map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.modeButton, mode === m && { backgroundColor: '#ddd' }]}
            onPress={() => setMode(m)}
          >
            <Text style={styles.modeText}>{m.charAt(0).toUpperCase() + m.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {duration && <Text style={styles.durationText}>Estimated time: {formatDuration(duration)}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1, width, height },
  modeSelector: { position: 'absolute', top: 10, left: 10, flexDirection: 'row', backgroundColor: 'white', borderRadius: 8 },
  modeButton: { padding: 8, margin: 4, borderRadius: 5 },
  modeText: { fontWeight: 'bold' },
  durationText: { position: 'absolute', bottom: 10, left: 10, fontSize: 16, fontWeight: 'bold', backgroundColor: 'white', padding: 6, borderRadius: 5 },
});

export default ViewMapScreen;
