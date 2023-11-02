<script>
import { ref, watch } from 'vue';
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { t, locale } = useI18n();

    watch(locale, (newlocale) => {
      localStorage.setItem("locale", newlocale);
    });

    return {
      t, 
      locale};
  }
}
</script>

<template>
    <div class="banner">
        <div class="message">
            <h3>{{ t("main-h3") }}</h3>
            <p>{{ t("main-p") }}</p>
            <button class="message-btn">
				<router-link to="/location">
					{{ t("main-btn") }}
				</router-link>
			</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
	.banner {
		height: 100vh;
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
		background-image: url("~@/assets/images/eyeglass3.png");
		
		display: flex;
		justify-content: center;
		align-items: center;

		// 滑鼠移上去的動畫效果
		-webkit-transition: all 0.5s ease-in-out;
  		transition: all 0.5s ease-in-out;

		&:hover {
			background-size: 110% 100%;
			background-position: center bottom;
		}

		.message {
			color: azure;
			font-size: 24px;
			text-align: center;

			h3 {
				font-size: 44px;
			}
			p {
				margin: 25px;
			}
			.message-btn {
				padding: 15px 75px;
				font-size: 20px;
				font-weight: 500;
				border: none;
				border-radius: 16px;
				transition: all .3s;
				position: relative;
				overflow: hidden;
				
				&:hover {
					box-shadow: 2px 2px 7px rgba(255, 255, 255, 0.7),
								-2px -2px 7px rgba(255, 255, 255, 0.7);
				}
				a {
					color: black;
				}
			}
		}
	}

	// 手機版
	@media screen and (min-width: 0px) and (max-width: 490px) {
		.banner {
			height: 50vh;
			background-size: cover;

			h3 {
				font-size: 25px;
			}
			p {
				font-size: 17px;
			}
		}
		.message-btn {
			padding: 15px 40px;
			box-shadow: 2px 2px 7px rgba(255, 255, 255, 0.7),
						-2px -2px 7px rgba(255, 255, 255, 0.7);
		}
	}
</style>