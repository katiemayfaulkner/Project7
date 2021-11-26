<template>
	<div>
		<Header/>
		<section class="container edit-profile">
			<router-link to="/home">
				<p> Return </p>
			</router-link>
			<div class="content">
				<h1> Enter your new details: </h1> 

				<div class="profile">
					<img src="../assets/user-black.png" alt="">
					<div>
						<p class="title">First name:</p>
						<input type="text">
					</div>
					<div>
						<p class="title">Last name:</p>
						<input type="text">
					</div>
					<div>
						<p class="title">Email:</p>
						<input type="text">
					</div>
					<div>
						<p class="title">Password:</p>
						<input type="password">
					</div>
				</div>

				<div class="profile-btns">
					<input type="submit" value="Submit" id="submitChanges">
					<router-link to="/profile">
						<input type="button" value="Cancel">
					</router-link>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import Header from "./header.vue"

// import the promise-based library used with Node.js + your browser to make asynchronous Js HTTP requests
import axios from 'axios'; 

export default {
	name: 'editProfile',
	methods: {

	},
	components: {
		"Header": Header,
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
			margin: 30px 0;

			img {
				width: 60px;
				height: auto;
				margin-bottom: 15px;
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

				input {
					padding: 0 7px;
					height: 30px;
					width: 170px;
					border: 1px solid black;
					border-radius: 8px;
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