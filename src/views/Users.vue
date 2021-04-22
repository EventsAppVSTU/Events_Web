<template>
  <div class="Users">
        <h2>Users</h2>
        <form id="#per" class="performance-form">
          <input type="text" class="performance-add" placeholder="name" name="name" v-model="usr.name">
          <input type="text" class="performance-add" placeholder="surname" name="surname" v-model="usr.surname">
          <input type="text" class="performance-add" placeholder="organization_id" name="organization_id" v-model="usr.organization_id">
          <input type="text" class="performance-add" placeholder="login" name="login" v-model="usr.login">
          <input type="text" class="performance-add" placeholder="password" name="password" v-model="usr.password">
          <button class="btn btn-outline-danger btn-rounded" type="submit" v-on:click="createUser()">+ Create</button>
        </form>
        <table class="table table-striped table-responsive-lg table-sm">
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
                <!-- :disabled="isDisabled"  -->
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
                <!-- <td>
                  <input class="table-display-input table-event-name" type="text" v-model="user.currentEventID" :disabled="isDisabled">
                  </td> -->
                <td>
                  <div class="table-buttons-block">
                    <button class="btn btn-outline-success btn-sm" v-on:click="editUser(index)">
                      <!-- {{editBtn}} -->
                      <span v-if="isDisabled===index">Готово</span>
                      <span v-else>Изменить</span>
                      </button>
                    <!-- <button class="btn btn-outline-secondary btn-sm">Description</button> -->
                    <button class="btn btn-outline-danger btn-sm" v-on:click="deleteUser(index)">Удалить</button>
                  </div>
              </td>
            </tr>
          </tbody>
        </table>
  </div>
</template>

<script>

export default {
  name: 'Users',
  components: {
    
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
      }
      }
  },
  methods:{
      getUsers(){
        fetch('/api/get-users', {
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Token': localStorage.hash
            }
        }).then(res=>{
            var data = res.json()
            return data
        }).then(data=>{
          console.log('this is data user: ', data.data.objects);
          console.log(data.data.objects[0].id)
            this.users = data.data.objects
        })
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
          fetch(`/api/delete-user?id=${this.users[index].id}`, {
            headers:{
            'Content-Type': 'application/json'
            }
          }).then(res=>{
            console.log('res', res);
            return res;
          }).then(data=>{
            console.log(data);
            this.getUsers();
          })
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
      }
  },
  mounted(){
      this.getUsers()
  }
}
</script>
