<template>
  <div class="chosenEvents">
        <h2>Chosen Performances</h2>
        <form id="#per" class="performance-form">
          <input type="text" class="performance-add" placeholder="User name" name="name" v-model="org.name">
          <input type="text" class="performance-add" placeholder="Performance" name="name" v-model="org.name">
          <button class="btn btn-outline-danger btn-rounded" type="submit" v-on:click="createOrganization()">+ Create</button>
        </form>
        <table class="table table-striped table-responsive-lg table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Performances</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(chosenPerformance, index) in chosenPerformances" :key="index">
              <td>
                {{chosenPerformance.id}} 
              </td>
              <td>
                <input class="table-display-input table-event-name" type="text" v-model="chosenPerformance.user_id" :disabled="isDisabled">
              </td>
              <td>
                <input class="table-display-input table-event-name" type="text" v-model="chosenPerformance.performance_id" :disabled="isDisabled">
              </td>
              <td>
                <div class="table-buttons-block">
                  <button class="btn btn-outline-success btn-sm" v-on:click="editOrganization(index)">{{editBtn}}</button>
                  <button class="btn btn-outline-danger btn-sm" v-on:click="deleteOrganization(index)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
  </div>
</template>

<script>

export default {
  name: 'ChosenPerformances',
  components: {
    
  },
  data: function(){
      return {
          chosenPerformances: [{
              id: 1,
              user_id: 'Иван Иванов',
              performance_id: 'Открытие Робошколы'
          },{
              id: 2,
              user_id: 'Петр Петров',
              performance_id: 'Открытие Робошколы'
          },
          {
              id: 3,
              user_id: 'Петр Петров',
              performance_id: 'Проблемы робототехники'
          },{
              id: 4,
              user_id: 'Петр Петров',
              performance_id: 'Искуственный интеллект'
          },{
              id: 5,
              user_id: 'Андрей Сидоров',
              performance_id: 'Основы Open CV'
          }],
      isDisabled: true,
      editBtn: 'Edit',
      org:{
              name: ''
        }
      }
  },
  methods:{
      getChosenEvents(){
        fetch('/api/get-organizations', {
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res=>{
            var data = res.json()
            return data
        }).then(data=>{
          console.log('this is data user: ', data.data.objects);
          console.log(data.data.objects[0].id)
            this.chosenEvents = data.data.objects
        })
      },
      editOrganization(index){
          console.log(index)
          if (this.isDisabled) {
              this.isDisabled = false
              this.editBtn = 'Done'
          }
          else{
              this.isDisabled = true
              this.editBtn = 'Edit'
              fetch('/api/edit-organization', {
                credentials: 'same-origin',  // параметр определяющий передвать ли разные сессионные данные вместе с запросом
                method: 'POST',              // метод POST 
                body: JSON.stringify(this.organizations[index]),  // типа запрашиаемого документа
                headers: new Headers({
                  'Content-Type': 'application/json'
                }),
              }).then(res=>{
                console.log('response', res);
                this.getOrganizations();
              })
          }
      },
      deleteOrganization(index){
          console.log(index)
          fetch(`/api/delete-organization?id=${this.organizations[index].id}`, {
            headers:{
            'Content-Type': 'application/json'
            }
          }).then(res=>{
            console.log('res', res);
            return res;
          }).then(data=>{
            console.log(data);
            this.getOrganizations();
          })
      }, 
      createOrganization(){
        console.log('creating organization')
        fetch('/api/create-organization',{
          credentials: 'same-origin',  // параметр определяющий передвать ли разные сессионные данные вместе с запросом
          method: 'POST',              // метод POST 
          body: JSON.stringify(this.org),  // типа запрашиаемого документа
          headers:{
            'Content-Type': 'application/json'
          },
        }).then(res=>{
          console.log('res ', res);
          return res;
        }).then(data=>{
          console.log('data ', data);
          this.getOrganizations();
        })
      }
  },
  mounted(){
      // this.getOrganizations()
  }
}
</script>
