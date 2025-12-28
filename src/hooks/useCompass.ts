import { useEffect, useState } from 'react';
import { magnetometer, SensorTypes, setUpdateIntervalForType } from 'react-native-sensors';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';

interface Location {
  coords: {
    latitude: number;
    longitude: number;
    altitude: number | null;
  };
}

const calculateAngle = (magnetometer: any): number => {
  let angle = 0;
  if (magnetometer) {
    let { x, y } = magnetometer;
    if (Math.atan2(y, x) >= 0) {
      angle = Math.atan2(y, x) * (180 / Math.PI);
    } else {
      angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
    }
  }
  return Math.round(angle - 90 >= 0 ? angle - 90 : angle + 271);
};

export const useCompass = () => {
  const [magnetometerValue, setMagnetometerValue] = useState(0);
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    let isMounted = true;
    const smoothing = 0.85;
    let lastAngle = 0;

    // Set update interval for magnetometer (~60fps)
    setUpdateIntervalForType(SensorTypes.magnetometer, 16);

    const subscription = magnetometer.subscribe(
      ({ x, y, z }) => {
        let newAngle = calculateAngle({ x, y, z });
        
        // Handle 0/360 wrap-around to always take the shortest path
        let diff = newAngle - lastAngle;
        if (diff > 180) {
          newAngle -= 360;
        } else if (diff < -180) {
          newAngle += 360;
        }

        // Apply smoothing
        const smoothedAngle = lastAngle * smoothing + newAngle * (1 - smoothing);
        lastAngle = smoothedAngle;

        if (isMounted) {
          // Normalize to 0-359 range
          const normalizedAngle = ((smoothedAngle % 360) + 360) % 360;
          setMagnetometerValue(Math.round(normalizedAngle));
        }
      },
      (error) => {
        console.error('Magnetometer error:', error);
      }
    );

    getLocation();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Survival Guide needs access to your location for the compass',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude,
          },
        });
      },
      (error) => {
        console.error('Location error:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return {
    magnetometer: magnetometerValue,
    location,
  };
};

export const getDirection = (degree: number): string => {
  if (degree >= 338 || degree < 23) return 'N';
  if (degree >= 23 && degree < 68) return 'NE';
  if (degree >= 68 && degree < 113) return 'E';
  if (degree >= 113 && degree < 158) return 'SE';
  if (degree >= 158 && degree < 203) return 'S';
  if (degree >= 203 && degree < 248) return 'SW';
  if (degree >= 248 && degree < 293) return 'W';
  if (degree >= 293 && degree < 338) return 'NW';
  return 'N';
};
