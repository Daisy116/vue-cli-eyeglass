<script>
import { onMounted, ref, watch } from 'vue';
export default {
    setup() {
        // 原始(以及要儲存的資料)
        const userData = ref(JSON.parse(localStorage.getItem("userData")));
        // 編輯中的資料
        const modifyData = ref("");

        const mode = ref("0");  // 1代表修改會員資料，2代表修改密碼

        let ul_box = null;
        let modify_div = null;
        let buttom_div = null;
        let input = null;
        let radio = null;
        let label = null;
        let span = null;

        onMounted(() => {
            modifyData.value = Object.assign({}, userData.value);

            input = document.querySelectorAll("input[type=text]");
            radio = document.querySelector(".sex-group");
            label = document.querySelectorAll(".sex-group label");
            span = document.querySelector("#hint");

            ul_box = document.querySelectorAll(".member-list");
            ul_box[1].style.display = "none";

            modify_div = document.querySelector(".modify-mode");
            modify_div.style.display = "none";

            buttom_div = document.querySelector(".bottom-wrap");
        });

        // 判斷目前是哪種模式，變動<h1>的文字
        watch(mode, item => {
            if (item == 1) {
                document.querySelector("#title").innerText = "修改會員資料";
                return;
            }
            if (item == 2) {
                document.querySelector("#title").innerText = "修改密碼";
                return;
            }
            document.querySelector("#title").innerText = "會員資料";
        })

        function modifyCancel() {
            // 將唯讀屬性打開，移除綠色css
            input[2].readOnly = true;
            input[2].classList.remove("modify");
            input[3].readOnly = true;
            input[3].classList.remove("modify");

            radio.classList.add("read-only");
            label[0].classList.remove("modify");
            label[1].classList.remove("modify");

            // 將編輯模式的按鈕隱藏，打開原本按鈕
            modify_div.style.display = "none"
            buttom_div.style.display = "flex";
        }

        // 點擊「修改會員資料」時，將欄位改成not readOnly
        const changeData = () => {
            mode.value = 1;

            input[2].readOnly = false;  // 姓名欄位可以調整
            input[2].classList.add("modify");
            input[3].readOnly = false;  // 手機號碼欄位可以調整
            input[3].classList.add("modify");
            
            radio.classList.remove("read-only");
            label[0].classList.add("modify");
            label[1].classList.add("modify");

            // 將原本按鈕隱藏，打開編輯模式的按鈕
            buttom_div.style.display = "none";
            modify_div.style.display = "block";

            span.innerText = "* 顯示綠色的欄位代表可編輯。";
            span.style.color = "darkgreen";
        }
        // 點擊「返回(取消)」按鈕
        const changeCancel = () => {
            mode.value = 0;

            // 將密碼div隱藏，打開會員資料div
            ul_box[1].style.display = "none";
            ul_box[0].style.display = "block";
            modifyCancel();

            modifyData.value.name = userData.value.name;
            modifyData.value.tel = userData.value.tel;
            modifyData.value.sex = userData.value.sex;

        }
        // 點擊「確定修改」按鈕
        const changeComfirm = () => {
            // 更改會員資料的部分
            if (mode.value == 1) {
                userData.value.name = modifyData.value.name;
                userData.value.tel = modifyData.value.tel;
                userData.value.sex = modifyData.value.sex;

                span.innerText = "* 修改成功，儲存中請稍候";
                span.style.color = "darkgreen";

                // 啟動進度條transition
                document.querySelector(".headProgress").style.width = "100%"
            }


            // 更改密碼的部分
            if (mode.value == 2) {
                if (!input[4].value || !input[5].value || !input[6].value) {
                    span.innerText = "* 欄位不得為空";
                    span.style.color = "red";
                    return;
                }
                if (input[4].value != userData.value.pwd) {
                    span.innerText = "* 舊密碼輸入錯誤";
                    span.style.color = "red";
                    return;
                }
                if (input[5].value != input[6].value) {
                    span.innerText = "* 新舊密碼不一致";
                    span.style.color = "red";
                    return;
                }
                span.innerText = "* 修改成功，儲存中請稍候";
                span.style.color = "darkgreen";

                // 啟動進度條transition
                document.querySelector(".headProgress").style.width = "100%"

                // 會員資料ul隱藏，密碼ul打開
                ul_box[0].style.display = "block";
                ul_box[1].style.display = "none";

                userData.value.pwd = input[5].value;
            }

            setTimeout(() => {
                modifyCancel();
                document.querySelector(".headProgress").style.display = "none"
            }, 1500);
        }

        // 點擊「修改密碼」按鈕
        const changePwd = () => {
            mode.value = 2;

            // 會員資料ul隱藏，密碼ul打開
            ul_box[0].style.display = "none";
            ul_box[1].style.display = "block";

            // 將編輯模式的按鈕隱藏，打開原本按鈕
            modify_div.style.display = "block";
            buttom_div.style.display = "none";

            span.innerText = "";
        }

        return {
            userData, modifyData,
            changeData, changeCancel, changeComfirm,
            changePwd
        }
    }
}
</script>

<template>
    <div class="blank"></div>
    <div class="headProgress"></div>

    <div class="sidebar">
        <ul>
            <li class="active">
                <a href="">會員資料</a>
            </li>
            <li>
                <a href="">我的收藏</a>
            </li>
            <li>
                <a href="">購物車清單</a>
            </li>
            <li>
                <a href="">登出</a>
            </li>
        </ul>
    </div>

    <div class="container">
        <h1 id="title">會員資料</h1>
        <!-- check seesion資料：{{ userData }} <br />
        check 更改中資料：{{ modifyData }} -->

        <ul class="member-list">
            <li>
                <label for="">會員編號</label>
                <input type="text" :value="userData.id" readonly="">
            </li>
            <li>
                <label for="">姓名</label>
                <input type="text" name="Name" v-model.lazy="modifyData.name" readonly="">
            </li>
            <li>
                <div class="sex-group read-only">
                    <div>
                        <input type="radio" id="radio1" name="sex" value="M" v-model="modifyData.sex" readonly>
                        <label for="radio1">男性</label>
                    </div>
                    <div>
                        <input type="radio" id="radio2" name="sex" value="F" v-model="modifyData.sex" readonly>
                        <label for="radio2">女性</label>
                    </div>
                </div>
            </li>
            <li>
                <label for="">手機號碼</label>
                <input type="text" v-model.lazy="modifyData.tel" readonly="">
            </li>
        </ul>
        <ul class="member-list">
            <li class="old-pwd">
                <label for="">舊密碼</label>
                <input type="text" placeholder="請輸入舊密碼">
            </li>
            <li>
                <label for="">新密碼</label>
                <input type="text" placeholder="請輸入新密碼">
            </li>
            <li>
                <label for="">再次確認新密碼</label>
                <input type="text" placeholder="請再次輸入新密碼">
            </li>
        </ul>
        <div class="bottom-wrap">
            <div class="left-bottom">
                <button type="button" name="fb">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>
                    綁定facebook帳號
                </button>
                <button type="button" name="line">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-line" viewBox="0 0 16 16">
                        <path d="M8 0c4.411 0 8 2.912 8 6.492 0 1.433-.555 2.723-1.715 3.994-1.678 1.932-5.431 4.285-6.285 4.645-.83.35-.734-.197-.696-.413l.003-.018.114-.685c.027-.204.055-.521-.026-.723-.09-.223-.444-.339-.704-.395C2.846 12.39 0 9.701 0 6.492 0 2.912 3.59 0 8 0ZM5.022 7.686H3.497V4.918a.156.156 0 0 0-.155-.156H2.78a.156.156 0 0 0-.156.156v3.486c0 .041.017.08.044.107v.001l.002.002.002.002a.154.154 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157Zm.791-2.924a.156.156 0 0 0-.156.156v3.486c0 .086.07.155.156.155h.562c.086 0 .155-.07.155-.155V4.918a.156.156 0 0 0-.155-.156h-.562Zm3.863 0a.156.156 0 0 0-.156.156v2.07L7.923 4.832a.17.17 0 0 0-.013-.015v-.001a.139.139 0 0 0-.01-.01l-.003-.003a.092.092 0 0 0-.011-.009h-.001L7.88 4.79l-.003-.002a.029.029 0 0 0-.005-.003l-.008-.005h-.002l-.003-.002-.01-.004-.004-.002a.093.093 0 0 0-.01-.003h-.002l-.003-.001-.009-.002h-.006l-.003-.001h-.004l-.002-.001h-.574a.156.156 0 0 0-.156.155v3.486c0 .086.07.155.156.155h.56c.087 0 .157-.07.157-.155v-2.07l1.6 2.16a.154.154 0 0 0 .039.038l.001.001.01.006.004.002a.066.066 0 0 0 .008.004l.007.003.005.002a.168.168 0 0 0 .01.003h.003a.155.155 0 0 0 .04.006h.56c.087 0 .157-.07.157-.155V4.918a.156.156 0 0 0-.156-.156h-.561Zm3.815.717v-.56a.156.156 0 0 0-.155-.157h-2.242a.155.155 0 0 0-.108.044h-.001l-.001.002-.002.003a.155.155 0 0 0-.044.107v3.486c0 .041.017.08.044.107l.002.003.002.002a.155.155 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156Z"/>
                    </svg>
                    綁定line帳號
                </button>
            </div>
            <div class="right-bottom">
                <a @click="changeData">修改會員資料</a>
                <a @click="changePwd">修改密碼</a>
            </div>
        </div>
        <div class="modify-mode">
            <span id="hint">* 顯示綠色的欄位代表可編輯。</span>
            <a @click="changeCancel">返回(取消)</a>
            <a @click="changeComfirm">確定修改</a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    * {
        padding: 0;
        margin: 0;
    }
    .blank {
        height: 83px;
    }
    .sidebar {
        position: absolute;
        left: 0;
        top: 113px;
        font-size: 18px;

        li {
            width: 200px;
            border-left: solid 5px transparent;

            &:last-child {
                margin-top: 45px;
            }
            &:hover {
                background: #f3f5f9;
            }
            &.active {
                font-weight: 700;
                border-color: #000;
            }
            a {
                padding: 10px 20px;
                display: block;
            }
        }
    }
    .container {
        max-width: 980px;
        min-height: 850px;
        margin: auto;
        padding-top: 30px;
        padding-bottom: 30px;

        .member-list {
            margin: 30px 0;
            border-bottom: 1px solid #e5e5e5;

            li {
                width: 300px;
                margin: 0 20px 20px 0;
                float: left;
                position: relative;

                >label {
                    padding: 5px;
                    font-size: 15px;
                    background: #fff;
                    position: absolute;
                    top: -17px;
                    left: 10px;
                }
                input[type="text"] {
                    width: 100%;
                    padding: 15px;
                    border: 1px solid #9da6b7;
                    border-radius: 16px;                    

                    &:focus-within {
                        outline: none;
                    }
                    &.modify {
                        border-color: darkseagreen;
                        box-shadow: 1px 1px 10px 2px rgba(143, 188, 143, 0.5), 
                                    -1px -1px 10px 2px rgba(143, 188, 143, 0.5);
                    }
                }
                .sex-group {
                    width: 50%;
                    height: 54px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;

                    input[type="radio"] {
                        width: 25px;
                        height: 15px;
                    }
                    label.modify {
                        text-shadow: 3px 3px 7px rgba(143, 188, 143, 0.5), -3px -3px 7px rgba(143, 188, 143, 0.5);
                    }
                    &.read-only {
                        pointer-events: none;
                    }
                }
            }
            li.old-pwd {
                float: none;
            }
            // 在<ul>的::after清除float，這樣border-bottom才會正常在ul下面！
            &::after {
                content: '';
                display: block;
                clear: both;
            }
        }
        .bottom-wrap {
            display: flex;

            .left-bottom {
                display: flex;
    
                button {
                    width: 200px;
                    line-height: 44px;
                    border-radius: 16px;
                    background-color: transparent;
                    display: flex;
                    align-items: center;
                    justify-content: center;
        
                    svg {
                        margin-right: 5px;
                    }
                }
                button+button {
                    margin-left: 15px;
                }
                button[name=fb] {
                    border: 1px solid #1877f2;
                    color: #1877f2;

                    &:hover {
                        background-color: #1877f2;
                        color: white;
                    }
                }
                button[name=line] {
                    border: 1px solid #51a61b;
                    color: #51a61b;

                    &:hover {
                        background-color: #51a61b;
                        color: white;
                    }
                }
            }
            .right-bottom {
                width: 100%;
                text-align: end;
            }
        }
        .modify-mode {
            text-align: right;

            span {
                color: darkgreen;
                float: left;
            }
        }
        a {
            display: inline-block;
            width: 160px;
            line-height: 44px;
            text-align: center;
            border: 1px solid black;
            border-radius: 16px;
            color: black;
            font-weight: 500;

            &:hover {
                cursor: pointer;
                background-color: black;
                color: white;
            }
        }
        a+a {
            margin-left: 15px;
        }
    }

    .headProgress {
        display: block;
        width: 0%;
        height: 5px;
        background-color: lightgreen;
        transition: width 1.5s;
    }

    // 手機版
    @media screen and (min-width: 0px) and (max-width: 490px) {
        .blank {
            height: 40px;
        }
    }
</style>