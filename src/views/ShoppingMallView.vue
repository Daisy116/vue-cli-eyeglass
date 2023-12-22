<script>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const rankID = ref(1);  // 暢銷排行榜，預設tab1
        const monthID = ref(3); // 本月主打，預設tab3
        const newID = ref(5);   // 活動商品，預設tab5
        const isLogin = ref(JSON.parse(localStorage.getItem("isLogin")));    // 目前的登入狀態
        const favoriteData = ref(JSON.parse(localStorage.getItem("myFavorite")));  // 我的收藏列表
        const myFavorite = ref([]);            // 暫存的我的收藏
        const router = useRouter();

        // tab要呈現的所有資料，這次寫在ranking物件裡
        const ranking = reactive({
            "1": 
            [
                {
                    photoSrc: require("../assets/images/eyeglass-Product48.png"),
                    type: "CAMAX 加美",
                    title: "加美彩色月拋-醉心橙",
                    price: "NT$ 100",
                    PID: "22202"
                },
                {
                    photoSrc: "https://app.youngman.com.tw/images/S00001/Product/2022122300001/4491847268.jpg",
                    type: "Candy Magic 魔幻糖果",
                    title: "濾藍光彩色日拋10片裝-楓糖蜜茶",
                    price: "NT$ 310",
                    PID: "24162"
                },
                {
                    photoSrc: "https://app.youngman.com.tw/images/S00001/Product/2022042200009/4467374398.jpg",
                    type: "ReVIA 蕾美",
                    title: "ReVIA蕾美彩色日拋-橄欖女神",
                    price: "NT$ 310"
                },
                {
                    photoSrc: require("../assets/images/eyeglass-Product90.jpeg"),
                    type: "Candy Magic 魔幻糖果",
                    title: "濾藍光彩色日拋-雪霧藍灰",
                    price: "NT$ 310",
                    PID: "24163"
                },
                {
                    photoSrc: require("../assets/images/eyeglass-Product84.png"),
                    type: "Syreni 希蕊妮",
                    title: "希蕊妮彩色月拋-人魚眼淚",
                    price: "NT$ 130",
                    PID: "20732"
                },
                {
                    photoSrc: "https://app.youngman.com.tw/images/S00001/Product/2022042200009/4467374398.jpg",
                    type: "ReVIA 蕾美",
                    title: "ReVIA蕾美彩色日拋-橄欖女神",
                    price: "NT$ 310"
                }
            ],
            "2": 
            [
                {
                    photoSrc: "https://app.youngman.com.tw/images/S00001/Product/2022070900001/4499573826.png",
                    type: "亮萌",
                    title: "亮萌-葉黃素咀嚼錠-90錠入",
                    price: "NT$ 399",
                    PID: "17617"
                },
                {
                    photoSrc: "https://app.youngman.com.tw/images/S00001/Product/2020090800003/4488166281.png",
                    type: "鏡片清潔香波",
                    title: "鏡片清潔香波-100ml",
                    price: "NT$ 99",
                    PID: "16295"
                },
                {
                    photoSrc: "https://app.youngman.com.tw/images/S00001/Product/2023082900001/4516756876.png",
                    type: "亮萌",
                    title: "亮萌-葉黃素Q凍(葡萄口味)",
                    price: "NT$ 299",
                    PID: "17618"
                }
            ],
            "3": 
            [
            {
                    photoSrc: "https://app.youngman.com.tw/images/S00001/Product/2019102300009/4453662271.png",
                    type: "酷柏",
                    title: "MyDay® 美怡天矽水膠日拋",
                    price: "NT$ 1000",
                    PID: "23232"
                },
                {
                    photoSrc: require("../assets/images/eyeglass-Product36.png"),
                    type: "酷柏",
                    title: "珂朗清透明日拋",
                    price: "NT$ 650",
                    PID: "23231"
                },
                {
                    photoSrc: "https://app.youngman.com.tw/images/S00001/Product/2021032200001/4459769509.jpg",
                    type: "美若康",
                    title: "澄氧高透氧矽水膠日拋",
                    price: "NT$ 580",
                    PID: "26278"
                },
                {
                    photoSrc: "https://app.youngman.com.tw/images/S00001/Product/2022120600001/4524772332.png",
                    type: "NOBEL 魔麗",
                    title: "NOBEL-玻尿酸非球面日拋",
                    price: "NT$ 350"
                },
                {
                    photoSrc: "https://app.youngman.com.tw/images/S00001/Product/2019090100001/4469960786.png",
                    type: "水湛",
                    title: "水湛-透明日拋隱形眼鏡",
                    price: "NT$ 260"
                }
            ],
            "4": 
            [
                {
                    photoSrc: require("../assets/images/eyeglass-Product84.png"),
                    type: "Syreni 希蕊妮",
                    title: "希蕊妮彩色月拋-人魚眼淚",
                    price: "NT$ 130",
                    PID: "20732"
                },
                {
                    photoSrc: require("../assets/images/eyeglass-Product82.png"),
                    type: "Syreni 希蕊妮",
                    title: "希蕊妮彩色月拋-珊瑚紫灰",
                    price: "NT$ 130",
                    PID: "20730"
                },
                {
                    photoSrc: "https://app.youngman.com.tw/images/S00001/Product/2022071100002/4475356041.jpg",
                    type: "Ever Color艾薇卡",
                    title: "艾薇卡彩色日拋-金砂香檳",
                    price: "NT$ 290"
                },
                {
                    photoSrc: "https://app.youngman.com.tw/images/S00001/Product/2022122300003/4491847346.jpg",
                    type: "Candy Magic 魔幻糖果",
                    title: "濾藍光彩色日拋10片裝-艾亞棕褐",
                    price: "NT$ 310",
                    PID: "24164"
                }
            ],
            "5": 
            [
                {
                    photoSrc: "https://app.youngman.com.tw/images/S00001/Product/2019030900001/4510842180.png",
                    type: "海昌",
                    title: "心機彩色日拋-心機可可",
                    price: "NT$ 270",
                    PID: "20030"
                },
                {
                    photoSrc: "https://app.youngman.com.tw/images/S00001/Product/2019031200003/4510842298.png",
                    type: "海昌",
                    title: "心機彩色日拋-心機抹茶",
                    price: "NT$ 270",
                    PID: "20032"
                },
                {
                    photoSrc: "https://app.youngman.com.tw/images/S00001/Product/2019031200004/4510842447.png",
                    type: "海昌",
                    title: "心機彩色日拋-心機玫瑰",
                    price: "NT$ 270",
                    PID: "20033"
                }
            ],
            "6": 
            [
                {
                    photoSrc: "https://app.youngman.com.tw/images/S00001/Product/2020111600001/4498751396.png",
                    type: "希蕊妮",
                    title: "希蕊妮彩色日拋-珊瑚泡泡",
                    price: "NT$ 250",
                    PID: "20731"
                },
                {
                    photoSrc: "https://app.youngman.com.tw/images/S00001/Product/2019070100028/4498751626.png",
                    type: "希蕊妮",
                    title: "希蕊妮彩色月拋-珊瑚紫灰",
                    price: "NT$ 130",
                    PID: "20730"
                },
                {
                    photoSrc: "https://app.youngman.com.tw/images/S00001/Product/2023030200002/4498751683.png",
                    type: "希蕊妮",
                    title: "希蕊妮彩色月拋-海之戀",
                    price: "NT$ 130",
                    PID: "20734"
                }
            ]
        });
        
        // 繼承localStorage裡的資料
        myFavorite.value = favoriteData.value;
        if (!myFavorite.value) {
            // 若localStorage裡資料為null，設定空陣列
            myFavorite.value = [];
        }

        // 點擊tab頁籤時，調整要v-show的區塊
        const changeTab = (num) => {
            if (num <= 2) {
                rankID.value = num;
                return;
            }
            if (num <= 4) {
                monthID.value = num;
                return;
            }
            newID.value = num;
        }
        // 點擊愛心
        const goLike = (id ,e) => {
            // 若尚未登入
            if (!isLogin.value) {
                alert("請先登入");
                return;
            }
            // 若產品pid為null
            if (!id) {
                alert("Oops!暫無此項產品的資料，請看看其他產品");
                return;
            }

            let dom = e.target.classList;
            if (Object.values(dom).includes('bi-suit-heart')) {
                // 若當下的class為空的愛心，則變成填滿的愛心class
                dom.remove("bi-suit-heart");
                dom.add("bi-suit-heart-fill");

                // 將pid加入我的收藏array
                myFavorite.value.push(id);
            } else {
                dom.add("bi-suit-heart");
                dom.remove("bi-suit-heart-fill");

                // 將pid移除我的收藏array
                myFavorite.value.map((value, idx) => {
                if (value == id) {
                    myFavorite.value.splice(idx, 1);
                }
            })
            }

            // 用localStorage儲存我的收藏
            localStorage.setItem("myFavorite", JSON.stringify(myFavorite.value));
        }
        // 點擊右下角的進入商品連結
        const goLink = (id) => {
            router.push('/product_detail/' + id);  
        }

        // canGrab為是否可以拖曳卡片！
        const canGrab = ref(true);
        const heartHover = (e) => {
            canGrab.value = false;  // 當滑鼠移到愛心上面時，禁止拖曳卡片(只能觸發goLike，其餘function不做)
        }
        const heartLeave = () => {
            canGrab.value = true;
        }


        // 開關
        let isdraggin = false;
        let startx;
        let x;

        let slider = null;
        let sliderInner = null;
        let outer = null;
        let inner = null;
        const sliderInnerMaxlength = reactive([]);

        onMounted(() => {
            // 初始設定值
            slider = document.querySelector('.slider');
            sliderInner = document.querySelector('.slider-inner');

            outer = slider.getBoundingClientRect();
            inner = sliderInner.getBoundingClientRect();

            
            // 計算每一個<div class="slider-inner">的最大寬度，才知道何時滑到最右邊
            Object.values(ranking).forEach(item => {
                sliderInnerMaxlength.push(440 * item.length)
            });

            
        });

        

        const mouseDown = (event) => {
            // 當滑鼠不在愛心上時，才會執行以下程式(不然會噴錯)
            if (canGrab.value) {
                slider = event.target;
                sliderInner = event.target.childNodes[0];
    
                // 滑鼠觸發事件時跟 slider x 軸的距離 - 目前 sliderInner 距離它父層元素（也就是 slider）的 x 軸距離
                startx = event.offsetX - sliderInner.offsetLeft;
    
                // 滑鼠手手變成grabbing
                slider.style.cursor = 'grabbing';
                // 開啟開關（代表現在是在抓的狀態）
                isdraggin = true;
            }
        }

        // 當滑鼠移進去slider區域，滑鼠鼠標變成可以抓取的手手
        const mouseEnter = (event) => {
            slider = event.target;
            slider.style.cursor = 'pointer';
        }
        const mouseUp = () => {
            slider.style.cursor = 'grab';
        }

        // 避免滑出 slider 的範圍結果滑鼠鬆開時沒關閉開
        window.addEventListener('mouseup', (event) => {
            isdraggin = false;
        });


        function mouseMove(event) {
            // 如果 現在不是在抓的狀態就不能拖曳
            if (!isdraggin) return;
            event.preventDefault();
            x = event.offsetX;
     
            // 用「event.target.childNodes[0]」更新「sliderInner」
            slider = event.target;
            sliderInner = event.target.childNodes[0];
            // 整個卡片容器設定 absolute 了，所以可以控制 left 達到拖曳移動的效果
            sliderInner.style.left = `${x - startx}px`;

            checkBoundary();
        }
        // 確認目前位置
        function checkBoundary () {
            if (sliderInner) {
                outer = slider.getBoundingClientRect();
                inner = sliderInner.getBoundingClientRect();

                // 左邊滑到底了！！
                if (parseInt(sliderInner.style.left) > 0) {
                    sliderInner.style.left = '0px';
                } else if (inner.right < outer.right) {
                    // 右邊滑到底了！！
                    sliderInner.style.left = `-${inner.width - outer.width}px`;
                }    
            }
        }
        checkBoundary();


        return {
            ranking, monthID, newID, sliderInnerMaxlength, myFavorite,
            mouseDown, mouseMove, mouseEnter, mouseUp,
            changeTab, rankID,
            goLike, goLink, heartHover, heartLeave
        }
    }
}
</script>

<template data-bs-theme="dark">
    <div class="blank"></div>
    <div class="container">
        <section>
            <div class="title">
                <h3>暢銷排行榜</h3>
                <!-- <a>所有商品</a> -->
            </div>
            <ul class="tab">
                <li @click="changeTab(1)" :class="{'active': rankID == 1}">
                    <a>隱形眼鏡</a>
                </li>
                <li @click="changeTab(2)" :class="{'active': rankID == 2}">
                    <a>週邊保健</a>
                </li>
            </ul>

            <div class="product-wrap" v-show="rankID == 1">
                <div @mousedown="mouseDown" @mousemove="mouseMove" @mouseenter="mouseEnter" @mouseup="mouseUp" class="slider">
                    <div class="slider-inner" :style="{ maxWidth: sliderInnerMaxlength[0] + 'px' }">
                        <div v-for="(item, id) in ranking[1]" :key="item.photoSrc" class="product-item">
                            <div class="image-box">
                                <div class="tag">{{ id+1 }}</div>
                                <i class="bi" :class="{'bi-suit-heart': !myFavorite.includes(item.PID), 'bi-suit-heart-fill': myFavorite.includes(item.PID)}" @click="goLike(item.PID, $event)" @mouseenter="heartHover" @mouseleave="heartLeave"></i>
                                <i class="bi bi-box-arrow-right" @click="goLink(item.PID)" @mouseenter="heartHover" @mouseleave="heartLeave"></i>
                                <a href="javascript:;">
                                    <img :src="item.photoSrc">
                                </a>
                            </div>
                            <div class="content">
                                <h4>{{ item.type }}</h4>
                                <p>
                                    <span>{{ item.title }}</span>
                                    <span>{{ item.price }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-wrap" v-show="rankID == 2">
                <div @mousedown="mouseDown" @mousemove="mouseMove" @mouseenter="mouseEnter" @mouseup="mouseUp" class="slider">
                    <div class="slider-inner" :style="{ maxWidth: sliderInnerMaxlength[1] + 'px' }">
                        <div v-for="(item, id) in ranking[2]" :key="item.photoSrc" class="product-item">
                            <div class="image-box">
                                <div class="tag">{{ id+1 }}</div>
                                <i class="bi" :class="{'bi-suit-heart': !myFavorite.includes(item.PID), 'bi-suit-heart-fill': myFavorite.includes(item.PID)}" @click="goLike(item.PID, $event)" @mouseenter="heartHover" @mouseleave="heartLeave"></i>
                                <i class="bi bi-box-arrow-right" @click="goLink(item.PID)" @mouseenter="heartHover" @mouseleave="heartLeave"></i>
                                <a href="javascript:;">
                                    <img :src="item.photoSrc">
                                </a>
                            </div>
                            <div class="content">
                                <h4>{{ item.type }}</h4>
                                <p>
                                    <span>{{ item.title }}</span>
                                    <span>{{ item.price }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="title">
                <h3>本月主打</h3>
                <!-- <a>所有商品</a> -->
            </div>
            <ul class="tab">
                <li @click="changeTab(3)" :class="{'active': monthID == 3}">
                    <a>透明日拋</a>
                </li>
                <li @click="changeTab(4)" :class="{'active': monthID == 4}">
                    <a>彩色日拋</a>
                </li>
            </ul>
            <div class="product-wrap" v-if="monthID == 3">
                <div @mousedown="mouseDown" @mousemove="mouseMove" @mouseenter="mouseEnter" @mouseup="mouseUp" class="slider">
                    <div class="slider-inner" :style="{ maxWidth: sliderInnerMaxlength[2] + 'px' }">
                        <div v-for="(item, id) in ranking[3]" :key="item.photoSrc" class="product-item">
                            <div class="image-box">
                                <div class="tag">{{ id+1 }}</div>
                                <i class="bi" :class="{'bi-suit-heart': !myFavorite.includes(item.PID), 'bi-suit-heart-fill': myFavorite.includes(item.PID)}" @click="goLike(item.PID, $event)" @mouseenter="heartHover" @mouseleave="heartLeave"></i>
                                <i class="bi bi-box-arrow-right" @click="goLink(item.PID)" @mouseenter="heartHover" @mouseleave="heartLeave"></i>
                                <a href="javascript:;">
                                    <img :src="item.photoSrc">
                                </a>
                            </div>
                            <div class="content">
                                <h4>{{ item.type }}</h4>
                                <p>
                                    <span>{{ item.title }}</span>
                                    <span>{{ item.price }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-wrap" v-if="monthID == 4">
                <div @mousedown="mouseDown" @mousemove="mouseMove" @mouseenter="mouseEnter" @mouseup="mouseUp" class="slider">
                    <div class="slider-inner" :style="{ maxWidth: sliderInnerMaxlength[3] + 'px' }">
                        <div v-for="(item, id) in ranking[4]" :key="item.photoSrc" class="product-item">
                            <div class="image-box">
                                <div class="tag">{{ id+1 }}</div>
                                <i class="bi" :class="{'bi-suit-heart': !myFavorite.includes(item.PID), 'bi-suit-heart-fill': myFavorite.includes(item.PID)}" @click="goLike(item.PID, $event)" @mouseenter="heartHover" @mouseleave="heartLeave"></i>
                                <i class="bi bi-box-arrow-right" @click="goLink(item.PID)" @mouseenter="heartHover" @mouseleave="heartLeave"></i>
                                <a href="javascript:;">
                                    <img :src="item.photoSrc">
                                </a>
                            </div>
                            <div class="content">
                                <h4>{{ item.type }}</h4>
                                <p>
                                    <span>{{ item.title }}</span>
                                    <span>{{ item.price }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="title">
                <h3>活動商品</h3>
            </div>
            <ul class="tab">
                <li @click="changeTab(5)" :class="{'active': newID == 5}" class="width50">
                    <a>遊樂園月拋新上市</a>
                </li>
                <li @click="changeTab(6)" :class="{'active': newID == 6}" class="width50">
                    <a>Candymagic 秋冬購物祭</a>
                </li>
            </ul>
            <div class="" v-if="newID == 5">
                <div class="new-pic">
                    <img src="https://app.youngman.com.tw/images/WebActivity/4520571064.jpeg" alt="">
                </div>
                <div class="product-wrap flex">
                    <div v-for="item in ranking[5]" :key="item.photoSrc" class="product-item">
                        <div class="image-box">
                            <i class="bi" :class="{'bi-suit-heart': !myFavorite.includes(item.PID), 'bi-suit-heart-fill': myFavorite.includes(item.PID)}" @click="goLike(item.PID, $event)"></i>
                            <router-link :to="`/product_detail/${item.PID}`">
                                <img :src="item.photoSrc">
                            </router-link>
                        </div>
                        <div class="content">
                            <h4>{{ item.type }}</h4>
                            <p>
                                <span>{{ item.title }}</span>
                                <span>{{ item.price }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="" v-if="newID == 6">
                <div class="new-pic">
                    <img src="https://app.youngman.com.tw/images/WebActivity/4520571204.jpeg" alt="">
                </div>
                <div class="product-wrap flex">
                    <div v-for="item in ranking[6]" :key="item.photoSrc" class="product-item">
                        <div class="image-box">
                            <i class="bi" :class="{'bi-suit-heart': !myFavorite.includes(item.PID), 'bi-suit-heart-fill': myFavorite.includes(item.PID)}" @click="goLike(item.PID, $event)"></i>
                            <router-link :to="`/product_detail/${item.PID}`">
                                <img :src="item.photoSrc">
                            </router-link>
                        </div>
                        <div class="content">
                            <h4>{{ item.type }}</h4>
                            <p>
                                <span>{{ item.title }}</span>
                                <span>{{ item.price }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
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
    .slider {
        max-width: 100%;
        margin: 0 auto;
        height: 530px;
        overflow: hidden;
        position: relative;
    }
    .slider-inner {
        width: 300%;
        display: flex;
        position: absolute;
        top: 0;
        left: 0;

        /* 要不然會一直把圖片拉出來 */
        pointer-events: none;
    }
    .card img {
        max-width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        object-position: center center;
    }
    .container {
        max-width: 1300px;
        margin: auto;

        section {
            margin-top: 20px;
            .title {
                display: flex;
                justify-content: space-between;
    
                h3 {
                    font-weight: 700;
                    font-size: 32px;
                }
                a {
                    display: block;
                    width: 160px;
                    line-height: 44px;
                    text-align: center;
                    border: 1px solid black;
                    border-radius: 16px;
                    color: black;
                    font-weight: 500;
                    cursor: pointer;
    
                    &:hover {
                        background-color: black;
                        color: white;
                    }
                }
            }
            .tab {
                width: 100%;
                margin: 10px 0 40px 0;
                display: flex;
    
                li {
                    width: calc(100% / 4);
                    min-height: 48px;
                    text-align: center;
                    border-bottom: 1px solid #e5e5e5;
                    transition: font-size .2s linear;
    
                    a {
                        display: block;
                        padding: 10px 0;
                    }
                    &.active {
                        border-color: black;
                    }
                }
                li:hover {
                    font-size: 18px;
                    cursor: pointer;
    
                    a {
                        color: rgba(0, 0, 0, 0.5);
                    }
                }
            }
            .product-wrap.flex {
                display: flex;
            }
            .product-item {
                max-width: 415px;
                margin-right: 25px;

                .image-box {
                    position: relative;
                    border-radius: 16px;

                    &:hover {
                        box-shadow: 20px 20px 20px rgba(229, 229, 229, 0.7607843137), 
                                    -20px -20px 20px rgba(229, 229, 229, 0.7607843137);

                        img {
                            transform: scale(0.95);
                        }
                    }
                    .tag {
                        width: 50px;
                        height: 50px;
                        background: #cfc5b9;
                        color: #fff;
                        border-radius: 16px 0 0 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 2;

                        &::before {
                            content: '';
                            width: 0;
                            height: 0;
                            border-top: 15px solid #cfc5b9;
                            border-right: 25px solid transparent;
                            position: absolute;
                            top: 50px;
                            left: 0;
                        }
                        &::after {
                            content: '';
                            width: 0;
                            height: 0;
                            border-top: 15px solid #cfc5b9;
                            border-left: 25px solid transparent;
                            position: absolute;
                            top: 50px;
                            right: 0;
                        }
                    }
                    i {
                        position: absolute;
                        top: 15px;
                        right: 24px;
                        z-index: 10;
                        font-size: 30px;
                        color: rgb(183, 189, 198);
                        cursor: pointer;

                        // 利用pointer-events穿透上層的div，這樣才點的到愛心！！
                        pointer-events: fill;

                        &:hover {
                            color: black;
                        }
                        &.bi-suit-heart-fill {
                            color: red;

                            &:hover {
                                filter: brightness(2);
                            }
                        }
                        &.bi-box-arrow-right {
                            top: initial;
                            bottom: 10px;
                        }
                    }
                    a {
                        display: block;
                        border-radius: 16px;
                        border: 1px solid #e5e5e5;
    
                        img {
                            width: 100%;
                            min-height: 413px;
                            object-fit: cover;
                            border-radius: 16px;
                            background-position: left center;
                            transition: all .5s linear;
                        }
                    }
                }
                .content {
                    padding: 20px;
                    font-weight: bolder;
                    
                    h4 {
                        text-align: left;
                    }
                    p {
                        margin-top: 5px;

                        span {
                            &:last-child {
                                font-size: 18px;
                                color: blue;
                                display: block;
                            }
                        }
                    }
                }
            }
            .new-pic {
                border-radius: 24px;
                overflow: hidden;
                margin-bottom: 40px;

                img {
                    width: 100%;
                }
            }
        }
    }

    // 手機版
	@media screen and (min-width: 0px) and (max-width: 490px) {
        .blank {
            height: 50px;
        }
        .slider {
            max-width: none;
            height: 320px;
            overflow: scroll;
        }
        .slider-inner {
            width: fit-content;
        }
        .container {
            max-width: none;
            padding: 0 20px;

            section {
                min-width: 100%;

                .product-wrap {
                    overflow: scroll;
                }
                .title {
                    align-items: center;

                    h3 {
                        font-size: 28px;
                    }
                    a {
                        width: 130px;
                    }
                }
                .tab {
                    margin-bottom: 20px;
                    li {
                        min-width: 120px;
                        font-size: 16px;

                        &:hover {
                            font-size: 18px;
                        }
                        &.width50 {
                            width: 50%;
                            font-size: 14px;
                        }
                    }
                    
                }
                .product-item {
                    min-width: 170px;
                    margin-right: 10px;

                    .image-box {
                        max-width: 170px;
                        .tag {
                            width: 40px;
                            height: 40px;

                            &::before {
                                border-top: 8px solid #cfc5b9;
                                border-right: 20px solid transparent;
                                top: 40px;
                            }
                            &::after {
                                border-top: 8px solid #cfc5b9;
                                border-left: 20px solid transparent;
                                top: 40px;
                            }
                        }
                        i {
                            font-size: 22px;
                            top: 10px;
                            right: 14px;
                            z-index: 2;
                        }
                        a img {
                            min-height: auto;
                        }
                    }
                    .content {
                        padding: 10px 0;
                        font-size: 14px;

                        h4 {
                            font-size: 20px;
                        }
                        p span:last-child {
                            font-size: 16px;
                        }
                    }
                }
            }
        }
    }
</style>