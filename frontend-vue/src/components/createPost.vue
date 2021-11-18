<template>
    <div class="window">
        <div class="box">
          <div class="hero">
              <h1> Create New Post: </h1>
              <router-link to="/">
                  <img src="../assets/close-white.png" alt="">
              </router-link>
          </div>

          <div class="create-post"> 
              <div class="text-input">
                  <label for="text"> Insert your name here: </label>
                  <input type="text" maxlength="150" required="true">
              </div>
              
              <div class="text-input">
                  <label for="text"> Insert your caption here: </label>
                  <input type="text" maxlength="150" required="true">
              </div>

              <div class="img-input">
                  <div class="preview">
                    <img class="img-preview" style="{ 'background-image': `url(${previewImage})` }" @click="selectImage">
                  </div>

                  <input type="file" id="postImg" accept="image/*" @input="pickFile" ref="fileInput" required="true">
              </div>

              <input type="submit" value="Submit" class="submit-btn">
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'createPost',

  data() {
    return {
      previewImage: null
    };
  },

  methods: {

    selectImage () {
      this.$refs.fileInput.click()
    },

    pickFile () {
      let input = this.$refs.fileInput
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader
        reader.onload = e => {
          this.previewImage = e.target.result
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
      }
    }
  },
}
</script>

<style scoped>

.window {
  position: fixed;
  z-index: 1;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(117, 114, 114, 0.5);
}
.window .box {
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
  overflow: scroll;
}
.window .box .hero {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
.window .box .hero a{
    display: flex;
    line-height: 25px;
    text-decoration: none;
}
.window .box .hero h1 {
    font-size: 22px;
    font-weight: 300px;
}
.window .box .hero a img { 
  margin-right: 5px;
  height: 25px;  
}
.window .box .create-post {
  margin-top: 20px;
}
.window .box .create-post .img-input {
  margin: 15px 0;
}
.window .box .create-post .img-input .preview .img-preview{
  width: 120px;
  height: 120px;
  border: 1px hotpink solid;
  display: block;
  margin: 0 auto 10px;
  background-size: cover;
  background-position: center center;  
}
.window .box .create-post .text-input {
  margin: 5px 0;
}
.window .box .create-post .text-input label {
  width: 100%;
  font-size: 19px;
}
.window .box .create-post .text-input input {
  width: 100%;
  height: 40px;
  overflow: scroll;
  border: 2px solid black;
  border-radius: 15px;
}
.window .box .create-post .submit-btn {
  padding: 7px;
  border-radius: 12px;
  width: 100px;
  border: 2px solid black;
  background-color: white;
  color: #091F43;
  font-size: 17px;
}

@media only screen and (max-width: 770px) {
  
  .window .box{
    width: 90%;
  } 
}

</style>