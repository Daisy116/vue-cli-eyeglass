import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import zh from "./language/zh-TW.json";
import en from "./language/en-US.json";
import ja from "./language/ja-JP.json";

import App from './App.vue'
import router from './router'

// 載入bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';


// 透過載入css檔案，將css設定塞入網頁！
import "@/assets/css/reset.css";


const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem("locale") ?? "中文",
    fallbackLocale: "中文",
    messages: {
      "中文": zh,
      "English": en,
      "日語": ja
    }
  });



createApp(App).use(i18n).use(router).mount('#app');