<script>
import { reg_phoneType2, reg_name, reg_pwdCommon } from "@/lib/validate.js";
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();
        const formData = reactive({
            tel: '',
            name: '',
            sex: '',
            pwd: '',
            pwd2: false,
            ch1: false,
            ch2: false
        });
        const OK = ref(false);
        let msgName = null;

        onMounted(() => {
            msgName = document.querySelectorAll(".errorMsg");
        });

        const telBlur = (e) => {
            let data = null; 
            
            if (e == undefined) {
                data = document.querySelector("input[name='mobile']");
            } else {
                data = e.target;
            }

            // 驗證是否為空值
            if (formData.tel == "") {
                data.classList.add("error");
                msgName[0].innerText = "* 不得為空";
                msgName[0].classList.add("error");
                return;
            }
            // 驗證長度
            if (formData.tel.split('').length > 10) {
                data.classList.add("error");
                msgName[0].innerText = "* 長度不得超過10位數";
                msgName[0].classList.add("error");
                return;
            }
            // 驗證內容是否正確
            if (!reg_phoneType2(formData.tel)) {
                data.classList.add("error");
                msgName[0].innerText = "* 請輸入10位數字，且開頭為0";
                msgName[0].classList.add("error");
                return;
            }
            data.classList.remove("error");
            msgName[0].classList.remove("error");
        }
        const nameBlur = () => {
            const input = document.querySelector("input[name='Name']");

            // 驗證是否為空值
            if (input.value == "") {
                input.classList.add("error");
                msgName[1].innerText = "* 不得為空";
                msgName[1].classList.add("error");
                return;
            }
            // 驗證內容是否正確
            if (!reg_name(formData.name)) {
                input.classList.add("error");
                msgName[1].innerText = "* 請輸入2~4個中文字";
                msgName[1].classList.add("error");
                return;
            }
            input.classList.remove("error");
            msgName[1].classList.remove("error");
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
                msgName[2].innerText = "* 不得為空";
                msgName[2].classList.add("error");
                return;
            }
            // 驗證內容是否正確
            if (!reg_pwdCommon(formData.pwd)) {
                data.classList.add("error");
                msgName[2].innerText = "* 請輸入6~18碼的數字、字母、下底線，開頭英文字母";
                msgName[2].classList.add("error");
                return;
            }
            data.classList.remove("error");
            msgName[2].classList.remove("error");
        }
        const doubleCheck = (e) => {
            let data = null; 
            
            if (e == undefined) {
                data = document.querySelector("input[name='pwd2']");
            } else {
                data = e.target;
            }

            if (data.value == "") {
                data.classList.add("error");
                msgName[3].innerText = "* 不得為空";
                msgName[3].classList.add("error");
                formData.pwd2 = false;
                return;
            }
            if (data.value != formData.pwd) {
                data.classList.add("error");
                msgName[3].innerText = "* 密碼不一致，請重新輸入";
                msgName[3].classList.add("error");
                formData.pwd2 = false;
                return;
            }
            data.classList.remove("error");
            msgName[3].classList.remove("error");
            formData.pwd2 = true;
        }
        const showPWD = (e) => {
            const input = e.target.parentNode.childNodes[0];
            const domList = e.target.classList;

            domList.toggle("bi-eye")
            domList.toggle("bi-eye-slash");

            if (domList.contains("bi-eye-slash")) {
                input.type = 'text';
            } else {
                input.type = 'password';
            }
        }

        const submit = () => {
            telBlur();
            nameBlur();
            pwdBlur();
            doubleCheck();

            if (!formData.ch1) {
                msgName[4].innerText = "* 請勾選";
                msgName[4].classList.add("error");
                document.querySelector("#check1").style.borderColor = "red";
            } else {
                msgName[4].classList.remove("error");
                document.querySelector("#check1").style.borderColor = "black";
            }

            if (!formData.ch2) {
                msgName[5].innerText = "* 請勾選";
                msgName[5].classList.add("error");
                document.querySelector("#check2").style.borderColor = "red";
            } else {
                msgName[5].classList.remove("error");
                document.querySelector("#check2").style.borderColor = "black";
            }

            if (reg_phoneType2(formData.tel) && reg_name(formData.name) && reg_pwdCommon(formData.pwd) && formData.pwd2 && formData.ch1 && formData.ch2) {
                console.log("-------登入成功後的頁面/功能實作中-------")
                delete formData.pwd2;
                delete formData.ch1;
                delete formData.ch2;
                formData.id = Math.round(Math.random()*1000000);

                // 用localStorage儲存會員資料
                localStorage.setItem("userData", JSON.stringify(formData));
                localStorage.setItem("isLogin", true);
                

                // 倒轉到首頁之後，刷新頁面(重整isLogin狀態)
                router.push('/');
                setTimeout(()=>{
                    location.reload();
                },100)
            }
        }

        return {
            formData,
            telBlur, nameBlur, pwdBlur, doubleCheck, submit,
            showPWD,
            OK
        }
    }
}
</script>

<template>
    <div v-show="!OK">
        <div>
            <input type="radio" id="radio1" name="sex" v-model="formData.sex" value="M"><label for="radio1">男性</label>
            <input type="radio" id="radio2" name="sex" v-model="formData.sex" value="F"><label for="radio2">女性</label>
        </div>

        <span class="errorMsg"></span>
        <input @blur="telBlur" v-model="formData.tel" type="text" name="mobile" placeholder="手機號碼">
        
        <span class="errorMsg"></span>
        <input @blur="nameBlur" v-model="formData.name" type="text" name="Name" placeholder="姓名">
        
        <span class="errorMsg"></span>
        <div class="pwd-box">
            <input @blur="pwdBlur" v-model="formData.pwd" type="password" name="pwd" placeholder="請輸入密碼">
            <i @click="showPWD" class="bi bi-eye"></i>
        </div>
        <span class="errorMsg"></span>
        <div class="pwd-box">
            <input @blur="doubleCheck" type="password" name="pwd2" placeholder="再次確認密碼">
            <i @click="showPWD" class="bi bi-eye"></i>
        </div>

        <span class="errorMsg"></span>
        <div class="checkbox">
            <input v-model="formData.ch1" class="form-check-input" type="checkbox" id="check1">
            <label for="check1">
                我已經閱讀並同意服務條款
            </label>
        </div>

        <span class="errorMsg"></span>
        <div class="checkbox">
            <input v-model="formData.ch2" class="form-check-input" type="checkbox" id="check2">
            <label for="check2">
                我同意收到會員專屬通知
            </label>
        </div>
        <a @click="submit" type="submit" name="send">確定註冊</a>
    </div>
</template>

<style lang="scss" scoped>
    input {
        width: 100%;
        line-height: 44px;
        margin-bottom: 20px;
        padding: 0 15px;
        border: 1px solid #9da6b7;
        border-radius: 16px;

        &:focus-visible {
            outline: none;
        }
        &[type="radio"] {
            width: 25px;
        }
    }
    .pwd-box {
        position: relative;

        i {
            font-size: 20px;
            position: absolute;
            top: 13%;
            right: 15px;
            cursor: pointer;
        }
    }
    .checkbox {
        display: flex;
        align-items: center;
        margin-bottom: 15px;

        
        .form-check-input {
            padding: 0;
            width: 18px;
            height: 18px;
            margin: auto 0;
            border-color: black;

            &:checked {
                background-color: black;
            }
            &:focus {
                box-shadow: none;
            }
        }
        label {
            line-height: normal;
            margin-left: 5px;
            margin-bottom: 0;
            display: inline-flex;
            align-items: center;
            cursor: pointer;
        }
    }
    a[name="send"] {
        width: 100%;
        line-height: 44px;
        border-radius: 16px;
        border: none;
        background-color: black;
        color: white;
        text-align: center;

        &:hover {
            color: white;
            background-color: red;
        }
    }
    .errorMsg {
        display: none;
        color: red;
    }
    .errorMsg.error {
        display: inline-block;
        border: none;
        white-space: nowrap;
    }
    .error {
        border: 1px solid red;
    }
</style>