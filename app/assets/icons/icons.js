// src/assets/svgs/icons.js
import React from 'react';
import Svg, { Path } from 'react-native-svg';

// Define your SVG components
export const FileMusic = ({ width = 20, height = 20, fill = "#000" }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24">
    <Path d="M3 2v20h18V2H3zm16 16H5v-2h14v2zm0-4H5v-2h14v2zm0-4H5V8h14v2z" fill={fill} />
  </Svg>
);

export const Home = ({ width = 20, height = 20, fill = "#000" }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16">
    <Path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" fill={fill} />
  </Svg>
);

export const Lightning = ({ width = 20, height = 20, fill = "#000" }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16">
    <Path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" fill={fill} />
  </Svg>
);

export const ListMenu = ({ width = 20, height = 20, fill = "#000" }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16">
    <Path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" fill={fill} />
  </Svg>
);

export const User = ({ width = 20, height = 20, fill = "#000" }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16">
    <Path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" fill={fill} />
    <Path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" fill={fill} />
  </Svg>
);
