import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop, G, Line, Text as SvgText } from 'react-native-svg';
import { colors } from '../styles/globalStyles';

interface CompassDialProps {
  dialWidth: number;
  center: number;
  radius: number;
  magnetometer: number;
}

const CompassFace: React.FC<{ center: number; radius: number }> = ({ center, radius }) => {
  const renderCompassFace = () => {
    const items = [];

    for (let i = 0; i < 360; i += 30) {
      const isCardinal = i % 90 === 0; // N, E, S, W
      const angleRad = (i - 90) * (Math.PI / 180);

      // Calculate Line coordinates
      const x1 = center + radius * Math.cos(angleRad);
      const y1 = center + radius * Math.sin(angleRad);

      const tickLen = isCardinal ? 25 : 15;
      const x2 = center + (radius - tickLen) * Math.cos(angleRad);
      const y2 = center + (radius - tickLen) * Math.sin(angleRad);

      const textRadius = radius - 50;
      const tx = center + textRadius * Math.cos(angleRad);
      const ty = center + textRadius * Math.sin(angleRad);

      items.push(
        <G key={`tick-${i}`}>
          <Line
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={isCardinal ? colors.primary : colors.textTertiary}
            strokeWidth={isCardinal ? 3 : 2}
          />

          <SvgText
            x={tx}
            y={ty}
            fill={isCardinal ? colors.textPrimary : colors.textSecondary}
            fontSize={isCardinal ? "24" : "14"}
            fontWeight={isCardinal ? "bold" : "normal"}
            textAnchor="middle"
            alignmentBaseline="middle"
            transform={`rotate(${i + 90}, ${tx}, ${ty})`}
          >
            {i === 0 ? 'N' : i === 90 ? 'E' : i === 180 ? 'S' : i === 270 ? 'W' : i}
          </SvgText>
        </G>
      );
    }
    return items;
  };

  return <>{renderCompassFace()}</>;
};

export const CompassDial: React.FC<CompassDialProps> = ({
  dialWidth,
  center,
  radius,
  magnetometer
}) => {
  return (
    <View style={styles.compassContainer}>
      <View style={styles.indicator} />

      <View style={{ transform: [{ rotate: `${-magnetometer}deg` }] }}>
        <Svg height={dialWidth} width={dialWidth} viewBox={`0 0 ${dialWidth} ${dialWidth}`}>
          <Defs>
            <LinearGradient id="paint0_linear" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0" stopColor="white" stopOpacity="0.15" />
              <Stop offset="1" stopColor="white" stopOpacity="0.05" />
            </LinearGradient>
          </Defs>

          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="url(#paint0_linear)"
            strokeWidth="10"
            fill="transparent"
          />

          <CompassFace center={center} radius={radius} />
        </Svg>
      </View>

      <View style={styles.crosshairV} />
      <View style={styles.crosshairH} />
    </View>
  );
};

const styles = StyleSheet.create({
  compassContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    top: -20,
    zIndex: 10,
    width: 4,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  crosshairV: {
    position: 'absolute',
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  crosshairH: {
    position: 'absolute',
    width: 20,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});
