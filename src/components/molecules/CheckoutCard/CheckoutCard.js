import * as React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../../atoms/Button/Button';
import Text from '../../atoms/Text/Text';
import showToast from '../../../utils/showToast';
import messages from '../../../constants/strings';
import styles from './CheckoutCard.style';

const CheckoutCard = ({ product, onQuantityChange, onRemoveButtonPress }) => {
  const [localQuantity, setLocalQuantity] = React.useState(product.quantity);

  const isQuantityEqualsToOne = localQuantity === 1;
  const leftButtonIcon = isQuantityEqualsToOne ? 'delete' : 'remove';

  const handleDecrease = () => {
    if (localQuantity > 1) {
      setLocalQuantity(localQuantity - 1);
      onQuantityChange(product, localQuantity - 1);
    } else {
      onRemoveButtonPress();
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
            <MaterialIcons name={leftButtonIcon} size={18} color="#FFA500" />
          </Button>
          <View style={styles.quantityTextContainer}>
            <Text style={styles.quantityText}>{localQuantity}</Text>
          </View>
          <Button onPress={handleIncrease} style={styles.quantityPlusButton}>
            <MaterialIcons name="add" size={18} color="#FFA500" />
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
  onQuantityChange: PropTypes.func.isRequired,
  onRemoveButtonPress: PropTypes.func.isRequired,
};

export default CheckoutCard;
