import React from 'react';
import { SafeAreaView } from 'react-native';
import HomePage from './Pages/HomePage';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomePage />
    </SafeAreaView>
  );
};

export default App;
