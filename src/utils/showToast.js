import { Alert } from 'react-native';

const showToast = ({ title = 'Notice', msg = 'Something happened' } = {}) => {
  if (!title && !msg) {
    console.error('Invalid input: title and msg cannot both be empty');
    return;
  }
  Alert.alert(title, msg);
};

export default showToast;
