import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';

/**
 * Utility to render a component within a NavigationContainer
 *
 * @param {React.ReactNode} component - The component to render
 * @param {Object} options - Options to pass to render
 * @param {Object} navigationOptions - Initial routes or navigation props
 * @returns {Object} - The result of the render method from testing-library
 */
const renderInNavigation = (component, options = {}, navigationOptions = {}) => {
  return render(<NavigationContainer {...navigationOptions}>{component}</NavigationContainer>, options);
};

export default renderInNavigation;
