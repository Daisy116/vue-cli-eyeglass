<script>
import { ref } from 'vue';

export default {
    setup() {
        const submit = (e) => {
            e.preventDefault();
            const form = document.querySelectorAll("form")[1];
            console.log(form);
            if (form.reportValidity()) {
                
                // alert("送出");
            }
        };

        return {
            submit
        };
    }
}
</script>

<template>
    <div class="blank"></div>
    <div class="container">
        <h1>聯絡我們</h1>
        <div class="info-wrap">
            <div class="info">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                </svg>
                <span class="cursor">0800-700-881</span>
            </div>
            <p>如有任何疑問請隨時與我們聯繫</p>
        </div>
        <div class="form-wrap">
            <form action="">
                <input type="text" name="Name" placeholder="姓名" required>
                <input type="phone" name="Tel" placeholder="手機號碼" required>
                <input type="email" name="Email" placeholder="電子信箱">
                <select name="Country" id="">
                    <option value="">所在區域</option>
                    <option value="台北市">台北市</option>
                    <option value="基隆市">基隆市</option>
                    <option value="新北市">新北市</option>                    
                    <option value="宜蘭縣">宜蘭縣</option>                    
                    <option value="桃園市">桃園市</option>                    
                    <option value="新竹市">新竹市</option>                    
                    <option value="新竹縣">新竹縣</option>                   
                    <option value="苗栗縣">苗栗縣</option>                    
                    <option value="台中市">台中市</option>                    
                    <option value="彰化縣">彰化縣</option>                    
                    <option value="南投縣">南投縣</option>                    
                    <option value="嘉義市">嘉義市</option>                    
                    <option value="嘉義縣">嘉義縣</option>                    
                    <option value="雲林縣">雲林縣</option>                    
                    <option value="台南市">台南市</option>                    
                    <option value="高雄市">高雄市</option>                    
                    <option value="屏東縣">屏東縣</option>                    
                    <option value="花蓮縣">花蓮縣</option>                    
                    <option value="台東縣">台東縣</option>                    
                    <option value="澎湖縣">澎湖縣</option>
                </select>
                <textarea name="Contents" id="contents" cols="30" rows="10" placeholder="洽詢事項" required></textarea>
                <!-- <input type="text" name="authcode" placeholder="驗證碼"> -->
                
            </form>
            <div class="btn-wrap">
                <button type="reset">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
                    </svg>
                    重新填寫
                </button>
                <button @click="submit">送出</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .blank {
        height: 83px;
    }
    .container {
        h1 {
            font-size: 32px;
            text-align: center;
            margin: 30px 0;
        }
        .info-wrap {
            max-width: 744px;
            margin: 0 auto;
            padding: 24px 20px;
            background-color: #f3f5f9;
            border-radius: 20px;
            text-align: center;

            p {
                color: #707a8a;
                opacity: .7;
                margin-bottom: 0;
            }
            .info {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 32px;

                svg {
                    margin-right: 10px;
                }
                .cursor:hover {
                    color: #777;
                    cursor: pointer;
                }
            }
        }
        .form-wrap {
            margin: 30px 278px;

            input, select {
                width: 49%;
                height: 44px;
                margin-bottom: 24px;
                padding: 0 16px;
                border: 1px solid #707a8a;
                border-radius: 16px;
                outline: none;
                color: #707a8a;

                &:nth-child(even) {
                    margin-left: calc(2%);
                }
                &:nth-child(6) {
                    margin-left: 0;
                }
            }
            select {
                appearance: none;
                background: url("https://www.youngman.com.tw/images/arrow.png") no-repeat scroll center transparent;
                background-size: 10px;
                background-position: right 16px bottom 50%;
            }
            textarea {
                width: 100%;
                height: 100px;
                margin-bottom: 24px;
                padding: 14px 16px;
                border-radius: 16px;
                outline: none;
                color: #707a8a;
            }
            .btn-wrap {
                text-align: right;

                button {
                    width: 120px;
                    height: 44px;
                    border: 0;
                    border-radius: 16px;
                    font-weight: 600;

                    &:first-child {
                        background-color: transparent;
                        &:hover {
                            background-color: #000;
                            color: #fff;
                        }
                    }
                    &:last-child {
                        background-color: #000;
                        color: #fff;
                        margin-left: 10px;
                        &:hover {
                            background-color: #e10303;
                            color: #fff;
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
            h1 {
                font-size: 30px;
                text-align: left;
                margin: 25px 0 15px 0;
            }
            .info-wrap {
                .info {
                    font-size: 26px;
                }
                p {
                    opacity: 1;
                }
            }
            .form-wrap {
                margin: 20px 0;
                
                input, select {
                    width: 100%;
                    margin-bottom: 15px;

                    &:nth-child(even) {
                        margin-left: 0;
                    }
                }
                textarea {
                    margin-bottom: 15px;
                }
                .btn-wrap {
                    button {
                        width: 100%;

                        &:first-child {
                            color: #3ba5e7;
                            border: 1px solid #a5cee8;
                            &:hover {
                                background-color: #000;
                                color: #fff;
                            }
                        }
                        &:last-child {
                            margin-left: 0;
                            margin-top: 10px;
                            background-color: #e10303;
                        }
                    }
                    
                }
            }
        }
    }
</style>