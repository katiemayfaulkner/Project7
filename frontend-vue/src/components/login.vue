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
                name="first-name"
                placeholder="First name"
                class="authInput loginInput"
                required="true"
                v-model="form.firstName"
            />
            <input
                type="text"
                name="last-name"
                placeholder="Last name"
                class="authInput loginInput"
                required="true"
                v-model="form.lastName"
            />
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
                type="text"
                name="password"
                placeholder="Password"
                class="authInput loginInput"
                required="true"
                id="loginPassword"
                v-model="form.password"
                />
                <img
                @click="showLogin"
                src="../assets/hidden.png"
                alt=""
                id="hideLogin"
                />
                <img
                @click="showLogin"
                src="../assets/visible.png"
                alt=""
                id="showLogin"
                style="visibility: hidden"
                />
            </div>
            <div>
              <input
                  name="retype-password"
                  type="password"
                  placeholder="Retype password"
                  class="authInput signupInput secondPswd"
                  required="true"
                  id="retypePassword"
                  v-model="form.retypePassword"
              />
              <img
                  @click="showSecondPassword"
                  src="../assets/hidden.png"
                  alt=""
                  id="hideSecondPswd"
              />
              <img
                  @click="showSecondPassword"
                  src="../assets/visible.png"
                  alt=""
                  id="showSecondPswd"
                  style="visibility: hidden"
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
      passwordsMatched: false,
      error: "",
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        retypePassword: "",
      },
      hidden: 2,
    };
  },
  methods: {
    // Password visibility toggle
    showLogin: function () {
      let loginPassword = document.getElementById("loginPassword");
      let hideLogin = document.getElementById("hideLogin");
      let showLogin = document.getElementById("showLogin");

      if (loginPassword.type === "password") {
        loginPassword.type = "text";
        showLogin.style.visibility = "visible"
        hideLogin.style.visibility = "hidden"

      } else {
        loginPassword.type = "password";
        showLogin.style.visibility = "hidden"
        hideLogin.style.visibility = "visible"
      }
    },
    showSecondPassword: function () {
            let retypePassword = document.getElementById("retypePassword");
            let showSecond = document.getElementById("showSecondPswd");
            let hideSecond = document.getElementById("hideSecondPswd");

            if (retypePassword.type === "password") {
                retypePassword.type = "text";
                showSecond.style.visibility = "visible"
                hideSecond.style.visibility = "hidden"

            } else {
                retypePassword.type = "password";
                showSecond.style.visibility = "hidden"
                hideSecond.style.visibility = "visible"
            }
    },

    // Check both passwords are the same
    onSubmit: function (){
        if(this.form.password === this.form.retypePassword){
            this.passwordsMatched = true;
            this.error = ""
        } else {
            this.passwordsMatched = false;
            this.error = "Your passwords do not match."
        }

        this.logIn();
    },

    logIn() {

      if(this.passwordsMatched) {
        
        let userDetails = this.form

        axios.get("http://localhost:3000/user/login", this.form)
        .then(
          // localStorage.setItem('token', response.data.token);
          console.log(userDetails.firstName, "has been successfully logged in!"),
          localStorage.setItem('user', JSON.stringify(userDetails)),
          this.$router.push({ name: 'Home' })   
        )
        .catch(error => {
          console.error(error);
        })
      }
    },
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
		height: 500px;
		margin: O auto;
		padding: 70px;
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
				height: 20px;
				margin: 15px 0;
				position: absolute;
				top: 0;
				right: 0;
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

				&:disabled {
					background: linear-gradient(160deg, #6b6b6b 0%, #b6b5b5 100%);
					border: none;
					color: white;
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

@media only screen and (max-width: 770px) {
	.window {
		.box {
			padding: 50px 0;
			width: 83%;
		}
	}
}

</style>