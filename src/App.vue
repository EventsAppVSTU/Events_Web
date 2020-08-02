<template>
  <div id="app">
    <header>
      
        <div class="header-row">
          <div class="logo-container">
            <img src="@/assets/appicon.png" class="logo" alt="" srcset="">
            <h2 class="logoText">Events App</h2>
          </div>
            <div class="header-right-side">
              <button href="" class="btn btn-ea-red" id="menu-toggle" v-on:click="toggleMenu()">menu</button>
              <button v-if="isLog" v-on:click="logOut()" class="textBtn" >Log out</button>
            </div>

        </div>
    </header>

<!-- Для отображения формы входа -->
  <router-view v-if="!isLog" @checkAuthAgain="checkAuth()"/>
   <div v-show="isLog">
            <div class="container-fluid">
            <div class="row">
                <div class="col-md-2">
                    <ul id="sidebar-nav" class="s-hidden">
                        
                        <ul class="nav flex-column">
                            <li class="nav-item">
                              <span class="nav-link">
                                <router-link to="/events">
                                <svg class="feather">
                                    <use xlink:href="@/assets/feather-sprite.svg#home"/>
                                </svg>
                                Events</router-link>
                              </span>
                            </li>
                            <li class="nav-item">
                              <span class="nav-link">
                              
                                <router-link to="/event-news"> 
                                <svg class="feather">
                                    <use xlink:href="@/assets/feather-sprite.svg#layout"/>
                                </svg>
                                News</router-link>
                              </span>
                            </li>
                            <li class="nav-item">
                              <span class="nav-link">
                                <router-link to="/home">
                                <svg class="feather">
                                    <use xlink:href="@/assets/feather-sprite.svg#feather"/>
                                </svg>
                                Home</router-link>
                              </span>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="#">
                                
                                <router-link to="/performances">
                                <svg class="feather">
                                    <use xlink:href="@/assets/feather-sprite.svg#calendar"/>
                                </svg>
                                Performances</router-link>
                              </a>
                            </li>
                            <li class="nav-item">
                              <span class="nav-link">
                                <router-link to="/currentEvent">
                                <svg class="feather">
                                    <use xlink:href="@/assets/feather-sprite.svg#file-text"/>
                                </svg>
                                Current Event</router-link>
                              </span>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="#">
                                <span data-feather="users"></span>
                                 <router-link to="/users">
                                 <svg class="feather">
                                    <use xlink:href="@/assets/feather-sprite.svg#users"/>
                                </svg>
                                 Users</router-link>
                              </a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="#">
                                <router-link to="/organizations">
                                  <svg class="feather">
                                      <use xlink:href="@/assets/feather-sprite.svg#aperture"/>
                                  </svg>
                                Organizations</router-link>
                              </a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="#">
                                <span data-feather="users"></span>
                                 <router-link to="/eventsCategories">
                                 <svg class="feather">
                                    <use xlink:href="@/assets/feather-sprite.svg#bar-chart-2"/>
                                </svg>
                                 Categories</router-link>
                              </a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="#">
                                 <router-link to="/chosenEvents">
                                 <svg class="feather">
                                    <use xlink:href="@/assets/feather-sprite.svg#book"/>
                                </svg>
                                 Chosen Events</router-link>
                              </a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="#">
                                 <router-link to="/chosenPerformances">
                                 <svg class="feather">
                                    <use xlink:href="@/assets/feather-sprite.svg#bookmark"/>
                                </svg>
                                 Chosen Performances</router-link>
                              </a>
                            </li>
                          </ul>
                          
                        
                    </ul>
                </div>
                <div class="col-md-10">
                    <div class="content">
                      <div class="container">
                        <router-view/>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    
   </div>
  </div>
</template>

<script>
export default {
  
  
  name: 'App',
  data: function(){
    return {
      isLog: '',
      login: '',
      password: '', 
      displayError: false,
      loginErrorMessage: '', 
    }
  },
  methods:{
    checkAuth(){
        this.requests.checkAuthorization().then(data=>{
          console.log(data)
          this.isLog = data
        })
    },
    toggleMenu(){
      var sidebar = document.getElementById('sidebar-nav');
      sidebar.classList.toggle('s-hidden');
      console.log('open-close')
      sidebar.classList.toggle('s-open');
    },
    logOut(){
      localStorage.hash = ''
      this.$root.isAuth = false
      this.$router.push('login')
      this.requests.checkAuthorization().then(data=>{
       console.log(data)
       this.isLog = data
     })
    }
  },
  mounted(){
     this.checkAuth()
    //если не пустой, то можно
    // if(localStorage.hash = ''){
    //   this.isLog = false
    // }
    // else{
    //   this.isLog = true
    // }
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */

/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
/* @media(prefers-color-scheme: light){
  body{
    background-color: white;
    color: black;
  }
}
@media(prefers-color-scheme: dark){
  body{
    background-color:black;
    color: white;
  }
} */

.message-empty-content{
  padding: 2rem;
  text-align: center;
  color: #676767;
  /* font-size: 1.2rem; */
}
.text-button{
  font-weight: 600;
  color: #ff004d;
}
.text-button:hover{
  color: #ff6492;
}
a{
  color:  #333333;
}
a:hover{
  text-decoration: none;
}

tml, body{
    margin: 0;
    padding: 0;
    overflow-x: hidden;
}
header{
    background-color: #111111;
    color: aliceblue;
    padding: .5rem;
    position: fixed;
    width: 100%;
    z-index: 11111;
    /* display: flex; */
}
.header-row{
  display: flex;
  align-items: center;
  align-content: center;
}
.header-right-side{
  display: flex;
}
.logo{  
  height: 3rem;
  width: auto;
}
.logoText{
  font-size: 1.5rem;
  padding-left: .5rem;
  line-height: 3rem;
  margin: 0;
  font-family: 'Nunito', sans-serif;
  letter-spacing: .1rem;
  font-weight: 600;
}
.logo-container{
  display: flex;
  flex-grow: 1;
}
/* sign in */
.signInBlock{
  padding: 7rem;
  /* background: #ff004d; */
}
.signInBlock h2{
  text-align: center;
}
.signInBlock_form{
  padding: 3rem;
  width: 60%;
  margin: auto;
  /* background: #999; */
  border-radius: 1.2rem;
  border: 1px solid rgb(218, 218, 218);
  /* box-shadow: 5px 5px 50px rgba(51, 51, 51, 0.112), 5px 5px 10px rgba(51, 51, 51, 0.112); */
}
/*  */
.feedback{
  color: red;
}
.btn-ea-red{
    background-color: #ff004d;
    color: white;
}
#menu-toggle{
  display: none;
}
.textBtn{
  background: no-repeat;
  border: none;
  color: #848484;
}
.textBtn:hover{
  color: #a4a4a4;
}
.feather {
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
}
#sidebar-nav a.nav-link {
    font-weight: 500;
    color: #333;
  }
#sidebar-nav .nav-link .feather {
    margin-right: 4px;
    color: #999;
  }
  
  #sidebar-nav .nav-link.active, .router-link-active {
      color: #ff004d;
    /* color: #007bff; */
  }
  a:hover{
    color: #ff004d;
  }
  
  #sidebar-nav .nav-link:hover .feather,
  #sidebar-nav .nav-link.active .feather {
    color: inherit;
  }
#sidebar-nav{
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0em;
    bottom: 0em;
    left: 0;
    padding: 1rem;
    padding-top: 5rem;
    z-index: 10;
    background-color: rgb(242, 242, 242);
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
    margin: 0;
}
.content{
    padding-top: 6rem;
}
.btn-rounded{
    border-radius: 5rem;
    padding: .5rem 1.2rem;
}

@media(max-width:900px){
    #sidebar-nav{
        padding: 5rem 0;
    }
    #menu-toggle{
      display: block;
    }
}

@media(max-width:800px){
    #sidebar-nav{
        width: 100%;
        z-index: 10;
    }
    .s-hidden{
        display: none !important;
    }
    .s-open{
        display: block;
    }
    .signInBlock{
      padding: 7rem 0;
    }
    .signInBlock_form{
      width: 100%;
      margin: 0;
      padding: 2rem;
    }
}


.feather {
  width: 1.1rem;
  height: 1.1rem;
  stroke: #848484;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
a.router-link-exact-active>.feather{
  stroke: #ff004d;
}

</style>

