import { Alert } from 'react-native';

const showToast = ({ title = 'Notice', message = 'Something happened' } = {}) => {
  if (!title && !message) {
    console.log('Invalid input: title and message cannot both be empty');
    return;
  }
  Alert.alert(title, message);
};

export default showToast;
