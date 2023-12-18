<script>
import { onMounted, ref, watch, nextTick } from 'vue';
import Myfavorite from "@/components/Myfavorite.vue";
import ShoppingCart from "@/components/ShoppingCart.vue";
import { useRouter } from 'vue-router';

// 使用CryptoJS的AES加密、encUtf8解密
import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';

export default {
    components: {
        Myfavorite,
        ShoppingCart
    },
    setup() {
        const router = useRouter();
        
        // 解密localStorage裡的會員資料
        const bytes = AES.decrypt(localStorage.getItem("userData"), '1234AAA');
        const originalText = bytes.toString(encUtf8);
        const userData = ref(JSON.parse(originalText));

        const modifyData = ref("");  // 編輯中的資料
        const dataList = ref(null);
        const pwdList = ref(null);

        const page = ref("1");  // 1代表會員資料，2代表我的收藏，3代表購物車清單
        const mode = ref("0");  // 1代表修改會員資料，2代表修改密碼
        const notModifyMode = ref(null);
        const modifyMode = ref(null);
        const sexData = ref(null);
        const hint = ref(null);
        const sideBar = ref(null);

        let input = null;
        let label = null;

        onMounted(() => {
            // 從userData複製一個新物件，用來存編輯中、未儲存的資料
            modifyData.value = Object.assign({}, userData.value);

            input = document.querySelectorAll("input[type=text]");
            label = document.querySelectorAll(".sex-group label");

            pwdList.value.style.display = "none";
            modifyMode.value.style.display = "none";
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
            if (item == 0) {
                document.querySelector("#title").innerText = "會員資料";
            }

            document.querySelector(".headProgress").style.width = "0%";
        })

        function modifyCancel() {
            // 將唯讀屬性打開，移除綠色css
            input[2].readOnly = true;
            input[2].classList.remove("modify");
            input[3].readOnly = true;
            input[3].classList.remove("modify");

            sexData.value.classList.add("read-only");
            label[0].classList.remove("modify");
            label[1].classList.remove("modify");

            // 將編輯模式的按鈕隱藏，打開原本按鈕
            modifyMode.value.style.display = "none"
            
            if (screen.width < 490) {
                // 若當前螢幕大小為手機版
                notModifyMode.value.style.display = "block";
            } else {
                // 若當前螢幕大小為PC版
                notModifyMode.value.style.display = "flex";
            }
        }
        function clearInput() {
            input[4].value = "";
            input[5].value = "";
            input[6].value = "";
        }
        async function vIF() {
            // 因為有用v-if切換頁面，所以需要使用Vue的nextTick()讓 DOM 更新
            await nextTick()
            input = document.querySelectorAll("input[type=text]");
            label = document.querySelectorAll(".sex-group label");

            input[2].readOnly = false;  // 姓名欄位可以調整
            input[2].classList.add("modify");
            input[3].readOnly = false;  // 手機號碼欄位可以調整
            input[3].classList.add("modify");

            sexData.value.classList.remove("read-only");
            label[0].classList.add("modify");
            label[1].classList.add("modify");
        }

        // 點擊「修改會員資料」時，將欄位改成not readOnly
        const changeData = () => {
            mode.value = 1;
            document.querySelector(".headProgress").style.display = "block";

            vIF();            

            // 將原本按鈕隱藏，打開編輯模式的按鈕
            notModifyMode.value.style.display = "none";
            modifyMode.value.style.display = "block";

            hint.value.innerText = "* 顯示綠色的欄位代表可編輯。";
            hint.value.style.color = "darkgreen";
        }
        // 點擊「返回(取消)」按鈕
        const changeCancel = () => {
            mode.value = 0;

            // 將密碼div隱藏，打開會員資料div
            pwdList.value.style.display = "none";
            
            if (screen.width < 490) {
                // 若當前螢幕大小為手機版
                dataList.value.style.display = "flex";
            } else {
                // 若當前螢幕大小為PC版
                dataList.value.style.display = "block";
            }

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

                // 用localStorage儲存加密後的會員資料
                const ciphertext = AES.encrypt(JSON.stringify(userData.value), '1234AAA').toString();
                localStorage.setItem("userData", ciphertext);
                

                hint.value.innerText = "* 修改成功，儲存中請稍候";
                hint.value.style.color = "darkgreen";

                // 啟動進度條transition
                document.querySelector(".headProgress").style.display = "block";
                document.querySelector(".headProgress").style.width = "100%";

                setTimeout(() => {
                    modifyCancel();
                    mode.value = 0;
                    document.querySelector("#title").innerText = "會員資料";
                    document.querySelector(".headProgress").style.display = "none";
                    document.querySelector(".headProgress").style.width = "0%"
                }, 1500);
            }


            // 更改密碼的部分
            if (mode.value == 2) {
                if (!input[4].value || !input[5].value || !input[6].value) {
                    hint.value.innerText = "* 欄位不得為空";
                    hint.value.style.color = "red";
                    return;
                }
                if (input[4].value != userData.value.pwd) {
                    hint.value.innerText = "* 舊密碼輸入錯誤";
                    hint.value.style.color = "red";
                    return;
                }
                if (input[5].value != input[6].value) {
                    hint.value.innerText = "* 新舊密碼不一致";
                    hint.value.style.color = "red";
                    return;
                }
                hint.value.innerText = "* 修改成功，儲存中請稍候";
                hint.value.style.color = "darkgreen";

                // 啟動進度條transition
                document.querySelector(".headProgress").style.display = "block";
                document.querySelector(".headProgress").style.width = "100%";

                userData.value.pwd = input[5].value;

                // 用localStorage儲存加密後的會員資料
                const ciphertext = AES.encrypt(JSON.stringify(userData.value), '1234AAA').toString();
                localStorage.setItem("userData", ciphertext);
                
                setTimeout(() => {
                    mode.value = 0;
                    modifyCancel();
                    // 會員資料ul隱藏，密碼ul打開
                    dataList.value.style.display = "block";
                    pwdList.value.style.display = "none";
                    
                    document.querySelector("#title").innerText = "會員資料";
                    document.querySelector(".headProgress").style.display = "none";
                    document.querySelector(".headProgress").style.width = "0%"
                }, 1500);
            }
        }

        // 點擊「修改密碼」按鈕
        const changePwd = () => {
            mode.value = 2;
            document.querySelector(".headProgress").style.display = "block";

            // 清空input裡的文字
            clearInput();

            // 會員資料ul隱藏，密碼ul打開
            dataList.value.style.display = "none";
            pwdList.value.style.display = "block";

            // 將編輯模式的按鈕隱藏，打開原本按鈕
            modifyMode.value.style.display = "block";
            notModifyMode.value.style.display = "none";

            hint.value.innerText = "";
        }

        function changePage(num, e) {
            // 取得sideBar裡面所有的<li>
            sideBar.value.childNodes[0].childNodes.forEach(element => {
                element.classList.remove("active");
            });
            e.currentTarget.classList.add("active");

            page.value = num;
            
            if (num == 4) {
                localStorage.setItem("isLogin", false);
                alert("已登出");

                // 倒轉到首頁之後，刷新頁面(重整isLogin狀態)
                router.push('/');
                setTimeout(()=>{
                    location.reload();
                },100)
            }
        }

        return {
            userData, modifyData,
            dataList, pwdList,
            notModifyMode, modifyMode, sexData, hint, 
            changeData, changePwd, changeCancel, changeComfirm,
            page, changePage, sideBar
        }
    }
}
</script>

<template>
    <div class="blank"></div>
    <div class="headProgress"></div>

    <div ref="sideBar" class="sidebar">
        <ul>
            <li @click="changePage(1, $event)" class="active">
                <a href="javascript:;">會員資料</a>
            </li>
            <li @click="changePage(2, $event)">
                <a href="javascript:;">我的收藏</a>
            </li>
            <li @click="changePage(3, $event)">
                <a href="javascript:;">購物車清單</a>
            </li>
            <li @click="changePage(4, $event)">
                <a href="javascript:;">登出</a>
            </li>
        </ul>
    </div>

    <Myfavorite v-if="page == 2" />
    <ShoppingCart v-if="page == 3" />
    <div v-if="page == 1" class="container">
        <h1 id="title">會員資料</h1>

        <ul ref="dataList" class="member-list">
            <li>
                <label for="">會員編號</label>
                <input type="text" :value="userData.id" readonly="">
            </li>
            <li>
                <label for="">姓名</label>
                <input type="text" name="Name" v-model.lazy="modifyData.name" readonly="">
            </li>
            <li>
                <div ref="sexData" class="sex-group read-only">
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
        <ul ref="pwdList" class="member-list" style="display: none;">
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
        <div ref="notModifyMode" class="bottom-wrap">
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
        <div ref="modifyMode" class="modify-mode">
            <span ref="hint">* 顯示綠色的欄位代表可編輯。</span>
            <a @click="changeCancel">返回(取消)</a>
            <a @click="changeComfirm">確定修改</a>
        </div>
    </div>
    <div v-if="page == 4" class="container">
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
            display: none;
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
        .sidebar {
            // display: none;
            top: 145px;

            ul {
                display: flex;
            }
            li {
                width: 110px;
                border: 1px solid burlywood;
                border-top: solid 5px transparent;
                text-align: center;

                &.active {
                    border-color: burlywood;
                }
                &:last-child {
                    width: auto;
                    height: 45px;
                    margin-top: 0;
                    transform: translate(0px, -50px);
                    border: 0;

                    a {
                        display: initial;
                        color: red;
                    }
                }
                a {
                    padding: 10px;
                    white-space: nowrap;
                }
            }
        }
        .headProgress {
            height: 15px;
        }
        .container {
            min-height: fit-content;
            padding-left: 15px;
            padding-right: 15px;
            padding-bottom: 10px;

            a {
                width: 170px;
            }
            .member-list {
                margin: 60px 0 20px 0;
                border-color: #f4d5d5;
                display: flex;
                flex-direction: column;

                li {
                    margin: 0 0px 20px 0;

                    &:nth-child(3) {
                        order: -1;
                    }
                    .sex-group {
                        height: auto;
                    }
                }
            }
            .bottom-wrap {
                display: block;

                .left-bottom {
                    font-size: 15px;
                    margin-bottom: 15px;

                    button {
                        width: 170px 
                    }
                }
                .right-bottom {
                    text-align: left;
                }
            }
            .modify-mode {
                span {
                    display: block;
                    width: 100%;
                    margin-bottom: 13px;
                    text-align: left;
                }
            }
        }
    }
</style>