<script>
import { onMounted, reactive, ref } from 'vue';
import axios from "axios";

export default {
    setup() {
        const product = reactive({data: {}});  // 放要呈現到畫面上的資料
        const favoriteData = ref(JSON.parse(localStorage.getItem("myFavorite")));  // 我的收藏列表
        const myFavorite = ref([]);            // 暫存的我的收藏
        const isLoading = ref(true);           // 資料未取回之前，放loading SVG圖
        const isData = ref(true);              // 資料取回若為空，放暫無資料 SVG圖

        // 繼承localStorage裡的資料
        myFavorite.value = favoriteData.value;
        if (!myFavorite.value) {
            // 若localStorage裡資料為null，設定空陣列
            myFavorite.value = [];
        }
        
        onMounted(() => {
            axios.get(`https://run.mocky.io/v3/d5117fc0-e5a3-42ce-accc-42bdb4f23431`)
            .then(res => {
                let arr = [];
                myFavorite.value.forEach(element => {
                    res.data["product-detail"][element]["PID"] = element;
                    arr.push(res.data["product-detail"][element]);
                });
                product.data = [...arr];

                // 將loading動畫關掉
                isLoading.value = !isLoading.value;
                // 若有我的收藏，將暫無資料的動畫關掉
                if (myFavorite.value.length != 0) {
                    isData.value = false;
                }
            })
        });

        // 點擊愛心
        const goLike = (idx, pid) => {
            let styles = $(".bi-suit-heart-fill")[idx].style;
            styles.setProperty("display", "block");

            myFavorite.value.push(pid);

            // 用localStorage儲存我的收藏
            localStorage.setItem("myFavorite", JSON.stringify(myFavorite.value));
        }
        // 移除愛心
        const removeLike = (idx, pid) => {
            let styles = $(".bi-suit-heart-fill")[idx].style;
            styles.removeProperty("display");

            myFavorite.value.map((value, idx) => {
                if (value == pid) {
                    myFavorite.value.splice(idx, 1);
                }
            })
            localStorage.setItem("myFavorite", JSON.stringify(myFavorite.value));
        }

        return {
            product, favoriteData,
            goLike, removeLike,
            isLoading, isData
        }
    }
}
</script>

<template>
    <div class="wrap">
        <h1>我的收藏</h1>

        <!-- 產品列表 -->
        <div class="main-list">
            <!-- loading的svg -->
            <svg class="loading" v-show="isLoading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <path d="M10 50A40 40 0 0 0 90 50A40 44.5 0 0 1 10 50" fill="#e15b64" stroke="none">
                <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 52.25;360 50 52.25"></animateTransform>
                </path>
            </svg>
            <!-- 暫無資料的svg -->
            <div class="no-data" v-show="!isLoading&&isData">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background:#fff;display:block;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <rect fill="#e15b64" x="15" y="15" width="30" height="30" rx="3" ry="3">
                    <animate attributeName="x" dur="2s" repeatCount="indefinite" keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1" values="15;55;55;55;55;15;15;15;15" begin="-1.8333333333333333s"></animate>
                    <animate attributeName="y" dur="2s" repeatCount="indefinite" keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1" values="15;55;55;55;55;15;15;15;15" begin="-1.3333333333333333s"></animate>
                    </rect><rect fill="#f8b26a" x="15" y="15" width="30" height="30" rx="3" ry="3">
                    <animate attributeName="x" dur="2s" repeatCount="indefinite" keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1" values="15;55;55;55;55;15;15;15;15" begin="-1.1666666666666667s"></animate>
                    <animate attributeName="y" dur="2s" repeatCount="indefinite" keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1" values="15;55;55;55;55;15;15;15;15" begin="-0.6666666666666666s"></animate>
                    </rect><rect fill="#abbd81" x="15" y="15" width="30" height="30" rx="3" ry="3">
                    <animate attributeName="x" dur="2s" repeatCount="indefinite" keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1" values="15;55;55;55;55;15;15;15;15" begin="-0.5s"></animate>
                    <animate attributeName="y" dur="2s" repeatCount="indefinite" keyTimes="0;0.083;0.25;0.333;0.5;0.583;0.75;0.833;1" values="15;55;55;55;55;15;15;15;15" begin="0s"></animate>
                    </rect>
                </svg>
                <h1>目前沒有我的收藏，請點擊產品右上角的愛心！</h1>
            </div>

            <ul class="product-box">
                <li v-for="(item, idx) in product.data" :key="item.PID">
                    <div class="img-box">
                        <svg @click="goLike(idx, item.PID)"
                            xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#b7bdc6" class="bi bi-suit-heart" viewBox="0 0 16 16">
                            <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
                        </svg>
                        <svg v-show="favoriteData.includes(item.PID)" @click="removeLike(idx, item.PID)" 
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
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .wrap {
        max-width: initial;
        margin-left: 200px;
        padding-top: 30px;
        padding-bottom: 30px;

        h1 {
            margin-bottom: 15px;
        }
        h4 {
            font-size: 20px;
            font-weight: 500;
            text-align: start;
        }

        .main-list {
            width: 100%;

            .product-box {
                max-width: 2150px;
                min-height: 620px;
                padding-left: 0;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;

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
                        // display: none;
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
            .no-data {
                height: 850px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                h1 {
                    text-align: center;
                    color: #e15b64;
                    animation-name: textColor;
                    animation-delay: .5s;
                    animation-duration: 2.5s;
                    animation-iteration-count: infinite;
                }
            }
            @keyframes textColor {
                0%   {color: #e15b64;}
                33%  {color: #f8b26a;}
                66%  {color: #abbd81;}
                100% {color: #e15b64;}
            }
        }
    }

    // 手機版
    @media screen and (min-width: 0px) and (max-width: 490px) {
        p {
            margin-bottom: 0;
        }
        .wrap {
            margin-left: 0;
            padding-bottom: 0;

            h1 {
                padding-left: 15px;
            }
            h4 {
                font-size: 18px;
                margin-bottom: 0;
            }
            .main-list {
                margin-top: 60px;

                .loading {
                    max-height: 500px;
                    padding: 100px 0;
                }
                .product-box {
                    grid-template-columns: 1fr 1fr;

                    >li {
                        max-width: 180px;
                        max-height: 323px;
                    }
                    svg {
                        width: 25px;
                        height: 25px;
                        top: 10px;
                        right: 10px;
                    }
                    .content {
                        padding: 10px;
                        
                        p {
                            display: flex;
                            justify-content: space-between;

                            span:last-child {
                                font-size: 16px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>