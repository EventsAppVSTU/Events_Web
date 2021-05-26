<template>
  <div class="Organizations">
        <h2>Организации</h2>
        <form id="#per" class="performance-form">
          <input type="text" class="performance-add" placeholder="name" name="name" v-model="org.name">
          <button class="btn btn-outline-danger btn-rounded" type="submit" v-on:click="createOrganization()">+ Create</button>
        </form>
        <table class="table table-striped table-responsive-lg table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(organization, index) in organizations" :key="index">
              <td>
                {{organization.id}} 
              </td>
              <td>
                <input class="table-display-input table-event-name" type="text" v-model="organization.name" :disabled="isDisabled">
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
  name: 'Organizations',
  components: {
    
  },
  data: function(){
      return {
          organizations: [{
              id: Number,
              name: '',
          }],
      isDisabled: true,
      editBtn: 'Edit',
      org:{
              name: ''
        }
      }
  },
  methods:{
      getOrganizations(){
        fetch('/api/get-organizations', {
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
            this.organizations = data.data.objects
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
                  'Content-Type': 'application/json',
                  'Token': localStorage.hash
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
      this.getOrganizations()
  }
}
</script>
