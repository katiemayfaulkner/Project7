<template>
  <div class="welcome-window">
    <div class="box">
      <div class="hero">
        <h1>Welcome to Club Groupomania!</h1>
        <p>The open forum for Groupomania employees.</p>
      </div>

      <div class="auth">
      <p>Create a new account or login to your existing account. </p>
      <button class="authBtn"> <router-link to="/signup"> Sign Up </router-link> </button>
      <button class="authBtn"> <router-link to="/login"> Log In </router-link> </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: 'Welcome',

	methods: {
		notAuthenticated() {
			// Checks for token
			let hasToken = JSON.parse(localStorage.getItem('user')) ? true : false;

			if(hasToken) {
			this.$router.push({ path: "/home" });
			}
		}
	},
	beforeMount() {
		this.notAuthenticated()

	}
}
</script>

<style lang="scss">

.welcome-window {
	visibility: visible;
	position: fixed;
	z-index: 1;
	right: 0;
	bottom: 0;
	top: 0;
	left: 0;
	background: linear-gradient(-45deg, #8d42ee, #194fa5, #3a87fa, #1fafe4);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;

	.box {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 60%;
		margin: O auto;
		padding: 80px 30px;
		border-radius: 12px;
		background-color: #091f43;
		color: white;
		overflow: scroll;

		.hero {
			text-align: center;
			h1 {
				font-size: 27px;
			}
			p {
				font-size: 20px;
			}
		}

		.auth {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			text-align: center;
			margin-top: 80px;

			p {
				width: 100%;
			}

			.authBtn {
				padding: 7px;
				margin: 5px;
				border-radius: 12px;
				width: 100px;
				border: 2px solid black;
				background-color: white;
				color: #091f43;
				font-size: 17px;
				font-weight: 500;
				text-decoration: none;
				color: black;

				a {
					text-decoration: none;
					color: black;
				}
			}
		}
	}
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

@media only screen and (max-width: 650px) {

	.welcome-window {

		.box {	
			width: 90%;
		}
	}
}

</style>
