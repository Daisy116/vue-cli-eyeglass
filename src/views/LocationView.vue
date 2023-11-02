<script>
import { onMounted, reactive, ref, watch } from 'vue';
import axios from "axios";

export default {
    setup() {
        let isLoading = ref(true);
        const cityActive = ref("");
        const areaActive = ref("");
        const storeActive = ref("");
        const location = reactive({
            city: [],
            area: [],
            store: []
        });
        const searchData = reactive({ store: [] });

        onMounted(() => {
            axios.get("https://run.mocky.io/v3/8a666df0-cd9e-4765-ac09-f9297ea7c531")
            .then(res => {
                // 取得city資訊
                location.city = res.data.city;
                location.store = res.data.store;
                searchData.store = location.store;

                isLoading.value = !isLoading.value;
            })
        });

        // 切換城市city
        watch(cityActive, (newCity) => {
            // 選擇預設的第一個，恢復預設(全選)
            if(newCity == '') {
                searchData.store = location.store;
                location.area = [];
                areaActive.value = "";
                return;
            }
            areaActive.value = "";
            storeActive.value = "";
            searchData.store = location.store;

            // 取得area資訊
            const newArr = location.city.filter(city => city.name === newCity);
            location.area = newArr[0].area;

            const newStore = [];
            location.area.forEach(item => {
                newStore.push(...item["store-id"]);
            });
            searchData.store = searchData.store.filter(store => newStore.includes(store.id));
        });
        
        // 切換區域
        watch(areaActive, (newArea) => {
            // 選擇預設的第一個，恢復預設(全選)
            if(newArea == '') {
                if (cityActive.value != '') {
                    const newArr = location.city.filter(city => city.name === cityActive.value);
                    location.area = newArr[0].area;
    
                    const newStore = [];
                    location.area.forEach(item => {
                        newStore.push(...item["store-id"]);
                    });
                    searchData.store = location.store.filter(store => newStore.includes(store.id));
                    
                    return;
                }
                if (cityActive.value == '') {
                    console.log("here");
                    return;
                }
            }
            storeActive.value = "";

            const newArr = location.area.filter(area => area.name === newArea);
            console.log(newArr, location);
            const newStore = newArr[0]["store-id"];
            searchData.store = location.store.filter(store => newStore.includes(store.id));
        });
        
        // 切換門市
        watch(storeActive, (newItem) => {
            // 選擇預設的第一個，恢復預設(全選)
            if(newItem == '') {
                // 若區域area為空
                if (areaActive.value == '') {
                    const newStore = [];
                    location.area.forEach(item => {
                        newStore.push(...item["store-id"]);
                    });
                    searchData.store = location.store.filter(store => newStore.includes(store.id));
                } else { // 若區域area不為空
                    const newArr = location.area.filter(area => area.name === areaActive.value);
                    const newStore = newArr[0]["store-id"];
                    searchData.store = location.store.filter(store => newStore.includes(store.id));
                }
                // 若城市city為空
                if (cityActive.value == '') {
                    searchData.store = location.store;
                }
                return;
            }
            searchData.store = location.store.filter(item => item.id === newItem);
        });

        return {
            location, searchData,
            cityActive, areaActive, storeActive,
            isLoading
        };
    }
}
</script>

<template>
    <div class="container">
        <form>
            <h3>門市查詢</h3>
            <select v-model="cityActive">
                <option value>請選擇縣市</option>
                <option 
                    v-for="item in location.city" 
                    :value="item.name" 
                    :key="item.name">
                    {{ item.name }}
                </option>
            </select>
            <select v-model="areaActive">
                <option value>請選擇區域</option>
                <option 
                    v-for="item in location.area"
                    :value="item.name"
                    :key="item.name">
                    {{ item.name }}
                </option>
            </select>
            <select v-model="storeActive">
                <option value>所有門市</option>
                <option 
                    v-for="item in searchData.store"
                    :value="item.id"
                    :key="item.name">
                    {{ item.name }}
                </option>
            </select>
        </form>
        <table>
            <thead>
                <tr>
                    <th>門市名稱</th>
                    <th>門市電話</th>
                    <th>門市地址</th>
                    <th>營業時間</th>
                    <th>營業人</th>
                    <th>Google Map</th>
                </tr>
            </thead>
            <tbody>
                <tr v-show="!isLoading" v-for="item in searchData.store" :key="item.id">
                    <td data-th="門市名稱">{{ item.name }}</td>
                    <td data-th="門市電話">{{ item.phone }}</td>
                    <td data-th="門市地址">{{ item.address }}</td>
                    <td data-th="營業時間">{{ item["open-time"] }}</td>
                    <td data-th="營業人">{{ item.people }}</td>
                    <td data-th="Google Map">
                        <a :href="item.map">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                            </svg>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- loading的svg -->
        <svg v-show="isLoading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <g transform="rotate(0 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
            </rect>
            </g><g transform="rotate(30 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
            </rect>
            </g><g transform="rotate(60 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
            </rect>
            </g><g transform="rotate(90 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
            </rect>
            </g><g transform="rotate(120 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
            </rect>
            </g><g transform="rotate(150 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
            </rect>
            </g><g transform="rotate(180 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
            </rect>
            </g><g transform="rotate(210 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
            </rect>
            </g><g transform="rotate(240 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
            </rect>
            </g><g transform="rotate(270 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
            </rect>
            </g><g transform="rotate(300 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
            </rect>
            </g><g transform="rotate(330 50 50)">
            <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#fe718d">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
            </rect>
            </g>
        </svg>
    </div>
</template>

<style lang="scss" scoped>
    .container {
        max-width: 1300px;
        min-height: 780px;
        margin-top: 84px;

        form {
            padding: 40px 0;
            color: #0E387B;
            text-align: center;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 50px;

            h3 {
                width: 100%;
                font-size: 32px;
                position: relative;

                &::after {
                    content: '';
                    display: block;
                    width: 80px;
                    height: 2px;
                    background-color: #E50012;
                    position: absolute;
                    left: 50%;
                    bottom: -5px;
                    transform: translateX(-50%);
                }
            }
            select {
                width: 20%;
                height: 34px;
                padding: 0 16px;
                color: #5B5B5B;
                border: 1px solid #9BA2AD;
                border-radius: 16px;
                outline: none;

                appearance: none;
                background: url("https://www.youngman.com.tw/images/arrow.png") no-repeat scroll center transparent;
                background-size: 10px;
                background-position: right 16px bottom 50%;
            }
        }
        table {
            width: 100%;
            text-align: center;

            thead {
                background-color: #0E387B;
                color: #fff;

                th {
                    padding: 18px 5px;
                }
            }
            tbody {
                td {
                    padding: 18px 5px;
                    border-bottom: 1px solid #9BA2AD;
                }
            }
        }
        svg {
            width: 100%;
            max-height: 500px;
            margin: 0 auto;
            background:#fff;
            display:block;
        }
    }

    // 手機版
	@media screen and (min-width: 0px) and (max-width: 490px) {
        .container {
            margin-top: 40px;

            form {
                padding: 30px 0 10px 0;
                justify-content: space-between;
                gap: 20px;
                border-bottom: 1px solid #9BA2AD;

                select {
                    width: 45%;

                    &:last-child {
                        width: 50%;
                        transform: translate(50%, -10px);
                    }
                }
            }
            table {
                thead {
                    display: none;
                }
                tbody {
                    tr {
                        border-bottom: 1px solid #9BA2AD;

                        td {
                            display: flex;
                            border: none;
                            padding: 10px 5px;

                            &::before {
                                // 用attr()取得th名稱！
                                content: attr(data-th);
                                width: 100px;
                                color: #0E387B;
                                font-weight: bolder;
                                text-align: left;
                            }
                        }
                    }
                }
            }
        }
    }
</style>