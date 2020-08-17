<template>
  <div class="Performances">
    <h2>Performances</h2>
        <CreatePerformance :event_id="currentEvent.id" @updatePerfTable="updatePerformancesTable" />
        <div v-if="performances == ''" class="message-empty-content">
          <h5>Нет выступлений</h5>
          <p>Добавьте новость, нажав на кнопку "Созадать запись"</p>
        </div>
        <div class="data-table" v-else >
          <div class="data-row" v-for="(performance, index) in performances" :key="performance.id">
            <div class="data-row_number">{{index}}</div>
            <div class="data-row_content">
              <div class="data-row_content-top">
                <input class="table-display-input table-event-name data-row_content-top_name" type="text" v-model="performance.name" :disabled="isDisabled!==index">
                
                <div class="data-row_content-top_performance-date">
                  <svg class="feather data-row-icons" >
                    <use xlink:href="@/assets/feather-sprite.svg#calendar"/>
                  </svg>
                  <input class="table-display-input table-event-name data-row_content-top_date" type="text" v-model="performance.datePerf" :disabled="isDisabled!==index">
                </div>

                <svg class="feather data-row-icons" >
                  <use xlink:href="@/assets/feather-sprite.svg#clock"/>
                </svg>
                <input class="table-display-input table-event-name data-row_content-top_time" type="text" v-model="performance.startTime" :disabled="isDisabled!==index">
                -
                <input class="table-display-input table-event-name data-row_content-top_time" type="text" v-model="performance.endTime" :disabled="isDisabled!==index">
                <input class="table-display-input table-event-name data-row_content-top_speaker" type="text" v-model="performance.speaker" :disabled="isDisabled!==index">
              </div>
              <div class="data-row_content-description" >
                <!-- <input class="table-display-input table-event-name" type="text" v-model="performance.description" :disabled="isDisabled"> -->
                <h6 v-show="(pressedButtonIndex === index)">Описание</h6>
                <textarea @input="fixTextareaSize()" rows="5" class="performance-description" name="" id=""  v-show="(pressedButtonIndex === index)" v-model="performance.description" :disabled="isDisabled!==index"></textarea>
                <button v-if="performance.description.length > 1" class="news-button-more"  v-on:click="expandThisNews(index)">
                  More <svg class="feather" :class="{'rotate-news-arrow': pressedButtonIndex === index}">
                          <use xlink:href="@/assets/feather-sprite.svg#chevron-right"/>
                      </svg>
                </button>
              </div>

            </div>
            <div class="data-row_actions">
              <button v-on:click="editPerformance(index)" class="card-edit-button">
              <span v-if="isDisabled===index">Done</span>
              <svg class="feather">
                  <use xlink:href="@/assets/feather-sprite.svg#edit"/>
              </svg>
            </button>
            <button @click="deletePerformance(index)" class="card-delete-button">
              <svg class="feather">
                  <use xlink:href="@/assets/feather-sprite.svg#trash"/>
              </svg>
            </button>
            </div>
          </div>
        </div>
        <!-- <table v-else class="table table-striped table-responsive-lg table-sm">
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
        </table> -->
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
      isDisabled: '',
      editBtn: 'Edit',
      pressedButtonIndex: ''
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
      // if (this.pressedButtonIndex === '') {
      //   console.log('if', index)
      //   this.pressedButtonIndex = index;
      // }
      // else{
      //   console.log('else', index)
      //   this.pressedButtonIndex = ''
      // }
  
      console.log(index)
      if(this.isDisabled === ''){
        console.log('Editing')
        this.editBtn = 'Done'
        this.isDisabled = index
      }
      else{
        console.log('sending')
        this.editBtn = 'Edit'
        this.isDisabled = ''
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
      }
      
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
    expandThisNews(newsIndex){
      console.log('button index', this.pressedButtonIndex)
            if (this.pressedButtonIndex === '') {
              console.log('if', newsIndex)
              this.pressedButtonIndex = newsIndex;
            }
            else{
              console.log('else', newsIndex)
              this.pressedButtonIndex = ''
            }
              this.fixTextareaSize()

        },
        fixTextareaSize() {
        // var textareas = document.querySelectorAll('textarea')
        // console.log(textareas)
        // textareas.forEach((element, index) => {
        //   console.log(element.autocomplete)
        //   console.log(`${index} row count`, element.scrollHeight)
        //   element.style.height = 'auto'
        //   element.style.height = element.scrollHeight + 'px'
        // });
    },
    
  },
  mounted(){
    this.updatePerformancesTable();
    this.getCurrentEvent()
    setTimeout(() => {
      this.fixTextareaSize()
    }, 500);
  },
  
}
</script>

<style>

.data-row_content-description>textarea {
  height: 100%;
  width: 100%;
  resize:none;
  white-space: normal;
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

/* Новые таблички */

.data-row:nth-child(odd){
  background-color: #f4f4f4;
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
}
.data-row{
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  
}
.data-row_number{
  /* background-color: aqua; */
}
.data-row_content{
  flex-grow: 1;
}
.data-row_content-top{
  display: flex;
  flex-wrap: wrap;
}
.data-row_actions{
  /* background-color: aqua; */
}
.data-row_actions, .data-row_number, .data-row_content{
  padding: 1rem;
}
.performance-description{
  border: none;
  background: none;
}
.data-row_content-description>h6{
  font-size: 11px;
  font-weight: 300;
  margin: 0;
  padding-top: .5rem;
}

/* ячейки */
.data-row_content-top_name{
  width: 40%;
  font-weight: 700;
}
.data-row_content-top_date{
  width: 6rem;
  /* height: 100%; */
  margin-right: 1rem;
}
.data-row_content-top_time{
  width: 4.5rem;
}
.data-row_content-top_speaker{
  width: calc(60% - 11.5rem);
}
@media(max-width: 800px){
  .data-row_content{
    padding: .5rem 0;
  }
  .data-row_actions, .data-row-number{
    padding: .5rem;
  }
  .data-row_content-top_name{
  width: 100%;
  }
  .data-row_content-top_date{
    margin-right: 7rem;
  }
  .data-row_content-top_performance-date{
    width: 100%;
    display: flex;
  }
}

/* Buttons on card */
.feather.data-row-icons{
height: 2.1rem  ;
}
.card-edit-button, .card-delete-button{
  border: none;
  background: none;
  outline: none;
}
.card-edit-button:active, .card-delete-button:active, .card-edit-button:focus, .card-delete-button:focus{
  outline: none;
}
.card-edit-button .feather:hover{
  stroke: #11bf20;
}
.card-delete-button .feather:hover{
  stroke: rgb(255, 44, 29);
}
</style>