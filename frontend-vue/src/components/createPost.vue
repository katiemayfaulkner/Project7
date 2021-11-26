<template>
	<div>
		<Header/>	
		<section class="container create-post">
			<router-link to="/home">
				<p> Return </p>
			</router-link>
			<div class="content">
				<h1> Create a new post: </h1>
				<form class="create-post"> 					
					<div class="img-input">
						<input type="file" id="postImg" accept="image/*" @input="pickFile" ref="fileInput" required="true">
						<img class="img-preview" style="{ 'background-image': `url(${previewImage})` }" @click="selectImage">
					</div>

					<div class="text-input">
						<label for="text"> Insert your caption: </label>
						<input type="text" maxlength="150" required="true">
					</div>

					<input type="submit" value="Submit" class="submit-btn">
				</form>
			</div>
		</section>
	</div>
</template>

<script>
import Header from "./header.vue"

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
  components: {
		"Header": Header,
  }
}
</script>

<style lang="scss">

.create-post{
	margin-top: 30px;

	a{
		text-decoration: none;
		color: black;
		font-size: 18px;

		p{
			margin-left: 20px;
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

		.create-post {
			margin-top: 20px;

			.img-input {
				margin: 15px 0;

				.img-preview {
					margin: 5px 0;
					width: 300px;
					height: 150px;
					border: 2px solid black;
					border-radius: 15px;
					background-color: white;					
				}
				input{
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
				background-color: #091F43;
				font-weight: 500;
				color: white;
				font-size: 17px;
			}
		}
	}
}

</style>