<template>
  <div class="post col-lg-10">
    <div class="contents">
      <div class="post-content">
        <div class="top-bar">
          <div class="user-info">
            <div class="user-img">
              <img :src="postData.userImg" />
            </div>
            <p>{{ postData.firstName }} {{ postData.lastName }}</p>
          </div>

          <div>
            <img
              src="../assets/bin-black.png"
              alt=""
              @click="deletePost(postData.postId)"
            />
            <img
              src="../assets/comments.png"
              alt=""
              @click="getComments(postData.postId)"
            />
          </div>
        </div>

        <div class="img-container" v-if="postData.postImg">
          <img :src="postData.postImg" />
        </div>

        <div class="caption-container">
          <p>{{ postData.caption }}</p>
        </div>

        <div class="post-actions">
          <div class="seen" @click="toggleViewPost(postData.postId)">
            <img
              src="../assets/seen.png"
              v-bind:class="{ active: isSeen }"
              id="seePost"
            />
          </div>

          <form
            class="comments"
            v-on:submit.prevent="postComment(postData.postId)"
          >
            <input
              class="input"
              type="text"
              placeholder="Write a comment..."
              v-model="commentForm.content"
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <div class="post-comments" v-if="seeComments">
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
            v-for="comment in comments.result"
            :key="comment.commentId"
          >
            <div class="user">
              <div class="user-img">
                <img :src="comment.userImg" />
              </div>
              <p class="user-name">
                {{ comment.firstName }} {{ comment.lastName }}
              </p>
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
  props: ["postData"],
  data() {
    return {
      isSeen: false,
      seeComments: false,
      userId: JSON.parse(localStorage.getItem("user")).userId,

      commentForm: {
        content: "",
        userId: JSON.parse(localStorage.getItem("user")).userId
      },

      view: [],
      comments: [],
      user: [],
    };
  },

  methods: {

    deletePost(id) {
      this.$emit('deletePostFromChild', id);
    },

    postComment(id) {
      axios
        .post("http://localhost:3000/post/comment/" + id, this.commentForm)
        .then((res) => {
          this.commentForm.content = "";
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
        axios
          .post("http://localhost:3000/post/view/" + id, {userId: this.userId})
          .then((res) => {
            this.view = res.data;
          })
          .catch((error) => {
            console.error(error);
          });
      } else {

        axios
          .delete("http://localhost:3000/post/view/" + id, {
            data: {
              userId: this.userId
            }
          })
          .then((res) => {
            this.view = res.data;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },

    getViews() {
      axios
        .get("http://localhost:3000/post/view/" + this.userId, {
          params: {
            postId: this.postData.postId
          }
        })
        .then((res) => {
          this.isSeen = true;
          console.log(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },

  beforeMount() {
    this.getViews();
  },
};
</script>

<style lang="scss">
.post {
  padding: 15px;

  .contents {
    position: relative;
    width: 100%;
    height: auto;
    background-color: #f2f2f2;
    border-radius: 12px;
    box-shadow: rgba(35, 35, 65, 0.25) 0px 6px 12px -2px,
      rgba(3, 3, 3, 0.418) 0px 3px 7px -3px;
    overflow: scroll;

    .post-content {
      padding: 25px;
      border-radius: 12px;
      background-color: #f2f2f2;
      color: black;

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
            border: 2px solid black;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            margin-bottom: 15px;
            margin-right: 10px;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          p {
            line-height: 40px;
          }
        }
      }

      .img-container {
        position: relative;
        height: 65%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .caption-container {
        height: 50px;
        margin-top: 7px;
        overflow-y: scroll;
        border-radius: 12px;
      }

      .post-actions {
        display: flex;
        justify-content: center;

        .seen {
          position: relative;
          padding: 0;
          margin-right: 15px;
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
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #f2f2f2;

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
          margin-top: 30px;
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

            .user-img {
              border: 1px solid black;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              overflow: hidden;
              margin-bottom: 15px;
              margin-right: 10px;

              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            p {
              line-height: 30px;
              font-weight: 600;
            }
          }
          p {
            line-height: 30px;
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
