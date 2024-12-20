# Shopping Basket

A feature-rich React Native sample e-commerce app designed to showcase various modern development practices, including clean code principles, state management, testing strategies, and user interface design.

---

## 🚀 Features

### **Basic Requirements**
1. **Product List View**
    - ✅ Display products with their details and allow adding them to the basket.
    - ✅ Limit product quantity to 5 per item.
    - ✅ Display total items in the basket.
    - ✅ Navigation to Basket Checkout View.

2. **Basket Checkout View**
    - ✅ Show items in the basket with their quantities and prices.
    - ✅ Prevent invalid quantities (negative or zero values).
    - ✅ Calculate and display the total price.
    - ✅ Add a promo code field to apply discounts.
    - ✅ Validate promo codes and update the total.
    - ✅ Handle promo code successful and error results.

3. **Payment View**
    - ✅ Payment form with credit card validations.
4. **Checkout Result Views**
    - ✅ Success Screen with order details.
    - ✅ Error Screen with detailed error messages.

5. **Dark Mode**
    - ✅ Light and dark themes.

---

## 🛠️ Tech Stack

- **React Native**: Core development framework.
- **Expo**: Quick setup and development environment.
- **State Management**: Redux Toolkit.
- **Form Management**: `react-hook-form` with validation.
- **Testing**: Jest, Testing Library.
- **UI Components**: React Native Paper, custom components.
- **Performance Optimization**: `useCallback`, `useMemo`.
- **Code Quality**: ESLint, Prettier, Husky, Commitlint.

---

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abdullahbayram/shopping-basket-rn-js.git
   cd shopping-basket

2. Install dependencies:
   ```bash
   npm install

3. Start the app:
   ```bash
   npx expo start
