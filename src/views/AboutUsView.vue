<script>
import $ from 'jquery';
import TextFontSize from "@/components/_TextFontSize.vue";
import { ref, watch } from 'vue';
import { useI18n } from "vue-i18n";

export default {
    components: {
        TextFontSize
    },
    setup() {
        // 使用useI18n實作語系切換
	    const { t, locale } = useI18n();
        // 用watch監控是否切換了語系
        watch(locale, (newlocale) => {
            localStorage.setItem("locale", newlocale);
        });

        // 點擊頁籤後，瀏覽器卷軸移動到該標籤
        const clickTab = (str) => {
            let string = "#" + str;
            // 用offset()抓取該區塊的位置
            let top = $(string).offset().top;

            // 因為最上面有84px的navbar，所以要扣掉 84！
            top = top - 84;
            $("html, body").animate({scrollTop: top}, 400);
        };

        const postFontSize = ref(20);
        watch(postFontSize, n => {
            const dom_p = document.querySelectorAll(".container p");
            const dom_h2 = document.querySelectorAll(".container h2");
            const dom_h4 = document.querySelectorAll(".container h4");
            const dom_li = document.querySelectorAll(".container .listbox > li > div > ul > li");
            
            dom_p.forEach(item => {
                item.style.cssText  = "font-size: " + n + "px;";
            });
            dom_h2.forEach(item => {
                // h2的初始font-size為30，所以n要加10
                item.style.cssText  = "font-size: " + (n+10) + "px;";
            });
            dom_h4.forEach(item => {
                item.style.cssText  = "font-size: " + n + "px;";
            });
            dom_li.forEach(item => {
                // li的初始font-size為16，所以n要減4
                item.style.cssText  = "font-size: " + (n-4) + "px;";
            });
        })
        
        return {
            t, locale,
            clickTab,
            postFontSize
        };
    }
};
</script>

<template>
    <TextFontSize 
        @enlarge-text="postFontSize += 0.5" 
        @smaller-text="postFontSize -= 0.5"
    />

    <div class="container">
        <h1>{{ t("about-h1") }}</h1>
        <ul class="tab">
            <li>
                <a @click="clickTab('about1')">{{ t("footer-about1") }}</a>
            </li>
            <li>
                <a @click="clickTab('about2')">{{ t("footer-about2") }}</a>
            </li>
            <li>
                <a @click="clickTab('about3')">{{ t("footer-about3") }}</a>
            </li>
        </ul>
        <section id="about1">
            <h2>{{ t("footer-about1") }}</h2>
            <p>{{ t("about1-p1") }}</p>
            <p>{{ t("about1-p2") }}</p>
            <p>{{ t("about1-p3") }}</p>
            <div class="imgbox">
                <img src="~@/assets/images/eyeglass4.jpeg">
                <img src="~@/assets/images/eyeglass5.png">
            </div>
        </section>
        <section id="about2">
            <h2>{{ t("footer-about2") }}</h2>
            <h4>{{ t("about-service-title") }}</h4>
            <ul class="listbox">
                <li>
                    <img src="~@/assets/images/eyeglass6.png" alt="">
                    <div>
                        <h4>{{ t("about-service1") }}</h4>
                        <ul>
                            <li>{{ t("about-service1-li1") }}</li>
                            <li>{{ t("about-service1-li2") }}</li>
                            <li>{{ t("about-service1-li3") }}</li>
                        </ul>
                    </div>
                </li>
                <li>
                    <img src="~@/assets/images/eyeglass7.png" alt="">
                    <div>
                        <h4>{{ t("about-service2") }}</h4>
                        <ul>
                            <li>{{ t("about-service2-li1") }}</li>
                            <li>{{ t("about-service2-li2") }}</li>
                            <li>{{ t("about-service2-li3") }}</li>
                            <li>{{ t("about-service2-li4") }}</li>
                            <li>{{ t("about-service2-li5") }}</li>
                        </ul>
                    </div>
                </li>
                <li>
                    <img src="~@/assets/images/eyeglass8.png" alt="">
                    <div>
                        <h4>{{ t("about-service3") }}</h4>
                        <ul>
                            <li>{{ t("about-service3-li1") }}</li>
                            <li>{{ t("about-service3-li2") }}</li>
                            <li>{{ t("about-service3-li3") }}</li>
                            <li>{{ t("about-service3-li4") }}</li>
                        </ul>
                    </div>
                </li>
            </ul>
        </section>
        <section id="about3">
            <h2>{{ t("footer-about3") }}</h2>
            <ul class="listbox">
                <li>
                    <img src="~@/assets/images/eyeglass6.png" alt="">
                    <div>
                        <h4>{{ t("about-member-title") }}</h4>
                        <ul>
                            <li>{{ t("about-member-li1") }}</li>
                            <li>{{ t("about-member-li2") }}</li>
                            <li>{{ t("about-member-li3") }}</li>
                            <li>{{ t("about-member-li4") }}</li>
                            <li>{{ t("about-member-li5") }}</li>
                            <li>{{ t("about-member-li6") }}</li>
                        </ul>
                    </div>
                </li>
            </ul>
        </section>
        <div class="home-btn">
            <router-link to="/">{{ t("return-home") }}</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    * {
        color: black;
    }
    ul {
        padding: 0;
    }
    
    $post-pont-size: 20px;

    .container {
        max-width: 1300px;
        margin-top: 84px;

        h1 {
            font-size: 32px;
            font-weight: 700;
            padding: 30px 0;
        }
        h2 {
            font-size: 30px;
            font-weight: 500;
            padding: 30px 0;
        }
        h4 {
            font-size: 20px;
            text-align: left;
        }
        p {
            // font-size: 20px;
            font-size: $post-pont-size;
            margin-bottom: .3em;
        }
        .tab {
            width: 100%;
            display: flex;
            justify-content: space-around;

            li {
                width: calc(100% / 3);
                text-align: center;
                border-bottom: 1px solid #e5e5e5;

                a {
                    display: block;
                    padding-bottom: 10px;

                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            li:hover {
                border-color: black;
                cursor: pointer;

                a {
                    color: rgba(0, 0, 0, 0.5);
                }
            }
        }
        .imgbox {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            img {
                width: 1200px;
                vertical-align: middle;
            }
        }
        .listbox >li {
            display: flex;
            align-items: center;
            margin: 30px 0;
            padding: 30px;
            border: 1px solid #c7c4c4;
            border-radius: 20px;

            >div {
                padding-left: 40px;

                >h4 {
                    font-size: 20px;
                }
                >ul {
                    margin-top: 8px;

                    >li {
                        list-style: disc;
                        margin-left: 25px;
                        font-size: 16px;
                        letter-spacing: 1px;
                    }
                }
            }
        }
        #about3 h2 {
            padding-bottom: 0;
        }
        .home-btn {
            width: 100%;
            margin-bottom: 30px;
            display: flex;
            justify-content: center;

            a {
                width: 200px;
                line-height: 44px;
                text-align: center;
                border: 1px solid black;
                border-radius: 16px;

            }
            a:hover {
                background-color: black;
                color: white;
            }
        }
    }

    // 手機版
	@media screen and (min-width: 0px) and (max-width: 490px) {
        .container {
            margin-top: 40px;

            .tab li {
                width: 30%;
            }
            .imgbox img {
                width: 90%;
            }
            .listbox {
                padding: 0;

                li {
                    margin-top: 0;
                    padding: 10px;

                    img {
                        width: 116px;
                    }
                    h4 {
                        font-size: 20px !important;
                    }
                    ul {
                        padding: 0;

                        li {
                            padding: 0;
                            letter-spacing: 0 !important;
                        }
                    }
                }
            }
        }
        
    }
</style>