<template>
  <div class="post col-lg-6">
    <div class="contents">
      <div
        class="post-content"
        v-if="!seeComments"
        v-bind:class="{ active: seeComments }"
      >
        <div class="top-bar">
          <div class="user-info">
            <div class="user-img" @click="getUser(user.userId)">
              <img :src="user.imageUrl" />
            </div>
            <p>{{ user.firstName }} {{ user.lastName }}</p>
          </div>

          <div>
            <img
              src="../assets/bin-black.png"
              alt=""
              @click="deletePost(post.postId)"
            />
            <img
              src="../assets/comments.png"
              alt=""
              @click="getComments(post.postId)"
            />
          </div>
        </div>

        <div class="img-container">
          <img :src="post.imageUrl" />
        </div>

        <div class="caption-container">
          <p>{{ post.caption }}</p>
        </div>

        <div class="post-actions">
          <div class="seen" @click="toggleViewPost(post.postId)">
            <img
              src="../assets/seen.png"
              v-bind:class="{ active: isSeen }"
              id="seePost"
            />
          </div>

          <!-- <div class="seen" @click="viewPost(post.postId)">
				<img 
				src="../assets/seen.png"								  
				@click="newView"
				id="addView"
				> 
				<img 
				src="../assets/seen2.png"								  
				@click="newView"
				id="removeView"
				>
			</div> -->

          <form class="comments" v-on:submit.prevent="onSubmit">
            <input
              class="input"
              type="text"
              placeholder="Write a comment..."
              v-model="commentForm.content"
              required
            />
            <button type="submit" @click="postComment(post.postId)">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div class="post-comments">
        <div class="hero">
          <h1>Comments:</h1>
          <img
            src="../assets/comments.png"
            alt=""
            @click="seeComments = !seeComments"
          />
        </div>

        <div class="no-comments" v-if="comments.length === 0">
          <h2>Sorry! It seems that nothing has been commented yet..</h2>
        </div>

        <div class="items">
          <div
            class="item"
            v-for="comment in comments"
            :key="comment.commentId"
          >
            <div class="user">
              <img src="img/user.png" alt="" />
              <p class="user-name">Katie May :</p>
            </div>
            <p class="comment">{{ comment.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import the promise-based library used with Node.js + your browser to make asynchronous Js HTTP requests
import axios from "axios";

export default {
  name: "Post",
  props: ["post"],
  data() {
    return {
      isSeen: false,
      seeComments: false,

      viewForm: {
        view: 1,
        userId: JSON.parse(localStorage.getItem("user")).userId,
      },

      commentForm: {
        content: "",
        userId: JSON.parse(localStorage.getItem("user")).userId,
      },

      posts: [],
      view: [],
      comments: [],
      user: [],
    };
  },
  methods: {
    deletePost(id) {
      axios
        .delete("http://localhost:3000/post/" + id)
        .then((res) => {
          console.log("Your post has successfully been deleted!");
          location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getComments(id) {
      this.seeComments = !this.seeComments;

      if (this.seeComments) {
        axios
          .get("http://localhost:3000/post/comments/" + id)
          .then((res) => {
            this.comments = res.data;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },

    toggleViewPost(id) {
      this.isSeen = !this.isSeen;

      if (this.isSeen) {
        let viewDetails = this.viewForm;

        axios
          .post("http://localhost:3000/post/view/" + id, viewDetails)
          .then((res) => {
            this.view = res.data;
            console.log("Post viewed!");
            this.getViews();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        axios
          .delete("http://localhost:3000/post/view/" + id)
          .then((res) => {
            this.view = res.data;
            console.log("Post unviewed!");
            this.getViews();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },

    // displayViews() {
    //   if (this.view != null) {
    //     this.isSeen = true;
    //   } else {
    //     this.isSeen = false;
    //   }
    // },

    getViews() {
      let userId = JSON.parse(window.localStorage.getItem("user")).userId;

      axios
        .get("http://localhost:3000/post/view/" + userId)
        .then((res) => {
          this.view = res.data;
          console.log(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    postComment(id) {
      let commentContent = this.commentForm;

      axios
        .post("http://localhost:3000/post/comment/" + id, commentContent)
        .then((res) => {
          this.comments = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    onSubmit: function () {
      this.postComment();
      location.reload();
    },
  },

  beforeMount() {
    this.displayViews();
  },
};
</script>

<style lang="scss">
.post {
  padding: 15px;

  .contents {
    position: relative;
    width: 100%;
    height: 470px;
    background-color: #f2f2f2;
    border-radius: 12px;
    box-shadow: rgba(35, 35, 65, 0.25) 0px 6px 12px -2px,
      rgba(3, 3, 3, 0.418) 0px 3px 7px -3px;
    overflow: scroll;

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
            border: 1px solid #091f43;
            padding-left: 5px;
          }

          button {
            margin-left: 5px;
            padding: 7px;
            border-radius: 12px;
            width: 90px;
            border: 2px solid black;
            background-color: #091f43;
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

      .no-comments {
        h2 {
          padding: 0;
          margin-top: 140px;
          text-align: center;
          font-size: 19px;
        }
      }

      .items {
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

@media only screen and (max-width: 650px) {
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
</style>
