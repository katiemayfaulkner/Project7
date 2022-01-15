<template>
  <div>
    <section class="container create-post">
      <router-link to="/home">
        <p>Return</p>
      </router-link>
      <div class="content">
        <h1>Create a new post:</h1>
        <form
          class="create-post"
          v-on:submit.prevent="onSubmit"
          enctype="multipart/form-data"
        >
          <div class="img-input">
            <input
              type="file"
              ref="file"
              @change="fileChange()"
              accept=".jpg, .jpeg, .gif, .png"
              
            />
            <img class="img-preview" :src="imgPreview" v-if="imgPreview" />
          </div>

          <div class="text-input">
            <label for="text"> Insert your message: </label>
            <input
              type="text"
              maxlength="150"
              required="true"
              v-model="caption"
            />
          </div>

          <button class="submit-btn" type="submit">Submit</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
// import the promise-based library used with Node.js + your browser to make asynchronous Js HTTP requests
import axios from "axios";

export default {
  name: "createPost",

  data() {
    return {
      // userId: JSON.parse(localStorage.getItem('user')).userId,
      imgPreview: "",
      caption: "",
    };
  },
  methods: {
    isAuthenticated() {
      // Checks for token
      let hasToken = JSON.parse(localStorage.getItem("user")) ? true : false;

      if (!hasToken) {
        this.$router.push({ path: "/" });
      }
    },

    onSubmit: function () {
      this.createPost();
    },

    fileChange() {
      this.imgPreview = URL.createObjectURL(this.$refs.file.files[0]);
    },

    createPost() {
      let formData = new FormData();

      // NOTE: FormData will return empty object if you used console.log(formData) direct. The below code is the alternative.
      // formData.forEach(el => console.log(el));

      formData.append("userId", JSON.parse(localStorage.getItem("user")).userId);
      formData.append("file", this.$refs.file.files[0]);
      formData.append("caption", this.caption);

      axios
        .post("http://localhost:3000/post", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          this.$router.push({ path: "/home" });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  beforeMount() {
    this.isAuthenticated();
  },
};
</script>

<style lang="scss">
.create-post {
  margin-top: 30px;

  a {
    text-decoration: none;
    color: black;
    font-size: 18px;

    p {
      margin-left: 20px;
    }
  }

  .content {
    padding: 25px;
    width: 100%;
    height: auto;
    background-color: #f2f2f2;
    border-radius: 12px;
    box-shadow: rgba(35, 35, 65, 0.25) 0px 6px 12px -2px,
    rgba(3, 3, 3, 0.418) 0px 3px 7px -3px;

    h1 {
      font-size: 22px;
      font-weight: 700px;
    }

    .create-post {
      margin-top: 20px;

      .img-input {
        margin: 15px 0;

        .img-preview {
          margin: 5px 0;
          max-width: 300px;
          max-height: 260px;
          border: 2px solid black;
          border-radius: 15px;
          background-color: white;
        }
		
        input {
          margin: 5px 0;
          padding: 5px;
          border-radius: 12px;
          font-size: 17px;
          width: 100%;
        }
      }

      .text-input {
        margin: 15px 0;

        label {
          width: 100%;
          font-size: 19px;
        }

        input {
          width: 100%;
          height: 80px;
          overflow: scroll;
          padding: 0 7px;
          border: 2px solid black;
          border-radius: 15px;
        }
      }

      .submit-btn {
        padding: 12px;
        margin-right: 15px;
        border-radius: 12px;
        border: none;
        background-color: #091f43;
        font-weight: 500;
        color: white;
        font-size: 17px;
      }
    }
  }
}

@media only screen and (max-width: 770px) {
  .create-post {
    .content {
      padding: 15px;

      h1 {
        font-size: 22px;
      }

      .create-post {
        .submit-btn {
          padding: 10px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>