import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '466657629133-86eq1rqpmhbe2uraea4l6mhf3pu8554s.apps.googleusercontent.com',
});

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error) {
    const err = error;
    if (err.code === statusCodes.SIGN_IN_CANCELLED) {
      console.debug('Cancelled sign in');
    } else if (err.code === statusCodes.IN_PROGRESS) {
      console.debug('Sign in in progress');
    } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.debug('Play services not available');
    } else {
      console.debug('Unknown error', err);
    }
  }
};
