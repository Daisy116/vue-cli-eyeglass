<script>
// 引入驗證表單內容的JS函式(使用正則表達式)
import { reg_phoneType2, reg_pwdCommon } from "@/lib/validate.js";
// 引入圖形驗證碼的JS函式
import { createCode } from "@/lib/jQueryfn";
// 使用CryptoJS的AES加密、encUtf8解密
import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';

import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';


export default {
    setup() {
        const router = useRouter();
        let msgName = null;
        const verifyData = ref(null)
        const verify = ref(false);
        const isForget = ref(false);
        const formData = reactive({
            tel: '',
            pwd: ''
        });

        onMounted(() => {
            msgName = document.querySelectorAll(".errorMsg");
            $('.code').createCode({
                len: 5
            });
        });

        const toFB = () => {
            window.open(
                "https://www.facebook.com/login/?privacy_mutation_token=eyJ0eXBlIjowLCJjcmVhdGlvbl90aW1lIjoxNjk5ODU1NjU1LCJjYWxsc2l0ZV9pZCI6MjY5NTQ4NDUzMDcyMDk1MX0%3D", 
                '_blank',
                'width=500,height=500')
        }
        const toLine = () => {
            window.open(
                "https://access.line.me/oauth2/v2.1/login?returnUri=%2Foauth2%2Fv2.1%2Fauthorize%2Fconsent%3Fresponse_type%3Dcode%26client_id%3D1653997749%26redirect_uri%3Dhttps%253A%252F%252Fwww.youngman.com.tw%252Fline.asp%26state%3Dtest%26scope%3Dopenid%2Bprofile&loginChannelId=1653997749&loginState=As5VfR4jscf3O0w0O72wf1#/", 
                '_blank',
                'width=500,height=600')
        }

        const showPWD = (e) => {
            const input = document.querySelector("input[name='pwd']");
            const domList = e.target.classList;

            domList.toggle("bi-eye")
            domList.toggle("bi-eye-slash");

            if (domList.contains("bi-eye-slash")) {
                input.type = 'text';
            } else {
                input.type = 'password';
            }
        }

        const telBlur = (name, e) => {
            let data = null; 
            let id = 0;

            if (e == undefined) {
                data = document.querySelector("input[name=" + name + "]");
            } else {
                data = e.target;
            }

            if (name == 'phone') {
                id = 3;
            }

            // 驗證是否為空值
            if (formData.tel == "") {
                data.classList.add("error");
                msgName[id].innerText = "* 不得為空";
                msgName[id].classList.add("error");
                return;
            }
            // 驗證長度
            if (formData.tel.split('').length > 10) {
                data.classList.add("error");
                msgName[id].innerText = "* 長度不得超過10位數";
                msgName[id].classList.add("error");
                return;
            }
            // 驗證內容是否正確
            if (!reg_phoneType2(formData.tel)) {
                data.classList.add("error");
                msgName[id].innerText = "* 請輸入10位數字，且開頭為0";
                msgName[id].classList.add("error");
                return;
            }
            data.classList.remove("error");
            msgName[id].classList.remove("error");
        }
        const pwdBlur = (e) => {
            let data = null; 
            
            if (e == undefined) {
                data = document.querySelector("input[name='pwd']");
            } else {
                data = e.target;
            }

            // 驗證是否為空值
            if (formData.pwd == "") {
                data.classList.add("error");
                msgName[1].innerText = "* 不得為空";
                msgName[1].classList.add("error");
                return;
            }
            // 驗證內容是否正確
            if (!reg_pwdCommon(formData.pwd)) {
                data.classList.add("error");
                msgName[1].innerText = "* 請輸入6~18碼的數字、字母、下底線，開頭英文字母";
                msgName[1].classList.add("error");
                return;
            }
            data.classList.remove("error");
            msgName[1].classList.remove("error");
        }
        const verifyBlur = () => {
            // 驗證是否為空值
            if (verifyData.value.value == "") {
                verifyData.value.classList.add("error");
                msgName[2].innerText = "* 不得為空";
                msgName[2].classList.add("error");
                verify.value = false;
                return;
            }
            // 驗證內容是否正確
            if (verifyData.value.value.toLowerCase() != $('.code').children('input').val().toLowerCase()) {
                verifyData.value.classList.add("error");
                msgName[2].innerText = "* 驗證碼輸入錯誤！";
                msgName[2].classList.add("error");
                verify.value = false;
                return;
            }
            verifyData.value.classList.remove("error");
            msgName[2].classList.remove("error");
            verify.value = true;
        }
        const goForget = () => {
            isForget.value = true;
        }
        const submit = () => {
            telBlur('mobile');
            pwdBlur();
            verifyBlur();

            // 輸入框沒過驗證，就不會往下驗證
            if (!reg_phoneType2(formData.tel) || !reg_pwdCommon(formData.pwd) || !verify.value) return;

            if (!localStorage.getItem("userData")) {
                alert("尚未註冊過，請先註冊！")
                return;
            }

            // 解密localStorage裡的會員資料
            const bytes = AES.decrypt(localStorage.getItem("userData"), '1234AAA');
            const originalText = bytes.toString(encUtf8);
            let userData = JSON.parse(originalText);

            if (!userData || formData.tel != userData.tel) {
                alert("無此帳號，請先註冊！")
                return;
            }
            if (formData.pwd != userData.pwd) {
                alert("密碼錯誤，是否忘記密碼？")
                return;
            }    
            
            // 成功登入！
            localStorage.setItem("isLogin", true);

            // 倒轉到首頁之後，刷新頁面(重整isLogin狀態)
            router.push('/');
            setTimeout(()=>{
                location.reload();
            },100)
        }
        const send = () => {
            telBlur('phone');
            if (reg_phoneType2(formData.tel)) {
                document.querySelector(".bi-envelope-check").classList.remove("display-none");
                console.log("手機號碼：", formData.tel);
                console.log("密碼：", formData.pwd);
            }
        }

        return {
            formData, verifyData,
            isForget, goForget,
            toFB, toLine, 
            telBlur, pwdBlur, verifyBlur,
            showPWD,
            submit, send
        }
    }
}
</script>

<template>
    <div class="login" v-show="!isForget">
        <ul class="main">
            <li>
                <button @click="toFB" type="button" name="fb">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>
                    Facebook登入
                </button>
            </li>
            <li>
                <button @click="toLine" type="button" name="line">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-line" viewBox="0 0 16 16">
                        <path d="M8 0c4.411 0 8 2.912 8 6.492 0 1.433-.555 2.723-1.715 3.994-1.678 1.932-5.431 4.285-6.285 4.645-.83.35-.734-.197-.696-.413l.003-.018.114-.685c.027-.204.055-.521-.026-.723-.09-.223-.444-.339-.704-.395C2.846 12.39 0 9.701 0 6.492 0 2.912 3.59 0 8 0ZM5.022 7.686H3.497V4.918a.156.156 0 0 0-.155-.156H2.78a.156.156 0 0 0-.156.156v3.486c0 .041.017.08.044.107v.001l.002.002.002.002a.154.154 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157Zm.791-2.924a.156.156 0 0 0-.156.156v3.486c0 .086.07.155.156.155h.562c.086 0 .155-.07.155-.155V4.918a.156.156 0 0 0-.155-.156h-.562Zm3.863 0a.156.156 0 0 0-.156.156v2.07L7.923 4.832a.17.17 0 0 0-.013-.015v-.001a.139.139 0 0 0-.01-.01l-.003-.003a.092.092 0 0 0-.011-.009h-.001L7.88 4.79l-.003-.002a.029.029 0 0 0-.005-.003l-.008-.005h-.002l-.003-.002-.01-.004-.004-.002a.093.093 0 0 0-.01-.003h-.002l-.003-.001-.009-.002h-.006l-.003-.001h-.004l-.002-.001h-.574a.156.156 0 0 0-.156.155v3.486c0 .086.07.155.156.155h.56c.087 0 .157-.07.157-.155v-2.07l1.6 2.16a.154.154 0 0 0 .039.038l.001.001.01.006.004.002a.066.066 0 0 0 .008.004l.007.003.005.002a.168.168 0 0 0 .01.003h.003a.155.155 0 0 0 .04.006h.56c.087 0 .157-.07.157-.155V4.918a.156.156 0 0 0-.156-.156h-.561Zm3.815.717v-.56a.156.156 0 0 0-.155-.157h-2.242a.155.155 0 0 0-.108.044h-.001l-.001.002-.002.003a.155.155 0 0 0-.044.107v3.486c0 .041.017.08.044.107l.002.003.002.002a.155.155 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156Z"/>
                    </svg>
                    line帳號登入
                </button>
            </li>
            <li>
                <span class="errorMsg"></span>
                <input @blur="telBlur('mobile')" v-model="formData.tel" type="text" name="mobile" placeholder="手機號碼">
            </li>
            <li>
                <span class="errorMsg"></span>
                <div>
                    <input @blur="pwdBlur" v-model="formData.pwd" type="password" name="pwd" id="pwd" placeholder="密碼">
                    <i @click="showPWD" class="bi bi-eye"></i>
                </div>
            </li>
        </ul>
        
        <span class="errorMsg">* 驗證碼內容錯誤！</span>
        <input ref="verifyData" @blur="verifyBlur" type="text" name="Verify" class="input-code" placeholder="驗證碼">
        <span class="code" title='點擊切換'></span>

        <div class="pwd-wrap">
            <a @click="goForget" href="javascript:;">忘記密碼？</a>
        </div>
        <a @click="submit" name="Logins">登入會員</a>
    </div>
    <div v-show="isForget" class="forget-wrap">
        <h1>忘記密碼</h1>
        <span class="errorMsg"></span>
        <input @blur="telBlur('phone')" v-model="formData.tel" type="text" name="phone" placeholder="手機號碼">
        <a @click="send" name="Logins">發送新密碼</a>
        <i class="bi bi-envelope-check display-none"></i>
    </div>
</template>

<style lang="scss" scoped>
    * {
        padding: 0;
        margin: 0;
    }
    h1 {
        font-weight: 700;
        text-align: center;
    }
    input {
        width: 100%;
        line-height: 44px;
        padding: 0 15px;
        border: 1px solid #9da6b7;
        border-radius: 16px;

        &:focus-visible {
            outline: none;
        }
    }
    .login {
        position: relative;
    }
    .main {
        li {
            margin-bottom: 20px;
            position: relative;

            button {
                width: 100%;
                line-height: 44px;
                border-radius: 16px;
                background-color: transparent;
                display: flex;
                align-items: center;
                justify-content: center;
                
                &[name="fb"] {
                    border: 1px solid #1877f2;
                    color: #1877f2;

                    &:hover {
                        background-color: #1877f2;
                        color: white;
                    }
                }
                &[name="line"] {
                    border: 1px solid #51a61b;
                    color: #51a61b;

                    &:hover {
                        background-color: #51a61b;
                        color: white;
                    }
                }
                svg {
                    margin-right: 5px;
                }
            }
            
            >div {
                position: relative;
            }
            &:last-child {
                margin-bottom: 16px;

                i {
                    font-size: 20px;
                    position: absolute;
                    top: 50%;
                    right: 15px;
                    transform: translateY(-50%);
                    cursor: pointer;
                }
            }
        }
    }
    .error {
        border: 1px solid red;
    }
    .errorMsg {
        display: none;
        color: red;
    }
    .errorMsg.error {
        display: block;
        border: none;
        white-space: nowrap;
    }
    .pwd-wrap {
        text-align: center;
        margin-bottom: 20px;

        a:hover {
            color: #777;
        }
    }
    input[name="Verify"] {
        width: 50%;
        margin-right: 10px;
        margin-bottom: 16px;
    }
    .forget-wrap {
        transform: translateY(-145px);
        background-color: white;

        h1 {
            margin-bottom: 30px;
        }
        input[name="phone"] {
            margin-bottom: 15px;
        }
        .bi-envelope-check {
            width: 100%;
            height: 300px;
            font-size: 88px;
            color: green;
            text-align: center;

            position: absolute;
            top: 0;
            background-color: white;
            padding: 30px;

            &.display-none {
                display: none;
            }
            &:after {
                content: '請確認簡訊(實際功能待實作)';
                display: block;
                width: 100%;
                font-size: 30px;
                font-style: normal;
                transform: translateY(-20px);
            }
        }
    }
    a[name="Logins"] {
        display: block;
        width: 100%;
        line-height: 44px;
        text-align: center;
        border-radius: 16px;
        border: none;
        background-color: black;
        color: white;
        cursor: pointer;

        &:hover {
            color: white;
            background-color: red;
        }
    }
</style>