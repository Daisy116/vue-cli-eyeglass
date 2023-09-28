<script>
import { ref, watch } from 'vue';
import { useI18n } from "vue-i18n";
import $ from 'jquery';

export default {
  setup() {
    const { t, locale } = useI18n();
	const isSearch = ref(true);

	const goTop = () => {
		// 使用jQuery的scrollTop實作置頂功能，並用animate方法慢慢往上移
		$("html, body").animate({scrollTop: 0}, 400);
	};
	const goSearch = () => {
		isSearch.value = !isSearch.value;
	};

    watch(locale, (newlocale) => {
      localStorage.setItem("locale", newlocale);
    });

    return {
      t, 
      locale,
	  isSearch,
	  goTop,
	  goSearch
	};
  }
}
</script>

<template>
	<nav>
		<router-link to="/">
			<img src="https://www.youngman.com.tw/images/LOGO03.png" class="logo-image">
		</router-link>

        <ul v-show="isSearch">
            <li>
                <span>{{ t("navbar-about") }}</span>
                <div class="li-box">
                    <a href="">關於我們</a>
                    <a href="">門市查詢</a>
                    <a href="">聯絡我們</a>
                </div>
            </li>
            <li>
                <span>{{ t("navbar-news") }}</span>
                <div class="li-box">
                    <a href="">最新消息</a>
                    <a href="">優惠活動</a>
                </div>
            </li>
            <li>
                <span>{{ t("navbar-mall") }}</span>
            </li>
            <li>
                <span>{{ t("navbar-hidden") }}</span>
                <div class="li-box li-box2">
                    <a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000008">海昌</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000009">美若康</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000010">酷柏</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000011">加美</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000012">愛爾康</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000014">博士倫</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000015">晶碩</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000016">TICON 帝康</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000018">永恆之美</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000019">Syreni 希蕊妮</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000020">Candy Magic 魔幻糖果</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000021">NOBEL 魔麗</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000022">OPT圓瑞</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000023">水湛</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000028">Kosmo蔻思茉</a>			
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000030">Smartvision 睛靈</a>			
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000039">愛能視iLens</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000044">Pony Pallet 魔彩盤</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000045">CLB Color 波斯霓彩 韓國月拋</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000046">嬌生安視優</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000047">ARdes彩色月拋</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000048">ReVIA 蕾美</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000049">Anley安儷</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000050">Marble 華麗糖芯</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000051">CalmeD'or 曦迪 韓國月拋</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000054">Ever Color艾薇卡</a>
					<a class="dropdown-item" href="product.asp?Fid=F000001&Bid=B000055">卡沛兒</a>
                </div>
            </li>
            <li>
                <span>{{ t("navbar-glasses") }}</span>
                <div class="li-box">
                    <a href="">Young Man X Ti Glasses</a>
                </div>
            </li>
            <li>
                <span>{{ t("navbar-health") }}</span>
                <div class="li-box">
                    <a href="">亮萌</a>
                    <a href="">鏡片清潔香波</a>
                </div>
            </li>
        </ul>

        <ul class="pc-login" v-show="isSearch">
            <li>
                <a href="#">{{ t("navbar-login") }}</a>
            </li>
            <li class="language">
				<select v-model="locale">
					<option>中文</option>
					<option>English</option>
					<option>日語</option>
				</select>
            </li>
            <li @click="goSearch">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </li>
        </ul>

		<div class="pc-searchbox" v-show="!isSearch">
			<form action="">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
				</svg>
				<input type="text" placeholder="搜尋商品">
				<svg @click="goSearch"
					xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
					<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
				</svg>
			</form>
		</div>
	</nav>

	<div class="goTop">
		<div @click="goTop">↑</div>
		<div>
			<a href="https://line.me/ti/p/~@ymapp" target="_blank">
				<img src="~@/assets/images/line.png" alt="line logo">
			</a>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	nav {
		width: 100%;
		height: 64px;
		display: flex;
		padding: 10px;
		background-color: #fff;

		position: fixed;
		top: 0;
		left: 0;
		box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.3);
		z-index: 99;
    

    	> ul {
			display: flex;
			margin: 20px auto 0px auto;
			font-weight: 600;
			font-size: 20px;

			> li {
				position: relative;

				.li-box {
					// 透明度預設為零，li有hover時透明度才為一
					opacity: 0;
					max-width: 300px;
					background-color: white;
					text-align: center;
					border: solid 24px #fff;
					border-radius: 0 0 24px 24px;
					box-shadow: 0 8px 10px rgb(0 0 0 / 15%);

					position: absolute;
					top: 45px;
					left: -70px;

					display: flex;

					a {
						color: black;
						font-weight: 300;
						font-size: 18px;

						display: inline-block;
						min-width: 72px;
						max-width: 300px;
						white-space:nowrap;  // 文字不換行
					}
					a:hover {
						color: rgba(28, 13, 13, 0.65);
					}
					a+a {
						margin-left: 15px;
					}
				}
				/* 當list的內容很多時 */
				.li-box2 {
					display: block;
					width: 700px;
					max-height: 200px;
					overflow-y: auto;
				}
			}
			> li:hover {
				color: rgba(0, 0, 0, 0.5);
				cursor: pointer;

				span::after {
					width: 100%;
				}
				.li-box {
					opacity: 1;
				}
			}

			> li+li {
				margin-left: 80px;
			}
    	}
		ul.pc-login {
			margin: auto 0;

			li {
				min-width: 60px;
				text-align: center;
				margin: auto;
				cursor: pointer;
			}
			li:last-child {
				margin-right: 10px;
				line-height: 25px;
			}
			.language {
				width: 83px;
				margin-left: 8px;
			}
			a {
				color: black;
			}
			a:hover {
				color: darkgray;
			}
		}
		span::after {
			content: '';
			display: block;

			width: 0%;
			height: 2px;
			margin: 10px 0;
			background-color: rgba(107, 93, 93, 0.5);
			transition: width .5s;
		}
		.pc-searchbox {
			margin-left: 428px;
			position: relative;
			
			form {
				height: 100%;
				display: flex;
				align-items: center;
			}
			form::after {
				content: '';
				width: 100%;
				height: 1px;
				background-color: #9da6b7;

				position: absolute;
				bottom: 10px;
				left: 0px;
			}
			input {
				width: 500px;
				height: 37px;
				border: 0;
				outline: 0;
				padding-left: 10px;
				padding-right: 30px;
			}
			svg {
				transition: all .3s;
				
			}
			svg:hover {
				transform: scale(1.5) rotate(180deg);
				
				cursor: pointer;
			}
		}
	}

	.goTop {
		position: fixed;
		right: 20px;
		bottom: 90px;

		z-index: 99;

		> div {
			width: 40px;
			height: 40px;
			margin-bottom: 10px;
		}
		> div:first-child {
			background-color: black;
			border-radius: 8px;
			color: #fff;
			line-height: 40px;
			text-align: center;
			font-size: 20px;
			font-weight: 700;
			cursor: pointer;
		}
		img {
			width: 100%;
			height: 100%;
			vertical-align: bottom;
		}
	}







// 以下可刪
article {
  width: 100%;
  height: 100px;
  background-image: url("~@/assets/images/banner.png");
  background-size: cover;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
//   @media screen and (max-width: 730px) {
//     height: 349px;
//   }
//   @media screen and (max-width: 640px) {
//     height: 175px;
//   }
//   > div {
//     @media screen and (max-width: 1044px) {
//       width: 90%;
//       height: auto;
//       margin: 0 auto;
//     }
//     > h3 {
//       text-align: center;
//       font-size: 48px;
//       color: #fff;
//       @media screen and (max-width: 1044px) {
//         font-size: 30px;
//       }
//     }
//     > p {
//       text-align: center;
//       font-size: 14px;
//       color: #fff;
//       line-height: 3em;
//       @media screen and (max-width: 1044px) {
//         font-size: 14px;
//         line-height: 25px;
//       }
//     }
//   }
}
</style>