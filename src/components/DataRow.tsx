import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';

interface DataRowProps {
  label: string;
  value?: number | null;
  type?: 'lat' | 'long';
  unit?: string;
}

export const DataRow: React.FC<DataRowProps> = ({ label, value, type, unit }) => {
  const formatValue = (val?: number | null) => {
    if (!val && val !== 0) return '--';
    if (unit) return `${Math.round(val)} ${unit}`;
    
    const dir = val > 0 ? (type === 'lat' ? 'N' : 'E') : (type === 'lat' ? 'S' : 'W');
    return `${Math.abs(val).toFixed(4)}° ${dir}`;
  };

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{formatValue(value)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  label: {
    color: '#666',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  value: {
    color: '#EEE',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});
