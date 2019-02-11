import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';
import firebase from '../firebase';


const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

// Upload image to firebase
//uri : the image
//ref : name of the reference (folder)
//imageName : name of the image we want to upload
export const uploadImage = ( uri , ref , imageName ) => {
    return new Promise((resolve , reject) => {
        const mime = 'image/jpg';
        let uploadBlog = null;
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://','') : uri;
        const imageRef = firebase.storage().ref(ref).child(imageName);

        fs.readFile(uploadUri , 'base64')
        .then((data) => {
            return Blob.build(data , { type:`${mime};BASE64` });
        }).then((blob) => {
            uploadBlog = blob;
            return imageRef.put(blob , { contentType : mime })
        }).then(() => {
            uploadBlog.close();
            return imageRef.getDownloadURL();
        })
        .then((url)=> {
            resolve(url);
        })
        .catch(error => { reject(error)});
    });
};