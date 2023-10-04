<script>
import { useRoute } from "vue-router";
import { onMounted, reactive, ref, watch } from 'vue';
import axios from "axios";
import $ from 'jquery';

export default {
    setup() {
        const route = useRoute();
        const product = reactive({data: {}});
        const allDate = reactive({data: {}});

        onMounted(() => {
            axios.get(`https://run.mocky.io/v3/9186eeb8-0592-4fcf-914c-d46a46fa0a75`)
            .then(res => {
                // 初始化輸出到畫面的資料
                product.data = res.data[route.params.id];
                product.title = res.data["sort"][route.params.id];
                
                // 儲存原始資料，在watch時使用
                allDate.data = res.data;
            })
        });

        const goLike = (idx) => {
            let styles = $(".bi-suit-heart-fill")[idx].style;
            styles.setProperty("display", "block");
        }
        const removeLike = (idx) => {
            let styles = $(".bi-suit-heart-fill")[idx].style;
            styles.removeProperty("display");
        }

        // 用 watch 監控網址
        watch(
        ()=> route.path, // 第一個參數帶要監控的變數，這裡監控route.path
        (newA, oldA)=> {
            // 當router的路徑改變，輸出到畫面的資料也要改變
            product.title = allDate.data["sort"][route.params.id];
            product.data = allDate.data[route.params.id];
        }
        );

        return { product, goLike, removeLike };
    }
}
</script>

<template>
    <div class="blank"></div>

    <div class="container">
        <!-- 左側產品選單 -->
        <div class="sidebar">
            <h3>保健＆周邊</h3>
            <ul>
                <li>
                    <router-link to="/product/F0001">亮萌</router-link>
                </li>
                <li>
                    <router-link to="/product/F0002">鏡片清潔香波</router-link>
                </li>
            </ul>
        </div>
        <!-- 右側PC產品列表 -->
        <div class="main-list">
            <h1>{{ product.title }}</h1>

            <ul class="product-box" >
                <li v-for="(item, idx) in product.data" :key="item.img">
                    <div class="img-box">
                        <svg  @click="goLike(idx)"
                            xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#b7bdc6" class="bi bi-suit-heart" viewBox="0 0 16 16">
                            <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
                        </svg>
                        <svg   @click="removeLike(idx)" 
                            xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#b7bdc6" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                            <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                        </svg>
                        <div>
                            <img :src="require(`../assets/images/${item.img}`)">
                        </div>
                    </div>
                    <div class="content">
                        <h4>{{ item.title }}</h4>
                        <p>{{ item.amount }}</p>
                        <p>{{ item.price }}</p>
                    </div>
                </li>
            </ul>

            <div class="page-wrap">
                <ul>
                    <li class="page-button">
                        <a href="">&lt;</a>
                    </li>
                    <li>
                        <span>1</span>
                    </li>
                    <li class="page-button">
                        <a href="">&gt;</a>
                    </li>
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

        h1 {
            font-size: 32px;
            font-weight: 700;
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
            width: 200px;
            padding: 30px 20px;
            position: absolute;
            left: 0;

            >ul {
                margin-top: 10px;

                a {
                    color: black;
                    font-size: 18px;
                }
                a.router-link-active {
                    color: rgb(255, 145, 0);
                    font-weight: 700;
                }
            }
        }
        .main-list {
            width: 100%;
            margin-left: 200px;

            .product-box {
                display: flex;

                >li {
                    width: 500px;
                    margin-right: 35px;
                }
                .img-box {
                    position: relative;
                    
                    // 防止連點時發生反白
                    user-select: none;

                    >div {
                        border: 1px solid #e5e5e5;
                        border-radius: 16px;
                    }
                    .bi-suit-heart-fill {
                        display: none;
                        fill: red;
                    }
                }
                .img-box:hover {
                    cursor: pointer;
                    box-shadow: 0 30px 20px -10px #e5e5e5c2;
                    border-radius: 16px;

                    img {
                        transform: scale(0.95);
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
                    vertical-align: middle;
                    transition: all .5s linear;
                }
                .content {
                    padding: 20px 0;
                    font-weight: bolder;

                    p {
                        margin-bottom: 8px;
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

                    >li {
                        width: 40px;
                        height: 40px;
                        line-height: 40px;

                        a {
                            color: black;
                        }
                        span {
                            color: red;
                        }
                    }
                    .page-button:hover {
                        background-color: #e9ecef;

                        a {
                            color: rgba(255, 0, 0, 0.5);
                        }
                    }
                }
            }
        }
    }


    // 手機版
	@media screen and (min-width: 0px) and (max-width: 490px) {
        .blank {
            height: 40px;
        }
        .container {
            .sidebar {
                display: none;
            }
            .main-list {
                margin-left: 0;

                h1 {
                    padding-bottom: 15px;
                }
                .product-box {
                    padding-left: 0;
                    margin: 0;

                    .img-box {
                        svg {
                            top: 10px;
                            right: 10px;
                            width: 25px;
                            height: 25px;
                        }
                    }
                }
                .page-wrap {
                    margin: 0px 0 25px 0;
                }
            }
        }
    }
</style>