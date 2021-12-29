<template>
    <header class="main-header" id="scroll-top">
        <div class="container">
            <div class="col-lg-10 col-md-9">
				<router-link to="/home">
					<img class="logo" src="../assets/icon-left-font-monochrome-white.svg" alt="">              
				</router-link>
                <h1> Welcome, {{user.firstName}} !</h1>
            </div>

            <div class="header-btns col-lg-2 col-md-3">  
				<router-link  to="/create-post">
					<img src="../assets/post.png" alt="" id="showPost">
				</router-link> 
				<router-link to="/profile">
					<img src="../assets/user.png" alt="" id="showUser" >   
				</router-link>
            </div>
        </div>
    </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      user: JSON.parse(window.localStorage.getItem('user')) ? JSON.parse(window.localStorage.getItem('user')) : '',
    };
	},
  props: ['firstName'], 
}
</script>

<style lang="scss">

.main-header {
	background-color: #091F43;
	padding: 20px 0;

	.container {
		display: flex;
		justify-content: space-between;
		width: 100%;

		div {
			display: block;

			.logo {
				height: 36px;
				width: auto;
			}

			h1 {
				margin-left: 50px;
				font-size: 22px;
				color: white;
				line-height: 36px;
				font-weight: 200;
			}
		}

		.header-btns {
			display: flex;
			flex-wrap: nowrap;

			img {
				height: 36px;
				width: auto;
				margin: 18px 10px 0;
				cursor: pointer;
			}
		}
	}
}

@media only screen and (max-width: 770px) {
	.main-header {
		padding: 20px 0 10px 0;

		.container {

			div {

				.logo {
					height: 30px;
					width: auto;
				}

				h1 {
					margin-left: 40px;
					font-size: 20px;
				}
			}

			.header-btns {

				img {
					height: 30px;
					margin-left: 7px;
				}
			}
		}
	}
}
</style>>
