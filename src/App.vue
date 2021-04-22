<template>
  <div id="app">
    <header>
      
        <div class="header-row">
          <div class="logo-container">
            <img src="@/assets/appicon.png" class="logo" alt="" srcset="">
            <h2 class="logoText">Events App</h2>
          </div>
            <div class="header-right-side">
              <button href="" class="btn " id="menu-toggle" v-on:click="toggleMenu()">
                <svg class="feather">
                    <use xlink:href="@/assets/feather-sprite.svg#menu"/>
                </svg>
                
              </button>
              <button v-if="currentEvent.id != undefined" v-on:click="logOut()" class="textBtn" >
                <svg class="feather">
                    <use xlink:href="@/assets/feather-sprite.svg#log-out"/>
                </svg>
                
              </button>
            </div>

        </div>
    </header>

    <Loader v-show="loading == true" />

<!-- Для отображения формы входа -->
<!-- @checkAuthAgain="checkAuth()" -->
<!-- currentEvent.id == undefined -->
  <router-view v-if="userAdmin == ''|| userAdmin == undefined" @checkAuthAgain="reloadPage()" />
  <!-- v-show="currentEvent.id != undefined" -->
   <div v-if="userAdmin != ''">
               
            <div class="container-fluid">
            <div class="row">
                <div class="col-md-2" >
                    <ul id="sidebar-nav" class="s-hidden">
                        
                        <ul class="nav flex-column">
                          <div v-if="userRole != 2">

                            <li class="nav-item">
                              <span class="nav-link" >
                                <router-link to="/events">
                                <svg class="feather">
                                    <use xlink:href="@/assets/feather-sprite.svg#compass"/>
                                </svg>
                                События</router-link>
                              </span>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="#">
                                 <router-link to="/chosenEvents">
                                 <svg class="feather">
                                    <use xlink:href="@/assets/feather-sprite.svg#book"/>
                                </svg>
                                 Выбранные события</router-link>
                              </a>
                            </li>
                            <li>
                              <hr>
                            </li>
                            <li class="nav-item">
                              <span class="nav-link currentEventMenu">
                                <router-link to="/currentEvent">
                                <svg class="feather">
                                    <use xlink:href="@/assets/feather-sprite.svg#home"/>
                                </svg>
                                {{currentEvent.name}}
                                </router-link>
                              </span>
                            </li>
                            <li class="nav-item">
                              <span class="nav-link">
                              
                                <router-link to="/event-news"> 
                                <svg class="feather">
                                    <use xlink:href="@/assets/feather-sprite.svg#layout"/>
                                </svg>
                                Новости</router-link>
                              </span>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="#">
                                
                                <router-link to="/performances">
                                <svg class="feather">
                                    <use xlink:href="@/assets/feather-sprite.svg#calendar"/>
                                </svg>
                                Расписание</router-link>
                              </a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="#">
                                 <router-link to="/chosenPerformances">
                                 <svg class="feather">
                                    <use xlink:href="@/assets/feather-sprite.svg#bookmark"/>
                                 </svg>
                                 Выбранные секции</router-link>
                              </a>
                            </li>
                            <li class="nav-item" v-if="currentEvent.private == 1">
                              <a class="nav-link" href="#">
                                 <router-link to="/privateEventAccept">
                                 <svg class="feather">
                                    <use xlink:href="@/assets/feather-sprite.svg#lock"/>
                                 </svg>
                                 Заявки на событие</router-link>
                              </a>
                            </li>
                            <li>
                              <hr>
                            </li>
                          </div>
                            
                            
                            <li class="nav-item">
                              <a class="nav-link" href="#">
                                <span data-feather="users"></span>
                                 <router-link to="/users">
                                 <svg class="feather">
                                    <use xlink:href="@/assets/feather-sprite.svg#users"/>
                                </svg>
                                 Пользователи</router-link>
                              </a>
                            </li>

                            <div v-if="userRole == 2">
                              <li class="nav-item">
                                <a class="nav-link" href="#">
                                  <router-link to="/organizations">
                                    <svg class="feather">
                                        <use xlink:href="@/assets/feather-sprite.svg#aperture"/>
                                    </svg>
                                  Организации</router-link>
                                </a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" href="#">
                                  <span data-feather="users"></span>
                                  <router-link to="/eventsCategories">
                                  <svg class="feather">
                                      <use xlink:href="@/assets/feather-sprite.svg#grid"/>
                                  </svg>
                                  Категории</router-link>
                                </a>
                              </li>
                            </div>
                            
                            
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
import Loader from './components/Loader'
import {getCurrentEvent} from './requests/currentEvent'
import {getUserById} from './requests/users'

export default {
  
  
  name: 'App',
  components: {
    Loader
  },
  data: function(){
    return {
      isLog: '',
      login: '',
      password: '', 
      displayError: false,
      loginErrorMessage: '',
      menuButtonIcon: 'menu',
      currentEvent: '',
      loading: false,
      userRole: '',
      userAdmin: ''
    }
  },
  methods:{
    loadPage(){
      this.userRole = localStorage.userRole
      // if(this.userRole != undefined){
        console.log('user id', localStorage.userId)
        getUserById(localStorage.userId).then(data=>{
          this.userAdmin = data.data.objects[0]
        })
        getCurrentEvent().then(data=>{
            console.log('requested event', data)
            this.currentEvent = data.data.objects[0];
            this.loading = false
        })
      // }
      // else{
      //   console.log('user id', localStorage.userId)
      // }
      
    },
    reloadPage(){
      this.userRole = localStorage.userRole
      this.loading = true
      
      setTimeout(() => {
        if(this.userRole != undefined){
          getUserById(localStorage.userId).then(data=>{
            this.userAdmin = data.data.objects[0]
          })
          getCurrentEvent().then(data=>{
            console.log('requested event', data)
            this.currentEvent = data.data.objects[0];
            this.loading = false
          })
        }
        
      }, 500);   
    },
    toggleMenu(){
      var sidebar = document.getElementById('sidebar-nav');
      sidebar.classList.toggle('s-hidden');
      console.log('open-close')
      sidebar.classList.toggle('s-open');
    },
    logOut(){
      localStorage.hash = ''
      localStorage.userId = ''
      localStorage.organizationId = ''
      localStorage.userRole = ''
      this.$root.isAuth = false
      this.$router.push('login')
      this.currentEvent.id = undefined
      this.userAdmin = ''
    },
  },
  created(){
    this.$eventBus.$on('reloadApp', ()=>{
      // alert('reloading...')
      this.loading = true
      setTimeout(() => {
        this.loadPage()
        this.loading = false
      }, 1000);
    })
  },
  mounted(){
    //  this.checkAuth()

    //узнать выбранное событие
    this.loadPage()

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
.loader-conteiner{
  position: absolute;
  background: #111111c5;
  height: 100%;
  width: 100%;
  z-index: 11;
  backdrop-filter: blur(12px);
}
.loader{
  position: absolute;
  top: 50vh;
  left: 50vw;
  z-index: 1;
}
.currentEventMenu{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 210px;
}

.message-empty-content{
  padding: 2rem;
  text-align: center;
  color: #676767;
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
}
.signInBlock h2{
  text-align: center;
}
.signInBlock_form{
  padding: 3rem;
  width: 60%;
  margin: auto;
  border-radius: 1.2rem;
  border: 1px solid rgb(218, 218, 218);
}

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

@media(max-width:1024px){
    #sidebar-nav{
        padding: 5rem 0;
    }
    #menu-toggle{
      display: block;
    }
}

@media(max-width:1024px){
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

