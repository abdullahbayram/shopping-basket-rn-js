import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Card from '../../atoms/Card/Card';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import Text from '../../atoms/Text/Text';
import HelperText from '../../atoms/HelperText/HelperText';
import showToast from '../../../utils/showToast';
import messages from '../../../constants/strings';

const handleEndEditing = (e, firstQuantity, setQuantity, onQuantityChange, product) => {
  const num = Number(e.nativeEvent.text);
  if (num >= 1 && num <= 15) {
    onQuantityChange(product, num);
  } else {
    showToast(messages.invalidQuantity);
    setQuantity(firstQuantity);
  }
};

const renderRightContent = (price, quantity, setQuantity, onQuantityChange, firstQuantity, product) => (
  <View style={styles.row}>
    {onQuantityChange && (
      <Input
        style={styles.quantityInput}
        value={quantity ? quantity.toString() : ''}
        keyboardType="numeric"
        onChangeText={(text) => setQuantity(Number(text))}
        onEndEditing={(e) => handleEndEditing(e, firstQuantity, setQuantity, onQuantityChange, product)}
        maxLength={2}
      />
    )}
    <Text variant="titleSmall">${price}</Text>
  </View>
);

const ProductCard = ({ product, isCheckout, onButtonPress, onQuantityChange, isButtonDisabled }) => {
  const [localQuantity, setLocalQuantity] = React.useState(isCheckout ? product.quantity : undefined);
  const title = product.name;
  const subtitle = isCheckout ? `${product.description} (x${product.quantity})` : product.description;
  const price = (product.price * (isCheckout ? product.quantity : 1)).toFixed(2);
  const quantity = isCheckout ? product.quantity : localQuantity;
  const buttonTitle = isCheckout ? 'Remove Item' : 'Add to basket';

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
        <Button onPress={onButtonPress} disabled={isButtonDisabled}>
          {buttonTitle}
        </Button>
      </Card.Actions>
      {isButtonDisabled && (
        <HelperText type="error" visible={isButtonDisabled}>
          You reached the max quantity per product!
        </HelperText>
      )}
      {!isButtonDisabled && <View style={styles.fixedView} />}
    </Card>
  );
};

ProductCard.whyDidYouRender = true;

export default ProductCard;

ProductCard.propTypes = {
  isCheckout: PropTypes.bool.isRequired,
  product: PropTypes.shape({
    sku: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    quantity: PropTypes.number,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onButtonPress: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func,
  isButtonDisabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderRadius: 10,
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
  fixedView: { height: 25 },
});
