<template>
	<div>
		<section class="container edit-profile">
			<router-link to="/profile">
				<p> Return </p>
			</router-link>
			<div class="content">
				<h1> Enter your new details: </h1> 

				<form class="profile" v-on:submit.prevent="onSubmit" enctype="multipart/form-data">
					<div class="profile-picture">
						<div class="user-img"> 
							<img :src="form.imageUrl" v-if="form.imageUrl">
						</div>
						<input type="file" name="imageUrl" @change="fileChange()" accept=".jpg, .jpeg, .gif, .png">
					</div>
					<div class="user-input">
						<p class="title">First name:</p>
						<input type="text" v-model="form.firstName" required>
					</div>
					<div class="user-input">
						<p class="title">Last name:</p>
						<input type="text" v-model="form.lastName" required> 
					</div>
					<div class="user-input">
						<p class="title">Email:</p>
						<input type="text" v-model="form.email" required>
					</div>
					<p>Optional: </p>
					<div class="user-input">
						<p class="title">New password:</p>
						<input type="password" v-model="form.password">
					</div>
					<div class="user-input">
						<p class="title">Confirm new password:</p>
						<input type="password" v-model="form.retypePassword">
					</div>

					<button type="submit"> Submit </button>
					<p class="alert alert-danger" v-if="this.error">{{this.error}}</p>
				</form>
			</div>
		</section>
	</div>
</template>

<script>

// import the promise-based library used with Node.js + your browser to make asynchronous Js HTTP requests
import axios from 'axios'; 

export default {
	name: 'editProfile',
	data() {
		return {
			passwordsMatched: false,
            error: "",
			form: {
				imageUrl: "",
				file: "",
				firstName: "",
				lastName: "",
				email: "",
				password: "",
				retypePassword: "",
			},
		};
	},
	methods: {
		isAuthenticated() {
			// Checks for token
			let hasToken = JSON.parse(localStorage.getItem('user')) ? true : false;
			
			if(!hasToken) {
				this.$router.push({ path: "/" });
			}
		},

		getUser() {
			let userId = JSON.parse(window.localStorage.getItem('user')).userId;

			axios.get("http://localhost:3000/user/" + userId)
			.then(res => {

				this.form.firstName = res.data.firstName
				this.form.lastName = res.data.lastName	
				this.form.imageUrl = res.data.imageUrl				
			})
			.catch(error => {
				console.error(error);
			})
		},
 
		onSubmit: function(){

			if(this.form.password === this.form.retypePassword){
				this.passwordsMatched = true;
				this.error = ""
			} else {
				this.passwordsMatched = false;
				this.error = "Passwords must match!"
			}

			this.modifyUser();
		
		},

		fileChange() {
			this.form.file = this.$refs.file.files[0];
			this.form.imageUrl = URL.createObjectURL(this.form.file);
		},

		modifyUser() {

			if(this.passwordsMatched) {

				let userId = JSON.parse(window.localStorage.getItem('user')).userId;
				let userDetails = this.form;
	
				axios.put("http://localhost:3000/user/" + userId, userDetails)
				.then(res => {
					
					console.log(userDetails.firstName,", your account has successfully been updated!");	
					localStorage.clear();
					this.$router.push({ path: "/login" });
					
				})
				.catch(error => {
					console.error(error);
					this.error = "Please check your password has minimum 8 characters (uppercase & lowercase, numbers, & special characters), and your email is not in use!"
				})
			}
		},
	},
	beforeMount() {
		this.isAuthenticated(),
		this.getUser()
	}
}
</script>

<style lang="scss">

.edit-profile{
	margin-top: 30px;

	a{
		text-decoration: none;
		color: black;
		font-size: 18px;

		p{
			margin-left: 20px;
			font-weight: 500;
		}

	}

	.content{
		padding: 25px;
		width: 100%;
		height: auto;
		background-color: #f2f2f2;
		border-radius: 12px;
		box-shadow: rgba(35, 35, 65, 0.25) 0px 6px 12px -2px, rgba(3, 3, 3, 0.418) 0px 3px 7px -3px;

		h1{
			font-size: 22px;
			font-weight: 700px;		
		}

		.profile {
			margin-top: 30px;

			.profile-picture {
				display: flex;

				.user-img {
					border: 1px solid black;
					width: 64px;
					height: 64px;
					border-radius: 50%;
					overflow: hidden;
					margin-bottom: 15px;

					img {
						width: 100%;
						height: 100%;
						object-fit: cover;

					}
				}

				input{
					margin: 15px;
				}
			}

			.user-input {
				display: flex;
				flex-wrap: wrap;
				color: black;
				
				.title {
					font-weight: 500;
				}

				p {
					padding-right: 10px;
					font-size: 1.2rem;
					font-weight: 100;
				}

				input {
					padding: 0 7px;
					height: 30px;
					width: 170px;
					border: 1px solid black;
					border-radius: 8px;
				}
			}

			button {
				padding: 10px;
				border-radius: 12px;
				border: none;
				background-color: #091F43;
				font-weight: 500;
				color: white;
				font-size: 17px;
			}
		}
	}
}

@media only screen and (max-width: 650px) {

	.edit-profile {

		.content {
			padding: 15px;
			margin-bottom: 30px;

			.profile {

				.profile-picture {
					display: block;
					margin-bottom: 20px;

					.user-img {
						margin-bottom: 10px;
					}

					input {
						margin: 0;
					}
				}

				.user-input {
					display: block;
					margin-bottom: 15px;

					p {
						margin: 0;
					}

				}
			}
		}
	}
}

</style>