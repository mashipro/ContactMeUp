import React from 'react';
import MainNavigationRoutes from './src/Routes/MainNavigationRoutes';
import {Provider} from 'react-redux';
import Store from './src/Redux/Store';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={Store.stores}>
      <PersistGate persistor={Store.persistor}>
        <MainNavigationRoutes />
      </PersistGate>
    </Provider>
  );
}
