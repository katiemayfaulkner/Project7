<template>
	<div>
		<Header/>
		<section class="main-page">
			<div class="container">  
			<!-- <article class="no-posts col-lg-9 col-md-8">
				<div>
				<h2> Sorry! It seems that nothing has been posted yet..</h2>
				<button> <router-link to="/createPost"> Create new post </router-link> </button> 
				</div>
			</article> -->

			<article class=" col-lg-9 col-md-8">
				<h2>Discover our posts</h2>

				<div class="box">
					<div class="post col-lg-6">
						<div class="contents">
							<div class="post-content" v-if="!seeComments" v-bind:class="{active: seeComments}">
								<div class="top-bar">
									<div class="user-info">
										<img src="../assets/user-black.png" alt="">
										<p class="name-container"> Katie May </p>
									</div>

									<div>
										<img src="../assets/bin-black.png" alt="">		
										<img src="../assets/comments.png" alt="" @click="seeComments = !seeComments">	
									</div>
								</div>

								<div class="img-container">
									<img src="../assets/bob.jpg" alt="">
								</div>

								<div class="caption-container">
									<p> However iconic and well-known his image, Ross is still a man of surprises. One glaring fact, that even the most faithful
									television watchers do not often notice, is that Ross was missing a finger. It was cut off on a saw while woodworking
									with his father in his youth. If you look carefully, you will see that Ross hid his missing digit by holding his palette
									with the hand missing the finger.</p>
								</div>

								<div class="post-actions">
									<div class="like">
										<img 
										src="../assets/like-active.png"								  
											v-bind:class="{active: isLiked}"
											@click="isLiked = !isLiked"
										>  
									</div>

									<form class="comments">
										<input class="input" type="text" name="comments" placeholder="Write a comment...">
										<input class="btn" type="submit" value="Submit">
									</form>
								</div>
							</div>

							<div class="post-comments">
								<div class="hero">
									<h1> Comments: </h1>				
									<img src="../assets/comments.png" alt="" @click="seeComments = !seeComments">	
								</div>

								<div class="items">
									<div class="item">
										<div class="user">
											<img src="img/user.png" alt="">
											<p class="user-name"> Katie May : </p>
										</div>
										<p class="comment"> woww </p>
									</div>
							
									<div class="item">
										<div class="user">
											<img src="img/user.png" alt="">
											<p class="user-name"> Jason John : </p>
										</div>
										<p class="comment"> bob ross is so awesome! </p>
									</div>
							
									<div class="item">
										<div class="user">
											<img src="img/user.png" alt="">
											<p class="user-name"> Amy Pond : </p>
										</div>
										<p class="comment"> cool fact!! </p>
							
									</div>
							
									<div class="item">
										<div class="user">
											<img src="img/user.png" alt="">
											<p class="user-name"> Jill Hall : </p>
										</div>
										<p class="comment"> my fav painter! </p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="post col-lg-6">
						<div class="contents">
							<div class="post-content" v-if="!seeComments" v-bind:class="{active: seeComments}">
								<div class="top-bar">
									<div class="user-info">
										<img src="../assets/user-black.png" alt="">
										<p class="name-container"> John Ross </p>
									</div>

									<div>
										<img src="../assets/bin-black.png" alt="">		
										<img src="../assets/comments.png" alt="" @click="seeComments = !seeComments">	
									</div>
								</div>

								<div class="img-container">
									<img src="../assets/POST-3.jpeg" alt="">
								</div>

								<div class="caption-container">
									<p> FLOWER :))</p>
								</div>

								<div class="post-actions">
									<div class="like">
										<img 
										src="../assets/like-active.png"								  
											v-bind:class="{active: isLiked}"
											@click="isLiked = !isLiked"
										>  
									</div>

									<form class="comments">
										<input class="input" type="text" name="comments" placeholder="Write a comment...">
										<input class="btn" type="submit" value="Submit">
									</form>
								</div>
							</div>

							<div class="post-comments">
								<div class="hero">
									<h1> Comments: </h1>				
									<img src="../assets/comments.png" alt="" @click="seeComments = !seeComments">	
								</div>

								<div class="items">
									<div class="item">
										<div class="user">
											<img src="img/user.png" alt="">
											<p class="user-name"> Katie May : </p>
										</div>
										<p class="comment"> woww </p>
									</div>
							
									<div class="item">
										<div class="user">
											<img src="img/user.png" alt="">
											<p class="user-name"> Jason John : </p>
										</div>
										<p class="comment"> bob ross is so awesome! </p>
									</div>
							
									<div class="item">
										<div class="user">
											<img src="img/user.png" alt="">
											<p class="user-name"> Amy Pond : </p>
										</div>
										<p class="comment"> cool fact!! </p>
							
									</div>
							
									<div class="item">
										<div class="user">
											<img src="img/user.png" alt="">
											<p class="user-name"> Jill Hall : </p>
										</div>
										<p class="comment"> my fav painter! </p>
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

import Header from "./header.vue"

export default {
  name: 'MainPage',
  data() {
    return{
		isLiked: false,
		seeComments: false,
    }
  },
  methods: {

  },
  components: {
		"Header": Header, 
  }
}

</script>

<style lang="scss">

.main-page {

	.container {
		display: flex;
		flex-wrap: wrap;
		margin-top: 30px;

		.no-posts {
			margin: 20px 0;
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

		article {
			margin: 20px 0;

			h2 {
				font-size: 25px;
				padding-left: 15px;
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
	
									p {
										line-height: 30px;
									}
								}
							}
	
							.img-container {
								position: relative;
								text-align: center;
								overflow: hidden;
	
								img {
									height: 220px;
									width: auto;
									border: 1px solid rgba(167, 164, 164, 0.459);
									box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
								}
							}
	
							.caption-container {
								height: 100px;
								margin: 15px 0;
								overflow-y: scroll;
								border-radius: 12px;
							}
	
							.post-actions {
								display: flex;
								justify-content: space-around;
	
								.like {
									position: relative;
									padding: 0;
									width: 45px;
	
									img {
										position: absolute;
										margin-right: 15px;
										width: 30px;
										height: auto;
										cursor: pointer;
										filter: brightness(1);		
										opacity: 35%;
									}
									img.active {
										filter: brightness(0);
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
	
									.btn {
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