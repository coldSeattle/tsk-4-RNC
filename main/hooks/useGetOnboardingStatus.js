import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {boolean} from 'yup';

async function checkIfFirstLaunch() {
  try {
    const hasFirstLaunched = await AsyncStorage.getItem('@user_onboarded');
    if (hasFirstLaunched === null) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export const useGetOnboardingStatus = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  React.useEffect(() => {
    const fetchAsyncStore = async () => {
      const firstLaunch = await checkIfFirstLaunch();
      setIsFirstLaunch(firstLaunch);
    };

    fetchAsyncStore();
  }, []);

  return {
    isFirstLaunch: isFirstLaunch,
  };
};
