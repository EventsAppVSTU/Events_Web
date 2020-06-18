<template>
  <div class="events-categories">
        <h2>Categories</h2>
        <form id="#per" class="performance-form">
          <input type="text" class="performance-add" placeholder="name" name="name" v-model="cat.name">
          <button class="btn btn-outline-danger btn-rounded" type="submit" v-on:click="createCategory()">+ Create</button>
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
            <tr v-for="(category, index) in categories" :key="index">
              <td>
                {{category.id}} 
              </td>
              <td>
                <input class="table-display-input table-event-name" type="text" v-model="category.name" :disabled="isDisabled">
              </td>
              <td>
                <div class="table-buttons-block">
                  <button class="btn btn-outline-success btn-sm" v-on:click="editCategory(index)">{{editBtn}}</button>
                  <button class="btn btn-outline-danger btn-sm" v-on:click="deleteCategory(index)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
  </div>
</template>

<script>

export default {
  name: 'EventsCategories',
  components: {
    
  },
  data: function(){
      return {
          categories: [{
              id: Number,
              name: '',
          }],
      isDisabled: true,
      editBtn: 'Edit',
      cat:{
              name: ''
        }
      }
  },
  methods:{
      getCategories(){
        fetch('/api/get-categories', {
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res=>{
            var data = res.json();
            return data;
        }).then(data=>{
          console.log('this is data user: ', data.data.objects);
          console.log(data.data.objects[0].id)
            this.categories = data.data.objects;
        })
      },
      editCategory(index){
          console.log(index)
          if (this.isDisabled) {
              this.isDisabled = false
              this.editBtn = 'Done'
          }
          else{
              this.isDisabled = true
              this.editBtn = 'Edit'
              fetch('/api/edit-category', {
                credentials: 'same-origin',  // параметр определяющий передвать ли разные сессионные данные вместе с запросом
                method: 'POST',              // метод POST 
                body: JSON.stringify(this.categories[index]),  // типа запрашиаемого документа
                headers: new Headers({
                  'Content-Type': 'application/json'
                }),
              }).then(res=>{
                console.log('response', res);
                this.getCategories();
              })
          }
      },
      deleteCategory(index){
          console.log(index)
          fetch(`/api/delete-category?id=${this.categories[index].id}`, {
            headers:{
            'Content-Type': 'application/json'
            }
          }).then(res=>{
            console.log('res', res);
            return res;
          }).then(data=>{
            console.log(data);
            this.getCategories();
          })
      }, 
      createCategory(){
        console.log('creating category')
        fetch('/api/create-category',{
          credentials: 'same-origin',  // параметр определяющий передвать ли разные сессионные данные вместе с запросом
          method: 'POST',              // метод POST 
          body: JSON.stringify(this.cat),  // типа запрашиаемого документа
          headers:{
            'Content-Type': 'application/json'
          },
        }).then(res=>{
          console.log('res ', res);
          return res;
        }).then(data=>{
          console.log('data ', data);
          this.getCategories();
        })
      }
  },
  mounted(){
      this.getCategories();
  }
}
</script>
