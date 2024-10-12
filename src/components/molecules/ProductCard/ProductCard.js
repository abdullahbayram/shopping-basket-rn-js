import * as React from 'react';
import { Button, Text } from 'react-native-paper';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Card from '../../atoms/Card/Card';
import Input from '../../atoms/Input/Input';
import showToast from '../../../utils/showToast';
import messages from '../../../constants/strings';

const handleEndEditing = (e, firstQuantity, setQuantity, onQuantityChange) => {
  const num = Number(e.nativeEvent.text);
  if (num >= 1 && num <= 15) {
    onQuantityChange(num);
  } else {
    showToast(messages.invalidCQuantity);
    setQuantity(firstQuantity);
  }
};

const renderRightContent = (price, quantity, setQuantity, onQuantityChange, firstQuantity) => (
  <View style={styles.row}>
    {onQuantityChange && (
      <Input
        style={styles.quantityInput}
        value={quantity.toString()}
        keyboardType="numeric"
        onChangeText={(text) => setQuantity(Number(text))}
        onEndEditing={(e) => handleEndEditing(e, firstQuantity, setQuantity, onQuantityChange)}
        maxLength={2}
      />
    )}
    <Text variant="titleSmall">${price}</Text>
  </View>
);

const ProductCard = ({ buttonTitle, subtitle, title, price, onButtonPress, onQuantityChange, quantity }) => {
  const [localQuantity, setLocalQuantity] = React.useState(quantity);

  return (
    <Card style={styles.container}>
      <Card.Title
        style={styles.title}
        title={title}
        right={() => renderRightContent(price, localQuantity, setLocalQuantity, onQuantityChange, quantity)}
        subtitle={subtitle}
      />
      <Card.Actions>
        <Button onPress={onButtonPress}>{buttonTitle}</Button>
      </Card.Actions>
    </Card>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  buttonTitle: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  onButtonPress: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func,
  quantity: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  row: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  quantityInput: {
    width: 40,
    height: 25,
    textAlign: 'center',
  },
});
