import React from 'react';
import PropTypes from 'prop-types';
import { LinearGradient as Gradient } from 'expo-linear-gradient';
import globalStyles from '../../../globalStyles';

const LinearGradient = ({ colors, start = { x: 0, y: 0 }, end = { x: 1, y: 1 }, style = {} }) => (
  <Gradient colors={colors} start={start} end={end} style={[globalStyles.flex, style]} />
);

LinearGradient.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired, // Gradient colors
  start: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  end: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default LinearGradient;
