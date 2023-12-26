// [User]
// id:text
// userType:text
// createAt:any
// email:text
// name:text
// nickname:text
// phoneNum:text
// birth:text
// imageUrl:text
// genderType:text
// selectedGender:text
// membershipType:text
// signUpMethod:text
// point:number
// storeName:text
// storeAddress:text
// licenseImageUrl:text
// designerAuthStatus:text
// accountInfo:text
// isWork:any
// chargeHistory:any
// tags:text
// openDays:any
// selectedDays:any
// openTime:any
// closeTime:any
// hairImages:any
// [Reservation]
// id:text
// reservationType:text
// userUid:text
// userName:text
// storeName:text
// reservationDay:any
// startAt:any
// endAt:any
// price:text
// hairCurType:text
// hairTitle:text
// designerUid:text
// designerModel:any
// designerName:text
// [Menu]
// id:text
// title:text
// designerId:text
// price:text
// percent:text
// salePrice:text
// jawPrice:text
// shoulderPrice:text
// chestPrice:text
// waistPrice:text
// hairInfo:text
// hairTime:text
// hairImageUrl:any
// hairGenderType:text
// isOpenMenu:any
// createAt:any
// [Store]
// id:text
// title:text
// address:text
// description:text
// createAt:any
// gpsX:any
// gpsY:any
// phoneNum:text
// postCode:text
// [Notification]
// id:text
// message:text
// createAt:any
// eventWhenClick:text
// receiverUid:text
// title:text
// topic:text

/* eslint-disable no-unused-vars */
import Vue from "vue";
export default {
};

function isNull(text) {
	if ((typeof text == "undefined") || (text == null)) {
		return true;
	}
	else {
		return false;
	}
}

function toNumber(text) {
	if (isNull(text)) {
		return null;
	}
	else {
		return text * 1;
	}
}

function toText(number) {
	if (isNull(number)) {
		return null;
	}
	else {
		return number + '';
	}
}

function toSafeValue(value) {
	if (isNull(value)) {
		return null;
	}
	else {
		return value;
	}
}

export const models = {
	install(Vue) {
		Vue.prototype.$models = {
			UserModel: {
				create: function () {
					return {
						id: '',
						userType: '',
						createAt: null,
						email: '',
						name: '',
						nickname: '',
						phoneNum: '',
						birth: '',
						imageUrl: '',
						genderType: '',
						selectedGender: '',
						membershipType: '',
						signUpMethod: '',
						point: 0,
						storeName: '',
						storeAddress: '',
						licenseImageUrl: '',
						designerAuthStatus: '',
						accountInfo: '',
						isWork: null,
						chargeHistory: null,
						tags: '',
						openDays: null,
						selectedDays: null,
						openTime: null,
						closeTime: null,
						hairImages: null,
					};
				},
				set: function (model) {
					return {
						id: toText(model.id),
						userType: toText(model.userType),
						createAt: toSafeValue(model.createAt),
						email: toText(model.email),
						name: toText(model.name),
						nickname: toText(model.nickname),
						phoneNum: toText(model.phoneNum),
						birth: toText(model.birth),
						imageUrl: toText(model.imageUrl),
						genderType: toText(model.genderType),
						selectedGender: toText(model.selectedGender),
						membershipType: toText(model.membershipType),
						signUpMethod: toText(model.signUpMethod),
						point: toNumber(model.point),
						storeName: toText(model.storeName),
						storeAddress: toText(model.storeAddress),
						licenseImageUrl: toText(model.licenseImageUrl),
						designerAuthStatus: toText(model.designerAuthStatus),
						accountInfo: toText(model.accountInfo),
						isWork: toSafeValue(model.isWork),
						chargeHistory: toSafeValue(model.chargeHistory),
						tags: toText(model.tags),
						openDays: toSafeValue(model.openDays),
						selectedDays: toSafeValue(model.selectedDays),
						openTime: toSafeValue(model.openTime),
						closeTime: toSafeValue(model.closeTime),
						hairImages: toSafeValue(model.hairImages),
					};
				},
			},

			ReservationModel: {
				create: function () {
					return {
						id: '',
						reservationType: '',
						userUid: '',
						userName: '',
						storeName: '',
						reservationDay: null,
						startAt: null,
						endAt: null,
						price: '',
						hairCurType: '',
						hairTitle: '',
						designerUid: '',
						designerModel: null,
						designerName: '',
					};
				},
				set: function (model) {
					return {
						id: toText(model.id),
						reservationType: toText(model.reservationType),
						userUid: toText(model.userUid),
						userName: toText(model.userName),
						storeName: toText(model.storeName),
						reservationDay: toSafeValue(model.reservationDay),
						startAt: toSafeValue(model.startAt),
						endAt: toSafeValue(model.endAt),
						price: toText(model.price),
						hairCurType: toText(model.hairCurType),
						hairTitle: toText(model.hairTitle),
						designerUid: toText(model.designerUid),
						designerModel: toSafeValue(model.designerModel),
						designerName: toText(model.designerName),
					};
				},
			},

			MenuModel: {
				create: function () {
					return {
						id: '',
						title: '',
						designerId: '',
						price: '',
						percent: '',
						salePrice: '',
						jawPrice: '',
						shoulderPrice: '',
						chestPrice: '',
						waistPrice: '',
						hairInfo: '',
						hairTime: '',
						hairImageUrl: null,
						hairGenderType: '',
						isOpenMenu: null,
						createAt: null,
					};
				},
				set: function (model) {
					return {
						id: toText(model.id),
						title: toText(model.title),
						designerId: toText(model.designerId),
						price: toText(model.price),
						percent: toText(model.percent),
						salePrice: toText(model.salePrice),
						jawPrice: toText(model.jawPrice),
						shoulderPrice: toText(model.shoulderPrice),
						chestPrice: toText(model.chestPrice),
						waistPrice: toText(model.waistPrice),
						hairInfo: toText(model.hairInfo),
						hairTime: toText(model.hairTime),
						hairImageUrl: toSafeValue(model.hairImageUrl),
						hairGenderType: toText(model.hairGenderType),
						isOpenMenu: toSafeValue(model.isOpenMenu),
						createAt: toSafeValue(model.createAt),
					};
				},
			},

			StoreModel: {
				create: function () {
					return {
						id: '',
						title: '',
						address: '',
						description: '',
						createAt: null,
						gpsX: null,
						gpsY: null,
						phoneNum: '',
						postCode: '',
					};
				},
				set: function (model) {
					return {
						id: toText(model.id),
						title: toText(model.title),
						address: toText(model.address),
						description: toText(model.description),
						createAt: toSafeValue(model.createAt),
						gpsX: toSafeValue(model.gpsX),
						gpsY: toSafeValue(model.gpsY),
						phoneNum: toText(model.phoneNum),
						postCode: toText(model.postCode),
					};
				},
			},

			NotificationModel: {
				create: function () {
					return {
						id: '',
						message: '',
						createAt: null,
						eventWhenClick: '',
						receiverUid: '',
						title: '',
						topic: '',
					};
				},
				set: function (model) {
					return {
						id: toText(model.id),
						message: toText(model.message),
						createAt: toSafeValue(model.createAt),
						eventWhenClick: toText(model.eventWhenClick),
						receiverUid: toText(model.receiverUid),
						title: toText(model.title),
						topic: toText(model.topic),
					};
				},
			},
		};
	}
};

Vue.use(models);
