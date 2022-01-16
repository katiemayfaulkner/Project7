<template>
  <div>
    <section class="main-page">
      <div class="container">
        <article class="col-lg-8 col-md-8">
          <h2>Discover our posts</h2>

          <div class="no-posts" v-if="posts.length === 0">
            <div>
              <h2>Sorry! It seems that nothing has been posted yet..</h2>
              <button>
                <router-link to="/create-post"> Create new post </router-link>
              </button>
            </div>
          </div>

          <div class="box">
            <Post
              v-for="post in posts"
              :key="post.postId"
              :postData="post"
              v-on:deletePostFromChild="deletePost"
            />
          </div>
        </article>

        <div class="col-lg-4 col-md-4">
          <div class="sticky-items">
            <div class="footer">
              <p>About</p>
              <p>User Agreement</p>
              <p>Content Policy</p>
              <p>Privacy Policy</p>
              <p>Moderator Guidelines</p>
              <p>Help</p>
              <span> © 2021 Club Groupomania, Inc. All rights reserved.</span>
            </div>

            <a href="#scroll-top">
              <button class="scroll-btn">Back to top</button>
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
import Post from './Post.vue';

export default {
   name: 'MainPage',
	data() {
		return{
			posts: [],
		};
	},
	
	methods: {     
		getPosts() {
			axios.get("http://localhost:3000/post")
				.then(res => {
					this.posts = res.data.result;

				})
				.catch(error => {
					console.error(error);
				})
		},

		deletePost(id) {
			// Actual deletion
			axios
				.delete("http://localhost:3000/post/" + id)
				.then((res) => {
					// Fake Deletion
					this.posts = this.posts.filter(post => post.postId !== id);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	},

	beforeMount() {
		this.getPosts()
	},

	components: {
		Post
	}
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
            background-color: #091f43;

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
          box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
            rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

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
            background-color: #091f43;
            color: white;
            font-weight: 500;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 650px) {
  .main-page {
    .container {
      margin-top: 20px;
      padding: 0;

      article {
        padding: 10px;

        h2 {
          font-size: 22px;
        }

        .no-posts {
          margin-top: 50px;

          div {
            h2 {
              width: 90%;
              font-size: 20px;
            }
          }
        }

        .post-content {
          .post-actions {
            .comments {
              width: 80%;
              .input {
                width: 90%;
              }
            }
          }
        }
      }

      div {
        .sticky-items {
          button {
            font-size: 15px;
            padding: 7px;
          }
        }
      }
    }
  }
}
</style>