import {Dispatch, SetStateAction} from 'react';
import {Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';

export type PermissionStatus =
  | 'unavailable'
  | 'denied'
  | 'limited'
  | 'granted'
  | 'blocked';

type PermissionsStatusType = {
  MICROPHONE: PermissionStatus;
  MEDIA_LIBRARY: PermissionStatus;
};

function permissionResults(result) {
  switch (result) {
    case RESULTS.UNAVAILABLE:
      console.log(
        'This feature is not available (on this device / in this context)',
      );
      break;
    case RESULTS.DENIED:
      console.log(
        'The permission has not been requested / is denied but requestable',
      );
      break;
    case RESULTS.LIMITED:
      console.log('The permission is limited: some actions are possible');
      break;
    case RESULTS.GRANTED:
      console.log('The permission is granted');
      break;
    case RESULTS.BLOCKED:
      console.log('The permission is denied and not requestable anymore');
      break;
  }
}

function checkAudioRecord() {
  if (Platform.OS === 'android') {
    return check(PERMISSIONS.ANDROID.RECORD_AUDIO)
      .then(permissionResults)
      .catch(error => {
        // …
      });
  }
  if (Platform.OS === 'ios') {
    return check(PERMISSIONS.IOS.MICROPHONE)
      .then(permissionResults)
      .catch(error => {
        // …
      });
  }
}

function checkMediaLibrary() {
  if (Platform.OS === 'android') {
    return check(PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION)
      .then(permissionResults)
      .catch(error => {
        // …
      });
  }
  if (Platform.OS === 'ios') {
    return check(PERMISSIONS.IOS.MEDIA_LIBRARY)
      .then(permissionResults)
      .catch(error => {
        // …
      });
  }
}

const requesltMultAudioPlusMedia = (
  cb: Dispatch<SetStateAction<PermissionsStatusType>>,
) => {
  if (Platform.OS === 'android') {
    return requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ]).then(statuses => {
      cb({
        MEDIA_LIBRARY: statuses[PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION],
        MICROPHONE: statuses[PERMISSIONS.ANDROID.RECORD_AUDIO],
      });
      console.log(
        'MEDIA_LIBRARY',
        statuses[PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION],
      );
      console.log('MICROPHONE', statuses[PERMISSIONS.ANDROID.RECORD_AUDIO]);
    });
  }
  if (Platform.OS === 'ios') {
    return requestMultiple([
      PERMISSIONS.IOS.MEDIA_LIBRARY,
      PERMISSIONS.IOS.MICROPHONE,
    ]).then(statuses => {
      cb({
        MEDIA_LIBRARY: statuses[PERMISSIONS.IOS.MEDIA_LIBRARY],
        MICROPHONE: statuses[PERMISSIONS.IOS.MICROPHONE],
      });
      console.log('MEDIA_LIBRARY', statuses[PERMISSIONS.IOS.MEDIA_LIBRARY]);
      console.log('MICROPHONE', statuses[PERMISSIONS.IOS.MICROPHONE]);
    });
  }
};

export const usePermissions = () => {
  return {
    checkAudioRecord,
    checkMediaLibrary,
    requesltMultAudioPlusMedia,
  };
};
