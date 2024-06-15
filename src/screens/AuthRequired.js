import CommonLogin from '../components/CommonLogin';
import {View, Text} from 'react-native';
export const AuthRequirement = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text
        className="text-xl text-green-800 dark:text-white "
        style={{
          fontFamily: 'SpaceGroteskBold',
        }}>
        Please log in to experience the best service.
      </Text>
      <CommonLogin />
    </View>
  );
};
