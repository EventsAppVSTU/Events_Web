<template>
<div>
<button type="button" class="btn text-button" data-toggle="modal" data-target="#exampleModalCenter">
  Создать запись
</button>

<!-- Button trigger modal -->

<!-- Modal -->
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Создать Пользователя</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form class="performance-form">
          <div class="performance-form_info">
           <input type="text" class="performance-add" placeholder="Имя" name="name"  v-model="usr.name">
            <input type="text" class="performance-add" placeholder="Фамилия" name="surname"  v-model="usr.surname">
          </div>
          <div class="performance-form_header">
            <input type="text" class="performance-add" placeholder="Логин" name="login"  v-model="usr.login">
            <input type="text" class="performance-add" placeholder="Пароль" name="password"  v-model="usr.password">
          </div>
          <div class="performance-form_info">
            <input type="text" class="performance-add" placeholder="Телефон" name="startTime"  v-model="usr.phone">
            <input type="text" class="performance-add" placeholder="Ссылка" name="Сс" v-model="usr.web_link">
            <!-- <OrganizationsComboBox @organizationSelected="setOrganization" /> -->
            <textarea rows="5" cols="" class="" name="" id="" placeholder="Личная информация. Bio" v-model="usr.bio"></textarea>
          </div>
          <button class="btn btn-outline-danger btn-rounded" v-on:click="createUser()">+ Create</button>
        </form>
      </div>
    </div>
  </div>
</div>
</div>
  
</template>

<script>
// import OrganizationsComboBox from '../components/OrganizationsComboBox'
import {postUser} from '../requests/users'

export default {
  name: 'CreateUser',
  props: {
    event_id: null
  },
  components:{
    // OrganizationsComboBox
  },
  data (){
    return {
      perf: {
        name: '',
        datePerf: '',
        description: '',
        startTime: '',
        endTime: '',
        speaker: '',
        event_id: ''
      },
            usr:{
              name: '',
              surname: '',
              image: '',
              organization_id: '',
              login: '',
              password: '',
              registrationDate: '',
              role: '',
              current_event: null,
              organization_verify: '1' 

        // role: req.body.role,
        // current_event: req.body.current_event,
        // organization_verify: req.body.organization_verify,
        // phone: req.body.phone,
        // bio: req.body.bio
        }
    }
  },
  methods:{
    createUser(){
      console.log('creating user')
      this.perf.event_id = this.event_id;
      if(this.usr.name){
        
        if(localStorage.userRole == 1){ //Admin создает обычных пользователей
          this.usr.role = '0'
        }
        else { //userRole == 2 Супервайзер создает админа
          this.usr.role = '1'
        }
        // this.usr.organization_verify = '1'
        postUser(this.usr).then(data=>{
          console.log('post user', this.usr)
          console.log(data)
        }).catch(err=>{
          console.log(err)
        })
      }
      
    },

    // Админ может создавать пользователлей для своей организации
    // setOrganization(params){
    //     console.log('cat', params.organization) 
    //       this.usr.organization_id = params.organization
    //       console.log('upd user org will be', this.usr.organization_id = params.organization)  
    // },
  },
  mounted(){
    this.usr.organization_id = localStorage.organizationId
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.performance-form{
  width: 100%;
  padding: 1rem 0;
}
input[type="submit"].performance-add{
  padding-right: 1rem;
    
}
.performance-add{
  border: 1px solid lightgray;
  padding: .5rem;
  margin: .5rem 0;
  width: 50%;
}
.performance-form_header{
  width: 100%;
}
.performance-form_header .performance-add{
  width: 100% ;
  margin-bottom: .5rem;
}
textarea{
  width: 100%;
  
}
</style>
