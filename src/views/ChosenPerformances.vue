<template>
  <div class="chosenEvents">
        <h2>Выбранные секции</h2>
        <!-- <form id="#per" class="performance-form">
          <input type="text" class="performance-add" placeholder="User name" name="name" v-model="org.name">
          <input type="text" class="performance-add" placeholder="Performance" name="name" v-model="org.name">
          <button class="btn btn-outline-danger btn-rounded" type="submit" v-on:click="createOrganization()">+ Create</button>
        </form> -->
        <!-- <div class="statistics">
          <p>75 человек</p>
        </div> -->
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
                <input class="table-display-input table-event-name" type="text" v-model="chosenPerformance.user_name" :disabled="isDisabled">
              </td>
              <td>
                <PerformancesComboBox :eventId="eventId" v-if="isDisabled===index"/>
                <input class="table-display-input table-event-name" type="text" v-model="chosenPerformance.performances_name" :disabled="isDisabled">
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
          chosenPerformances: [
          // "id": "6",
          //       "user_id": "1",
          //       "performances_id": "5",
          //       "user_name": "2021 3!!! МАРТ!!!",
          //       "performances_name": "About Space",
          //       "datePerf": "2020-05-22 00:00:00",
          //       "startTime": "17:11:00",
          //       "endTime": "20:11:00",
          //       "speaker": "Иванов11",
          //       "description": "Описание 1122"
          
          ],
      isDisabled: '',
      currentEvent: {},
      org:{
              name: ''
        }
      }
  },
  methods:{
    loadPage(){
      console.log('ВЫБРАННЫЕ СОБЫТИЯ')
      getChosenPerformances(this.currentEvent.id).then(data=>{
        console.log('chosen performances ', data.data)
        this.chosenPerformances = data.data.objects
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
            this.isDisabled = ''
            //update function
          }
    }
  },
  mounted(){
    getCurrentEvent().then(eventData=>{
        console.log('event data', eventData.data.objects)
        this.currentEvent = eventData.data.objects[0]
        console.log(eventData.data.objects[0].name)

        this.loadPage()
    }).catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>
.statistics{

}
</style>
