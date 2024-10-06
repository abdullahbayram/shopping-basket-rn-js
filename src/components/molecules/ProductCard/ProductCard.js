import * as React from 'react';
import { Button, Text } from 'react-native-paper';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Card from '../../atoms/Card/Card';

const renderRightContent = (price) => <Text variant="titleSmall">${price}</Text>;

const ProductCard = ({ buttonTitle, subtitle, title, price, onButtonPress }) => (
  <Card style={styles.container}>
    <Card.Title style={styles.title} title={title} right={() => renderRightContent(price)} subtitle={subtitle} />
    <Card.Actions>
      <Button onPress={onButtonPress}>{buttonTitle}</Button>
    </Card.Actions>
  </Card>
);

export default ProductCard;

ProductCard.propTypes = {
  buttonTitle: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  onButtonPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
});
