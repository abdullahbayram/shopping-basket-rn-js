import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import messages from '@constants/toastMessages';
import { spacing } from '@constants/theme';
import { showToast } from '@utils';
import { Button, Text } from '../../atoms';
import createStyles from './CheckoutCard.style';

const CheckoutCard = ({ product, maxQuantity = 5, onQuantityChange, onRemoveButtonPress }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors, spacing);

  const isQuantityEqualsToOne = product.quantity === 1;
  const formattedPrice = (product.price * product.quantity).toFixed(2);

  const handleDecrease = () => {
    if (product.quantity > 1) {
      onQuantityChange(product, product.quantity - 1);
    } else {
      onRemoveButtonPress();
    }
  };

  const handleIncrease = () => {
    if (product.quantity < maxQuantity) {
      onQuantityChange(product, product.quantity + 1);
    } else {
      showToast(messages.basket.limitReached);
    }
  };

  return (
    <View testID="checkout-card" style={styles.container}>
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
          <Button
            testID={isQuantityEqualsToOne ? 'delete-button' : 'decrease-button'}
            onPress={handleDecrease}
            style={styles.quantityButton}
          >
            <MaterialIcons name={isQuantityEqualsToOne ? 'delete' : 'remove'} size={18} color={colors.buttonBorder} />
          </Button>
          <View style={styles.quantityTextContainer}>
            <Text testID="product-quantity" style={styles.quantityText}>
              {product.quantity}
            </Text>
          </View>
          <Button testID="increase-button" onPress={handleIncrease} style={styles.quantityButton}>
            <MaterialIcons name="add" size={18} color={colors.buttonBorder} />
          </Button>
        </View>
        <Button onPress={onRemoveButtonPress} style={styles.transparentButton}>
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
  maxQuantity: PropTypes.number,
  onQuantityChange: PropTypes.func.isRequired,
  onRemoveButtonPress: PropTypes.func.isRequired,
};

export default CheckoutCard;
