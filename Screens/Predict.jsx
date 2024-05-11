import React, { useState } from 'react';
import {
  SafeAreaView,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  Platform,
  Dimensions,
  useColorScheme,
  View,
  TouchableOpacity,
  ImageBackground,
  Button,
} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PermissionsService, { isIOS } from '../Permissions';

// const URL = process.env.DEV_URL;
const URL = process.env.HOST_URL;


axios.interceptors.request.use(
  async config => {
    let request = config;
    request.headers = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application.json',
    };
    request.url = configureUrl(config.url);
    return request;
  },
  error => error,
);

console.log("url is: " + URL + '/predict');



export const { height, width } = Dimensions.get('window');

export const configureUrl = url => {
  let authUrl = url;
  if (url && url[url.length - 1] === '/') {
    authUrl = url.substring(0, url.length - 1);
  }
  return authUrl;
};

export const fonts = {
  Bold: { fontFamily: 'Roboto-Bold' },
};

const options = {
  mediaType: 'photo',
  quality: 1,
  width: 256,
  height: 256,
  includeBase64: true,
};

const Predict = ({ navigation }) => {
  const [result, setResult] = useState('');
  const [label, setLabel] = useState('');
  const [solution, setSolution] = useState('');
  const isDarkMode = useColorScheme() === 'dark';
  const [image, setImage] = useState('');
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getPredication = async params => {
    return new Promise((resolve, reject) => {
      var bodyFormData = new FormData();
      bodyFormData.append('file', params);
      const url = URL + '/predict';
      return axios
        .post(url, bodyFormData)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          setLabel('Failed to predicting.' + error);
          console.log('error is: ' + error)
          reject('err', error);
        });
    });
  };

  const manageCamera = async type => {
    try {
      //   if (!(await PermissionsService.hasCameraPermission())) {
      //     return [];
      //   } else {
      if (type === 'Camera') {
        openCamera();
      } else {
        openLibrary();
      }
      //   }
    } catch (err) {
      console.log(err);
    }
  };

  const openCamera = async () => {
    launchCamera(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const uri = response?.assets[0]?.uri;
        const path = Platform.OS !== 'ios' ? uri : 'file://' + uri;
        getResult(path, response);
      }
    });
  };

  const clearOutput = () => {
    setResult('');
    setImage('');
  };

  const getResult = async (path, response) => {
    setImage(path);
    setLabel('Predicting...');
    setResult('');
    setSolution('');
    const params = {
      uri: path,
      name: response.assets[0].fileName,
      type: response.assets[0].type,
    };

    const res = await getPredication(params);
    console.log(res.data)
    if (res?.data?.predicted_class) {
      setLabel(res.data.predicted_class);
      setResult(res.data.confidence);
      setSolution(res.data.solution);
    } else {
      setLabel('Failed to predict');
    }
  };

  const openLibrary = async () => {
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const uri = response.assets[0].uri;
        const path = Platform.OS !== 'ios' ? uri : 'file://' + uri;
        getResult(path, response);
      }
    });
  };

  return (
    <View style={[
      backgroundStyle,
      styles.outer]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ImageBackground
        blurRadius={10}
        source={require('../assets/background.jpeg')}
        style={{ height: height, width: width }}
      />
      <Text style={styles.title}>{'Paddy Care Sentinal'}</Text>
      {image?.length == 0 && (
        <TouchableOpacity onPress={() => navigation.navigate('History')} style={styles.clearStyle}>
          <Image source={require('../assets/history.png')} style={styles.clearImage} />
        </TouchableOpacity>
      )}
      {image?.length == 0 && (
        <TouchableOpacity onPress={() => navigation.navigate('Contactus')} style={styles.contactStyle}>
          <Image source={require('../assets/center.png')} style={styles.clearImage} />
        </TouchableOpacity>
      )}
      {image?.length > 0 && (
        <TouchableOpacity onPress={clearOutput} style={styles.clearStyle}>
          <Image source={require('../assets/clean.png')} style={styles.clearImage} />
        </TouchableOpacity>
      )}

      {(image?.length && (
        <Image source={{ uri: image }} style={styles.imageStyle} />
      )) ||
        null}
      {(result && label && (
        <View style={styles.mainOuter}>
          <Text style={[styles.space, styles.labelText]}>
            {'Disease: \n'}
            <Text style={styles.resultText}>{label + '\n'}</Text>
          </Text>
          <Text style={[styles.space, styles.labelText]}>
            {'Confidence: \n'}
            <Text style={styles.resultText}>
              {parseFloat(result).toFixed(2) + '%'}
            </Text>
          </Text>

        </View>
      )) ||
        (image && <Text style={styles.emptyText}>{label}</Text>) || (
          <Text style={styles.emptyText}>
            Use below buttons to Capture or Select a picture of a Paddy leaf.
          </Text>
        )}

      <View style={styles.btn}>
        {image?.length == 0 && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => manageCamera('Camera')}
            style={styles.btnStyle}>
            <Image source={require('../assets/camera.png')} style={styles.imageIcon} />
          </TouchableOpacity>
        )}
        {image?.length == 0 && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => manageCamera('Photo')}
            style={styles.btnStyle}>
            <Image source={require('../assets/gallery.png')} style={styles.imageIcon} />
          </TouchableOpacity>
        )}
      </View>

      {result && label && (

        <View style={styles.bottomContainer}>
          <Text style={styles.paragraphLabel}>
            {'Solution: '}
          </Text>
          <Text style={styles.paragraphText}>
            {solution}
          </Text>
        </View>
      )}
    </View >
  );

}
const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    position: 'absolute',
    top: Platform.OS === 'ios' ? 35 : 10,
    fontSize: 35,
    fontWeight: '800',
    color: '#FFFFFF',
    textShadowColor: 'black',
    textShadowOffset: { width: 5, height: 5 },
  },

  clearImage: { height: 40, width: 40, tintColor: '#FFF' },
  mainOuter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: height / 1.6,
    alignSelf: 'center',
  },
  outer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    position: 'absolute',
    bottom: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  btnStyle: {
    backgroundColor: '#FFF',
    opacity: 0.8,
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 20,
  },
  imageStyle: {
    marginBottom: 50,
    width: width / 1.5,
    height: width / 1.5,
    borderRadius: 20,
    position: 'absolute',
    borderWidth: 0.3,
    borderColor: '#FFF',
    top: height / 4.5,
  },
  clearStyle: {
    position: 'absolute',
    top: 100,
    right: 30,
    tintColor: '#FFF',
    zIndex: 10,
  },
  contactStyle: {
    position: 'absolute',
    top: 100,
    left: 30,
    tintColor: '#FFF',
    zIndex: 10,
  },
  space: { marginVertical: 10, marginHorizontal: 10 },
  labelText: { color: '#FFF', fontSize: 20, ...fonts.Bold },
  resultText: { fontSize: 32, ...fonts.Bold },
  solutionText: { color: 'black', Width: 10, alignSelf: 'center', fontSize: 20, ...fonts.Bold },
  imageIcon: { height: 40, width: 40, tintColor: '#000' },
  emptyText: {
    position: 'absolute',
    top: height / 1.6,
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 20,
    maxWidth: '70%',
    ...fonts.Bold,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
  },

  paragraphLabel: {
    color: '#FFF',
    fontSize: 18,
    ...fonts.Bold,
  },

  paragraphText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  }
});

export default Predict;









































































