import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './src/navigation';
import makeStore from './src/store';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import { customTheme } from './src/common/themes';
import { LogBox } from 'react-native';

//https://github.com/software-mansion/react-native-gesture-handler/issues/1831
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export default function AppWrapper() {
  // Creates and holds an instance of the store so only children in the `Provider`'s
  // context can have access to it.
  const store = makeStore();
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const App = () => {
  return (
    <NativeBaseProvider theme={customTheme}>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
};
