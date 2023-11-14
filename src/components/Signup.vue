<script>
import { reg_phoneType2 } from "@/lib/validate.js";
import { onMounted, reactive, ref } from 'vue';

export default {
    setup() {
        const isOK = ref(false);
        const formData = reactive({
            tel: '',
            ch1: false,
            ch2: false
        });
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
        const submit = () => {
            telBlur();

            if (!formData.ch1) {
                msgName[1].innerText = "* 請勾選";
                msgName[1].classList.add("error");
                document.querySelector("#check1").style.borderColor = "red";
            } else {
                msgName[1].classList.remove("error");
                document.querySelector("#check1").style.borderColor = "black";
            }

            if (!formData.ch2) {
                msgName[2].innerText = "* 請勾選";
                msgName[2].classList.add("error");
                document.querySelector("#check2").style.borderColor = "red";
            } else {
                msgName[2].classList.remove("error");
                document.querySelector("#check2").style.borderColor = "black";
            }

            if (reg_phoneType2(formData.tel) && formData.ch1 && formData.ch2) {
                isOK.value = true;
                console.log("-------登入成功後的頁面/功能實作中-------")
                console.log("手機號碼：", formData.tel);
                console.log("checkbox1：", formData.ch1);
                console.log("checkbox2：", formData.ch2);
            }
        }

        return {
            formData,
            telBlur, submit,
            isOK
        }
    }
}
</script>

<template>
    <div v-show="!isOK">
        <span class="errorMsg"></span>
        <input @blur="telBlur" v-model="formData.tel" type="text" name="mobile" id="mobile" placeholder="手機號碼">

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
    <div class="temp" v-show="isOK">
        登入成功！
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
    .temp{
        height: 200px;
        line-height: 200px;
        font-size: 32px;
        text-align: center;
        color: cadetblue;
        background-color: white;
        transform: translateY(-140px);
    }
</style>