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
                <PerformancesComboBox :eventId="eventId" v-if="isDisabled===index"/>
                <input class="table-display-input table-event-name" type="text" v-model="chosenPerformance.performance_id" :disabled="isDisabled">
              </td>
              <td>
                <div class="table-buttons-block">
                  <button class="btn btn-outline-success btn-sm" v-on:click="editChosenPerformance(index)">
                    <!-- {{editBtn}} -->
                    <span v-if="isDisabled===index">Готово</span>
                      <span v-else>Изменить</span>
                  </button>
                  <button class="btn btn-outline-danger btn-sm" v-on:click="deleteChosenPerformance(index)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
  </div>
</template>

<script>
import PerformancesComboBox from '../components/PerformancesComboBox'
import {getChosenPerformances} from '../requests/chosenPerformances'
import {getCurrentEvent} from '../requests/currentEvent'

export default {
  name: 'ChosenPerformances',
  components: {
    PerformancesComboBox
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
      isDisabled: '',
      eventId: Number,
      // editBtn: 'Edit',
      org:{
              name: ''
        }
      }
  },
  methods:{
    loadPage(){
      getChosenPerformances(this.eventId).then(data=>{
        console.log('chosen performances ', data.data)
      })
    },
    editChosenPerformance(index){
       console.log('editing',index)
          if(this.isDisabled === ''){
            console.log('Editing')
            this.isDisabled = index
          }
          else{
            console.log('NOT editing')
            // this.editBtn = 'Edit'
            this.isDisabled = ''
            //update function
          }
    }
  },
  mounted(){
    getCurrentEvent().then(event=>{
      this.eventId = parseInt(event.data.objects[0].id);
      this.loadPage()
    })
  }
}
</script>
