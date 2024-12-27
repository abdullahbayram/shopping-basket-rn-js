import React from 'react';
import { render } from '@testing-library/react-native';
import { useForm, FormProvider } from 'react-hook-form';

/**
 * Utility to render a component wrapped in a FormProvider
 * @param {React.ReactNode} ui - The React component to render.
 * @param {object} formOptions - Options to initialize useForm (default: {}).
 * @param {object} renderOptions - Additional options for the render method (default: {}).
 * @returns {object} - The result of the render function.
 */
const renderInFormProvider = (ui, formOptions = {}, renderOptions = {}) => {
  const Wrapper = ({ children }) => {
    const methods = useForm(formOptions);
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export default renderInFormProvider;
