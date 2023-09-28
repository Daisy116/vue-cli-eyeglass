<script>
import photo1 from '@/assets/images/eyeglass9.png';
import photo2 from '@/assets/images/eyeglass10.jpeg';
import { reactive, ref } from 'vue';

export default {
    setup() {
        const idx = ref(0);
        const newsBanner = reactive([
            {
                photoSrc: photo1,
                title: "魔麗冰心日拋3送1",
                dates: "2023-09-04"
            },
            {
                photoSrc: photo2,
                title: "綠色美瞳買1送1",
                dates: "2023-09-09"
            }
        ]);
        const goPre = () => {
            if (idx.value == 0) {
                idx.value = 1;
            } else {
                idx.value--;
            }
        };
        const goNext = () => {
            if (idx.value == 1) {
                idx.value = 0;
            } else {
                idx.value++;
            }
        };
        console.log(idx);

        return {
            idx,
            newsBanner,
            goPre,
            goNext
        };
    }
}
</script>

<template>
    <div class="blank"></div>
    <div class="container">
        <h1>最新消息</h1>
        <div class="news-banner">
            <img :src="newsBanner[idx].photoSrc">
            <div class="wrap">
                <div>
                    <h2>{{ newsBanner[idx].title }}</h2>
                    <p>{{ newsBanner[idx].dates }}</p>
                </div>
                <div class="home-btn">
                    <router-link to="/">回到首頁</router-link>
                </div>
            </div>
        </div>
        <div class="page-wrap">
            <a @click="goPre" href="javascript:;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
            </a>
            <a @click="goNext" href="javascript:;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .blank {
        height: 83px;
    }
    .container {
        max-width: 1300px;
        margin: auto;

        h1 {
            font-size: 32px;
            font-weight: 700;
            padding: 30px 0;
        }
        h2 {
            font-size: 48px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        .news-banner {
            display: flex;
            align-items: center;

            img {
                width: 590px;
                min-height: 590px;
                border-radius: 24px;
            }
            .wrap {
                padding-left: 40px;

                .home-btn {
                    margin-top: 30px;

                    a {
                        display: block;
                        width: 160px;
                        line-height: 44px;
                        text-align: center;
                        border: 1px solid black;
                        border-radius: 16px;
                        color: black;
                        font-weight: 500;
                    }
                    a:hover {
                        background-color: black;
                        color: white;
                    }
                }
            }
        }
        .page-wrap {
            margin: 50px 0;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;

            a {
                color: #474d57;
                padding: 10px;
            }
            a+a {
                margin-left: 10px;
            }
            a:hover {
                background-color: #e9ecef;
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
                padding-bottom: 10px;
            }
            h2 {
                font-size: 28px;
            }
            .news-banner {
                flex-direction: column;

                img {
                    width: 100%;
                    min-height: 390px;
                }
                .wrap {
                    width: 100%;
                    margin-top: 5px;
                    padding-left: 5px;
                    display: flex;
                    align-items: center;
                    
                    .home-btn {
                        margin: auto;
                        
                        a {
                            width: 118px;
                        }
                    }
                }
            }
            .page-wrap {
                margin: 0 0 15px 0;
            }
        }
    }
</style>