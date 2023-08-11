// import React from 'react';
// import { TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import * as FileSystem from 'expo-file-system';

// const DownloadButton = ({ url }) => {
//   const handleDownload = async () => {
//     try {
//       const fileInfo = await FileSystem.downloadAsync(
//         url,
//         FileSystem.documentDirectory + 'downloaded_file.ext'
//       );

//       console.log('File downloaded:', fileInfo.uri);
//     } catch (error) {
//       console.error('Error downloading file:', error);
//     }
//   };

//   return (
//     <TouchableOpacity onPress={handleDownload}>
//       <Ionicons name="download-outline" size={44} color="#001d3d" />
//     </TouchableOpacity>
//   );
// };

// export default DownloadButton;
import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

const DownloadButton = ({ url }) => {
  const handleDownload = async () => {
    try {
      const fileInfo = await FileSystem.downloadAsync(
        url,
        FileSystem.documentDirectory + 'downloaded_file.ext'
      );

      console.log('File downloaded:', fileInfo.uri);

      // Show an alert after successful download
      Alert.alert(
        'Download Completo',
        'O arquivo foi instalado com sucesso!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handleDownload}>
      <Ionicons name="download-outline" size={44} color="#001d3d" />
    </TouchableOpacity>
  );
};

export default DownloadButton;
