<template>
  <div class="profile-window">
    <div class="box">
      <div class="hero">
        <h1> My account: </h1>   
        <router-link to="/">
          <img src="../assets/close-white.png" alt="">
        </router-link>
      </div>
      
      <div class="profile">
        <img src="../assets/user.png" alt="">
        <div>
          <p class="title">First name:</p>
          <p id="userName"> {{user.firstName}}</p>
        </div>
        <div>
          <p class="title">Last name:</p>
          <p id="userName"> {{user.lastName}}</p>
        </div>
        <div>
          <p class="title">Email:</p>
          <p id="userEmail"> {{user.email}}</p>
        </div>
        <div>
          <p class="title">Password:</p>
          <p> {{user.password}} </p>
        </div>
      </div>
      <div class="profile-btns">
        <input type="button" value="Logout" id="logoutBtn" @click="logoutUser()">
        <router-link to="/edit-profile">
          <input type="button" value="Edit my profile">
        </router-link>
        <input type="button" value="Delete account" id="deleteBtn" @click="deleteUser()">
      </div>
    </div>
  </div>
</template>

<script>
// import the promise-based library used with Node.js + your browser to make asynchronous Js HTTP requests
import axios from 'axios'; 

export default {
	name: 'viewProfile',
	data() {
		return {
			user: [],
		};
	},
	methods: {

		getUser() {
			//   let token = window.localStorage.getItem('token');

			axios.get('http://localhost:3000/user/:id'
			//, { headers: {'Authorization': `User ${token}`,}}
			)
			.then(
				this.user = JSON.parse(window.localStorage.getItem('user')),	
			)
			.catch(function (err) {
				console.log("Error", err);
			})
		},

		logoutUser() {
			localStorage.clear();
			this.$router.push({ name: "Welcome" });
		},

		deleteUser() {
			let self = this;
			let token = window.localStorage.getItem('token');
			axios.delete('http://localhost:3000/api/user',
			{ headers: {
				'Authorization': `Basic ${token}`,
				}
			})
			.then(function (response) {
				self.$router.push({ name: "Welcome" });
				self.user = response.data;
				alert('Successfully deleted account');
				this.logoutUser();
				localStorage.clear();
				self.$router.push({ name: "Welcome" });
				console.log("Response", response);
			})
			.catch(function (err) {
				console.log("Error", err);
			})
		},
	},
	beforeMount() {
		this.getUser()
	},
}
</script>

<style lang="scss">

.profile-window {
	position: fixed;
	z-index: 1;
	right: 0;
	bottom: 0;
	top: 0;
	left: 0;
	background-color: rgba(117, 114, 114, 0.5);
	.box {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 70%;
		height: 450px;
		margin: O auto;
		padding: 30px;
		border-radius: 12px;
		background-color: #091F43;
		color: white;
		.hero {
			display: flex;
			justify-content: space-between;
			margin-bottom: 30px;
			a {
				display: flex;
				line-height: 25px;
				margin-bottom: 10px;
				text-decoration: none;
				img {
					margin-right: 5px;
					height: 25px;
				}
			}
			h1 {
				font-size: 22px;
				font-weight: 300px;
			}
		}
		.profile {
			margin: 20px 0;
			img {
				width: 50px;
				height: auto;
				margin-bottom: 15px;
			}
			div {
				display: flex;
				flex-wrap: wrap;
				color: white;
				.title {
					font-weight: 500;
				}
				p {
					padding-right: 10px;
					font-size: 1.2rem;
					font-weight: 200;
				}
			}
		}
		.profile-btns {
			input {
				padding: 10px;
				margin-right: 15px;
				border-radius: 12px;
				border: none;
				background-color: white;
				font-weight: 800;
				color: #091F43;
				font-size: 17px;
			}
		}
	}
}
@media only screen and (max-width: 770px) {
	.window {
		.box {
			width: 90%;
			input {
				margin-top: 10px;
			}
		}
	}
}

</style>