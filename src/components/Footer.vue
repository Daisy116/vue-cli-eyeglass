<script>
import { watch } from 'vue';
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { t, locale } = useI18n();

	const goTab = (str) => {
		let string = "#" + str;
		// 用offset()抓取該區塊的位置
		let top = $(string).offset().top;

		// 因為最上面有84px的navbar，所以要扣掉 84！
		top = top - 84;
		// 當滾輪在下方，頁面會從下往上...
		$("html, body").animate({scrollTop: top}, 100);
	}

    watch(locale, (newlocale) => {
      localStorage.setItem("locale", newlocale);
    });

    return {
      t, locale,
	  goTab
	};
  }
}
</script>

<template>
	<footer>
        <div class="footer">
            <img src="https://www.youngman.com.tw/images/LOGO03.png" class="logo-image">
            <div class="wrap">
                <ul>
                    <li>
                        <h4>{{ t("footer-about") }}</h4>
                        <p>
							<router-link @click.enter="goTab('about1')" to="/about">{{ t("footer-about1") }}</router-link>
						</p>
                        <p>
							<router-link @click.enter="goTab('about2')" to="/about">{{ t("footer-about2") }}</router-link>
						</p>
                        <p>
							<router-link @click.enter="goTab('about3')" to="/about">{{ t("footer-about3") }}</router-link>
						</p>
                        <p>
							<router-link to="/location">{{ t("footer-about4") }}</router-link>
						</p>
                    </li>
                    <li>
                        <h4>{{ t("footer-news") }}</h4>
                        <p>
							<router-link to="/news">{{ t("navbar-news") }}</router-link>
						</p>
                    </li>
                    <li>
                        <h4>{{ t("footer-health") }}</h4>
						<p>
							<router-link to="/product/F0001">{{ t("footer-health1") }}</router-link>
						</p>
                        <p>
							<router-link to="/product/F0002">{{ t("footer-health2") }}</router-link>
						</p>
                    </li>
                    <li>
                        <h4>{{ t("footer-service") }}</h4>
                        <p>
							<router-link to="/contact">{{ t("footer-service1") }}</router-link>
						</p>
                        <p>
							<router-link to="/FAQ">{{ t("footer-service2") }}</router-link>
						</p>
                    </li>
                </ul>
            </div>
            <div class="service">
				<div>
					<h4 class="phoneNum">{{ t("footer-phone") }}</h4>
					<a href="tel:0800007188">0800-700-881</a>
				</div>
                <div class="phone-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="26" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="26" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>
                </div>
            </div>
        </div>
    </footer>
	<div class="copyright">
        <div>&copy;年青人眼鏡</div>
        <div>
            <a href="">{{ t("footer-bottom1") }}</a>
            <a href="">{{ t("footer-bottom2") }}</a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
	.footer {
		display: flex;
		justify-content: space-between;

		width: 100%;
		max-width: 1500px;
		margin: 50px auto 0px auto;
		padding: 50px 0;

		border-top: 1px solid #e5e5e5;
		border-bottom: 1px solid #e5e5e5;

		ul {
			display: flex;

			li {
				margin: 0 50px;

				h4 {
					border-bottom: 1px solid rgba(128, 128, 128, 0.392);
					margin-bottom: 10px;
					padding-bottom: 5px;
				}
				p {
					font-size: 20px;
					font-weight: 300;
					text-align: center;
				}
				p:hover {
					color: #985555;
					font-weight: 400;
					cursor: pointer;
				}
				p+p {
					margin: 10px 0;
				}
			}
		}

		.logo-image {
			height: 64px;
		}
		.service a:hover {
			color: #985555;
			font-weight: bold;
		}
		.phoneNum {
			text-align: left;
			border: none;
			margin: 0;
			padding: 0;
		}
		.phone-icon {
			margin-top: 20px;

			svg+svg{
				margin: 0 15px;
			}
			svg:hover {
				opacity: .5;
				cursor: pointer;
			}
		}
	}
	.copyright {
		display: flex;
		justify-content: space-between;
		width: 100%;
		max-width: 1500px;
		margin: auto;
		margin: 20px auto;

		color: #707a8a;

		a {
			color: #707a8a;
		}
		a:hover {
			color: rgba(0, 0, 0, 0.808);
			cursor: pointer;
		}
		a+a {
			margin-left: 20px;
		}
	}

	// 手機版
	@media screen and (min-width: 0px) and (max-width: 490px) {
		.footer {
			padding: 0 0 16px 0;
			height: 100%;
			margin: 10px 0;
			display: block;

			img {
				width: 160px;
				margin-left: 15px;
				object-fit: contain;
			}
			.wrap {
				margin: 0 0 16px 0;

				ul {
					display: flex;
					padding: 0;

					li {
						margin: 0 auto;

						h4 {
							font-size: 16px;
						}
						p {
							font-size: 14px;
						}
					}
				}
			}
			.service {
				margin-left: 15px;
				display: flex;
				align-items: center;

				.phoneNum {
					font-size: 18px;
				}
				.phone-icon {
					margin: 0 30px;
					height: 26px;
					// margin-left: 15px;
				}
			}
		}
		.copyright {
			box-sizing: border-box;
			margin: 15px 0;
			padding: 0 15px;
		}
	}
</style>