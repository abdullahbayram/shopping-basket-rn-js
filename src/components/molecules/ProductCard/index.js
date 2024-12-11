import * as React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Card from '../../atoms/Card/Card';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import HelperText from '../../atoms/HelperText';
import styles from './ProductCard.style';

const leftCardMargin = { marginRight: 5 };
const rightCardMargin = { marginLeft: 5 };

const generateCardMargin = (index) => {
  if (index % 2 === 0) {
    return leftCardMargin;
  }
  if (index % 2 === 1) {
    return rightCardMargin;
  }
  return {};
};

const ProductCard = ({ product, onButtonPress, isMaxQuantityPerProductReached, index }) => {
  const { title } = product;
  const { price } = product;
  const rating = product.rating.rate;
  const filledStars = Math.round((rating / 5) * 5); // Round to the nearest integer for stars
  const stars = '★'.repeat(filledStars) + '☆'.repeat(5 - filledStars);

  return (
    <Card style={[styles.container, generateCardMargin(index)]}>
      <Card.Cover source={{ uri: product.image }} />
      <Card.Title style={styles.title} title={title} subtitle={stars} subtitleStyle={styles.rating} />
      <View style={styles.feedbackAndPrice}>
        <Text style={styles.price}>€{price}</Text>
      </View>

      <View style={styles.buttonOrHelperTextContainer}>
        {!isMaxQuantityPerProductReached && (
          <Button onPress={onButtonPress} disabled={isMaxQuantityPerProductReached} style={styles.button}>
            Add to basket
          </Button>
        )}
        {isMaxQuantityPerProductReached && (
          <HelperText type="error" visible={isMaxQuantityPerProductReached}>
            You reached the max quantity per product!
          </HelperText>
        )}
      </View>
    </Card>
  );
};

ProductCard.whyDidYouRender = true;

export default ProductCard;

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, // ID can be number or string
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  onButtonPress: PropTypes.func.isRequired,
  isMaxQuantityPerProductReached: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};
