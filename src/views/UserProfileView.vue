<script setup>
  //import these to access GLOBAL state variables
  import {RouterLink} from 'vue-router'


  // //this is how you import external css files
  // import "../assets/base.css"

</script>

<template>
  <!-- type your HTML here -->
  <main>

   <div class="container-fluid">
    <div class="row background">

      <div class="col-4">
        <section class="vh-100 bg-image background ">
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-5">
              

              <form>
                [PHOTO]


                <div class="d-flex justify-content-center">
                  <button type="button"
                    class="btn background-dark-green btn-block btn-lg gradient-custom-4 text-white subtitle" @click="login">Upload/Edit Photo</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      </div>

      <div class="col-8">
        <section class="vh-100 bg-image background">
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-5">
              <h1 class="text-center mb-5 title display-5">Profile Settings</h1>

              <form>
                

                <div class="form-outline mb-4">
                    <h5 class="form-label subtitle" for="username">Username</h5>
                  <input v-model="username" type="text" id="username" class="form-control form-control-lg" />
                  
                </div>


                <div class="form-outline mb-4">
                    <h5 class="form-label subtitle" for="form3Example4cg">Email</h5>
                  <input v-model="email" type="text" id="form3Example4cg" class="form-control form-control-lg" />
                  
                </div>

                <div class="form-outline mb-4">
                    <h5 class="form-label subtitle" for="form3Example4cg">Preferred Bus Stop</h5>
                  <input v-model="prefereedbusstop" type="text" id="form3Example4cg" class="form-control form-control-lg" />
                  
                </div>

  

                

                <div class="d-flex justify-content-center">
                  <button type="button"
                    class="btn background-dark-green btn-block btn-lg gradient-custom-4 text-white subtitle" @click="login">Confirm</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      </div>
    </div>
  </div>
   




  <!-- use this to access data -->
    
  <!-- link to another page as if using a tag-->

  </main>
</template>

<style scoped>
/* you can also import css files */
main {
    .profile-pic-wrapper {
    height: 100vh;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .pic-holder {
    text-align: center;
    position: relative;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .pic-holder .pic {
    height: 100%;
    width: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: center;
    object-position: center;
  }

  .pic-holder .upload-file-block,
  .pic-holder .upload-loader {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(90, 92, 105, 0.7);
    color: #f8f9fc;
    font-size: 12px;
    font-weight: 600;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .pic-holder .upload-file-block {
    cursor: pointer;
  }

  .pic-holder:hover .upload-file-block,
  .uploadProfileInput:focus ~ .upload-file-block {
    opacity: 1;
  }

  .pic-holder.uploadInProgress .upload-file-block {
    display: none;
  }

  .pic-holder.uploadInProgress .upload-loader {
    opacity: 1;
  }

  /* Snackbar css */
  .snackbar {
    visibility: hidden;
    min-width: 250px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
    font-size: 14px;
    transform: translateX(-50%);
  }

  .snackbar.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
  }

  @-webkit-keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 30px;
      opacity: 1;
    }
  }

  @keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 30px;
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeout {
    from {
      bottom: 30px;
      opacity: 1;
    }
    to {
      bottom: 0;
      opacity: 0;
    }
  }

  @keyframes fadeout {
    from {
      bottom: 30px;
      opacity: 1;
    }
    to {
      bottom: 0;
      opacity: 0;
    }
  }

}
</style>

<script>
export default {

  // this is data, website will reload if this change
  data() {
    return {
      fullname: "",
      username: "",
      eamil: "",
      prefereedbusstop: ""
    }
  },

  methods: {
    test() {
      // you need to use this in the methods
    }
  },


  //any ajax call to start is executed here
  mounted() {
    //this happens when u load website
    // dont forget to put the word this
    document.addEventListener("change", function (event) {
    if (event.target.classList.contains("uploadProfileInput")) {
      var triggerInput = event.target;
      var currentImg = triggerInput.closest(".pic-holder").querySelector(".pic")
        .src;
      var holder = triggerInput.closest(".pic-holder");
      var wrapper = triggerInput.closest(".profile-pic-wrapper");

      var alerts = wrapper.querySelectorAll('[role="alert"]');
      alerts.forEach(function (alert) {
        alert.remove();
      });

      triggerInput.blur();
      var files = triggerInput.files || [];
      if (!files.length || !window.FileReader) {
        return;
      }

      if (/^image/.test(files[0].type)) {
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onloadend = function () {
          holder.classList.add("uploadInProgress");
          holder.querySelector(".pic").src = this.result;

          var loader = document.createElement("div");
          loader.classList.add("upload-loader");
          loader.innerHTML =
            '<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>';
          holder.appendChild(loader);

          setTimeout(function () {
            holder.classList.remove("uploadInProgress");
            loader.remove();

            var random = Math.random();
            if (random < 0.9) {
              wrapper.innerHTML +=
                '<div class="snackbar show" role="alert"><i class="fa fa-check-circle text-success"></i> Profile image updated successfully</div>';
              triggerInput.value = "";
              setTimeout(function () {
                wrapper.querySelector('[role="alert"]').remove();
              }, 3000);
            } else {
              holder.querySelector(".pic").src = currentImg;
              wrapper.innerHTML +=
                '<div class="snackbar show" role="alert"><i class="fa fa-times-circle text-danger"></i> There is an error while uploading! Please try again later.</div>';
              triggerInput.value = "";
              setTimeout(function () {
                wrapper.querySelector('[role="alert"]').remove();
              }, 3000);
            }
          }, 1500);
        };
      } else {
        wrapper.innerHTML +=
          '<div class="alert alert-danger d-inline-block p-2 small" role="alert">Please choose a valid image.</div>';
        setTimeout(function () {
          var invalidAlert = wrapper.querySelector('[role="alert"]');
          if (invalidAlert) {
            invalidAlert.remove();
          }
        }, 3000);
      }
    }
  });
    //dont forget to use this keyword
                   // this is a reference to the backend URL in .env.local file
    this.axios.get(`${import.meta.env.VITE_BACKEND}/user/joshua`).then( response => {
      // below is all the information taken from response, assigned to this."data"
      console.log(response);
      var path = response.data.data;
      this.about = path.about;
      this.email = path.email;
      this.fullname = path.fullName;
      this.image = path.imageURL;
      this.prefereedbusstop = path.preferredBusStop
      this.username = path.username
      }
    ).catch ( error => {
    })
  }
}
</script>