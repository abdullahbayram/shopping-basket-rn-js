# Shopping Basket

![React Native](https://img.shields.io/badge/React%20Native-20232A?logo=react)
![Expo](https://img.shields.io/badge/Expo-000020?logo=expo)
![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux)
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest)
![ESLint](https://img.shields.io/badge/Code%20Style-ESLint-4B32C3?logo=eslint)
![Prettier](https://img.shields.io/badge/Formatter-Prettier-F7B93E?logo=prettier)
![Husky](https://img.shields.io/badge/Pre%20Commit-Husky-5D4B97?logo=husky)
![Commitlint](https://img.shields.io/badge/Commits-Commitlint-E0245E?logo=git)
![react-hook-form](https://img.shields.io/badge/Forms-react--hook--form-EC5990?logo=react)
![mock-service-worker](https://img.shields.io/badge/Testing-mock--service--worker-6DB33F?logo=node.js)

A feature-rich shopping basket application built with **React Native** and **JavaScript**, showcasing modern development
practices. The project emphasizes **component-based architecture** using the **Atomic Design methodology**, ensuring
modularity, scalability, and maintainability. With a strong focus on testing, it integrates **unit testing** using
**Jest** and **UI testing** with the **React Native Testing Library**. This app demonstrates best practices in **React
Native development**, including robust **state management**, **credit card validation**, and **continuous integration**
workflows powered by **GitHub Actions**.

---

## 📚 Table of Contents

1. [Demo](#-demo)
2. [Visuals](#-visuals)
3. [Core Features](#-features)
4. [Development Standards](#-development-standards)
5. [Folder Structure](#-folder-structure)
6. [Tech Stack](#-tech-stack)
7. [Atomic Web Design](#-atomic-web-design)
8. [Credit Card Validation](#-credit-card-validation)
9. [Installation](#-installation)
10. [Testing](#-testing)
11. [Continuous Integration](#-continuous-integration)
12. [Contributing](#-contributing)
13. [License](#-license)
14. [Contact](#-contact)

---

## 🎥 Demo

Watch the app in action:

[![Shopping Basket Demo](https://img.youtube.com/vi/bg9vKTF9HW8/1.jpg)](https://youtu.be/bg9vKTF9HW8)

Click the image above to view the demo video.

---

## 🖼️ Visuals

### Light Theme

![App Demo GIF](./assets/ss/light/screenshots.gif)

### Dark Theme

![App Demo GIF](./assets/ss/dark/screenshots.gif)

---

## Status Legend

\- ✅ DONE

\- 🟢 IN PROGRESS

\- 🟡 TODO

---

## 🚀 Core Features

1. **Product List View**

   - ✅ Display products with details.
   - ✅ Add items to the basket, with a maximum quantity of 5 per item.
   - ✅ Disable the "Add" button when the limit is reached and show a message on the product card.
   - ✅ Display total items in the basket.
   - ✅ Navigate to the Basket Checkout View if at least one item is in the basket.
   - ✅ Show a message if no products are available.

2. **Basket Checkout View**

   - ✅ Display basket items with quantities and prices.
   - ✅ Calculate and display the total price.
   - ✅ Apply discounts using promo codes (e.g., `A10` for 10% off, `A80` for 80% off).
   - ✅ Validate promo codes via API, update the total, and display appropriate messages:
     - ❗ Empty basket message.
     - ❌ Invalid promo code message.
     - ✔️ Successful promo code application message.
   - ✅ Allow removing items from the basket.
   - ✅ Navigate to the Payment View if at least one item is in the basket.

3. **Payment View**

   - ✅ Secure payment form with credit card validation and error messages.
   - ✅ Navigate to:
     - ✔️ Success Screen on successful payment.
     - ❌ Error Screen on failed payment.

4. **Payment Result Views**

   - ✅ **Success Screen**: Features a progress bar animation.
   - ✅ **Error Screen**: Displays error details with a progress bar animation.

5. **UX/UI**
   - ✅ Supports light and dark themes.
   - ✅ Design inspired by the Amazon app (for the light theme).
   - ✅ Component structure based on **Atomic Web Design** principles.

---

## 🛠️ Development Standards

### **Architecture and Organization**

- ✅ **Component-Based Architecture**: Implements the Atomic Design methodology, organizing components into `atoms`,
  `molecules`, `organisms`, `templates`, and `screens` to ensure modularity, scalability, reusability, testability, and
  maintainability.
- ✅ **Centralized Components**: Core components are built in the `atoms` folder and reused across the application.
- ✅ **Folder Organization**: Test and style files are colocated with their respective components for better
  maintainability.

### **Styling and Performance**

- ✅ **Styling**: Inline styles are avoided; constants like colors, fonts, and spacing are defined in a centralized
  theme file.
- ✅ **Functional Components**: All components use a functional programming approach.
- ✅ **Performance Optimization**: Utilize `useMemo` and `useCallback` to prevent unnecessary re-renders, validated with
  "why-did-you-render."

### **Development Practices**

- ✅ **Linting & Formatting**:
  - Enforce error-free commits using **Husky** and **lint-staged**.
  - Ensure valid commit messages with **Commitlint**.
- ✅ **Testing Standards**:
  - Maintain a minimum of **90% test coverage** across branches, functions, lines, and statements to ensure high code
    quality.
  - Use `--findRelatedTests` in pre-commit hooks to run only tests relevant to changed files, improving efficiency.
- ✅ **API Mocking**: Use `mock-service-worker` to mock API calls and responses, ensuring reliable and consistent
  testing without depending on live backend services.

### **Utilities and Enhancements**

- ✅ **Form Validation**: Manage forms efficiently and robustly using `react-hook-form`.
- ✅ **State Management**: Leverage **Redux Toolkit** for centralized state management and `rtk-query` for API data
  fetching.
- ✅ **Context API**: Implement Context API for managing global state effectively.
- ✅ **Validation Utilities**: Include reusable validation utilities in a dedicated `validate` folder.
- ✅ **Custom Hooks**: Develop custom hooks to encapsulate shared logic and state management.
- ✅ **Path Aliases**: Simplify import paths with aliases for improved readability.
- ✅ **Folder Structure**: Adheres to a well-organized structure to ensure maintainability. See the
  [Folder Structure](#-folder-structure) section for details.
- ✅ **Continuous Integration**: Automated testing, validation, and coverage updates are handled through **GitHub
  Actions**. Refer to the [Continuous Integration](#-continuous-integration) section for details.

## 📂 Folder Structure

Here is the folder structure for key parts of the project:

### Root-Level Folders

```plaintext
├── assets/             # Images, fonts, and static assets
├── badges/             # Test coverage badges
├── src/                # Application source code
├── __tests__/          # Test files
│   ├── mocks/          # Mock data for tests
│   └── utils/          # Test utility functions
└── ...
```

### `src`

```plaintext
src/
├── components/         # Reusable UI components
│   ├── atoms/          # Small building blocks of UI
│   │   ├── Button/
│   │   │   ├── index.js
│   │   │   ├── Button.style.js
│   │   │   └── Button.test.js
│   │   ├── index.js   # Exports for atoms
│   │   └── ...
│   ├── molecules/      # Combined components (atoms + logic)
│   │   ├── index.js   # Exports for molecules
│       └── ...
│   ├── organisms/      # Complex reusable components
│   │   ├── index.js   # Exports for organisms
│       └── ...
│   └── templates/      # Reusable layout components
│       ├── index.js   # Exports for templates
│       └── ...
├── screens/            # Application screens
│   ├── ProductListScreen/
│   │   ├── index.js
│   │   ├── ProductListScreen.style.js
│   │   └── ProductListScreen.test.js
│   ├── SuccessScreen/
│   │   ├── index.js
│   │   ├── SuccessScreen.style.js
│   │   └── SuccessScreen.test.js
│   ├── index.js       # Exports for screens
│   └── ...
├── redux/              # State management logic
├── constants/          # Application constants (e.g., themes, URLs)
│   ├── index.js        # Exports for constants
├── utils/              # Helper functions and utilities
├── context/            # Context API files
├── validate/           # Validation utilities
│   ├── index.js        # Exports for validate
└── ...
```

---

## 🛠️ Tech Stack

![React Native](https://img.shields.io/badge/React%20Native-20232A?logo=react)
![Expo](https://img.shields.io/badge/Expo-000020?logo=expo)
![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux)
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest)
![ESLint](https://img.shields.io/badge/Code%20Style-ESLint-4B32C3?logo=eslint)
![Prettier](https://img.shields.io/badge/Formatter-Prettier-F7B93E?logo=prettier)
![Husky](https://img.shields.io/badge/Pre%20Commit-Husky-5D4B97?logo=husky)
![Commitlint](https://img.shields.io/badge/Commits-Commitlint-E0245E?logo=git)
![react-hook-form](https://img.shields.io/badge/Forms-react--hook--form-EC5990?logo=react)
![mock-service-worker](https://img.shields.io/badge/Testing-mock--service--worker-6DB33F?logo=node.js)

- **React Native**: Core development framework.
- **Expo**: Quick setup and development environment.
- **Redux Toolkit**: State Management with rtk query.
- **`react-hook-form`**: Form Management easy and efficient.
- **Testing**: Jest, `@testing-library/react-native` , `mock-service-worker`
- **`mock-service-worker`**: Mock backend for development environment and mock API calls for testing.
- **UI Components**: React Native Paper, custom components.
- **Performance Optimization**: `useCallback`, `useMemo`.
- **Code Quality**: ESLint, Prettier, Husky, Commitlint.
- ***

## 🎨 Atomic Web Design

This app follows the **Atomic Web Design** methodology, which structures UI components into five hierarchical
categories:  
**Atoms**, **Molecules**, **Organisms**, **Templates**, and **Pages(or Screens in terms of mobile)**.

- **Explore Components**  
  Visit the [Components Folder](https://github.com/abdullahbayram/shopping-basket-rn-js/tree/main/src/components) to see
  reusable UI elements organized by this structure.

- **Learn More About Atomic Design**  
  Dive deeper into the methodology by reading the official guide by Brad Frost:
  [Atomic Design Principles](https://atomicdesign.bradfrost.com/chapter-2/).

### Key Benefits of Atomic Design:

1. **Reusability**: Create small, reusable components and combine them into complex designs.
2. **Scalability**: Build a consistent and maintainable design system as the app grows.
3. **Separation of Concerns**: Clearly delineate the responsibilities of each layer in your UI hierarchy.

---

## 🛡️ Credit Card Validation

- VALID card number: 5566561551349323
- INVALID card number: 1234567890123456
- VALID according to [Luhn algoritm](https://en.wikipedia.org/wiki/Luhn_algorithm) but mock-server-worker adjusted to
  always generate an error response (a failed transaction): 5249045959484101
- Generate dummy card numbers with [Credit Card Generator](https://www.creditcardgenerator.com/)

---

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abdullahbayram/shopping-basket-rn-js.git
   cd shopping-basket
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the app:

   ```bash
   npx expo start
   ```

---

## 🧪 Testing

To ensure the robustness of the application, the following testing strategies and practices are implemented:

**✅ Unit Testing**: All components and utility functions are covered with unit tests to ensure correctness of
individual units of code.  
**✅ Integration Testing**: Critical workflows, such as adding items to the basket, applying promo codes, and  
navigating between screens, are tested to validate seamless interaction between components.  
**✅ Code Coverage**: Coverage reports are generated with Jest, with a minimum(%90) threshold enforced to maintain
code  
quality.

To run the tests:

```bash
npm test
```

Run the tests with coverage:

```bash
npm test -- --coverage
```

Test coverage reports are automatically generated in the `coverage` directory for review.

---

## Test Coverage

![statements](././badges/statements.svg) ![branches](././badges/branches.svg) ![functions](././badges/functions.svg)
![lines](././badges/lines.svg)

![Coverage Report](././badges/coverage-summary.png)

---

## 🔄 Continuous Integration

### 🛠️ Continuous Integration (CI) with GitHub Actions

This project leverages **GitHub Actions** to automate testing, validation, and coverage updates.

#### 🚩 **Pull Request Validation**

- **Trigger**: Runs on every `pull_request` targeting the `main` branch.
- **Steps**:
  1.  Checkout repository and set up Node.js environment.
  2.  Install dependencies.
  3.  Run `npm run validate:pr` to ensure project-specific validations.

#### 🔄 **Post-Merge Coverage Update**

- **Trigger**: Executes on every `push` to the `main` branch.
- **Steps**:
  1.  Generate or update test coverage reports.
  2.  Commit and push updated coverage badges and summary to the repository.

#### ✅ **Coverage Threshold**

- Minimum global test coverage enforced by Jest:
  - **Branches**: 90%
  - **Functions**: 90%
  - **Lines**: 90%
  - **Statements**: 90%
- Pull requests must meet these thresholds before merging.

## 🌟 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request.

Make sure your code adheres to the project’s linting and testing standards. Additionally, provide clear documentation
for any new features.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Contact

Feel free to reach out via email at [info@abayram.dev](mailto:info@abayram.dev)&#x20;
