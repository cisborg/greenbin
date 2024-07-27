import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FileMusic, Home, Lightning, ListMenu, User } from './icons';

const svgMap = {
  FileMusic,
  Home,
  Lightning,
  ListMenu,
  User,
};

const Icon = ({ name, width = 20, height = 20, color = "#000" }) => {
  const SvgComponent = svgMap[name];

  if (!SvgComponent) {
    console.error(`SVG with name "${name}" not found.`);
    return null;
  }

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
