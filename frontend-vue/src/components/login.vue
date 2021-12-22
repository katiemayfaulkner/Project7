<template>
  <div class="auth-window">
    <div class="box">
        <div class="hero">
        <h1>Welcome back to your account!</h1>
        <p> or <router-link to="/signup"> signup </router-link> and create an account.</p>
        </div>

        <form class="auth" v-on:submit.prevent="onSubmit">
            <input
                type="text"
                name="email"
                placeholder="Email"
                class="authInput loginInput"
                required="true"
                v-model="form.email"
            />
            <div>
                <input
                name="password"
                type="password"
                placeholder="Password"
                class="authInput loginInput"
                required="true"
                id="loginPassword"
                v-model="form.password"
                />
            </div>

            <button class="authBtn" type="submit"> Log In </button>
            <p class="alert alert-danger" v-if="this.error">{{this.error}}</p>
        </form>
    </div>
  </div>
</template>

<script>
// import the promise-based library used with Node.js + your browser to make asynchronous Js HTTP requests
import axios from 'axios'; 

export default {
	name: 'Login',
	data() {
		return {
			error: "",
			form: {
				email: "",
				password: ""
			}
		};
	},
	methods: {
		notAuthenticated() {
			// Checks for token
			let hasToken = JSON.parse(localStorage.getItem('user')) ? true : false;

			if(hasToken) {
			this.$router.push({ path: "/home" });
			}
		},

		// Check both passwords are the same
		onSubmit: function () {

			this.error = ''; // To reset any previously happened errors

			axios.post("http://localhost:3000/user/login", this.form)
			.then(res => {
				console.log(res.data);
				
				localStorage.setItem('user', JSON.stringify(res.data));
				this.$router.push({ path: "/home" });

			})
			.catch(err => {
				this.error = "Please check your information is correct and linked to a valid account.";
				// console.error(error);
			})
		}
	},
	beforeMount() {
		this.notAuthenticated()

	}
}
</script>

<style lang="scss">

.auth-window {
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
		padding: 60px;
		border-radius: 12px;
		background-color: #091f43;
		color: white;

		.hero {
			text-align: center;

			h1 {
				font-size: 26px;
			}

			p {
				font-weight: 200;

				a {
					font-weight: 800;
					text-decoration: none;
					color: white;
				}
			}
		}
		.auth {
			align-items: center;
			width: 220px;
			margin: 25px auto;
			position: relative;

			.authInput {
				height: 40px;
				padding: 7px;
				margin: 5px;
				border-radius: 12px;
				border: 2px solid black;
				font-size: 17px;
			}

			div {
				display: flex;
				position: relative;
			}

			img {
				position: absolute;
				top: 0;
				right: 0;
				height: 20px;
				margin: 15px 0;
				cursor: pointer;
			}
			img.nonLiked {
			filter: brightness(0);
			}

			.authBtn {
				padding: 7px;
				margin: 5px 5px 10px 5px;
				border-radius: 12px;
				font-weight: 500;
				width: 100px;
				border: 2px solid black;
				background-color: white;
				color: #091f43;
				font-size: 17px;
			}

			p{
				position: absolute;
				left: -40px;
				padding: 10px;
				margin: 0 5px;
				width: 300px
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

@media only screen and (max-width: 770px) {
	.window {
		.box {
			padding: 50px 0;
			width: 83%;
		}
	}
}

</style>