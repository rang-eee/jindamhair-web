import Vue from "vue";

export default {
};

export const utils = {
  install(Vue) {
    Vue.prototype.$utils = {
      separateThousands: function (text) {
        var result = "";
        var newText = text.replace(/,/g, "");
        for (var i = 1; i <= newText.length; i++) {
          result = newText.charAt(newText.length - i) + result;
          if (i % 3 == 0 && i != newText.length) {
            result = "," + result;
          }
        }
        return result;
      },
      toNumber: function (text) {
        let number = text * 1;
        return number;
      },
      toText: function (number) {
        let text = number + '';
        return text;
      },
      lpad: function (text, padString, length) { // 숫자 앞에 0 붙이기
        let str = text;
        while (str.length < length)
          str = padString + str;
        return str;
      },
      itemStyle(condition, name, color) {
        if (condition) {
          return name + ':' + color;
        }
        else {
          return '';
        }
      },
      textValue(text) {
        if (text != null) return text;
        else return "";
      },
      numberValue(number) {
        if (number != null) return number;
        else return 0;
      },
      getShortened(text, maxLength) {
        let result = text;
        if (text.length > maxLength) {
          result = text.slice(0, maxLength) + '..';
        }
        return result;
      },
      isEmpty(text) {
        if ((text == undefined) || (typeof text == "undefined") || (text == null) || (text.length == 0)) {
          return true;
        }
        else {
          return false;
        }
      },
      isSameDate(date1, date2) {
        if (Number(date1) == Number(date2)) {
          return true;
        }
        else {
          return false;
        }
      },
      getPhoneText: function (text) {
        var result = "";
        var newText = text.replace(/-/g, "");
        newText = newText.replace(/ /g, "");
        for (var i = 1; i <= newText.length; i++) {
          result = newText.charAt(newText.length - i) + result;
          if (i % 4 == 0 && i != newText.length) {
            result = "-" + result;
          }
        }
        return result;
      },
      nextMonth(date) {
        let result = new Date(date);
        let month = result.getMonth() + 1;
        result.setMonth(month, 1);
        return result;
      },
      prevMonth(date) {
        let result = new Date(date);
        let month = result.getMonth() - 1;
        result.setMonth(month, 1);
        return result;
      },
      getTypeText(text) {
        if (this.isEmpty(text) == false) {
          let words = text.split(".");
          if (words.length == 2) {
            return words[1];
          } else {
            return "";
          }
        }
      },
    }
  }
};

Vue.use(utils);