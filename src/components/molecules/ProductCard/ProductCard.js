import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Card from '../../atoms/Card/Card';
import Button from '../../atoms/Button/Button';
import Text from '../../atoms/Text/Text';
import HelperText from '../../atoms/HelperText/HelperText';

const renderRightContent = (price) => (
  <View style={styles.row}>
    <Text variant="titleSmall">${price}</Text>
  </View>
);

const ProductCard = ({ product, onButtonPress, isButtonDisabled }) => {
  const title = product.name;
  const subtitle = product.description;
  const { price } = product || {};

  return (
    <Card style={styles.container}>
      <Card.Title
        style={styles.title}
        title={title}
        right={() => renderRightContent(price)}
        subtitle={subtitle}
        subtitleStyle={styles.subtitle}
      />
      <Card.Actions>
        <Button onPress={onButtonPress} disabled={isButtonDisabled}>
          Add to basket
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
  product: PropTypes.shape({
    sku: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    quantity: PropTypes.number,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onButtonPress: PropTypes.func.isRequired,
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
