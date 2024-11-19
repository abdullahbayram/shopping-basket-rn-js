import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Card from '../../atoms/Card/Card';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import showToast from '../../../utils/showToast';
import messages from '../../../constants/strings';

const handleEndEditing = (e, firstQuantity, setQuantity, onQuantityChange, product) => {
  const num = Number(e.nativeEvent.text);
  if (num >= 1 && num <= 5) {
    onQuantityChange(product, num);
  } else {
    showToast(messages.invalidQuantity);
    setQuantity(firstQuantity);
  }
};

const renderRightContent = (price, quantity, setQuantity, onQuantityChange, firstQuantity, product) => (
  <View style={styles.row}>
    <Input
      style={styles.quantityInput}
      value={quantity ? quantity.toString() : ''}
      keyboardType="numeric"
      onChangeText={(text) => setQuantity(Number(text))}
      onEndEditing={(e) => handleEndEditing(e, firstQuantity, setQuantity, onQuantityChange, product)}
      maxLength={2}
    />
  </View>
);

const CheckoutCard = ({ product, onButtonPress, onQuantityChange }) => {
  const [localQuantity, setLocalQuantity] = React.useState(product.quantity);
  const { title } = product;
  const subtitle = `${product.description} (x${product.quantity})`;
  const price = (product.price * product.quantity).toFixed(2);
  const { quantity } = product;

  return (
    <Card style={styles.container}>
      <Card.Title
        style={styles.title}
        title={title}
        right={() => renderRightContent(price, localQuantity, setLocalQuantity, onQuantityChange, quantity, product)}
        subtitle={subtitle}
        subtitleStyle={styles.subtitle}
      />
      <Card.Actions>
        <Button onPress={onButtonPress}>Remove Item</Button>
      </Card.Actions>
    </Card>
  );
};

CheckoutCard.whyDidYouRender = true;

export default CheckoutCard;

CheckoutCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    quantity: PropTypes.number,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onButtonPress: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderRadius: 10,
    height: 150,
  },
  title: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  row: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityInput: {
    width: 40,
    height: 25,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
});
