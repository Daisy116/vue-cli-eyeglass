<script>
import { onMounted, reactive, ref } from 'vue';
import axios from "axios";

export default {
    setup() {
        const product = reactive({data: {}});  // 放要呈現到畫面上的資料
        const myCart = ref(JSON.parse(localStorage.getItem("myCart")));  // 我的收藏列表
        const tatolAmount = ref(0);
        const isLoading = ref(true);           // 資料未取回之前，放loading SVG圖
        const cartList = ref(null);
        const cartCount = ref(null);

        onMounted(() => {
            axios.get(`https://run.mocky.io/v3/b1a37e38-8c8c-40aa-8482-01fb0d778835`)
            .then(res => {
                let newArr = [];
                let newArr2 = [];

                if (!myCart.value) {
                    // 若myCart為null，則設定空陣列
                    myCart.value = [];
                }
                myCart.value.forEach(element => {
                    newArr.push(Object.keys(element)[0]);
                    newArr2.push(Object.values(element)[0]);
                })

                let arr = [];
                newArr.forEach((element, idx) => {
                    res.data["product-detail"][element]["PID"] = element;
                    res.data["product-detail"][element]["buy"] = newArr2[idx];
                    tatolAmount.value += res.data["product-detail"][element].price.slice(4) * res.data["product-detail"][element].buy;
                    arr.push(res.data["product-detail"][element]);
                });
                product.data = [...arr];
                isLoading.value = false;
            })
        });
        

        const minus = (idx) => {
            product.data[idx]["buy"]--;
            if (product.data[idx]["buy"] < 0 ) {
                product.data[idx]["buy"] = 0;
            } else {
                // 大於零時才會算入總計，小於零為無效金額
                tatolAmount.value -= Number(product.data[idx]["price"].slice(4));
            }
            

            let key = Object.keys(myCart.value[idx]);
            let obj = {};
            obj[key] = product.data[idx]["buy"];
            myCart.value[idx] = obj;

            // 用localStorage儲存購物車清單
            localStorage.setItem("myCart", JSON.stringify(myCart.value));
        }
        const plus = (idx) => {
            product.data[idx]["buy"]++;
            tatolAmount.value += Number(product.data[idx]["price"].slice(4));

            let key = Object.keys(myCart.value[idx]);
            let obj = {};
            obj[key] = product.data[idx]["buy"];
            myCart.value[idx] = obj;

            // 用localStorage儲存購物車清單
            localStorage.setItem("myCart", JSON.stringify(myCart.value));
        }
        const deleteItem = (item, $event) => {
            let dom_tr = $event.target.parentNode.parentNode;
            tatolAmount.value -= Number(dom_tr.childNodes[4].innerText);  // 刪掉時總計金額要變動
            dom_tr.remove(); // 將綁定ref的第idx個<tr>DOM元素刪掉

            myCart.value.forEach((el,idx) => {
                if (Object.keys(el)[0] == item.PID) {
                    // 將myCart陣列裡的第idx元素刪掉
                    myCart.value.splice(idx, 1); 
                }
            })

            // 「共幾件商品」的數字要變動
            cartCount.value.innerText = "共 " + myCart.value.length + " 件商品";

            // 用localStorage儲存購物車清單
            localStorage.setItem("myCart", JSON.stringify(myCart.value));
        }

        return {
            product, tatolAmount, cartList, cartCount,
            minus, plus, deleteItem,
            isLoading
        }
    }
}
</script>

<template>
    <div class="wrap">
        <h1>購物車清單</h1>

        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>商品</th>
                    <th>單價</th>
                    <th>購買數量</th>
                    <th>總計金額</th>
                </tr>
            </thead>

            <!-- loading圖 -->
            <tr>
                <td colspan="5">
                    <svg v-show="isLoading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;background:#fff;display:block;" width="400px" height="680px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <defs>
                        <clipPath id="ldio-khu0pg7ptb-cp" x="0" y="0" width="100" height="100">
                            <rect x="0" y="5" width="100" height="46">
                        </rect></clipPath>
                        </defs>
                        <path d="M70 75.2H34.1l-4.1-18.4l-0.7-3l-1-4.7c0 0 0 0 0-0.1c0-0.1 0-0.1-0.1-0.2c0 0 0-0.1-0.1-0.1c0 0 0-0.1-0.1-0.1 c0 0-0.1-0.1-0.1-0.1c0 0-0.1-0.1-0.1-0.1c0 0-0.1-0.1-0.1-0.1c0 0 0 0-0.1-0.1L22.3 44c0-0.1 0-0.2 0-0.3c0-1.9-1.6-3.5-3.5-3.5 s-3.5 1.6-3.5 3.5c0 1.9 1.6 3.5 3.5 3.5c0.7 0 1.4-0.2 2-0.6l4.8 3.7L31.5 77c0 0 0 0 0 0l-5.6 7.7c-0.3 0.5-0.4 1.1-0.1 1.6 c0.3 0.5 0.8 0.8 1.3 0.8h4c-0.8 0.8-1.3 1.9-1.3 3.2c0 2.6 2.1 4.7 4.7 4.7c2.6 0 4.7-2.1 4.7-4.7c0-1.2-0.5-2.3-1.3-3.2h29 c-0.8 0.8-1.3 1.9-1.3 3.2c0 2.6 2.1 4.7 4.7 4.7c2.6 0 4.7-2.1 4.7-4.7c0-1.2-0.5-2.3-1.3-3.2H77c0.8 0 1.5-0.7 1.5-1.5 s-0.7-1.5-1.5-1.5H30l4.3-6h36.8c0.7 0 1.3-0.5 1.4-1.1l7.5-27.3c0.2-0.8-0.2-1.6-1-1.8c-0.8-0.2-1.6 0.2-1.8 1l-1.3 4.7l-0.8 3" fill="#603e3e"></path>
                        <polygon points="31.3 53.1 35.7 73.2 68.5 73.2 74 53.1" fill="#603e3e"></polygon>
                        <g clip-path="url(#ldio-khu0pg7ptb-cp)">
                        <g>
                        <g transform="translate(50 41)">
                            <path d="M6.5-6.7C6.1-6.9 5.7-7.2 5.3-7.4C5-7.5 4.6-7.7 4.3-7.8C3.1-2.2-4-3.7-2.9-9.3c-0.4 0-0.7 0-1.1 0 c-0.5 0-1 0.1-1.4 0.2c-1.8 0.3-3.6 0.9-5.3 1.8l1.1 4.2l3.1-0.8L-8.7 6.9L3.2 9.3L5.4-1.5l2.5 2l2.7-3.4C9.5-4.4 8.1-5.7 6.5-6.7z" fill="#e15b5b">
                            <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="0.7462686567164178s" repeatCount="indefinite"></animateTransform>
                            </path>
                        </g>
                        <animateTransform attributeName="transform" type="translate" keyTimes="0;1" values="0 0;0 75" dur="1.4925373134328357s" repeatCount="indefinite"></animateTransform>
                        </g>
                        <g>
                        <g transform="translate(35 17)">
                            <path d="M3.4-5.3L2.5-5l0.8-2.3L1.1-6.3l-1.2-2.2l-1.6 4.6l-4.6-1.6l0.9 2.3l-2.2 1.2l2.3 0.8L-6-0.9 c-0.6 0.3-0.8 0.9-0.5 1.5l1 2.1C-5.2 3.4-4.6 3.6-4 3.3l0.1-0.1l2.1 4.5C-1.4 8.4-0.7 8.7 0 8.3l1.7-0.8l1.7-0.8L5 5.9l1.7-0.8 C7.4 4.8 7.7 4 7.4 3.3L5.2-1.1l0.1-0.1c0.6-0.3 0.8-0.9 0.5-1.5l-1-2.1C4.6-5.4 3.9-5.6 3.4-5.3z" fill="#6078f4">
                            <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="0.7462686567164178s" repeatCount="indefinite"></animateTransform>
                            </path>
                        </g>
                        <animateTransform attributeName="transform" type="translate" keyTimes="0;1" values="0 0;0 75" dur="1.4925373134328357s" repeatCount="indefinite"></animateTransform>
                        </g>
                        <g>
                        <g transform="translate(66 26)">
                            <path d="M-4.5-3.7L1.9-6l0.5-0.2L2-7.2l-6.9 2.5C-5.7-4.4-6.1-3.5-6-2.7c0 0.1 0 0.2 0.1 0.3l3 8.2 C-2.5 6.9-1.3 7.4-0.2 7l5.6-2C5.9 4.8 6.2 4.2 6 3.7L3.2-3.9l-0.4-1L2.4-4.7L1.9-4.5l-3.2 1.2l-2.7 1c-0.3 0.1-0.6 0-0.8-0.2 c-0.1-0.1-0.1-0.1-0.1-0.2C-5.1-3.1-4.9-3.6-4.5-3.7z" fill="#f4d501">
                            <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="0.7462686567164178s" repeatCount="indefinite"></animateTransform>
                            </path>
                        </g>
                        <animateTransform attributeName="transform" type="translate" keyTimes="0;1" values="0 0;0 75" dur="1.4925373134328357s" repeatCount="indefinite"></animateTransform>
                        </g>
                        <g>
                        <g transform="translate(55 6)">
                            <polygon points="0 -4.9 1.6 -1.7 5.1 -1.1 2.6 1.3 3.2 4.9 0 3.2 -3.2 4.9 -2.6 1.3 -5.1 -1.1 -1.6 -1.7" fill="#abbd81">
                            <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="0.7462686567164178s" repeatCount="indefinite"></animateTransform>
                            </polygon>
                        </g>
                        <animateTransform attributeName="transform" type="translate" keyTimes="0;1" values="0 0;0 75" dur="1.4925373134328357s" repeatCount="indefinite"></animateTransform>
                        </g>
                        </g>
                        <g clip-path="url(#ldio-khu0pg7ptb-cp)">
                        <g transform="translate(0 -75)">
                            <g>
                        <g transform="translate(50 41)">
                            <path d="M6.5-6.7C6.1-6.9 5.7-7.2 5.3-7.4C5-7.5 4.6-7.7 4.3-7.8C3.1-2.2-4-3.7-2.9-9.3c-0.4 0-0.7 0-1.1 0 c-0.5 0-1 0.1-1.4 0.2c-1.8 0.3-3.6 0.9-5.3 1.8l1.1 4.2l3.1-0.8L-8.7 6.9L3.2 9.3L5.4-1.5l2.5 2l2.7-3.4C9.5-4.4 8.1-5.7 6.5-6.7z" fill="#e15b5b">
                            <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="0.7462686567164178s" repeatCount="indefinite"></animateTransform>
                            </path>
                        </g>
                        <animateTransform attributeName="transform" type="translate" keyTimes="0;1" values="0 0;0 75" dur="1.4925373134328357s" repeatCount="indefinite"></animateTransform>
                        </g>
                        <g>
                        <g transform="translate(35 17)">
                            <path d="M3.4-5.3L2.5-5l0.8-2.3L1.1-6.3l-1.2-2.2l-1.6 4.6l-4.6-1.6l0.9 2.3l-2.2 1.2l2.3 0.8L-6-0.9 c-0.6 0.3-0.8 0.9-0.5 1.5l1 2.1C-5.2 3.4-4.6 3.6-4 3.3l0.1-0.1l2.1 4.5C-1.4 8.4-0.7 8.7 0 8.3l1.7-0.8l1.7-0.8L5 5.9l1.7-0.8 C7.4 4.8 7.7 4 7.4 3.3L5.2-1.1l0.1-0.1c0.6-0.3 0.8-0.9 0.5-1.5l-1-2.1C4.6-5.4 3.9-5.6 3.4-5.3z" fill="#6078f4">
                            <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="0.7462686567164178s" repeatCount="indefinite"></animateTransform>
                            </path>
                        </g>
                        <animateTransform attributeName="transform" type="translate" keyTimes="0;1" values="0 0;0 75" dur="1.4925373134328357s" repeatCount="indefinite"></animateTransform>
                        </g>
                        <g>
                        <g transform="translate(66 26)">
                            <path d="M-4.5-3.7L1.9-6l0.5-0.2L2-7.2l-6.9 2.5C-5.7-4.4-6.1-3.5-6-2.7c0 0.1 0 0.2 0.1 0.3l3 8.2 C-2.5 6.9-1.3 7.4-0.2 7l5.6-2C5.9 4.8 6.2 4.2 6 3.7L3.2-3.9l-0.4-1L2.4-4.7L1.9-4.5l-3.2 1.2l-2.7 1c-0.3 0.1-0.6 0-0.8-0.2 c-0.1-0.1-0.1-0.1-0.1-0.2C-5.1-3.1-4.9-3.6-4.5-3.7z" fill="#f4d501">
                            <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="0.7462686567164178s" repeatCount="indefinite"></animateTransform>
                            </path>
                        </g>
                        <animateTransform attributeName="transform" type="translate" keyTimes="0;1" values="0 0;0 75" dur="1.4925373134328357s" repeatCount="indefinite"></animateTransform>
                        </g>
                        <g>
                        <g transform="translate(55 6)">
                            <polygon points="0 -4.9 1.6 -1.7 5.1 -1.1 2.6 1.3 3.2 4.9 0 3.2 -3.2 4.9 -2.6 1.3 -5.1 -1.1 -1.6 -1.7" fill="#abbd81">
                            <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="0.7462686567164178s" repeatCount="indefinite"></animateTransform>
                            </polygon>
                        </g>
                        <animateTransform attributeName="transform" type="translate" keyTimes="0;1" values="0 0;0 75" dur="1.4925373134328357s" repeatCount="indefinite"></animateTransform>
                        </g>
                        </g>
                        </g>
                    </svg>
                </td>
            </tr>
            

            <tbody v-show="!isLoading">
                <tr ref="cartList" v-for="(item,idx) in product.data" :key="item.PID">
                    <td>
                        <i @click="deleteItem(item, $event)" class="bi bi-x-lg"></i>
                    </td>
                    <td data-th="商品">
                        <img :src="require(`../assets/images/${item.img}`)">
                        {{ item.title }}
                    </td>
                    <td data-th="單價">{{ item.price }}</td>
                    <td data-th="購買數量">
                        <button @click="minus(idx)">-</button>
                        <input type="text" :value="item.buy">
                        <button @click="plus(idx)">+</button>
                    </td>
                    <td data-th="總計金額">{{ item.price.slice(4) * item.buy }}</td>
                </tr>
                <tr class="last-tr">
                    <td ref="cartCount" colspan="2">共 {{ product.data.length }} 件商品</td>
                    <td colspan="2">總計：{{ tatolAmount }}元</td>
                    <td>
                        <button class="pay">去買單</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
    .wrap {
        max-width: initial;
        margin-left: 200px;
        padding: 30px 50px;

        h1 {
            margin-bottom: 15px;
        }
        table {
            width: 80%;
            margin: auto;
            text-align: center;

            thead {
                background-color: #0E387B;
                color: #fff;
                font-size: 20px;

                th {
                    padding: 18px 5px;

                    &:first-child {
                        max-width: 30px;
                    }
                    &:nth-child(2) {
                        text-align: left;
                        padding-left: 80px;
                    }
                }
            }
            tbody {
                font-size: 18px;

                td {
                    padding: 0px 5px;
                    border-bottom: 1px solid #9BA2AD;

                    &:nth-child(2) {
                        text-align: left;
                    }
                }
                img {
                    width: 200px;
                }
                input[type="text"] {
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
                }
                .bi-x-lg {
                    font-size: 20px;
                    text-shadow: 0 0 2px rgba(0,0,0,1);
                    cursor: pointer;
                }
                .bi-x-lg:hover {
                    &::before {
                        text-shadow: 0 0 2px rgba(255,0,0,1);
                        color: red;
                    }
                }
                .last-tr {
                    background-color: #0E387B;
                    color: #fff;
                    font-size: 20px;
                    text-align: left;

                    td {
                        padding: 18px 5px;

                        &:nth-child(1) {
                            padding-left: 112px;
                        }
                        &:last-child {
                            text-align: center;
                        }
                    }
                    .pay {
                        width: 13.125rem;
                        height: auto;
                        padding: 5px 26px;
                        box-sizing: border-box;
                        background: rgb(255, 77, 0);
                        font-weight: 300;

                        &:hover {
                            filter: brightness(1.3);
                        }
                    }
                }
            }
        }
       
    }

    // 手機版
    @media screen and (min-width: 0px) and (max-width: 490px) {
        .wrap {
            margin-left: 0;
            padding: 30px 15px 10px 15px;

            table {
                margin-top: 60px;

                svg {
                    width: 300px;
                    height: 400px;
                }
                thead {
                    display: none;
                }
                tbody {
                    tr {
                        border-bottom: 1px solid #9BA2AD;
                        position: relative;

                        td {
                            display: flex;
                            align-items: center;
                            border: none;
                            padding: 5px 0;

                            &::before {
                                content: attr(data-th);
                                width: 100px;
                                color: #0E387B;
                                font-weight: bolder;
                                text-align: left;
                            }
                            &:first-child {
                                margin-bottom: 130px;
                                margin-right: 20px;
                                float: right;
                            }
                            &:nth-child(2) {
                                clear: both;
                            }
                            &:nth-child(5) {
                                border: 0;
                            }
                        }
                        td+td {
                            border-bottom: 1px dashed #0E387B;
                        }
                    }
                    img {
                        position: absolute;
                        top: 0;
                        left: 0;
                        transform: translateX(25%);
                        z-index: -1;
                    }
                    i {
                        text-shadow: 0 0 2px rgb(255, 0, 0);
                        color: red;
                    }
                    .last-tr {
                        box-shadow: 3px 3px 5px #180629;

                        td {
                            padding: 5px 0;
                            justify-content: center;

                            &::before {
                                width: 0;
                            }
                            &:nth-child(1) {
                                padding-left: 0;
                                margin: auto;
                                float: none;
                            }
                        }
                        .pay {
                            width: 9rem;
                            border-radius: 8px;
                            font-size: 23px;
                        }
                    }
                }
            }
        }
    }
</style>