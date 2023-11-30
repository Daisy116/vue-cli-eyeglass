<script>
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { onMounted, reactive, ref, watch } from 'vue';
import axios from "axios";
import $ from 'jquery';

export default {
    setup() {
        const route = useRoute();
        const { t, locale } = useI18n();

        const product = reactive({data: {}});  // 要呈現到畫面上的資料
        const allDate = reactive({data: {}});  // 儲存所有資料
        const isLoading = ref(true);
        const page = ref(1);     // 目前頁數
        const maxPage = ref(1);  // 總頁數

        onMounted(() => {
            axios.get(`https://run.mocky.io/v3/49442545-7350-4bba-ac64-929c1e50d049`)
            // https://run.mocky.io/v3/316138d0-16b6-441e-82e5-7bc2c8472ec7
            .then(res => {
                // 儲存原始資料，在watch時使用
                allDate.data = res.data;

                // 初始化輸出到畫面的資料
                product.data = allDate.data[route.params.id];
                product.title = allDate.data["sort"][route.params.id];

                // 當資料超過9筆、且PC版時，第一頁只顯示前9筆資料
                if (allDate.data[route.params.id].length > 9 && screen.width > 490) {
                    product.filterData = [];
                    for (let i = 0; i < allDate.data[route.params.id].length; i+=9) {
                        product.filterData.push(allDate.data[route.params.id].slice(i, i+9))
                    }
                    product.data = product.filterData[0];

                    // 總共有幾頁
                    maxPage.value = product.filterData.length;
                } else {
                    product.filterData = [];
                    product.filterData.push(allDate.data[route.params.id]);
                }

                // 將loading動畫關掉
                isLoading.value = !isLoading.value;
            })
        });

        // 點擊愛心
        const goLike = (idx) => {
            let styles = $(".bi-suit-heart-fill")[idx].style;
            styles.setProperty("display", "block");
        }
        // 移除愛心
        const removeLike = (idx) => {
            let styles = $(".bi-suit-heart-fill")[idx].style;
            styles.removeProperty("display");
        }
        // 點擊上一頁
        const prePage = () => {
            page.value--;
            if (page.value < 1) {
                page.value = 1;
            }

            product.data = product.filterData[page.value - 1];
        }
        // 點擊下一頁
        const nextPage = () => {
            page.value++;
            if (page.value > maxPage.value) {
                page.value = maxPage.value;
            }
            
            product.data = product.filterData[page.value - 1];
        }

        // 用 watch 監控網址
        watch(
        ()=> route.path, // 第一個參數帶要監控的變數，這裡監控route.path
        (newA, oldA)=> {
            // 當router的路徑改變，輸出到畫面的資料也要改變
            product.title = allDate.data["sort"][route.params.id];
            product.data = allDate.data[route.params.id];

            // 當資料超過8筆時，第一頁只顯示前9筆資料
            if (product.data.length > 9) {
                product.filterData = [];
                for (let i = 0; i < allDate.data[route.params.id].length; i+=9) {
                    product.filterData.push(allDate.data[route.params.id].slice(i, i+9))
                }
                product.data = product.filterData[0];

                // 總共有幾頁
                maxPage.value = product.filterData.length;
            } else {
                maxPage.value = 1;
                product.filterData = [];
                product.filterData.push(allDate.data[route.params.id]);
            }
            // 回到第一頁
            page.value = 1;
        }
        );
        watch(locale, (newlocale) => {
            localStorage.setItem("locale", newlocale);
        });

        return { 
            product, page, maxPage,
            isLoading,
            goLike, removeLike,
            prePage, nextPage,
            t, locale,
        };
    }
}
</script>

<template>
    <div class="blank"></div>

    <div class="container">
        <!-- 左側產品選單 -->
        <div class="sidebar">
            <!-- 保健＆週邊 -->
            <h3>{{ t("footer-health") }}</h3>
            <ul>
                <li>
                    <router-link to="/product/F0001">{{ t("footer-health1") }}</router-link>
                </li>
                <li>
                    <router-link to="/product/F0002">{{ t("footer-health2") }}</router-link>
                </li>
            </ul>

            <!-- 有框眼鏡 -->
            <h3>{{ t("navbar-glasses") }}</h3>
            <ul>
                <li>
                    <router-link to="/product/E0001">{{ t("navbar-glasses1") }}</router-link>
                </li>
            </ul>

            <!-- 隱形眼鏡 -->
            <h3>{{ t("navbar-hidden") }}</h3>
            <ul>
                <li>
                    <router-link to="/product/C0001">{{ t("hidden-glasses1") }}</router-link>
                    <router-link to="/product/C0002">{{ t("hidden-glasses2") }}</router-link>
                    <router-link to="/product/C0003">{{ t("hidden-glasses3") }}</router-link>
                    <router-link to="/product/C0004">{{ t("hidden-glasses4") }}</router-link>
                    <router-link to="/product/C0005">{{ t("hidden-glasses5") }}</router-link>
                    <router-link to="/product/C0006">{{ t("hidden-glasses6") }}</router-link>
                    <router-link to="/product/C0007">{{ t("hidden-glasses7") }}</router-link>
                    <router-link to="/product/C0008">{{ t("hidden-glasses8") }}</router-link>
                    <router-link to="/product/C0009">{{ t("hidden-glasses9") }}</router-link>
                    <router-link to="/product/C0010">{{ t("hidden-glasses10") }}</router-link>
                    <router-link to="/product/C0011">{{ t("hidden-glasses11") }}</router-link>
                    <router-link to="/product/C0012">{{ t("hidden-glasses12") }}</router-link>
                </li>
            </ul>
        </div>
        <!-- 右側PC產品列表 -->
        <div class="main-list">
            <!-- loading的svg -->
            <svg class="loading" v-show="isLoading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <path d="M10 50A40 40 0 0 0 90 50A40 44.5 0 0 1 10 50" fill="#e15b64" stroke="none">
                <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 52.25;360 50 52.25"></animateTransform>
                </path>
            </svg>

            <h1>{{ product.title }}</h1>
            <ul class="product-box" >
                <li v-for="(item, idx) in product.data" :key="item.PID">
                    <div class="img-box">
                        <svg @click="goLike(idx)"
                            xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#b7bdc6" class="bi bi-suit-heart" viewBox="0 0 16 16">
                            <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
                        </svg>
                        <svg @click="removeLike(idx)" 
                            xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#b7bdc6" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                            <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                        </svg>
                        <router-link :to="`/product_detail/${item.PID}`">
                            <img :src="require(`../assets/images/${item.img}`)">
                        </router-link>
                    </div>
                    <div class="content">
                        <h4>{{ item.title }}</h4>
                        <p>
                            <span>{{ item.amount }}</span>
                            <span>{{ item.price }}</span>
                        </p>
                    </div>
                </li>
            </ul>

            <div class="page-wrap" v-show="!isLoading">
                <ul>
                    <li class="page-button" @click="prePage">
                        <a href="javascript:;">&lt;</a>
                    </li>
                    <li>
                        <span>{{ page }}</span>
                    </li>
                    <li class="page-button" @click="nextPage">
                        <a href="javascript:;">&gt;</a>
                    </li>
                    <span class="max-page">(共 {{ maxPage }} 頁)</span>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .blank {
        height: 83px;
    }
    .container {
        // 最大寬度用initial(預設)！！
        max-width: initial;
        margin-right: 0;
        margin-left: 0;
        padding: 0 15px;
        display: flex;

        h1 {
            font-size: 32px;
            font-weight: 700;
            margin-left: 10px;
            padding: 30px 0;
        }
        h3 {
            font-size: 24px;
            font-weight: 600;
            color: black;
        }
        h4 {
            font-size: 20px;
            font-weight: 500;
            text-align: start;
        }
        .sidebar {
            width: 300px;
            height: 100vh;
            padding: 30px 20px;
            box-shadow: 10px 0px 10px -5px rgba(0, 0, 0, 0.3);

            position: fixed;
            z-index: 90;
            top: 84px;
            transform: translateX(-15px);

            >ul {
                margin-top: 10px;

                a {
                    display: block;
                    width: 90%;
                    color: black;
                    font-size: 18px;
                    &:hover {
                        text-shadow: 3px 3px 3px rgb(206 198 102);
                    }
                }
                a.router-link-active {
                    color: rgb(255, 145, 0);
                    font-weight: 700;
                }
            }
        }
        .main-list {
            width: 100%;
            margin-left: 300px;

            .product-box {
                max-width: 2150px;
                min-height: 620px;
                padding-left: 0;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;

                >li {
                    width: 400px;
                    margin: auto;
                }
                .img-box {
                    position: relative;
                    box-sizing: border-box;
                    
                    // 防止連點時發生反白
                    user-select: none;

                    div {
                        border: 1px solid #e5e5e5;
                        border-radius: 16px;
                        overflow: hidden;
                    }
                    a {
                        display: block;
                        height: 100%;
                    }
                    .bi-suit-heart-fill {
                        display: none;
                        fill: red;
                    }
                }
                .img-box:hover {
                    cursor: pointer;
                    box-shadow: 10px 10px 20px rgba(229, 229, 229, 0.7607843137), 
                                -10px -10px 20px rgba(229, 229, 229, 0.7607843137);

                    img {
                        transform: scale(1);
                    }
                }
                .bi:hover { 
                    fill: red;
                }
                svg {
                    display: block;
                    position: absolute;
                    top: 24px;
                    right: 24px;
                    z-index: 10;
                }
                img {
                    width: 100%;
                    transform: scale(1.05);
                    vertical-align: middle;
                    transition: all .5s linear;
                    position: relative;
                    z-index: -1;
                }
                .content {
                    padding: 10px 20px;
                    font-weight: bolder;

                    p span{
                        margin: 0;
                        font-weight: 300;

                        &:last-child {
                            font-size: 18px;
                            color: blue;
                            display: block;
                        }
                    }
                }
            }
            .page-wrap {
                width: 100%;
                margin: 50px 0;
                font-size: 22px;
                text-align: center;

                >ul {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding-left: 0;

                    >li {
                        width: 40px;
                        height: 40px;
                        line-height: 40px;
                        cursor: pointer;

                        a {
                            color: black;
                        }
                        span {
                            color: red;
                        }
                    }
                    .max-page {
                        font-size: 16px;
                        opacity: .5;
                    }
                    .page-button:hover {
                        background-color: #e9ecef;

                        a {
                            color: rgba(255, 0, 0, 0.5);
                        }
                    }
                }
            }
            .loading {
                display:block;
                max-height: 800px;
                margin: 0 auto;
                padding: 200px 0;
                background:#fff;
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
                padding-bottom: 15px;
                font-size: 26px;
            }
            h4 {
                min-height: 43px;
                font-size: 18px;
                margin-bottom: 5px;
            }
            .sidebar {
                display: none;
            }
            .main-list {
                margin-left: 0;

                .product-box {
                    max-width: 360px;
                    min-height: 380px;
                    padding-left: 0;
                    margin: 0;
                    grid-template-columns: 1fr 1fr;

                    li {
                        width: 500px;
                        max-width: 180px;
                        padding: 5px;
                        margin-right: 0;
                        position: relative;
                    }
                    .img-box {
                        svg {
                            top: 10px;
                            right: 10px;
                            width: 25px;
                            height: 25px;
                        }
                    }
                    .content {
                        height: 35%;
                        padding-bottom: 0;

                        p span{
                            margin: 0;
                            font-weight: 300;

                            &:last-child {
                                font-size: 16px;
                                color: blue;
                                float: inline-end;
                            }
                        }
                    }
                }
                .page-wrap {
                    // 手機版不要有分頁，全部放同一頁(一直往下拉)
                    display: none;
                    // margin: 0;

                    // ul {
                    //     padding-left: 0;
                    //     margin: 10px 0;
                    //     transform: translateX(0);
                    // }
                }
                .loading {
                    height: 250px;
                    padding: 0;
                    margin: 100px auto;
                    transform: translateX(0);
                }
            }
        }
    }
</style>