import { Alert } from 'react-native';

const showToast = ({ title, msg }) => {
  return Alert.alert(title, msg);
};

export default showToast;
