<script>
import { ref, watch } from 'vue';
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from 'vue-router';
import $ from 'jquery';

export default {
  setup() {
	// 用useRoute()拿網址上的route跟routerArr做比對！ /product/:id
	const routerArr = ["/product/F0001", "/product/F0002"];
	const route = useRoute();
	const router = useRouter();

	// 使用useI18n實作語系切換
	const { t, locale } = useI18n();
	// isSearch控制PC的放大鏡搜尋畫面
	const isSearch = ref(true);

	const goTop = () => {
		// 使用jQuery的scrollTop實作置頂功能，並用animate方法慢慢往上移
		$("html, body").animate({scrollTop: 0}, 400);
	};
	const goSearch = () => {
		isSearch.value = !isSearch.value;
	};
	const closeCollapse = (id) => {
		$("#navbarNav").toggleClass("show");

		// 點擊導覽列的圖片，回到首頁的同時將菜單收起來
		if (id == 0) {
			$("#navbarNav").removeClass("show");
		}
	};

	// 用 watch 監控網址
	watch(
	()=> route.path, // 第一個參數帶要監控的變數，這裡監控route.path
	(newA, oldA)=> {
		// console.log("目前路徑=>", route.path);
		// console.log("下一個path =>", newA);
		// console.log("上一個path =>", oldA);
		
		// router.push("/");

		if (routerArr.includes(route.path)) {
			// let i = route.path;
			// router.push({ path: `${route.path}` });
			// console.log(route.path)
			// return;
		}			
	}
	);

	// const router = computed(() => {
	// 	return route.path;
	// });

	// 用watch監控是否切換了語系
	watch(locale, (newlocale) => {
		localStorage.setItem("locale", newlocale);
	});
	

	return {
		route,
		t, locale,
		isSearch,
		goTop, goSearch, closeCollapse
	};
  }
}
</script>

<template>
  <!-- PC版的導覽列 -->
	<nav class="header">
		<!-- 最左邊Logo圖片 -->
		<router-link to="/">
			<img src="https://www.youngman.com.tw/images/LOGO03.png" class="logo-image">
		</router-link>

		<!-- 中間導覽連結列表 -->
        <ul class="header-list" v-show="isSearch">
            <li>
                <span>{{ t("navbar-about") }}</span>
                <div class="li-box">
                    <router-link to="/about">{{ t("navbar-about") }}</router-link>
                    <router-link to="/location" class="dropdown-item">{{ t("footer-about4") }}</router-link>
					<router-link to="/contact" class="dropdown-item">{{ t("footer-service1") }}</router-link>
                </div>
            </li>
            <li>
                <span>
					<router-link to="/news">{{ t("navbar-news") }}</router-link>
				</span>
            </li>
			<li>
                <span>{{ t("navbar-health") }}</span>
                <div class="li-box">
                    <router-link to="/product/F0001" :key="route.path">{{ t("footer-health1") }}</router-link>
                    <router-link to="/product/F0002" :key="route.path">{{ t("footer-health2") }}</router-link>
                </div>
            </li>
            <li>
                <span>
					<router-link to="/shopping_mall">{{ t("navbar-mall") }}</router-link>
				</span>
            </li>
            <li>
                <span>{{ t("navbar-hidden") }}</span>
                <div class="li-box li-box2">
                    <router-link to="/product/C0001" class="dropdown-item">{{ t("hidden-glasses1") }}</router-link>
					<router-link to="/product/C0002" class="dropdown-item">{{ t("hidden-glasses2") }}</router-link>
					<router-link to="/product/C0003" class="dropdown-item">{{ t("hidden-glasses3") }}</router-link>
					<router-link to="/product/C0004" class="dropdown-item">{{ t("hidden-glasses4") }}</router-link>
					<router-link to="/product/C0005" class="dropdown-item">{{ t("hidden-glasses5") }}</router-link>
					<router-link to="/product/C0006" class="dropdown-item">{{ t("hidden-glasses6") }}</router-link>
					<router-link to="/product/C0007" class="dropdown-item">{{ t("hidden-glasses7") }}</router-link>
					<router-link to="/product/C0008" class="dropdown-item">{{ t("hidden-glasses8") }}</router-link>
					<router-link to="/product/C0009" class="dropdown-item">{{ t("hidden-glasses9") }}</router-link>
					<router-link to="/product/C0010" class="dropdown-item">{{ t("hidden-glasses10") }}</router-link>
					<router-link to="/product/C0011" class="dropdown-item">{{ t("hidden-glasses11") }}</router-link>
					<router-link to="/product/C0012" class="dropdown-item">{{ t("hidden-glasses12") }}</router-link>
                </div>
            </li>
            <li>
                <span>{{ t("navbar-glasses") }}</span>
                <div class="li-box">
                    <router-link to="/product/E0001" class="dropdown-item">{{ t("navbar-glasses1") }}</router-link>
                </div>
            </li>
        </ul>

		<!-- 右邊[登入/語系/搜尋]功能 -->
        <ul class="pc-login" v-show="isSearch">
            <li>
				<router-link to="/login">{{ t("navbar-login") }}</router-link>
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

	<!-- 手機版的導覽列 -->
	<nav class="navbar navbar-expand-lg">
		<div class="container-fluid">
			<router-link to="/" @click="closeCollapse(0)">
				<img src="https://www.youngman.com.tw/images/LOGO03.png" class="logo-image">
			</router-link>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav">
				<li class="nav-item">
					<a class="nav-link dropdown-toggle" data-bs-toggle="collapse" href="#collapseBox1" role="button" aria-expanded="false" aria-controls="collapseExample">
						{{ t("navbar-about") }}
					</a>
					<div class="collapse" id="collapseBox1">
						<span>
							<router-link to="/about" @click="closeCollapse" class="dropdown-item">{{ t("navbar-about") }}</router-link>
							<router-link to="/location" @click="closeCollapse" class="dropdown-item">{{ t("footer-about4") }}</router-link>
							<router-link to="/contact" @click="closeCollapse" class="dropdown-item">{{ t("footer-service1") }}</router-link>
						</span>
					</div>
				</li>
				<li class="nav-item">
					<router-link to="/news" @click="closeCollapse" class="nav-link">
						{{ t("navbar-news") }}
					</router-link>
				</li>
				<li class="nav-item">
					<a class="nav-link dropdown-toggle" data-bs-toggle="collapse" href="#collapseBox4" role="button" aria-expanded="false" aria-controls="collapseExample">
						{{ t("navbar-health") }}
					</a>
					<div class="collapse" id="collapseBox4">
						<span>
							<router-link to="/product/F0001" :key="route.path" @click="closeCollapse" class="dropdown-item">{{ t("footer-health1") }}</router-link>
                    		<router-link to="/product/F0002" :key="route.path" @click="closeCollapse" class="dropdown-item">{{ t("footer-health2") }}</router-link>
						</span>
					</div>
				</li>
				<li class="nav-item">
					<router-link to="/shopping_mall" @click="closeCollapse" class="nav-link">{{ t("navbar-mall") }}</router-link>
				</li>
				<li class="nav-item">
					<a class="nav-link dropdown-toggle" data-bs-toggle="collapse" href="#collapseBox2" role="button" aria-expanded="false" aria-controls="collapseExample">
						{{ t("navbar-hidden") }}
					</a>
					<div class="collapse" id="collapseBox2">
						<div>
							<router-link to="/product/C0001" @click="closeCollapse" class="dropdown-item">{{ t("hidden-glasses1") }}</router-link>
							<router-link to="/product/C0002" @click="closeCollapse" class="dropdown-item">{{ t("hidden-glasses2") }}</router-link>
							<router-link to="/product/C0003" @click="closeCollapse" class="dropdown-item">{{ t("hidden-glasses3") }}</router-link>
							<router-link to="/product/C0004" @click="closeCollapse" class="dropdown-item">{{ t("hidden-glasses4") }}</router-link>
							<router-link to="/product/C0005" @click="closeCollapse" class="dropdown-item">{{ t("hidden-glasses5") }}</router-link>
							<router-link to="/product/C0006" @click="closeCollapse" class="dropdown-item">{{ t("hidden-glasses6") }}</router-link>
							<router-link to="/product/C0007" @click="closeCollapse" class="dropdown-item">{{ t("hidden-glasses7") }}</router-link>
							<router-link to="/product/C0008" @click="closeCollapse" class="dropdown-item">{{ t("hidden-glasses8") }}</router-link>
							<router-link to="/product/C0009" @click="closeCollapse" class="dropdown-item">{{ t("hidden-glasses9") }}</router-link>
							<router-link to="/product/C0010" @click="closeCollapse" class="dropdown-item">{{ t("hidden-glasses10") }}</router-link>
							<router-link to="/product/C0011" @click="closeCollapse" class="dropdown-item">{{ t("hidden-glasses11") }}</router-link>
							<router-link to="/product/C0012" @click="closeCollapse" class="dropdown-item">{{ t("hidden-glasses12") }}</router-link>
						</div>
					</div>
				</li>
				<li class="nav-item">
					<a class="nav-link dropdown-toggle" data-bs-toggle="collapse" href="#collapseBox3" role="button" aria-expanded="false" aria-controls="collapseExample">
						{{ t("navbar-glasses") }}
					</a>
					<div class="collapse" id="collapseBox3">
						<span>
							<router-link to="/product/E0001" @click="closeCollapse" class="dropdown-item">{{ t("navbar-glasses1") }}</router-link>
						</span>
					</div>
				</li>
			</ul>
			<router-link to="/login" @click="closeCollapse" class="login">
				{{ t("navbar-login-H5") }}
			</router-link>
			</div>
		</div>
	</nav>
</template>

<style lang="scss" scoped>
	* {
		box-sizing: border-box;
		padding: 0;
	}

	// 手機版
	@media screen and (min-width: 0px) and (max-width: 490px) {
		.navbar {
			.container-fluid {
				padding: 10px 12px;
				background-color: #fff;
				box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.3);

				position: fixed;
				top: 0;
				left: 0;
				z-index: 99;
			}
			img {
				max-width: 200px;
			}
			.navbar-toggler {
				border: none;
				font-size: 25px;
			}
			.navbar-toggler:focus {
				box-shadow: none;
			}
			.navbar-nav li+li {
				border-top: solid thin #e7e7e7;
			}
			.nav-item span {
				margin: 0 20px 10px 5px;
				display: flex;
				justify-content: space-between;
			}
			.nav-link {
				margin: 0 20px 0 5px;
				padding: 0;
				height: 44px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 18px;
				font-weight: 800;
			}
			.nav-link.dropdown-toggle::after {
				content: '+';
				font-size: 28px;
				border: none;
			}
			.nav-link:hover, .nav-link:focus {
				color: rgb(57, 160, 224);
			}
			#collapseBox2 {
				height: 85px;
				overflow-y: auto;
				margin: 0 20px 10px 5px;

				div {
					display: flex;
					justify-content: space-around;
					flex-wrap: wrap;
				}
				a {
					width: auto;
				}
				a+a {
					margin-left: 10px;
				}
			}
		}
		.header {
			display: none;
		}
		.login {
			display: block;
			width: 100%;
			line-height: 44px;
			margin-top: 10px;
			border-radius: 16px;
			border: none;
			background-color: black;
			color: white;
			text-align: center;
		}
	}

	@media screen and (min-width: 769px) and (max-width: 1500px) {
		a {
			margin: auto;
		}
		.logo-image {
			max-height: 54px;
		}
	}

	// PC版
	@media screen and (min-width: 769px) {
		.header {
			width: 100%;
			height: 84px;
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
				justify-content: space-evenly;
				margin: auto;
				font-weight: 600;
				font-size: 20px;

				> li {
					position: relative;
					padding-bottom: 15px;
    				transform: translateY(10px);

					a {
						color: black;
					}
					a:hover {
						color: rgba(0, 0, 0, 0.5);
					}
					.li-box {
						// max-width: 300px;
						background-color: white;
						text-align: center;
						border: solid 24px #fff;
						border-radius: 0 0 24px 24px;
						box-shadow: 0 8px 10px rgb(0 0 0 / 15%);
						box-sizing: border-box;

						position: absolute;
						top: 45px;
						left: 50%;
						transform: translateX(-50%);

						display: none;

						a {
							color: black;
							font-weight: 300;
							font-size: 18px;

							display: inline-block;
							// min-width: 72px;
							// max-width: 300px;
							white-space:nowrap;  // 文字不換行
						}
						a:hover {
							color: rgba(28, 13, 13, 0.65);
						}
						a+a {
							margin-left: 20px;
						}
					}
				}
				li:hover {
					color: rgba(0, 0, 0, 0.5);
					cursor: pointer;

					span::after {
						width: 100%;
					}
					.li-box {
						display: flex;
						text-align: center;
					}
					.li-box2 {
						min-width: 600px;
						display: flex;
						justify-content: center;
						flex-wrap: wrap;
						 .dropdown-item {
							width: inherit;
							margin: 0 10px;
						 }
					}
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
			.header-list {
				flex-grow: 1;
			}
			span {
				position: relative;
			}
			span::after {
				content: '';
				display: block;

				width: 0%;
				height: 2px;
				background-color: rgba(0, 0, 0, 0.5);
				transition: width .5s;

				position: absolute;
    			bottom: -5px;
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

		.logo-image {
			height: 64px;
		}

		.navbar {
			display: none;
			visibility: hidden;
		}
	}
</style>