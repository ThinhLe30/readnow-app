import CommonLogin from '../components/CommonLogin';
import {View, Text} from 'react-native';
export const AuthRequirement = () => {
  return (
    // <View className="flex-1 justify-center items-center">
    //   <Text
    //     className="text-xl text-green-800 dark:text-white "
    //     style={{
    //       fontFamily: 'SpaceGroteskBold',
    //     }}>
    //     Please log in to experience the best service.
    //   </Text>
    //   <CommonLogin />
    // </View>

    <View className="flex-1 justify-center items-center w-full h-ful bg-white">
      <View className=" flex-1 justify-center items-center w-full">
        <Text
          className="text-xl  text-black dark:text-white "
          style={{
            fontFamily: 'SpaceGroteskBold',
          }}>
          Please log in
        </Text>

        <Text
          className="text-2xl font-bold text-black dark:text-white "
          style={{
            fontFamily: 'SpaceGroteskBold',
          }}>
          to continue using our app.
        </Text>
      </View>
      <View className="h-[500px]">
        <CommonLogin />
        <View className="flex-1"></View>
      </View>
    </View>
  );
};
