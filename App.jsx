import {React} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import AppNavigator from './src/navigation/AppNavigator';
import {Text, StatusBar, Image, StyleSheet, View} from 'react-native';
import {AuthProvider} from './src/hooks/authContext';
import {LoginRequiredProvider} from './src/hooks/loginContext';
const queryClient = new QueryClient();
const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LoginRequiredProvider>
            <StatusBar backgroundColor={'#1D5868'} />
            <View
              style={{
                backgroundColor: '#1D5868',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 10,
                paddingLeft: 10,
                elevation: 8,
              }}>
              <Image
                source={require('./src/assets/img/header-logo-book.png')}
                style={{
                  width: 50,
                  height: 50,
                  alignSelf: 'flex-start',
                  paddingLeft: 10,
                  marginLeft: 10,
                }}
              />
              <Text style={styles.mainText}>ReadNow</Text>
            </View>
            <AppNavigator />
          </LoginRequiredProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};
const styles = StyleSheet.create({
  mainText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
export default App;
