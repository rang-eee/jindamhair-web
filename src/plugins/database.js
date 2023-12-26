// User:users
// Reservation:reservations
// Menu:menus
// Store:stores

import Vue from "vue";
import firebase from "firebase/compat/app"

export default {
};

export const database = {
	install(Vue) {
		Vue.prototype.$database = {
			currentTimestamp: function () {
				return firebase.firestore.Timestamp.now();
			},
			dateToTimestamp: function (date) {
				return firebase.firestore.Timestamp.fromDate(new Date(date));
			},
			timestampToDate: function (timestamp) {
				return timestamp.toDate();
			},
			onUsers: function (onSnapshot) {
				return firebase.firestore()
					.collection('users')
					.where('userType', '==', 'UserType.customer')
					.onSnapshot(onSnapshot);
			},
			onDesigners: function (onSnapshot) {
				return firebase.firestore()
					.collection('users')
					.where('userType', '==', 'UserType.designer')
					.onSnapshot(onSnapshot);
			},
			loadUsers: async function () {
				let itemList = [];
				await firebase.firestore()
					.collection('users')
					.where('userType', '==', 'UserType.customer')
					.get()
					.then(async (querySnapshot) => {
						for (let i = 0; i < querySnapshot.docs.length; i++) {
							let itemInfo = querySnapshot.docs[i].data();
							itemInfo.id = querySnapshot.docs[i].id;
							itemList.push(itemInfo);
						}
					});
				return itemList;
			},
			loadDesigners: async function () {
				let itemList = [];
				await firebase.firestore()
					.collection('users')
					.where('userType', '==', 'UserType.designer')
					.get()
					.then(async (querySnapshot) => {
						for (let i = 0; i < querySnapshot.docs.length; i++) {
							let itemInfo = querySnapshot.docs[i].data();
							itemInfo.id = querySnapshot.docs[i].id;
							itemList.push(itemInfo);
						}
					});
				return itemList;
			},
			loadUser: async function (id) {
				let item = null;
				await firebase.firestore()
					.collection('users')
					.doc(id)
					.get()
					.then(async (documentSnapshot) => {
						if (documentSnapshot.exists) {
							item = documentSnapshot.data();
						}
					});
				return item;
			},
			addUser: async function (model) {
				let newDocRef = firebase.firestore()
					.collection('users')
					.doc();
				let addModel = model;
				addModel.id = newDocRef.id;
				await newDocRef.set(addModel);
			},
			editUser: async function (id, model) {
				await firebase.firestore()
					.collection('users')
					.doc(id)
					.update(model);
			},
			deleteUser: async function (id) {
				await firebase.firestore()
					.collection('users')
					.doc(id)
					.delete();
			},
			setUser: async function (id, model) {
				await firebase.firestore()
					.collection('users')
					.doc(id)
					.set(model);
			},

			onReservations: function (onSnapshot) {
				return firebase.firestore()
					.collection('reservations')
					.onSnapshot(onSnapshot);
			},
			loadReservations: async function () {
				let itemList = [];
				await firebase.firestore()
					.collection('reservations')
					.get()
					.then(async (querySnapshot) => {
						for (let i = 0; i < querySnapshot.docs.length; i++) {
							let itemInfo = querySnapshot.docs[i].data();
							itemInfo.id = querySnapshot.docs[i].id;
							itemList.push(itemInfo);
						}
					});
				return itemList;
			},
			loadReservationsOfUser: async function (userUid) {
				let itemList = [];
				await firebase.firestore()
					.collection('reservations')
					.where('userUid', '==', userUid)
					.get()
					.then(async (querySnapshot) => {
						for (let i = 0; i < querySnapshot.docs.length; i++) {
							let itemInfo = querySnapshot.docs[i].data();
							itemInfo.id = querySnapshot.docs[i].id;
							itemList.push(itemInfo);
						}
					});
				return itemList;
			},
			loadReservationsOfDesigner: async function (designerUid, startDate, endDate) {
				let itemList = [];
				await firebase.firestore()
					.collection('reservations')
					.where('designerUid', '==', designerUid)
					.where('reservationDay', '>=', startDate)
					.where('reservationDay', '<=', endDate)
					.get()
					.then(async (querySnapshot) => {
						for (let i = 0; i < querySnapshot.docs.length; i++) {
							let itemInfo = querySnapshot.docs[i].data();
							itemInfo.id = querySnapshot.docs[i].id;
							itemList.push(itemInfo);
						}
					});
				return itemList;
			},
			loadReservation: async function (id) {
				let item = null;
				await firebase.firestore()
					.collection('reservations')
					.doc(id)
					.get()
					.then(async (documentSnapshot) => {
						if (documentSnapshot.exists) {
							item = documentSnapshot.data();
						}
					});
				return item;
			},
			addReservation: async function (model) {
				let newDocRef = firebase.firestore()
					.collection('reservations')
					.doc();
				let addModel = model;
				addModel.id = newDocRef.id;
				await newDocRef.set(addModel);
			},
			editReservation: async function (id, model) {
				await firebase.firestore()
					.collection('reservations')
					.doc(id)
					.update(model);
			},
			deleteReservation: async function (id) {
				await firebase.firestore()
					.collection('reservations')
					.doc(id)
					.delete();
			},
			setReservation: async function (id, model) {
				await firebase.firestore()
					.collection('reservations')
					.doc(id)
					.set(model);
			},

			loadMenus: async function (userUid) {
				let itemList = [];
				await firebase.firestore()
					.collection('users')
					.doc(userUid)
					.collection('menus')
					.get()
					.then(async (querySnapshot) => {
						for (let i = 0; i < querySnapshot.docs.length; i++) {
							let itemInfo = querySnapshot.docs[i].data();
							itemInfo.id = querySnapshot.docs[i].id;
							itemList.push(itemInfo);
						}
					});
				return itemList;
			},
			loadMenu: async function (userUid, id) {
				let item = null;
				await firebase.firestore()
					.collection('users')
					.doc(userUid)
					.collection('menus')
					.doc(id)
					.get()
					.then(async (documentSnapshot) => {
						if (documentSnapshot.exists) {
							item = documentSnapshot.data();
						}
					});
				return item;
			},

			onStores: function (onSnapshot) {
				return firebase.firestore()
					.collection('stores')
					.onSnapshot(onSnapshot);
			},
			loadStores: async function () {
				let itemList = [];
				await firebase.firestore()
					.collection('stores')
					.get()
					.then(async (querySnapshot) => {
						for (let i = 0; i < querySnapshot.docs.length; i++) {
							let itemInfo = querySnapshot.docs[i].data();
							itemInfo.id = querySnapshot.docs[i].id;
							itemList.push(itemInfo);
						}
					});
				return itemList;
			},
			loadStore: async function (id) {
				let item = null;
				await firebase.firestore()
					.collection('stores')
					.doc(id)
					.get()
					.then(async (documentSnapshot) => {
						if (documentSnapshot.exists) {
							item = documentSnapshot.data();
						}
					});
				return item;
			},
			addStore: async function (model) {
				let newDocRef = firebase.firestore()
					.collection('stores')
					.doc();
				let addModel = model;
				addModel.id = newDocRef.id;
				await newDocRef.set(addModel);
			},
			editStore: async function (id, model) {
				await firebase.firestore()
					.collection('stores')
					.doc(id)
					.update(model);
			},
			deleteStore: async function (id) {
				await firebase.firestore()
					.collection('stores')
					.doc(id)
					.delete();
			},
			setStore: async function (id, model) {
				await firebase.firestore()
					.collection('stores')
					.doc(id)
					.set(model);
			},

			onNotifications: function (onSnapshot) {
				return firebase.firestore()
					.collection('notifications')
					.onSnapshot(onSnapshot);
			},
			loadNotifications: async function () {
				let itemList = [];
				await firebase.firestore()
					.collection('notifications')
					.get()
					.then(async (querySnapshot) => {
						for (let i = 0; i < querySnapshot.docs.length; i++) {
							let itemInfo = querySnapshot.docs[i].data();
							itemInfo.id = querySnapshot.docs[i].id;
							itemList.push(itemInfo);
						}
					});
				return itemList;
			},
			loadNotification: async function (id) {
				let item = null;
				await firebase.firestore()
					.collection('notifications')
					.doc(id)
					.get()
					.then(async (documentSnapshot) => {
						if (documentSnapshot.exists) {
							item = documentSnapshot.data();
						}
					});
				return item;
			},
			addNotification: async function (model) {
				let newDocRef = firebase.firestore()
					.collection('notifications')
					.doc();
				let addModel = model;
				addModel.id = newDocRef.id;
				await newDocRef.set(addModel);
			},
			editNotification: async function (id, model) {
				await firebase.firestore()
					.collection('notifications')
					.doc(id)
					.update(model);
			},
			deleteNotification: async function (id) {
				await firebase.firestore()
					.collection('notifications')
					.doc(id)
					.delete();
			},
			setNotification: async function (id, model) {
				await firebase.firestore()
					.collection('notifications')
					.doc(id)
					.set(model);
			},
		}
	}
};

Vue.use(database);
