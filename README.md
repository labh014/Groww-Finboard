# FinBoard - Personal Finance Dashboard

FinBoard is a modular, high-performance financial dashboard built for the **Groww Web Intern Assignment**. It allows users to monitor stocks and cryptocurrencies in real-time with a customizable, durable interface.

## 🚀 Features

*   **Real-Time Data**: Integrates with [Finnhub API](https://finnhub.io/) for live stock/crypto data.
*   **Dynamic Widgets**:
    *   **Stat Cards**: Quick price/change overview.
    *   **Price Charts**: Visual trend analysis (simulated history).
    *   **Data Tables**: Detailed daily statistics.
*   **Customization**: Add, remove, and configure widgets (Title, Symbol, Refresh Rate).
*   **Dark Mode**: A premium, system-wide dark theme (Persisted).
*   **Persistence**: Uses `localStorage` to save your dashboard layout and settings locally.

## 🛠️ Tech Stack

*   **Framework**: Next.js 16 (App Router)
*   **Styling**: Tailwind CSS 4.0
*   **State Management**: Redux Toolkit (RTK) + React-Redux
    *   *Why Redux?* Used for robust global state management of Theme and Widget Registry.
*   **Icons**: SVGs (No heavy ion libraries)

## 📦 Architecture

The project follows a scalable, "human-readable" directory structure:

*   `src/store/`: Redux slices (`themeSlice`, `dashboardSlice`) and store configuration.
*   `src/components/widgets/`: Independent, reusable widget components (`Card`, `Chart`, `Table`).
*   `src/components/`: Core UI components (`Dashboard`, `AddWidgetModal`).
*   `src/utils/`: API helpers and utilities.

## 🏃‍♂️ Running Locally

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the dev server**:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000)

## ✅ Evaluation Checklist

-   [x] **Next.js & Tailwind**: Used as core foundation.
-   [x] **Redux Integration**: Implemented for state management.
-   [x] **Dynamic Widgets**: Configurable symbols and types.
-   [x] **Persistence**: Dashboard returns to its last state on reload.
-   [x] **Dark Mode**: Fully supported.
-   [x] **Clean Code**: Modular, readable, and well-structured.

---
*Built with ❤️ for Groww.*
