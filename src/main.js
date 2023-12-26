import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import VueMoment from "vue-moment";
import "./plugins/firebase";
import firebase from "firebase/compat/app";
import theme from "./plugins/theme";
import utils from "./plugins/utils";
import rules from "./plugins/rules";
import database from "./plugins/database";
import auth from "./plugins/auth";
import storage from "./plugins/storage";
import models from "./plugins/models";

// pages
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

// components
import ListItem from "./templates/ListItem";
import MessageDialog from "./templates/MessageDialog";
import FilePicker from "./templates/FilePicker";
import ImageViewer from "./templates/ImageViewer";
import FileNameViewer from "./templates/FileNameViewer";
import Settings from "./templates/Settings";
import Waiting from "./templates/Waiting";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueMoment);

Vue.component(ListItem.name, ListItem);
Vue.component(MessageDialog.name, MessageDialog);
Vue.component(FilePicker.name, FilePicker);
Vue.component(ImageViewer.name, ImageViewer);
Vue.component(FileNameViewer.name, FileNameViewer);
Vue.component(Settings.name, Settings);
Vue.component(Waiting.name, Waiting);

import UserManager from "./components/UserManager";
import UserList from "./components/UserList";
import UserEditDialog from "./components/UserEditDialog";
Vue.component(UserManager.name, UserManager);
Vue.component(UserList.name, UserList);
Vue.component(UserEditDialog.name, UserEditDialog);
import DesignerManager from "./components/DesignerManager";
import DesignerList from "./components/DesignerList";
import DesignerEditDialog from "./components/DesignerEditDialog";
Vue.component(DesignerManager.name, DesignerManager);
Vue.component(DesignerList.name, DesignerList);
Vue.component(DesignerEditDialog.name, DesignerEditDialog);
import SelectReservationDialog from "./components/SelectReservationDialog";
import SelectReservationList from "./components/SelectReservationList";
Vue.component(SelectReservationDialog.name, SelectReservationDialog);
Vue.component(SelectReservationList.name, SelectReservationList);
import ReservationEditDialog from "./components/ReservationEditDialog";
Vue.component(ReservationEditDialog.name, ReservationEditDialog);
import MenuList from "./components/MenuList";
import MenuEditDialog from "./components/MenuEditDialog";
Vue.component(MenuList.name, MenuList);
Vue.component(MenuEditDialog.name, MenuEditDialog);
import StoreManager from "./components/StoreManager";
import StoreList from "./components/StoreList";
import StoreEditDialog from "./components/StoreEditDialog";
Vue.component(StoreManager.name, StoreManager);
Vue.component(StoreList.name, StoreList);
Vue.component(StoreEditDialog.name, StoreEditDialog);

import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermService from "./pages/TermService";
import ElectronicCommerce from "./pages/ElectronicCommerce";

const router = new VueRouter({
	mode: "history",
	routes: [
		{ path: "/", meta: { requireAuth: true }, component: HomePage },
		{ path: "/Login", component: LoginPage },
		{ path: "/privacyPolicy", meta: { noAuth: true }, component: PrivacyPolicy },
		{ path: "/termService", meta: { noAuth: true }, component: TermService },
		{ path: "/electronicCommerce", meta: { noAuth: true }, component: ElectronicCommerce },
	],
});

router.beforeEach((to, from, next) => {
	// noAuth 경로 먼저 확인
	if (to.matched.some((record) => record.meta.noAuth)) {
		next();
	} else if (to.matched.some((record) => record.meta.requireAuth)) {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				next();
			} else {
				next({ path: "/Login" });
			}
		});
	} else {
		next();
	}
});

new Vue({
	vuetify,
	router,
	firebase,
	theme,
	utils,
	rules,
	database,
	auth,
	storage,
	models,
	render: (h) => h(App),
}).$mount("#app");
