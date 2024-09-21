import * as React from 'react';
import { Button, Card as PaperCard, Text } from 'react-native-paper';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

const renderRightContent = (price) => <Text variant="titleSmall">{price}</Text>;

const ProductCard = ({ buttonTitle, subtitle, title, price }) => (
  <PaperCard style={styles.container}>
    <PaperCard.Title style={styles.title} title={title} right={() => renderRightContent(price)} subtitle={subtitle} />
    <PaperCard.Actions>
      <Button>{buttonTitle}</Button>
    </PaperCard.Actions>
  </PaperCard>
);

export default ProductCard;

ProductCard.propTypes = {
  buttonTitle: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
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
