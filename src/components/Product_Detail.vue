<script>
import { onMounted, watch, reactive, ref, nextTick } from 'vue';
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import axios from "axios";

export default {
    setup() {
        const route = useRoute();
        const product = reactive({});
        const amount = ref(0);
        const isLoading = ref(true);
        const isData = ref(true);
        let data = null;
        const { t, locale } = useI18n();
 
        watch(locale, (newlocale) => {
            localStorage.setItem("locale", newlocale);

            nameFID();
            strongP1(t("product-illustrate1"));
            strongP2(t("product-illustrate2"));
        });

        // 處理<p>裡面的<strong>
        async function strongP1(str) {
            let str1 = str.split("//br")[0].replace('//strong', "<strong style='color: rgb(0, 128, 0);'>").replace('//strong', "</strong>");
            let str2 = str.split("//br")[3].replace('//strong', "<strong style='color: rgb(0, 128, 0);'>").replace('//strong', "</strong>");
            let str3 = str.split("//br")[8].replace('//strong', "<strong style='color: rgb(0, 128, 0);'>").replace('//strong', "</strong>");

            // 使用Vue的nextTick()，讓 DOM 更新後再調整innerHTML
            await nextTick()
            document.querySelectorAll("#section1 p")[0].innerHTML = str1;
            document.querySelectorAll("#section2 p")[0].innerHTML = str2;
            document.querySelectorAll("#section3 p")[1].innerHTML = str3;
        }
        async function strongP2(str) {
            let str1 = str.split("//br")[1].replace('//strong', "<strong style='color: rgb(0, 128, 0);'>").replace('//strong', "</strong>");
            let str2 = str.split("//br")[2].replace('//strong', "<strong style='color: rgb(0, 128, 0);'>").replace('//strong', "</strong>");
            let str3 = str.split("//br")[6].replace('//strong', "<strong style='color: rgb(0, 128, 0);'>").replace('//strong', "</strong>");

            // 使用Vue的nextTick()，讓 DOM 更新後再調整innerHTML
            await nextTick()
            document.querySelectorAll("#section4 p")[1].innerHTML = str1;
            document.querySelectorAll("#section4 p")[2].innerHTML = str2;
            document.querySelectorAll("#section4 p")[6].innerHTML = str3;
        }

        onMounted(() => {
            axios.get(`https://run.mocky.io/v3/b1a37e38-8c8c-40aa-8482-01fb0d778835`)
            // 正式站： https://run.mocky.io/v3/7e69c6fc-8f63-4e22-8087-61901e7922aa
            .then(res => {
                data = res.data["product-detail"][route.params.pid];
                
                // 產品標題、價格、主要圖片
                product.title = data.title;
                product.price = data.price.split("NT$ ")[1];
                product.image = require("../assets/images/" + data.img);
                
                nameFID();
                if (data.content) {
                    let str = ``;
                    data.content.forEach((item, i) => {
                        if (item == "") {
                            str += `<br/>`;
                        } else {
                            str += `<p>` + item + `</p>`;
                        }
                    });
                    document.querySelector(".content").innerHTML = str;
                    document.querySelectorAll(".content p").forEach(i => {
                        i.style.color = "rgb(51 49 49)";
                        i.style.fontSize = "18px";
                        i.style.fontFamily = "arial, helvetica, sans-serif";
                        i.style.lineHeight = "24px";
                        i.style.letterSpacing = "1px";
                        i.style.marginBottom = "0";
                    })
                }
                // 圖片列表
                if (data["image-box"]) {
                    let imgArr = [];
                    data["image-box"].forEach(element => {
                        imgArr.push(require("../assets/images/" + element));
                        
                    });
                    product["image-box"] = imgArr; 
                } else {
                    product["image-box"] = [];
                }

                strongP1(t("product-illustrate1"));
                strongP2(t("product-illustrate2"));

                // 將loading和no data的動畫關掉
                isLoading.value = !isLoading.value;
                isData.value = !isData.value;
            })
            .catch(error => {
                isLoading.value = !isLoading.value;
            })
        });

        const nameFID = () => {
            switch(data.FID){
                case "F0001":
                    product.FID = t("footer-health1");
                    break;
                case "F0002":
                    product.FID = t("footer-health2");
                    break;
                case "E0001":
                    product.FID = t("navbar-glasses1");
                    break;
                default:
                    product.FID = "";
                    break;
            }
        }

        const changeImg = (e) => {
            let liGroup =  document.querySelectorAll("li[name='image-box']");
            liGroup.forEach(i => {
                i.classList.remove("active");
            });

            // 點擊的該<li>加上active class
            e.currentTarget.classList.add("active")

            // 更換大張圖片的src路徑。PC和手機因為css樣式不同，所以依不同裝置抓取DOM元素的src
            if (screen.width < 490) {
                // 若當前螢幕大小為手機版
                document.querySelector("img[name='product-image']").src = e.target.childNodes[0].src;
            } else {
                // PC版
                document.querySelector("img[name='product-image']").src = e.target.src;
            }
        }
        const plus = () => {
            amount.value++;
        }
        const minus = () => {
            amount.value--;
            if (amount.value < 0 ) {
                amount.value = 0;
            }
        }

        return { 
            product, amount, 
            isLoading, isData,
            changeImg, minus, plus,
            t, locale,
        };
    }
}
</script>

<template>
    <div class="blank"></div>
    <div v-show="!isLoading&&!isData" class="container">
        <div class="left-detail">
            <img name="product-image" :src="product.image" alt="產品圖片">
            <div class="content"></div>
        </div>
        <div class="right-detail">
            <span class="pid">{{ product.FID }}</span>
            <h1>{{ product.title }}</h1>
            <p class="price">NT$ {{ product.price }}</p>
            <section>
                <ul>
                    <li @click="changeImg" name="image-box" class="active">
                        <div class="imgbox">
                            <img :src="product.image">
                        </div>
                    </li>
                    <li v-for="item in product['image-box']" :key="item" 
                        @click="changeImg" name="image-box">
                        <div class="imgbox">
                            <img :src="item">
                        </div>
                    </li>
                </ul>
            </section>
            <div class="amount-box">
                <span>{{ t("product-amount") }}</span>
                <button @click="minus">-</button>
                <input v-model="amount" type="text">
                <button @click="plus">+</button>
                
                <span>{{ t("product-total") }}： {{ amount*product.price }}</span>
            </div>
            <div class="btn-wrap">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                        <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                    </svg>
                    {{ t("product-favorite") }}
                </button>
                <button>{{ t("product-buy") }}</button>
            </div>

            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            {{ t("product-caption1") }}
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse " data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <section id="section1">
                            <h2>▌{{ t("product-caption1") }}</h2>
                            <p>{{ t("product-illustrate1").split("//br")[0] }}</p>
                            <p>{{ t("product-illustrate1").split("//br")[1] }}</p>
                        </section>
                        <section id="section2">
                            <h2>{{ t("product-illustrate1").split("//br")[2] }}</h2>
                            <p>{{ t("product-illustrate1").split("//br")[3] }}</p>
                            <p>{{ t("product-illustrate1").split("//br")[4] }}</p>
                            <p>{{ t("product-illustrate1").split("//br")[5] }}</p>
                        </section>
                        <section id="section3">
                            <h2>{{ t("product-illustrate1").split("//br")[6] }}</h2>
                            <p>{{ t("product-illustrate1").split("//br")[7] }}</p>
                            <p>{{ t("product-illustrate1").split("//br")[8] }}</p>
                        </section>
                    </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            {{ t("product-caption2") }}
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <section id="section4">
                            <h2>▌{{ t("product-caption2") }}</h2>
                            <p>{{ t("product-illustrate2").split("//br")[0] }}</p>
                            <p>{{ t("product-illustrate2").split("//br")[1] }}</p>
                            <p>{{ t("product-illustrate2").split("//br")[2] }}</p>
                            <p>{{ t("product-illustrate2").split("//br")[3] }}</p>
                            <p>{{ t("product-illustrate2").split("//br")[4] }}</p>
                            <p>{{ t("product-illustrate2").split("//br")[5] }}</p>
                            <p>{{ t("product-illustrate2").split("//br")[6] }}</p>
                        </section>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
        <h1>Oops!暫無此項產品的資料，請看看其他產品</h1>
    </div>
</template>

<style lang="scss" scoped>
    * {
        margin: 0;
        padding: 0;
    }
    .blank {
        height: 83px;
    }
    .container {
        max-width: 1300px;
        margin: 40px auto;
        display: flex;

        .left-detail {
            max-width: 600px;
            min-width: 600px;
            margin-right: 40px;

            img {
                width: 100%;
            }
        }
        .right-detail {
            width: 100%;
            margin-top: 40px;

            .pid {
                display: inline-block;
                margin-bottom: 10px;
                padding: 1px 10px;
                line-height: 40px;
                font-weight: 700;
                color: aliceblue;
                background: #8aabed;
                border-radius: 15px;
            }
            .price {
                padding: 10px 0;
                font-weight: 700;
                font-size: 22px;
                color: indigo;
            }
            section ul {
                display: flex;
                padding: 20px 0;
                border-top: solid thin #e5e5e5;
                border-bottom: solid thin #e5e5e5;

                li {
                    margin-right: 10px;
                    border: solid 3px #ddd;
                    border-radius: 16px;
                    overflow: hidden;
                    
                    .imgbox {
                        width: 76px;
                        height: 76px;
                        cursor: pointer;
    
                        img {
                            width: 100%;
                        }
                    }
                }
                li.active {
                    border-color: #9da6b7;
                }
            }
            .amount-box {
                span {
                    margin: 25px;
                    line-height: 80px;
                    font-size: 18px;

                    &:last-child {
                        float: right;
                        margin: 0 10px 0 0;
                        font-weight: 300;
                    }
                }
                input {
                    width: 50px;
                    height: 39px;
                    border: 0;
                    outline: none;
                    border-bottom: 1px solid #e7e7e7;
                    text-align: center;
                }
                button {
                    width: 40px;
                    height: 40px;
                    text-align: center;
                    font-size: 25px;
                    background: 0;
                    border: 0;

                    &:active {
                        font-size: 28px;
                        color: #0353f3;
                    }
                }
            }
            .btn-wrap  {
                display: flex;
                margin-bottom: 30px;

                button {
                    background: transparent;
                    border: solid 1px #000;
                    border-radius: 16px;
                    line-height: 44px;

                    &:first-child {
                        width: 40%;
                        color: #707a8a;
                        border: 1px solid #707a8a;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    &:last-child {
                        margin-left: 5px;
                        width: 60%;
                    }
                    &:hover {
                        background-color: #000;
                        color: #fff;
                    }
                }
                .bi-suit-heart-fill {
                    margin-right: 5px;
                }
            }
            .accordion-item {
                border: 0;
                border-top: solid thin #e5e5e5;

                &:last-child {
                    border-bottom: solid thin #e5e5e5;
                }
            }
            .accordion-button, .accordion-body {
                padding: 16px 20px;
            }
            .accordion-button {
                // 將BS預設的顏色拿掉
                background-color: unset;
                color: unset;

                &:focus {
                    box-shadow: none;
                }
            }
            .accordion-body {
                background: #f3f5f9;
                margin-bottom: 20px;

                h2 {
                    padding: 10px 0;
                    font-size: 18px;
                    font-weight: normal;
                    color: rgb(0, 102, 204);
                }
                p {
                    color: rgb(105, 105, 105);
                    font-family: arial, helvetica, sans-serif;
                    line-height: 24px;
                    letter-spacing: 1px;

                    strong {
                        color: rgb(0, 128, 0);
                    }
                }
                p+p {
                    margin-top: 5px;
                }
                section+section {
                    margin-top: 5px;
                    border-top: 1px solid #e5e5e5;
                }
            }
        }
    }
    .loading {
        width: 100%;
        max-height: 800px;
        padding: 200px 0;
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
            animation-name: example;
            animation-delay: .5s;
            animation-duration: 2.5s;
            animation-iteration-count: infinite;
        }
    }
    @keyframes example {
        0%   {color: #e15b64;}
        33%  {color: #f8b26a;}
        66%  {color: #abbd81;}
        100% {color: #e15b64;}
    }

    // 手機版
	@media screen and (min-width: 0px) and (max-width: 490px) {
        .blank {
            height: 40px;
        }
        .container {
            display: flex;
            flex-direction: column;
            margin: 0;

            .left-detail {
                max-width: 490px;
                min-width: unset;
                margin-right: 0px;
                order: 2;

                img {
                    padding: 0 20px;
                }
                .content {
                    padding: 20px;
                }
            }
            .right-detail {
                margin-top: 0;
                padding: 20px;
                order: 1;

                .pid {
                    margin: 10px 0;
                    padding: 1px 15px;
                    line-height: 38px;
                }
                section {
                    ul {
                        overflow: scroll;
                        li {
                            overflow: unset;

                            .imgbox img {
                                position: relative;
                                z-index: -1;
                                border-radius: 9px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>