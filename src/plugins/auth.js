import Vue from "vue";
import firebase from 'firebase/compat/app'

export default {
};

export const auth = {
    install(Vue) {
        Vue.prototype.$auth = {
            login: async function (email, password) {
                await firebase
                    .auth()
                    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
                    .then(async () => {
                        await firebase
                            .auth()
                            .signInWithEmailAndPassword(email, password)
                            .then(() => {
                            })
                            .catch((error) => {
                                throw (error);
                            });
                    })
                    .catch((error) => {
                        throw (error);
                    });
                return true;
            },
            logout: async function () {
                await firebase.auth().signOut();
            },
            reauthenticate: async function (password) {
                let user = firebase.auth().currentUser;
                let credential =
                    firebase.auth.EmailAuthProvider.credential(
                        user.email,
                        password
                    );
                await user.reauthenticateWithCredential(credential);
            },
            updatePassword: async function (newPassword) {
                let user = firebase.auth().currentUser;
                await user
                    .updatePassword(newPassword)
                    .then(() => {
                        this.infoMessage = "비밀번호가 변경되었습니다.";
                        this.infoMessageDialog = true;
                    })
                    .catch((e) => {
                        throw (e);
                    });
            },
        }
    }
};

Vue.use(auth);