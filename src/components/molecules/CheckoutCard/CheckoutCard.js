import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../../atoms/Button/Button';
import showToast from '../../../utils/showToast';
import messages from '../../../constants/strings';

const CheckoutCard = ({ product, onQuantityChange, onButtonPress }) => {
  const [localQuantity, setLocalQuantity] = React.useState(product.quantity);

  const handleDecrease = () => {
    if (localQuantity > 1) {
      setLocalQuantity(localQuantity - 1);
      onQuantityChange(product, localQuantity - 1);
    } else {
      showToast(messages.invalidQuantity);
    }
  };

  const handleIncrease = () => {
    if (localQuantity < 5) {
      setLocalQuantity(localQuantity + 1);
      onQuantityChange(product, localQuantity + 1);
    } else {
      showToast(messages.invalidQuantity);
    }
  };

  const formattedPrice = (product.price * localQuantity).toFixed(2);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image style={styles.image} source={{ uri: product.image }} />
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {product.title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={2} ellipsizeMode="tail">
            {product.description}
          </Text>
          <Text style={styles.price}>${formattedPrice}</Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.quantityContainer}>
          <Button onPress={handleDecrease} style={styles.quantityMinButton}>
            <MaterialIcons name="remove" size={18} color="#FFA500" />
          </Button>
          <View style={styles.quantityTextContainer}>
            <Text style={styles.quantityText}>{localQuantity}</Text>
          </View>
          <Button onPress={handleIncrease} style={styles.quantityPlusButton}>
            <MaterialIcons name="add" size={18} color="#FFA500" />
          </Button>
        </View>
        <Button onPress={onButtonPress} style={styles.transparentButton}>
          Remove Item
        </Button>
      </View>
    </View>
  );
};

CheckoutCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onButtonPress: PropTypes.func.isRequired,
};

export default CheckoutCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9', // Light gray background
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // For Android shadow
  },
  topSection: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  bottomSection: {
    flexDirection: 'row',
    flex: 1,
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    // justifyContent: 'space-between',
  },
  quantityMinButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FFA500',
    borderRadius: 8,
    maxWidth: 50,
  },
  quantityPlusButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FFA500',
    borderRadius: 8,
    maxWidth: 50,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  transparentButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFA500',
    borderRadius: 20,
    // paddingHorizontal: 20,
  },
  quantityTextContainer: {
    width: 30,
  },
});
