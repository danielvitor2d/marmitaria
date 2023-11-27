import React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

const Map = () => {
  return (
    <MapView
      style={styles.map}
      initialCamera={{
        center: {
          latitude: 37.78825,
          longitude: -122.4324,
        },
        pitch: 0,
        heading: 0,
        altitude: 1000,
        zoom: 16,
      }}
    />
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
