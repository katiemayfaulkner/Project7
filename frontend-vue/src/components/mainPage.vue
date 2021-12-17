<template>
	<div>
		<section class="main-page">
			<div class="container">  
				<article class="col-lg-9 col-md-8">
					<h2>Discover our posts</h2>

					<div class="no-posts" v-if="posts.length === 0">
						<div>
						<h2> Sorry! It seems that nothing has been posted yet..</h2>
						<button> <router-link to="/create-post"> Create new post </router-link> </button> 
						</div>
					</div>

					<div class="box">
						<div class="post col-lg-6" v-for= "post in posts" :key="post.postId">
							<div class="contents">
								<div class="post-content" v-if="!seeComments" v-bind:class="{active: seeComments}">
									<div class="top-bar">
										<div class="user-info">
											<div class="user-img"> 
												<img src="../assets/bob.jpg" alt="">
											</div>
											<p> Katie May {{user.firstName}} </p>
										</div>

										<div>
											<img src="../assets/bin-black.png" alt="" @click="deletePost(post.postId)">		
											<img src="../assets/comments.png" alt="" @click="seeComments = !seeComments">	
										</div>
									</div>

									<div class="img-container">
										<img :src="post.imageUrl" >
										
									</div>

									<div class="caption-container">
										<p> {{post.caption}} </p>
									</div>

									<div class="post-actions">
										<div class="seen">
											<img 
											src="../assets/seen.png"								  
												v-bind:class="{active: isSeen}"
												@click="isSeen = !isSeen"
											>  
										</div>

										<form class="comments" v-on:submit.prevent="onSubmit">
											<input class="input" type="text" placeholder="Write a comment..." v-model="form.content">
											<button type="submit"> Submit </button>
										</form>
									</div>
								</div>

								<div class="post-comments">
									<div class="hero">
										<h1> Comments: </h1>				
										<img src="../assets/comments.png" alt="" @click="seeComments = !seeComments">	
									</div>

									<div class="items">
										<div class="item" v-for= "comment in comments" :key="comment.commentId">
											<div class="user">
												<img src="img/user.png" alt="">
												<p class="user-name"> Katie May : </p>
											</div>
											<p class="comment"> {{comment.content}} </p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div> 
				</article>
					
				<div class="col-lg-3 col-md-4">
					<div class="sticky-items">
						<div class="footer">
							<p> About </p>
							<p> User Agreement </p>
							<p> Content Policy </p>
							<p> Privacy Policy </p>
							<p> Moderator Guidelines</p>
							<p> Help </p>
							<span> © 2021 Club Groupomania, Inc. All rights reserved.</span>
						</div>

						<a href="#scroll-top">
							<button class="scroll-btn"> Back to top </button>
						</a>    
					</div>  
				</div>
			</div>
		</section>
	</div>
</template>

<script>

// import the promise-based library used with Node.js + your browser to make asynchronous Js HTTP requests
import axios from 'axios'; 

export default {
   name: 'MainPage',
	data() {
		return{
			isSeen: false,
			seeComments: false,
			form: {
				content: "",
			},
			posts: [],
			comments: [],
			user: {},
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

		onSubmit: function (){
			this.postComment();
		},
      
		getPosts() {

			// let newPosts = ['kqyn', 'sorqkq', 'vqrus', 'jax'];
			// setTimeout(() => {
			// 	this.posts = newPosts;
			// }, 2000)

			axios.get("http://localhost:3000/post")
			.then(res => {

				console.log(res.data);
				this.posts = res.data;
			})
			.catch(error => {
				console.error(error);
			})
		},

		deletePost(id) {
			console.log(id)
			axios.delete('http://localhost:3000/post/' + id,
			// { headers: {'Authorization': `Basic ${token}`,}}
			).then(res => {
				console.log(res.data);
				console.log('Your post has successfully been deleted!');
				this.getPosts();
			
			})
			.catch(function (err) {
				console.log("Error", err);
			})
		},



		postComment() {

			let commentContent = this.form;
			console.log(commentContent)

			axios.post("http://localhost:3000/post/comment", commentContent)
			.then(res => {

				console.log(res.data);
				this.comments = res.data;
			})
			.catch(error => {
				console.error(error);
			})
		},

		getComments() {
			
			axios.get("http://localhost:3000/post/comments")
			.then(res => {

				console.log(res.data);
				this.comments = res.data;
			})
			.catch(error => {
				console.error(error);
			})
		}
	},

	beforeMount() {
		this.isAuthenticated(),
		this.getPosts(),
		// this.getUsers()
		this.getComments()
	},
}

</script>

<style lang="scss">

.main-page {

	.container {
		display: flex;
		flex-wrap: wrap;
		margin-top: 30px;

		article {
			margin: 20px 0;

			h2 {
				font-size: 25px;
				padding-left: 15px;
			}

			.no-posts {
				margin-top: 70px;
				display: flex;
				justify-content: center;
				align-items: center;

				div {
					text-align: center;

					h2 {
						width: 100%;
						font-size: 23px;
						margin-bottom: 20px;
					}

					button {
						padding: 7px;
						margin: 0 5px;
						border-radius: 12px;
						width: 150px;
						border: 2px solid black;
						background-color: #091F43;

						a {
							color: white;
							text-decoration: none;
							font-weight: 500;
						}
					}
				}
			}

			.box {
				display: flex;
				flex-wrap: wrap;

				.post {
					padding: 15px;

					.contents {
						position: relative;
						width: 100%;
						height: 470px;
						background-color: #f2f2f2;
						border-radius: 12px;
						box-shadow: rgba(35, 35, 65, 0.25) 0px 6px 12px -2px, rgba(3, 3, 3, 0.418) 0px 3px 7px -3px;

						.post-content {
							position: absolute;
							z-index: 1;
							width: 100%;
							height: 100%;
							margin: O auto;
							padding: 15px;
							border-radius: 12px;
							background-color: #f2f2f2;
							color: black;
							overflow: scroll;
							display: block;

							.top-bar {
								display: flex;
								flex-wrap: nowrap;
								justify-content: space-between;
	
								img {
									margin-right: 10px;
									height: 30px;
									cursor: pointer;
								}
	
								.user-info {
									display: flex;

									.user-img {
										border: 1px solid black;
										width: 40px;
										height: 40px;
										border-radius: 50%;
										overflow: hidden;
										margin-bottom: 15px;
										margin-right: 10px;

										img {
											width: 100%;
											height: 100%;
											object-fit: fill;
										}
									}
	
									p {
										line-height: 40px;
									}
								}
							}
	
							.img-container {
								position: relative;
								height: 220px;
								overflow: hidden;
	
								img {
									width: 100%;
									height: 100%;
									object-fit: contain;
								}
							}
	
							.caption-container {
								height: 90px;
								margin: 15px 0;
								overflow-y: scroll;
								border-radius: 12px;
							}
	
							.post-actions {
								display: flex;
								justify-content: space-around;
	
								.seen {
									position: relative;
									padding: 0;
									width: 45px;
	
									img {
										position: absolute;
										margin-right: 15px;
										width: 40px;
										height: auto;
										cursor: pointer;
										filter: brightness(1);		
										opacity: 35%;
									}
									img.active {
										filter: brightness(1.5);
										opacity: 100%;
									}
								}
	
								.comments {
									display: flex;
									flex-wrap: nowrap;
	
									.input {
										border-radius: 12px;
										border: 1px solid #091F43;
										padding-left: 5px;
									}
	
									button {
										margin-left: 5px;
										padding: 7px;
										border-radius: 12px;
										width: 90px;
										border: 2px solid black;
										background-color: #091F43;
										color: white;
										font-size: 15px;
										font-weight: 500;
									}
								}
							}
						}

						.post-comments {
							padding: 15px;

							.hero {
								display: flex;
								justify-content: space-between;
								position: sticky;
								background-color: #f2f2f2;

								img {		
									height: 30px;
									cursor: pointer;
									margin-right: 10px;
								}

								h1 {
									font-size: 21px;
									font-weight: 300px;
								}
							}
							
							.items {
								overflow: scroll;
								padding: 15px 0;

								.item {
									display: flex;
									flex-wrap: wrap;
									height: auto;
									padding: 7px;
									margin: 15px;
									border-radius: 12px;
									background-color: white;
									border: 1px solid rgba(0, 0, 0, 0.404);

									.user {
										display: flex;
										flex-wrap: nowrap;
										margin-right: 10px;
										img {
											height: 25px;
											margin-right: 7px;
										}
										p {
											line-height: 25px;
											font-weight: 600;
										}
									}
									p {
										font-weight: 200;
									}
								}
							}
						}
					}
				}
			}
		}

		div {
			.sticky-items {
				position: -webkit-sticky;
				position: sticky;
				top: 30px;
				margin-bottom: 30px;
				.footer {
					margin: 20px 0;
					padding: 20px;
					box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
					p {
						line-height: 10px;
						font-size: 15px;
						cursor: pointer;
					}
					span {
						font-size: 13px;
						margin: 5px 0;
					}
				}
				a {
					width: 100%;
					text-decoration: none;

					button {
						padding: 7px;
						margin: 0 5px;
						border-radius: 12px;
						width: 120px;
						border: 2px solid black;
						background-color: #091F43;
						color: white;
						font-weight: 500;
					}
				}
			}
		}
	}
}

@media only screen and (max-width: 770px) {
	.main-page {
		.container {
			.posts {
				.box {
					.post {
						.content {
							.post-actions {
								div {
									img {
										margin-right: 10px;
										height: 20px;
									}
								}
							}
						}
					}
				}
			}
		}
	}
}

</style>