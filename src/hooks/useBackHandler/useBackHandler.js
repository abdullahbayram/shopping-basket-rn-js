import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useBackHandler = (callback) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', callback);

    return () => {
      backHandler.remove();
    };
  }, [callback]);
};

export default useBackHandler;
