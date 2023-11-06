<script>
import { reactive, ref } from 'vue';

// 引入驗證表單內容的JS函式(使用正則表達式)
import { reg_name, reg_phoneType2, reg_email } from "@/lib/validate.js"

export default {
    setup() {
        const myForm = ref();
        const formData = reactive({
            name: "",
            tel: "",
            email: "",
            country: "所在區域",
            contents: ""
        });
        const isOK = ref(false);
        
        const submit = (e) => {
            e.preventDefault();
            const form = document.querySelectorAll("form")[1];
            const msgName = document.querySelectorAll(".errorMsg");
            const msgNamePhone = document.querySelectorAll(".errorMsgPhone");
            
            let checkName = reg_name(formData.name);
            let checkTel = reg_phoneType2(formData.tel);
            let checkEmail = reg_email(formData.email);
            let checkCountry = false;
            let checkContents= false;

            // 驗證表單的必填欄位是否有填      
            if (form.reportValidity()) {}
            // 驗證表單的姓名
            if (!checkName) {
                document.querySelector("input[name='Name']").classList.add("error");
                msgName[0].classList.add("error");
                msgNamePhone[0].classList.add("error");
            } else {
                document.querySelector("input[name='Name']").classList.remove("error");
                msgName[0].classList.remove("error");
                msgNamePhone[0].classList.remove("error");
            }
            // 驗證表單的手機號碼
            if (!checkTel) {
                document.querySelector("input[name='Tel']").classList.add("error");
                msgName[1].classList.add("error");
                msgNamePhone[1].classList.add("error");
            } else {
                document.querySelector("input[name='Tel']").classList.remove("error");
                msgName[1].classList.remove("error");
                msgNamePhone[1].classList.remove("error");
            }
            // 驗證表單的信箱
            if (!checkEmail) {
                document.querySelector("input[name='Email']").classList.add("error");
                msgName[2].classList.add("error");
                msgNamePhone[2].classList.add("error");
            } else {
                document.querySelector("input[name='Email']").classList.remove("error");
                msgName[2].classList.remove("error");
                msgNamePhone[2].classList.remove("error");
            }
            // 驗證表單的區域
            if (formData.country == "所在區域") {
                document.querySelector("select[name='Country']").classList.add("error");
                msgName[3].classList.add("error");
                msgNamePhone[3].classList.add("error");
                checkCountry = false;
            } else {
                document.querySelector("select[name='Country']").classList.remove("error");
                msgName[3].classList.remove("error");
                msgNamePhone[3].classList.remove("error");
                checkCountry = true;
            }
            // 驗證表單的洽談事項
            if (formData.contents == "") {
                document.querySelector("textarea").classList.add("error");
                msgName[4].classList.add("error");
                msgNamePhone[4].classList.add("error");
                checkContents = false;
            } else {
                document.querySelector("textarea").classList.remove("error");
                msgName[4].classList.remove("error");
                msgNamePhone[4].classList.remove("error");
                checkContents = true;
            }
            if (checkName && checkTel && checkEmail && checkCountry && checkContents) {
                console.log("表單資料：", formData);
                isOK.value = true;
            }
        };
        const resetForm = () => {
            myForm.value.reset();
            formData.name = "";
            formData.tel = "";
            formData.email = "";
            formData.country = "所在區域";
            formData.contents = "";
        }

        return {
            formData, myForm,
            submit, resetForm,
            isOK
        };
    }
}
</script>

<template>
    <div class="blank"></div>
    <div class="container">
        <h1>聯絡我們</h1>
        <div class="info-wrap">
            <div class="info">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                </svg>
                <a href="tel:0800007188" class="cursor">0800-700-881</a>
            </div>
            <p>如有任何疑問請隨時與我們聯繫</p>
        </div>
        <div v-show="!isOK" class="form-wrap">
            <form ref="myForm">
                <!-- 姓名 -->
                <div class="error-wrap">
                    <span class="errorMsg">* 請輸入2~4個中文字</span>
                    <span class="errorMsg errorMsg-right">* 請輸入10位數字，且開頭為0</span>
                </div>
                <div class="phone-error">
                    <span class="errorMsgPhone">* 請輸入2~4個中文字</span>
                </div>
                <input type="text" name="Name" v-model="formData.name" placeholder="姓名" required>

                <!-- 手機號碼 -->
                <div class="phone-error">
                    <span class="errorMsgPhone">* 請輸入10位數字，且開頭為0</span>
                </div>
                <input type="phone" name="Tel" v-model="formData.tel" placeholder="手機號碼" required>

                <!-- 電子信箱 -->
                <div class="error-wrap">
                    <span class="errorMsg">* 電子信箱格式不符！</span>
                    <span class="errorMsg errorMsg-right">* 請選擇所在區域</span>
                </div>
                <div class="phone-error">
                    <span class="errorMsgPhone">* 電子信箱格式不符！</span>
                </div>
                <input type="email" name="Email" v-model="formData.email" placeholder="電子信箱">

                <!-- 所在區域 -->
                <div class="phone-error">
                    <span class="errorMsgPhone">* 請選擇所在區域</span>
                </div>
                <select name="Country" v-model="formData.country">
                    <option value="所在區域">所在區域</option>
                    <option value="台北市">台北市</option>
                    <option value="基隆市">基隆市</option>
                    <option value="新北市">新北市</option>                    
                    <option value="宜蘭縣">宜蘭縣</option>                    
                    <option value="桃園市">桃園市</option>                    
                    <option value="新竹市">新竹市</option>                    
                    <option value="新竹縣">新竹縣</option>                   
                    <option value="苗栗縣">苗栗縣</option>                    
                    <option value="台中市">台中市</option>                    
                    <option value="彰化縣">彰化縣</option>                    
                    <option value="南投縣">南投縣</option>                    
                    <option value="嘉義市">嘉義市</option>                    
                    <option value="嘉義縣">嘉義縣</option>                    
                    <option value="雲林縣">雲林縣</option>                    
                    <option value="台南市">台南市</option>                    
                    <option value="高雄市">高雄市</option>                    
                    <option value="屏東縣">屏東縣</option>                    
                    <option value="花蓮縣">花蓮縣</option>                    
                    <option value="台東縣">台東縣</option>                    
                    <option value="澎湖縣">澎湖縣</option>
                </select>

                <!-- 洽詢事項 -->
                <div class="error-wrap">
                    <span class="errorMsg">* 請輸入內容！</span>
                </div>
                <div class="phone-error">
                    <span class="errorMsgPhone">* 請輸入內容！</span>
                </div>
                <textarea name="Contents" id="contents" v-model.trim="formData.contents" cols="30" rows="10" placeholder="洽詢事項" required></textarea>
                <!-- <input type="text" name="authcode" placeholder="驗證碼"> -->
                
            </form>
            <div class="btn-wrap">
                <button @click="resetForm" type="reset">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
                    </svg>
                    重新填寫
                </button>
                <button @click="submit">送出</button>
            </div>
        </div>
        <div v-show="isOK" class="response-wrap">
            <h2>感謝填寫，請在7個工作天內確認您的信箱！</h2>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .blank {
        height: 83px;
    }
    .container {
        h1 {
            font-size: 32px;
            text-align: center;
            margin: 30px 0;
        }
        .info-wrap {
            max-width: 744px;
            margin: 0 auto;
            padding: 24px 20px;
            background-color: #f3f5f9;
            border-radius: 20px;
            text-align: center;

            p {
                color: #707a8a;
                opacity: .7;
                margin-bottom: 0;
            }
            .info {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 32px;

                svg {
                    margin-right: 10px;
                }
                .cursor:hover {
                    color: #777;
                    cursor: pointer;
                }
            }
        }
        .form-wrap {
            margin: 30px 278px;

            input, select {
                width: 49%;
                height: 44px;
                margin-bottom: 24px;
                padding: 0 16px;
                border: 1px solid #707a8a;
                border-radius: 16px;
                outline: none;
                color: #707a8a;
            }
            input[name="Tel"],select[name="Country"] {
                margin-left: calc(2%);
            }
            select {
                appearance: none;
                background: url("https://www.youngman.com.tw/images/arrow.png") no-repeat scroll center transparent;
                background-size: 10px;
                background-position: right 16px bottom 50%;
            }
            textarea {
                width: 100%;
                height: 100px;
                margin-bottom: 24px;
                padding: 14px 16px;
                border-radius: 16px;
                outline: none;
                color: #707a8a;
            }
            .btn-wrap {
                text-align: right;

                button {
                    width: 120px;
                    height: 44px;
                    border: 0;
                    border-radius: 16px;
                    font-weight: 600;

                    &:first-child {
                        background-color: transparent;
                        &:hover {
                            background-color: #000;
                            color: #fff;
                        }
                    }
                    &:last-child {
                        background-color: #000;
                        color: #fff;
                        margin-left: 10px;
                        &:hover {
                            background-color: #e10303;
                            color: #fff;
                        }
                    }
                }
            }

            // 當輸入內容驗證錯誤時的樣式
            .error {
                border: 1px solid red;
            }
            .error-wrap {
                margin-top: 10px;
                position: relative;

                .errorMsg {
                    display: none;
                    color: red;

                    position: absolute;
                    left: 0;
                    bottom: 0;
                }
                .errorMsg-right {
                    position: absolute;
                    left: 50%;
                    bottom: 0;
                }
                .errorMsg.error {
                    display: inline-block;
                    width: 50%;
                    border: none;

                }
            }
            .phone-error {
                display: none;
            }
        }
        .response-wrap {
            height: 330px;
            margin: 30px 278px;
            box-sizing: border-box;
            text-align: center;

            h2 {
                line-height: 330px;
                margin-bottom: 0;
            }
        }
    }

    // 手機版
	@media screen and (min-width: 0px) and (max-width: 490px) {
        .blank {
            height: 40px;
        }
        .container {
            h1 {
                font-size: 30px;
                text-align: left;
                margin: 25px 0 15px 0;
            }
            .info-wrap {
                .info {
                    font-size: 26px;
                }
                p {
                    opacity: 1;
                }
            }
            .form-wrap {
                margin: 20px 0;
                
                input, select {
                    width: 100%;
                    margin-bottom: 25px;
                }
                input[name="Tel"],select[name="Country"] {
                    margin-left: 0;
                }
                textarea {
                    margin-bottom: 15px;
                }
                .error-wrap {
                    display: none;
                }
                .phone-error {
                    display: block;
                    color: red;
                    text-indent: .5rem;
                    position: relative;
                    
                    span {
                        border: none;
                        font-size: 14px;
                    }
                    .errorMsgPhone {
                        display: none;
                        color: red;
                        position: absolute;
                        left: 0;
                        bottom: -2px;
                    }
                    .errorMsgPhone.error {
                        display: inline-block;
                        width: 100%;
                        border: none;
                    }
                }
                .btn-wrap {
                    button {
                        width: 100%;

                        &:first-child {
                            color: #3ba5e7;
                            border: 1px solid #a5cee8;
                            &:hover {
                                background-color: #3ba5e7;
                                color: #fff;
                            }
                        }
                        &:last-child {
                            margin-left: 0;
                            margin-top: 10px;
                            background-color: #e10303;
                        }
                    }
                    
                }
            }
            .response-wrap {
                margin: 0;
                display: flex;
                align-items: center;

                h2 {
                    line-height: normal;
                }
            }
        }
    }
</style>