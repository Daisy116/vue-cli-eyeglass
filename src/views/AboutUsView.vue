<script>
import $ from 'jquery';

export default {
    setup() {
        const clickTab = (str) => {
            let string = "#" + str;
            // 用offset()抓取該區塊的位置
            let top = $(string).offset().top;

            // 因為最上面有84px的navbar，所以要扣掉84！
            top = top - 84;
            $("html, body").animate({scrollTop: top}, 400);
        };
        
        return {
            clickTab
        };
    }
};
</script>

<template>
    <div class="container">
        <h1>關於Young Man 年青人眼鏡</h1>
        <ul class="tab">
            <li>
                <a @click="clickTab('about1')">企業沿革</a>
            </li>
            <li>
                <a @click="clickTab('about2')">服務項目</a>
            </li>
            <li>
                <a @click="clickTab('about3')">會員服務</a>
            </li>
        </ul>
        <section id="about1">
            <h2>企業沿革</h2>
            <p>台灣配戴眼鏡的人數越來越多，因為視力的問題而深受困擾的民眾也一直增加，街頭林立的眼鏡行正如雨後春筍般的紛紛開設。</p>
            <p>我們秉持著專業貼心的精神，爲眾多眼鏡族解決視力問題帶來的困擾。</p>
            <p>年青人眼鏡給您最優質的服務，絕對是您最佳的選擇。</p>
            <div class="imgbox">
                <img src="~@/assets/images/eyeglass4.jpeg">
                <img src="~@/assets/images/eyeglass5.png">
            </div>
        </section>
        <section id="about2">
            <h2>服務項目</h2>
            <h4>驗配眼鏡｜免費保養｜專業諮詢</h4>
            <ul class="listbox">
                <li>
                    <img src="~@/assets/images/eyeglass6.png" alt="">
                    <div>
                        <h4>驗配眼鏡</h4>
                        <ul>
                            <li>驗配軟、硬式隱形眼鏡</li>
                            <li>近視、遠視、散光、老花、弱視、二用雙光鏡片、多焦點鏡片、斜視鏡片、色盲鏡片</li>
                            <li>世界各大名牌眼鏡批發零售</li>
                        </ul>
                    </div>
                </li>
                <li>
                    <img src="~@/assets/images/eyeglass7.png" alt="">
                    <div>
                        <h4>免費保養</h4>
                        <ul>
                            <li>免費更換零件</li>
                            <li>視力保健檢查</li>
                            <li>清洗、保養、消毒隱形眼鏡</li>
                            <li>調整鏡框、清洗眼鏡</li>
                            <li>關懷弱視兒童視力檢查</li>
                        </ul>
                    </div>
                </li>
                <li>
                    <img src="~@/assets/images/eyeglass8.png" alt="">
                    <div>
                        <h4>專業諮詢</h4>
                        <ul>
                            <li>提供視力及眼鏡之專業諮詢</li>
                            <li>驗配眼鏡及硬式隱形眼鏡</li>
                            <li>驗配漸進多焦點眼鏡</li>
                            <li>雙眼視力及立體視覺檢查</li>
                        </ul>
                    </div>
                </li>
            </ul>
        </section>
        <section id="about3">
            <h2>會員服務</h2>
            <ul class="listbox">
                <li>
                    <img src="~@/assets/images/eyeglass6.png" alt="">
                    <div>
                        <h4>會員卡使用須知</h4>
                        <ul>
                            <li>點數累積是以折扣優惠或使用抵用卷後所支付之實際金額為準</li>
                            <li>每消費NT$100元即可累積2點紅利點數</li>
                            <li>每100點紅利點數可折抵NT$100元之金額，不同會員卡號不得折抵同一筆消費</li>
                            <li>系統折抵以20點紅利點數為單位換算可折抵之金額， 紅利點數不足20點之點數將繼續累積</li>
                            <li>紅利點數之累積與折抵限當場消費當場使用</li>
                            <li>為確保顧客權益，請於來店消費時務必攜帶會員卡</li>
                        </ul>
                    </div>
                </li>
            </ul>
        </section>
        <div class="home-btn">
            <router-link to="/">回到首頁</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    * {
        color: black;
    }
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
            font-size: 20px;
            margin-bottom: .3em;
        }
        .tab {
            width: 100%;
            display: flex;
            justify-content: space-around;

            li {
                width: calc(100% / 3);
                padding: 10px;
                text-align: center;
                border-bottom: 1px solid #e5e5e5;

                a {
                    display: block;
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
                    font-size: 24px;
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
            .listbox li {
                
            }
        }
        
    }
</style>