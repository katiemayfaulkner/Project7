<template>
	<div>
		<!-- <p v-if="people.length == 0">You've no posts</p>
		<p v-for="person in people" v-bind:key='person'>NAME: {{person}} </p> -->
		<section class="container view-profile">
			<router-link to="/home">
				<p> Return </p>
			</router-link>
			<div class="content">
				<h1> My account: </h1> 

				<div class="profile">
					<div class="user-img"> 
						<img src="../assets/bob.jpg" alt="">
					</div>
					<div>
						<p class="title">First name:</p>
						<p> {{user.firstName}}</p>
					</div>
					<div>
						<p class="title">Last name:</p>
						<p> {{user.lastName}} </p>
					</div>
					<div>
						<p class="title">Email:</p>
						<p> {{user.email}}</p>
					</div>
				</div>

				<div class="profile-btns">
					<input type="button" value="Logout" @click="logoutUser()">
					<router-link to="/edit-profile">
						<input type="button" value="Edit my profile">
					</router-link>
					<input type="button" value="Delete account" @click="deleteUser()">
				</div>
			</div>
		</section>
	</div>
</template>

<script>

// import the promise-based library used with Node.js + your browser to make asynchronous Js HTTP requests
import axios from 'axios'; 

export default {
	name: 'viewProfile',
	data() {
		return {
			user: {},
			// people: [],
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
			// let newPeople = ['kqyn', 'sorqkq', 'vqrus', 'jax'];
			// setTimeout(() => {
			// 	this.people = newPeople;
			// }, 3000)

			let userId = JSON.parse(window.localStorage.getItem('user')).userId;

			axios.get("http://localhost:3000/user/" + userId)
			.then(res => {

				this.user = res.data;				
			})
			.catch(error => {
				console.error(error);
			})
		},

		logoutUser() {
			localStorage.clear();
			this.$router.push({ name: "Welcome" });

			console.log('You have successfully been logged out.')
		},

		deleteUser() {
			let userId = JSON.parse(window.localStorage.getItem('user')).userId;

			axios.delete('http://localhost:3000/user/' + userId,
			// { headers: {'Authorization': `Basic ${token}`,}}
			).then(res => {

				this.logoutUser();

				console.log('Your account has successfully been deleted!');
			})
			.catch(function (err) {
				console.log("Error", err);
			})
		},
	},
	beforeMount() {
		this.isAuthenticated(),
		this.getUser()
	}
}
</script>

<style lang="scss">

.view-profile{
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
			margin: 30px 0;

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

			div {
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
			}
		}

		.profile-btns {
			input {
				padding: 10px;
				margin: 0 10px 15px 0;
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

</style>