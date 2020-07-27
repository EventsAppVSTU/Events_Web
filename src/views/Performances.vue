<template>
  <div class="Performances">
    <h2>Performances</h2>
        <!-- <form id="#per"  class="performance-form">
          <input type="text" class="performance-add" placeholder="name" name="name" v-model="perf.name">
          <input type="text" class="performance-add" placeholder="description" name="description" v-model="perf.description">
          <input type="text" class="performance-add" placeholder="date" name="date" v-model="perf.datePerf">
          <input type="text" class="performance-add" placeholder="time" name="time" v-model="perf.startTime">
          <input type="text" class="performance-add" placeholder="time" name="time" v-model="perf.endTime">
          <input type="text" class="performance-add" placeholder="speaker" name="speaker" v-model="perf.speaker">
          <input type="text" class="performance-add hide" :value="currentEvent.id" name="event_id">
          <button class="btn btn-outline-danger btn-rounded" v-on:click="createPerformance()">+ Create</button>
        </form> -->
        <CreatePerformance :event_id="currentEvent.id" @updatePerfTable="updatePerformancesTable" />
        <div v-if="performances == ''" class="message-empty-content">
          <h5>Нет выступлений</h5>
          <p>Добавьте новость, нажав на кнопку "Созадать запись"</p>
        </div>
        <table v-else class="table table-striped table-responsive-lg table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date</th>
              <th>Description</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Speaker</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(performance, index) in performances" :key="performance.id">
              <td>
                {{performance.id}} 
              </td>
              <td>
                <input class="table-display-input table-event-name" type="text" v-model="performance.name" :disabled="isDisabled">
                <td>
                  <input class="table-display-input table-event-name" type="text" v-model="performance.datePerf" :disabled="isDisabled">
                </td>
                <td>
                  <input class="table-display-input table-event-name" type="text" v-model="performance.description" :disabled="isDisabled">
                </td>
                <td>
                  <input class="table-display-input table-event-name" type="text" v-model="performance.startTime" :disabled="isDisabled">
                </td>
                <td>
                  <input class="table-display-input table-event-name" type="text" v-model="performance.endTime" :disabled="isDisabled">
                  </td>
                <td>
                  <input class="table-display-input table-event-name" type="text" v-model="performance.speaker" :disabled="isDisabled">
                  </td>
                <td>
                  <div class="table-buttons-block">
                    <button class="btn btn-outline-success btn-sm" v-on:click="editPerformance(index)">{{editBtn}}</button>
                    <button class="btn btn-outline-secondary btn-sm">Description</button>
                    <button class="btn btn-outline-danger btn-sm" v-on:click="deletePerformance(index)">Delete</button>
                  </div>
                </td>
            </tr>
          </tbody>
        </table>
  </div>
</template>

<script>
import CreatePerformance from '../components/CreatePerformance.vue'

export default {
  name: 'Performances',
  components: {
   CreatePerformance
  },
  data: function(){
    return {
      currentEvent: {
        id: 1, 
            name: "Робо",
            description: "Lorem ipsum dolor sit amet orem ipsum dolor sit amet orem ipsum dolor sit amet orem ipsum dolor sit amet.",
            image: "img/nasa-Q1p7bh3SHj8-unsplash.jpg" 
      },
      performances: [{ id: 1, 
            name: "Открытие Робошколы",
            date: "19-06-2020",
            time: "10:00",
            speaker: "Иван Иванов",
            },{id: 2, 
            name: "Проблемы робототехники",
            date: "19-06-2020",
            time: "11:00",
            speaker: "Иван Иванов"},{id: 3, 
            name: "Искуственный интеллект",
            date: "19-06-2020",
            time: "12:30",
            speaker: "Иван Иванов"},{id: 4, 
            name: "Основы Open CV",
            date: "19-06-2020",
            time: "14:00",
            speaker: "Иван Иванов"}],
      perf: {
        name: '',
        datePerf: '',
        description: '',
        startTime: '',
        endTime: '',
        speaker: '',
        event_id: ''
      },
      isDisabled: true,
      editBtn: 'Edit'
    }
  }, 
  methods: {
    updatePerformancesTable(){
        // узнать мероприятие
      console.log('going to fetch current event')
      fetch('/api/get-current-event-by-id?user=admin',{
              headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              }
      }).then(res=>{
        if(res.ok){
                var data = res.json();
                console.log('data', data)
                return data;
            }
            else{
                console.log('er get rooms :(');
                throw new Error ('er');
            }
      }).then(one=>{
        console.log('event data', one.data.objects)
        this.currentEvent = one.data.objects[0]
        console.log(one.data.objects[0].name)
          //запросить выступления
        fetch(`/api/get-performances-by-id?event=${one.data.objects[0].id}`, {
          headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              }
        }).then(res=>{
        if(res.ok){
                var data = res.json();
                console.log('data', data)
                return data;
            }
            else{
                console.log('er get rooms :(');
                throw new Error ('er');
            }
        }).then(data=>{
          console.log('performances', data)
              this.performances = data.data.objects
        })
      })
    },
    createPerformance(){
      this.perf.event_id = this.currentEvent.id
      if(this.perf.name){
        
        fetch(`/api/create-performance-by-id`, {
        credentials: 'same-origin',  // параметр определяющий передвать ли разные сессионные данные вместе с запросом
        method: 'POST',              // метод POST 
        body: JSON.stringify(this.perf),  // типа запрашиаемого документа
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      })
      .then(response => {
        return response // возвращаем промис

      }).then(json=>{
        console.log('succsess ', json)
        this.updatePerformancesTable()
      })
      }
      
    },
    editPerformance(index){
      //раблокировать запись если Edit
      console.log(index)
      if(this.isDisabled){
        this.editBtn = 'Done'
        this.isDisabled = false
      }
      else{
        this.editBtn = 'Edit'
        this.isDisabled = true
      }
      //сохранить запись на сервер если Done
      //взять данные
      var data ={
        id: '',
        name: '',
        datePerf: '',
        description: '',
        startTime: '',
        endTime: '',
        speaker: '',
        event_id: ''
      }
        data.id = this.performances[index].id
        data.name = this.performances[index].name
        data.datePerf = this.performances[index].datePerf
        data.description = this.performances[index].description
        data.startTime = this.performances[index].startTime
        data.endTime = this.performances[index].endTime
        data.speaker = this.performances[index].speaker
        data.event_id = this.currentEvent.id //old: .name
        console.log('send info', data)
        fetch(`/api/update-performance-by-id`, {
        credentials: 'same-origin',  // параметр определяющий передвать ли разные сессионные данные вместе с запросом
        method: 'POST',              // метод POST 
        body: JSON.stringify(data),  // типа запрашиаемого документа
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      })
      .then(response => {
        return response // возвращаем промис

      }).then(json=>{
        console.log('succsess ', json)
      })
      
    },
    deletePerformance(index){
      //взять данные
      var answer = confirm()
      var data = {
        id: Number
      }
      if(answer){
        data.id = this.performances[index].id
        //отправить на сервер DELETE запросом
        console.log('data', JSON.stringify(data))
        fetch(`/api/delete-performance-by-id`, {
          credentials: 'same-origin',  // параметр определяющий передвать ли разные сессионные данные вместе с запросом
          method: 'POST',              // метод POST 
          body: JSON.stringify(data),  // типа запрашиаемого документа
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
        })
        .then(response => {
          return response // возвращаем промис
  
        }).then(json=>{
          console.log('succsess ', json)
          this.updatePerformancesTable()
        })
      }
    },
    
  },
  mounted(){
    this.updatePerformancesTable();
    
  },
  
}
</script>

<style>
.performance-form{
    width: 100%;
    padding: 1rem 0;
}
input[type="submit"].performance-add{
    padding-right: 1rem;
    
}
.performance-add{
    border: 1px solid lightgray;
    /* border-radius: 3px; */
    padding: .5rem;
    margin-right: .5rem;
}
.hide{
  display: none;
}
.table-display-input{
  border: none;
  width: 100%;
  background: none;
  box-shadow: none;
}
.table-buttons-block button:nth-child(even){
  margin: .5rem !important;
}
@media(max-width: 800px){
  .performance-form input{
    width: 100%;
    margin: .3rem 0;
  }
  .table-event-name{
    width: 14rem;
  }
}
</style>