import React from 'react';
import { Dimensions, StatusBar, Text, View, StyleSheet } from 'react-native';
import { CompassDial } from '../components/CompassDial';
import { DataRow } from '../components/DataRow';
import { useCompass, getDirection } from '../hooks/useCompass';

const { width } = Dimensions.get('window');
const DIAL_WIDTH = width - 40;
const CENTER = DIAL_WIDTH / 2;
const RADIUS = CENTER - 10;

export default function CompassScreen() {
  const { magnetometer, location } = useCompass();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <View style={styles.header}>
        <Text style={styles.degreeText}>
          {magnetometer}° {getDirection(magnetometer)}
        </Text>
      </View>

      <CompassDial 
        dialWidth={DIAL_WIDTH}
        center={CENTER}
        radius={RADIUS}
        magnetometer={magnetometer}
      />

      <View style={styles.footer}>
        <DataRow label="NL" value={location?.coords.latitude} type="lat" />
        <DataRow label="EL" value={location?.coords.longitude} type="long" />
        <DataRow label="Elevation" value={location?.coords.altitude} unit="m" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  header: {
    alignItems: 'center',
  },
  degreeText: {
    color: '#FFFFFF',
    fontSize: 56,
    fontWeight: '200',
    fontVariant: ['tabular-nums'],
  },
  footer: {
    width: '100%',
    paddingHorizontal: 40,
  },
});
