import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Card, Button, Text, HelperText } from '../../atoms';
import styles from './ProductCard.style';

const leftCardMargin = { marginRight: 5 };
const rightCardMargin = { marginLeft: 5 };

const generateCardMargin = (index) => (index % 2 === 0 ? leftCardMargin : rightCardMargin);

const ProductCard = ({ product, onButtonPress, isMaxQuantityPerProductReached, index = 0 }) => {
  const { title, price, rating, image } = product;
  const maxStars = 5;
  const filledStars = Math.round((rating.rate / maxStars) * maxStars);
  const stars = '★'.repeat(filledStars) + '☆'.repeat(maxStars - filledStars);

  return (
    <Card style={[styles.container, generateCardMargin(index)]}>
      <Card.Cover source={{ uri: image }} />
      <Card.Title style={styles.title} title={title} subtitle={stars} subtitleStyle={styles.rating} />
      <View style={styles.feedbackAndPrice}>
        <Text style={styles.price}>€{price.toFixed(2)}</Text>
      </View>

      <View style={styles.buttonOrHelperTextContainer}>
        {!isMaxQuantityPerProductReached ? (
          <Button onPress={onButtonPress} style={styles.button} disabled={isMaxQuantityPerProductReached}>
            Add to basket
          </Button>
        ) : (
          <HelperText type="error" visible>
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
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
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
