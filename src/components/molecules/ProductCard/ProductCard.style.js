import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginVertical: 10,
    borderRadius: 10,
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  title: {
    flexDirection: 'row',
    paddingVertical: 0,
    paddingBottom: 0,
    marginVertical: 0,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  feedbackAndPrice: {
    paddingHorizontal: 16,
  },
  rating: {
    fontSize: 13,
    color: '#FFA500',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    borderRadius: 50,
    flex: 1,
  },
  buttonOrHelperTextContainer: {
    paddingHorizontal: 7,
    flexDirection: 'row',
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
