import React from 'react';
import { useForm } from 'react-hook-form';
import { ActivityOverlay } from '@components/molecules';
import { CheckoutList } from '@components/organisms';
import { BaseScreen } from '@components/templates';
import { useCheckout, useNavigationHandlers } from '@hooks';
import { PromoCodeInput, TotalSummary } from './components';

const CheckoutScreen = () => {
  const { navigateToPayment } = useNavigationHandlers();

  const {
    basketItems,
    totalItemCount,
    totalPrice,
    isBasketEmpty,
    isLoading,
    onRemoveItem,
    onApplyPromoCode,
    onQuantityChange,
  } = useCheckout();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      promoCode: '',
    },
  });

  const onOrderPress = () => {
    navigateToPayment();
  };

  return (
    <BaseScreen>
      <ActivityOverlay isVisible={isLoading} />
      <TotalSummary
        totalPrice={totalPrice}
        totalItemCount={totalItemCount}
        isOrderButtonDisabled={isBasketEmpty}
        onOrderPress={onOrderPress}
      />
      <PromoCodeInput
        isApplyButtonDisabled={isBasketEmpty}
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onApplyPromoCode={(data) => onApplyPromoCode(data.promoCode)}
        register={register}
      />
      <CheckoutList basketItems={basketItems} onRemoveItem={onRemoveItem} onQuantityChange={onQuantityChange} />
    </BaseScreen>
  );
};

export default CheckoutScreen;
