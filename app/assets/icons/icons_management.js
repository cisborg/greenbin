// src/components/Icon.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FileMusic, Home, Lightning, ListMenu, User } from './icons';

// Create a mapping object for your SVGs
const svgMap = {
  FileMusic,
  Home,
  Lightning,
  ListMenu,
  User,
};

// Icon component to display SVGs based on the name prop
const Icon = ({ name, width = 20, height = 20, color = "#000" }) => {
  // Get the SVG component from the map
  const SvgComponent = svgMap[name];

  // Check if the SVG component exists
  if (!SvgComponent) {
    console.error(`SVG with name "${name}" not found.`);
    return null; // Or render a fallback UI
  }

  // Render the SVG component with the specified props
  return (
    <View style={styles.container}>
      <SvgComponent width={width} height={height} fill={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Icon;
