<template>
  <div class="Users">
        <h2>Пользователи</h2>
        <div class="events-toolbar">
          <input type="text" placeholder="Найти..." v-model="searchString"> 
          <CreateUser @reloadUsers="getUsers()" />
        </div>

        <div v-if="users == ''" class="message-empty-content">
          <h5>Нет выступлений</h5>
          <p>Добавьте новость, нажав на кнопку "Созадать запись"</p>
        </div>
        <div class="data-table" v-else >
          <div class="data-row" v-for="(user, index) in filteredUsers" :key="index">
            <div class="data-row_number">{{index}}
              <p>id: {{user.id}}</p>
            </div>
            <div class="data-row-img">
              <img :src="user.image"  alt="" srcset="" v-if="user.image != '' && user.image != 'null'">
              <img :src="require(`@/assets/Men-Profile-Image.png`)" v-else>
            </div>

            <div class="data-row_content">

              <div class="col-content-container">
                <div class="data-row_content-col-2">
                <input class="table-display-input table-event-name data-row_content-top_name d-block" type="text" v-model="user.name" :disabled="isDisabled!==index">
                
                <input class="table-display-input table-event-name data-row_content-top_name d-block" type="text" v-model="user.surname" :disabled="isDisabled!==index">

                <div class="info-block">
                  <!-- data-row-icons -->
                  <svg class="feather" >
                    <use xlink:href="@/assets/feather-sprite.svg#aperture"/>
                  </svg>
                  <input class="table-display-input table-event-name data-row_content-top_info" type="text" v-model="user.organization_verify" :disabled="isDisabled!==index">
                </div>

                <div class="info-block">
                  <!-- data-row-icons -->
                  <svg class="feather" >
                    <use xlink:href="@/assets/feather-sprite.svg#aperture"/>
                  </svg>
                  <input class="table-display-input table-event-name data-row_content-top_info" type="text" v-model="user.organization_id" :disabled="isDisabled!==index">
                </div>

                <OrganizationsComboBox @organizationSelected="setOrganization" :currentOrganization="user.organization_id" :index="user.id" 
                v-if="isDisabled===index"
                />
                <div v-else > 
                  <p>{{userOrganization(index)}}</p>
                </div>

              </div>
              <div class="data-row_content-col-2">
                <div class="info-block">
                  <svg class="feather">
                    <use xlink:href="@/assets/feather-sprite.svg#at-sign"/>
                  </svg>
                  <input class="table-display-input table-event-name data-row_content-top_info" type="text" v-model="user.login" :disabled="isDisabled!==index">
                </div>

                <div class="info-block">
                  <svg class="feather" >
                    <use xlink:href="@/assets/feather-sprite.svg#key"/>
                  </svg>
                  <input class="table-display-input table-event-name data-row_content-top_info" type="text" v-model="user.password" :disabled="isDisabled!==index">
                </div>

                <div class="info-block">
                  <svg class="feather" >
                    <use xlink:href="@/assets/feather-sprite.svg#phone"/>
                  </svg>
                  <input class="table-display-input table-event-name data-row_content-top_info" type="text" v-model="user.phone" :disabled="isDisabled!==index">
                </div>

                <div class="info-block">
                  <svg class="feather data-row-icons" >
                    <use xlink:href="@/assets/feather-sprite.svg#globe"/>
                  </svg>
                  <input class="table-display-input table-event-name data-row_content-top_info" type="text" v-model="user.web_link" :disabled="isDisabled!==index">
                </div>

                <div class="info-block">
                  <svg class="feather data-row-icons" >
                    <use xlink:href="@/assets/feather-sprite.svg#globe"/>
                  </svg>
                  <input class="table-display-input table-event-name data-row_content-top_info" type="text" v-model="user.organization_verify" :disabled="isDisabled!==index">
                </div>

              </div>
              </div>

              <!-- <div class="data-row_content-top">

                <input class="table-display-input table-event-name data-row_content-top_name" type="text" v-model="user.name" :disabled="isDisabled!==index">
                

                <svg class="feather data-row-icons" >
                  <use xlink:href="@/assets/feather-sprite.svg#at-sign"/>
                </svg>
                <input class="table-display-input table-event-name data-row_content-top_time" type="text" v-model="user.login" :disabled="isDisabled!==index">
                <svg class="feather data-row-icons" >
                  <use xlink:href="@/assets/feather-sprite.svg#key"/>
                </svg>
                <input class="table-display-input table-event-name data-row_content-top_time" type="text" v-model="user.password" :disabled="isDisabled!==index">

                <svg class="feather data-row-icons" >
                  <use xlink:href="@/assets/feather-sprite.svg#phone"/>
                </svg>
                <input class="table-display-input table-event-name data-row_content-top_time" type="text" v-model="user.phone" :disabled="isDisabled!==index">
                
                <input class="table-display-input table-event-name data-row_content-top_speaker" type="text" v-model="user.role" :disabled="isDisabled!==index">
              </div> -->
              <div class="data-row_content-description" >

                <h6 v-show="(pressedButtonIndex === index)">Описание</h6>
                <textarea @input="fixTextareaSize()" rows="5" class="performance-description" name="" id=""  v-show="(pressedButtonIndex === index)" v-model="user.bio" :disabled="isDisabled!==index"></textarea>
                <button v-if="user.bio != undefined" class="news-button-more"  v-on:click="expand(index)">
                  Подробнее <svg class="feather" :class="{'rotate-news-arrow': pressedButtonIndex === index}">
                          <use xlink:href="@/assets/feather-sprite.svg#chevron-right"/>
                      </svg>
                </button>
              </div>

            </div>
              
            <div class="data-row_actions">
              <button v-on:click="editUser(index)" class="card-edit-button">
              <span v-if="isDisabled===index">Done</span>
              <svg class="feather">
                  <use xlink:href="@/assets/feather-sprite.svg#edit"/>
              </svg>
            </button>
            <button @click="deleteUser(index)" class="card-delete-button">
              <svg class="feather">
                  <use xlink:href="@/assets/feather-sprite.svg#trash"/>
              </svg>
            </button>
            </div>
          </div>
        </div>

        <form id="#per" class="performance-form">
          <input type="text" class="performance-add" placeholder="name" name="name" v-model="usr.name">
          <input type="text" class="performance-add" placeholder="surname" name="surname" v-model="usr.surname">
          <input type="text" class="performance-add" placeholder="organization_id" name="organization_id" v-model="usr.organization_id">
          <input type="text" class="performance-add" placeholder="login" name="login" v-model="usr.login">
          <input type="text" class="performance-add" placeholder="password" name="password" v-model="usr.password">
          <button class="btn btn-outline-danger btn-rounded" type="submit" v-on:click="createUser()">+ Create</button>
        </form>
        <!-- <table class="table table-striped table-responsive-lg table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Surname</th>
              <th>image</th>
              <th>Organization</th>
              <th>Login</th>
              <th>Password</th>
              <th>Registration Date</th>
              <th>Role</th>
              <th>Cur ev</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <td>
                {{user.id}} 
              </td>
              <td>
                <input class="table-display-input table-event-name" type="text" v-model="user.name" :disabled="isDisabled!==index">
              </td>
              <td>
                <input class="table-display-input table-event-name" type="text" v-model="user.surname" :disabled="isDisabled!==index">
              </td>
              <td>
                <input class="table-display-input table-event-name" type="text" v-model="user.image" :disabled="isDisabled!==index">
              </td>
              <td>
                <input class="table-display-input table-event-name" type="text" v-model="user.organization_id" :disabled="isDisabled!==index">
              </td>
              <td>
                <input class="table-display-input table-event-name" type="text" v-model="user.login" :disabled="isDisabled!==index">
              </td>
              <td>
                <input class="table-display-input table-event-name" type="text" v-model="user.password" :disabled="isDisabled!==index">
              </td>
              <td>
                <input class="table-display-input table-event-name" type="text" v-model="user.registrationDate" :disabled="isDisabled!==index">
              </td>
              <td>
                <input class="table-display-input table-event-name" type="text" v-model="user.role" :disabled="isDisabled!==index">
              </td>
              <td>
                <input class="table-display-input table-event-name" type="text" v-model="user.current_event" :disabled="isDisabled!==index">
              </td>
                <td>
                  <div class="table-buttons-block">
                    <button class="btn btn-outline-success btn-sm" v-on:click="editUser(index)">
                      <span v-if="isDisabled===index">Готово</span>
                      <span v-else>Изменить</span>
                      </button>
                    <button class="btn btn-outline-danger btn-sm" v-on:click="deleteUser(index)">Удалить</button>
                  </div>
              </td>
            </tr>
          </tbody>
        </table> -->
  </div>
</template>

<script>
import {getOrganizations} from '../requests/organizations'
import OrganizationsComboBox from '../components/OrganizationsComboBox'
import CreateUser from '../components/CreateUser'
import {getAdmins, getUsers, putUser, deleteUser} from '../requests/users'

export default {
  name: 'Users',
  components: {
    CreateUser,
    OrganizationsComboBox
  },
  data: function(){
      return {
          users: [{
              id: Number,
              name: '',
              surname: '',
              image: '',
              organization_id: Number,
              login: '',
              password: '',
              registrationDate: '',
              role: '',
              current_event: Number,
          }],
      isDisabled: '',
      editBtn: 'Edit',
      pressedButtonIndex: '',
      searchString: '',
      organizations: [],
      usr:{
              name: '',
              surname: '',
              image: '',
              organization_id: '',
              login: '',
              password: '',
              registrationDate: '',
              role: '',
              current_event: Number

        //       role: req.body.role,
        // current_event: req.body.current_event,
        // organization_verify: req.body.organization_verify,
        // phone: req.body.phone,
        // bio: req.body.bio
        }
      }
  },
  methods:{
      getUsers(){
        if(localStorage.userRole == 1){
          getUsers().then(data=>{
            console.log('this is data user: ', data.data.objects);
            console.log(data.data.objects[0].id)
            this.users = data.data.objects
          })
        }
        else {
          getAdmins(1).then(data=>{
            console.log('this is data user: ', data.data.objects);
            console.log(data.data.objects[0].id)
            this.users = data.data.objects
          })
        }
      },
      editUser(index){
          console.log(index)
          if(this.isDisabled === ''){
            console.log('Editing')
            if(this.isDisabled)
            this.editBtn = 'Done'
            this.isDisabled = index
          }
          else{
            this.editBtn = 'Edit'
            this.isDisabled = ''
            //update function
            putUser(this.filteredUsers[index]).then(data=>{
              console.log('User updated', data)
            }).catch(err=>{
              console.log(err)
            })
          }
          // if (this.isDisabled) {
          //     this.isDisabled = false
          //     this.editBtn = 'Done'
          // }
          // else{
          //     this.isDisabled = true
          //     this.editBtn = 'Edit'
          //     fetch('/api/edit-user', {
          //       credentials: 'same-origin',  // параметр определяющий передвать ли разные сессионные данные вместе с запросом
          //       method: 'POST',              // метод POST 
          //       body: JSON.stringify(this.users[index]),  // типа запрашиаемого документа
          //       headers: new Headers({
          //         'Content-Type': 'application/json',
          //         'Token': localStorage.hash
          //       }),
          //     }).then(res=>{
          //       console.log('response', res);
          //     })
          // }
      },
      deleteUser(index){
          console.log(index)
          // было - this.users[index].id
          deleteUser(this.filteredUsers[index].id).then(data=>{
            console.log(data);
            this.getUsers();
          })
          // fetch(`/api/delete-user?id=${this.users[index].id}`, {
          //   headers:{
          //   'Content-Type': 'application/json'
          //   }
          // }).then(res=>{
          //   console.log('res', res);
          //   return res;
          // }).then(data=>{
          //   console.log(data);
          //   this.getUsers();
          // })
      }, 
      createUser(){
        console.log('getting')
        fetch('/api/create-user',{
          credentials: 'same-origin',  // параметр определяющий передвать ли разные сессионные данные вместе с запросом
          method: 'POST',              // метод POST 
          body: JSON.stringify(this.usr),  // типа запрашиаемого документа
          headers:{
            'Content-Type': 'application/json'
          },
        }).then(res=>{
          console.log('res ', res);
          return res;
        }).then(data=>{
          console.log('data ', data);
          this.getUsers();
        })
      },
      expand(newsIndex){
      console.log('button index', this.pressedButtonIndex)
            if (this.pressedButtonIndex === '') {
              console.log('if', newsIndex)
              this.pressedButtonIndex = newsIndex;
            }
            else{
              console.log('else', newsIndex)
              this.pressedButtonIndex = ''
            }
      },
      setOrganization(params){
        console.log('cat', params.organization)
        // console.log('upd user org', this.users[params.index].organization_id)
        var user  = this.users.filter((item)=>{
          if(item.id == params.index){
            return item
          }
        })
        if(user[0] != undefined){
          console.log('filtered user',user)
          user[0].organization_id = params.organization
          console.log('upd user org will be', user[0].organization_id = params.organization)
        }
      },
    userOrganization(index){
      var orgObject =  this.organizations.filter((item)=>{
        if(item.id == this.filteredUsers[index].organization_id){
          return item
        }
      })[0]

      if(orgObject != undefined){
        return orgObject.name
      }
      return orgObject
    }
  
  },
  computed: {
    filteredUsers: function(){
      var usersArray = this.users;
      var searchString = this.searchString;

      //фильтрация для отображения только тех событий, которые организации админа
      // eventsArray = eventsArray.filter(function(item){
      //   if (item.organization_id == localStorage.organizationId) {
      //     return item;
      //   }
      // })

      if (!searchString) {
        return usersArray;
      }

      searchString = searchString.trim().toLowerCase();

      usersArray = usersArray.filter(function(item){
        if (item.name.toLowerCase().indexOf(searchString) !== -1) {
          return item;
        }
      })

      return usersArray;
    },
    
  },
  mounted(){
    this.getUsers()
    getOrganizations().then(data=>{
          console.log(data.data.objects[0].id)
            this.organizations = data.data.objects;
        }).catch(err=>{
          console.log(err)
        })
  }
}
</script>
<style>

.data-row-img{
  width: 100px;
  height: 100px;
  background-color: darkgray;
  border-radius: 1rem;
  overflow: hidden;
  margin: .5rem 0 .5rem 0;
}
.data-row-img>img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.data-row_content-col-2{
  width: 50%;
  margin:  0;
  /* display: inline; */
}
.info-block{
  width: 100%;
}
.col-content-container{
  display: flex;
  width: 100%;
}
.data-row_content-top_info{
  width: 90%;
  padding: .5rem;
}
@media(max-width: 640px){
  .col-content-container{
    flex-direction: column;
  }
  .data-row_content-col-2{
    width: 100%;
  }
}
</style>