import Vue from "vue";
import firebase from 'firebase/compat/app'

export default {
};

export const storage = {
  install(Vue) {
    Vue.prototype.$storage = {
      uploadImage: async function (file, path) {
        var result = false;
        if (file.type.includes('image')) {
          try {
            await firebase
              .storage()
              .ref()
              .child(path)
              .put(file);
            result = true;
          }
          catch (e) {
            console.log(e);
            result = false;
          }
          return result;
        }
        else {
          return false;
        }
      },
      uploadFile: async function (file, path) {
        let result = false;
        try {
          await firebase
            .storage()
            .ref()
            .child(path)
            .put(file);
          result = true;
        }
        catch (e) {
          console.log(e);
          result = false;
        }
        return result;
      },
      getDownloadUrl: async function (path) {
        let url = "";
        try {
          url = await firebase
            .storage()
            .ref()
            .child(path)
            .getDownloadURL();
        }
        catch (e) {
          console.log(e);
        }
        return url;
      },
      deleteFile: async function (path) {
        try {
          await firebase
            .storage()
            .ref()
            .child(path)
            .delete();
        }
        catch (e) {
          console.log(e);
        }
      },
    }
  }
};

Vue.use(storage);