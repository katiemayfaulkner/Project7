<template>
    <div class="auth-window">
        <div class="box">
            <div class="hero">
                <h1>Welcome to your new account!</h1>
                <p> or <router-link to="/login"> login </router-link> to your existing account.</p>
            </div>

            <form class="auth" v-on:submit.prevent="onSubmit">
                <input
                name="first-name"
                type="text"
                placeholder="First name"
                class="authInput signupInput"
                required="true"
                v-model="form.firstName"
                />
                <input
                name="last-name"
                type="text"
                placeholder="Last name"
                class="authInput signupInput"
                required="true"
                v-model="form.lastName"
                />
                <input
                name="email"
                type="text"
                placeholder="Email"
                class="authInput signupInput"
                required="true"
                v-model="form.email"
                />
                <div>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        class="authInput signupInput firstPswd"
                        required="true"
                        id="signupPassword"
                        v-model="form.password"
                    />
                    <img
                        @click="showFirstPassword"
                        src="../assets/hidden.png"
                        alt=""
                        id="hideFirstPswd"
                    />
                    <img
                        @click="showFirstPassword"
                        src="../assets/visible.png"
                        alt=""
                        id="showFirstPswd"
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

                <button class="authBtn" type="submit">Sign Up</button>
                <p class="alert alert-danger" v-if="this.error">{{this.error}}</p>
            </form>
        </div>
    </div>
</template>

<script>
    // import AuthService from '../services/auth';

    // import the promise-based library used with Node.js + your browser to make asynchronous Js HTTP requests
    import axios from 'axios'; 

    export default {
        name: 'Signup',
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

            // Password visibility toggle
            showFirstPassword: function () {
            let signupInput = document.getElementById("signupPassword");
            let showFirst = document.getElementById("showFirstPswd");
            let hideFirst = document.getElementById("hideFirstPswd");

            if (signupInput.type === "password") {
                signupInput.type = "text";
                showFirst.style.visibility = "visible"
                hideFirst.style.visibility = "hidden"
            } else {
                signupInput.type = "password";
                showFirst.style.visibility = "hidden"
                hideFirst.style.visibility = "visible"
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

            signUp() {
                if(this.passwordsMatched) {

                    let userDetails = this.form;

                    axios.post("http://localhost:3000/user/signup", userDetails)
                    .then(res => {
                        console.log(res.data);
                        console.log(userDetails.firstName,", your account has successfully been created!"),
                        
                        this.$router.push({ path: "/login" });
                    })
                    .catch(err => {
                        console.error(err);
                        this.error = "Check your password has min 8 chars (upper & lowercase, numbers, & special chars), and your email is not in use!";
                        
                    })
                }        
            },

            // Check both passwords are the same
            onSubmit: function (){
                if(this.form.password === this.form.retypePassword){
                    this.passwordsMatched = true;
                    this.error = ""
                    
                } else {
                    this.passwordsMatched = false;
                    this.error = "Passwords must match!"
                }

                this.signUp();
            },
        },
        beforeMount() {
            this.notAuthenticated()
        }
    };

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
		padding: 65px;
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
            position: relative;
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
				margin: 5px 5px 10px 5px;
				border-radius: 12px;
				width: 100px;
				border: 2px solid black;
				background-color: white;
				color: #091f43;
				font-size: 17px;
                font-weight: 500;
			}

            p{
                position: absolute;
				left: -120px;
				padding: 10px;
				margin: 0 5px;
				width: 450px
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

	.auth-window {

		.box {	
			width: 90%;

            .auth {

                p{
                    position: absolute;
                    left: -60px;
                    padding: 5px;
                    margin: 0 5px;
                    width: 320px
                }
            }
		}
	}
}

</style>