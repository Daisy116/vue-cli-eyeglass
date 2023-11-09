<script>
import { onMounted, onBeforeMount, reactive, ref } from 'vue';
import { useRoute } from "vue-router";
import axios from "axios";

export default {
    setup() {
        const route = useRoute();
        const product = reactive({});
        const amount = ref(0);
        const isLoading = ref(true);
        // console.log(route.params.pid);

        onMounted(() => {
            axios.get(`https://run.mocky.io/v3/7e69c6fc-8f63-4e22-8087-61901e7922aa`)
            .then(res => {
                let data = res.data["product-detail"][route.params.pid];
                console.log("原始資料：", data);
                
                // 產品標題、價格、主要圖片
                product.title = data.title;
                product.price = data.price.split("NT$ ")[1];
                product.image = require("../assets/images/" + data.img);
                
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

                // 產品分類
                switch(data.FID){
                    case "F0001":
                        product.FID = "亮萌";
                        break;
                    case "F0002":
                        product.FID = "鏡片清潔香波";
                        break;
                    default:
                        product.FID = "";
                        break;
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

                console.log("輸出到畫面的資料：", product);
                // 將loading動畫關掉
                isLoading.value = !isLoading.value;
            })
        });

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
            isLoading,
            changeImg, minus, plus
        };
    }
}
</script>

<template>
    <div class="blank"></div>
    <div v-show="!isLoading" class="container">
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
                <span>數量</span>
                <button @click="minus">-</button>
                <input v-model="amount" type="text">
                <button @click="plus">+</button>
                
                <span>共計： {{ amount*product.price }}</span>
            </div>
            <div class="btn-wrap">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                        <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                    </svg>
                    加入收藏
                </button>
                <button>僅限會員購買,請先登入</button>
            </div>

            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        配送服務
                    </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse " data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <section>
                            <h2>▌配送服務</h2>
                            <p>24小時皆可線上申請配送（如遇網站重整時，將另行公告），實際出貨時間是商品存貨狀況為主，因APP商場與實體門市同步販售，採<strong>現貨+預購</strong>方式，如有現貨，完成訂購後會在 2-3工作天安排出貨送達，預購商品等候時間為7-10天不含假日。</p>
                            <p>因APP商場與實體門市同步販售，有時難免遇到缺貨或是斷貨等商品情況，若遇缺斷貨我們會個別告知並通知退費事宜。</p>
                        </section>
                        <section>
                            <h2>▌7-11超商取貨</h2>
                            <p>(1) 超商取貨金額上限為<strong>5,000元</strong>。</p>
                            <p>(2) 門市出貨後，將由超商物流進行配送，預計約3天送達您所指定的超商。（配送地點限台灣本島內）。</p>
                            <p>(3) 超商取貨之材積限制：紙箱包裝長*寬*高&lt;45*30*30cm，單邊長&lt;45cm，其他兩邊&lt;30cm，總重量&lt;5kg。</p>
                        </section>
                        <section>
                            <h2>▌年青人眼鏡門市取貨</h2>
                            <p>(1) 門市人員將於備貨完成後致電通知您至門市取貨。</p>
                            <p>(2) 提醒您，門市將為您<strong>保留7日</strong>，請在7日內儘速取貨，以免影響未來在門市取貨的權益。</p>
                        </section>
                    </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        退貨說明
                    </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <section>
                            <h2>▌退貨說明</h2>
                            <p>退貨商品須保持完整，並請至訂單問題點選退貨，收件後確認商品完整無誤，方得進行退換貨事宜，如遇國定假日則順延至上班日處理。</p>
                            <p>(1) 年青人會員服務APP採<strong>『全部退貨制』</strong>，恕無法部份退貨。</p>
                            <p>(2) 依照消費者保護法規定，網路購物消費者享有<strong>7天鑑賞期</strong>退貨鑑賞非試用之權益，如需退貨，煩請於收到商品之7天之內，經APP訂單提出申請。</p>
                            <p>(3) 商品因人為因素毀損、刮傷、髒汙、破裂等狀況，或商品任一配件、零件遺失者、商品不完整或寄回之內容無法辨別訂購者，則恕不接受退貨。</p>
                            <p>(4) 為瑕疵品或寄錯商品，先向您至上萬分的歉意，請您直接於訂單申請退貨即可，為簡化換貨流程，我們只提供退貨，不提供換貨，在此由衷感謝您的體諒與配合。</p>
                            <p>(5) 退貨請將下列品項包娤完整寄回本店：<br/><strong>●購買商品 ●相關配件 ●紙本發票 ●原包裝 ●明細 ●贈品</strong></p>
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