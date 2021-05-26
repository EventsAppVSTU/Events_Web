<template>
  <div class="Organizations">
        <h2>Статусы заявок</h2>
        <form id="#per" class="performance-form">
          <input type="text" class="performance-add" placeholder="name" name="name" v-model="state.name">
          <button class="btn btn-outline-danger btn-rounded" type="submit" v-on:click="createBidsState()">+ Create</button>
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
            <tr v-for="(bidsState, index) in bidsStates" :key="index">
              <td>
                {{bidsState.id}} 
              </td>
              <td>
                <input class="table-display-input table-event-name" type="text" v-model="bidsState.name" :disabled="isDisabled!==index">
              </td>
              <td>
                <div class="table-buttons-block">
                  <button class="btn btn-outline-success btn-sm" v-on:click="editBidsState(index)">
                    <span v-if="isDisabled===index">Готово</span>
                    <span v-else>Изменить</span>
                  </button>
                  <button class="btn btn-outline-danger btn-sm" v-on:click="deleteBidsState(index)">Удалить</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
  </div>
</template>

<script>

import { getBidsStates, putBidsState, postBidsState, deleteBidsState} from '../requests/bidsStates'

// getBidsState, deleteBidsState,

export default {
  name: 'BidsStates',
  data: function(){
      return {
          bidsStates: [{
              id: Number,
              name: '',
          }],
      isDisabled: '',
      editBtn: 'Edit',
      state:{
          name: ''
        }
      }
  },
  methods:{
      loadPage(){
        getBidsStates().then(data=>{
          this.bidsStates = data.data.objects
        }).catch(err=>{
          console.log(err)
        })
      },
      editBidsState(index){

        if(this.isDisabled === ''){
          console.log('Editing')
          this.editBtn = 'Done'
          this.isDisabled = index
        }
        else{
          console.log('sending')
          this.editBtn = 'Edit'
          this.isDisabled = ''

          putBidsState(this.bidsStates[index]).then(data=>{
            console.log(data)
            this.loadPage()
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      deleteBidsState(index){
        console.log(index)
         deleteBidsState(this.bidsStates[index].id).then(data=>{
           console.log('Удалено состояние', data)
         }).catch(err=>{
           console.log(err)
         })
      }, 
      createBidsState(){
        console.log('creating organization')
        postBidsState(this.state).then(data=>{
          console.log('Создание состояния', data)
        }).catch(err=>{
          console.log(err)
        })
      }
  },
  mounted(){
    this.loadPage()   
  }
}
</script>
