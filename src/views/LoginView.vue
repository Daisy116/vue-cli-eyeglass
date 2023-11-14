<script>
import Login from  "@/components/Login.vue";
import Signup from  "@/components/Signup.vue";
import { ref } from 'vue';

export default {
    components: {
        Login,
        Signup,
    },
    setup() {
        const cur = ref(1);
        const tab = (num) => {
            if (num == 1) {
                cur.value = 1;
            }
            if (num == 2) {
                cur.value = 2;
            }
        }

        return {
            tab, cur,
        }
    }
}
</script>

<template>
    <div class="blank"></div>
    <div class="container">
        <form>
            <h1>登入／註冊</h1>
            <div class="tab">
                <ul>
                    <li :class="{active:cur==1}">
                        <a @click="tab(1)" href="javascript:;">會員登入</a>
                    </li>
                    <li :class="{active:cur==2}">
                        <a @click="tab(2)" href="javascript:;">註冊帳號</a>
                    </li>
                </ul>
            </div>
            <Login v-if="cur == 1" />
            <Signup v-if="cur == 2" />
        </form>
    </div>
</template>

<style lang="scss" scoped>
    * {
        padding: 0;
        margin: 0;
    }
    .blank {
        height: 83px;
    }
    .container {
        margin: 35px auto 80px;
        max-width: 360px;

        h1 {
            font-weight: 700;
            text-align: center;
        }
        .tab {
            margin: 30px 0;
            ul {
                display: flex;
                li {
                    width: 50%;
                    padding: 10px 0;
                    text-align: center;
                    border-bottom: 1px solid #e5e5e5;

                    &.active {
                        border-color: black;
                    }
                    a:hover {
                        color: #777;
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
    }
</style>