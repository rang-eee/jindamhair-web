import Vue from 'vue'
import firebase from 'firebase/compat/app'
import firebaseConfig from '../../firebaseConfig'

import 'firebase/compat/auth'
import 'firebase/compat/functions'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

firebase.initializeApp(firebaseConfig)

Vue.prototype.$firebase = firebase;
