<template>
  <div class="createEvent">
    <div class="current-event">
        <form  @submit.prevent="formHandler"  id="createEventForm" >
        
          <h2 class="current-event_header">
              <input type="text"  v-model="currentEvent.name" name="name" placeholder="Название" id="name" :disabled="isDisabled">
              <div class="current-event_settings">
                <button class="btn btn-outline-success btn-sm" v-on:click="edit()" id="editBtn">{{editBtn}}</button>
                <button class="btn btn-outline-danger btn-sm" v-on:click="deleteCurrentEvent()">Delete</button>
              </div>
          </h2>
          <div class="event-card_img-container">
              <img v-if="$root.pictureUrl != ''" :src="$root.pictureUrl" alt="">
              <img v-else :src="currentEvent.image" alt="">
          </div>
          
          <div class="upload-image-container" v-show="!isDisabled">
            <input v-if="$root.pictureUrl != ''" :src="$root.pictureUrl" type="text" name="image" id="image" class="input-photo-link" placeholder="Link to the Photo" v-model="$root.pictureUrl ">
            <input v-else :src="currentEvent.image" type="text" name="image" id="image" class="input-photo-link" placeholder="Link to the Photo" v-model="currentEvent.image ">
            <Upload/>
            
          </div>

          <h3 class="current-event_decription-header">Описание</h3>
          <textarea name="description" id="description"  @input="fixTextareaSize()" placeholder="Напишите здесь описание, важную и завлекающую информацию о мероприятии..." v-model="currentEvent.description" :disabled="isDisabled"></textarea>
          <h3 class="current-event_decription-header">Начало события</h3>
          <textarea name="startDate" id="startDate"  @input="fixTextareaSize()" placeholder="YYYY-MM-DD hh:mm:ss" v-model="currentEvent.startDate" :disabled="isDisabled"></textarea>
          <h3 class="current-event_decription-header">Конец события</h3>
          <textarea name="endDate" id="endDate"  @input="fixTextareaSize()" placeholder="YYYY-MM-DD hh:mm:ss" v-model="currentEvent.endDate" :disabled="isDisabled"></textarea>
          <h3 class="current-event_decription-header">Место проведения</h3>
          <textarea name="place" id="place"  @input="fixTextareaSize()" placeholder="Город, улица, дом..." v-model="currentEvent.place" :disabled="isDisabled"></textarea>
          <h3 class="current-event_decription-header">Категория</h3>
          <textarea name="category_id" id="category_id"  @input="fixTextareaSize()" placeholder="id категории" v-model="currentEvent.category_id" :disabled="isDisabled"></textarea>
          <CategoriesComboBox :currentCategory="currentEvent.id"/>
          <!-- <div class="event-card_img-container">
              <img src="img/map.png" alt="">
          </div> -->
        </form>
    </div>
  </div>
</template>

<script>
import Upload from '../components/Upload.vue'
import CategoriesComboBox from '../components/CategoriesComboBox'

export default {
  name: 'CurrentEvent',
  components: {
   Upload,
   CategoriesComboBox
  },
  data: function(){
    return {
      currentEvent: {
        id: 1, 
        name: "Робоcr",
        description: "Lorem ipsum dolor sit amet orem ipsum dolor sit amet orem ipsum dolor sit amet orem ipsum dolor sit amet.",
        startDate: '',
        endDate: '',
        image: "",
        place: '',
        category_id: Number
      },
      editBtn: 'Edit',
      isDisabled: true
    }
  },
  methods:{
    // getCurrentEvent(){
    //   console.log('getting...')
    //   fetch('/api/get-current-event-by-id?user=admin').then(res=>{
    //         if(res.ok){
    //             var data = res.json();
    //             console.log('OK')
    //             return data;
    //         }
    //         else{
    //             console.log('er get rooms :(');
    //             throw new Error ('er');
    //         }
    //     }).then(data=>{
    //         console.log('current event data',data.data.objects[0])
    //         this.currentEvent = data.data.objects[0];
    //         this.$root.currentEvent = data.data.objects[0].id;
    //     })
    // },
    edit(){
      if (this.editBtn == 'Edit') {
        this.editBtn = 'Done'
        //разблокировать инпуты
        this.isDisabled = false

      } else {
        this.editBtn = 'Edit'
        this.isDisabled = true
        //взять инфу и отправить
        console.log(this.currentEvent.name)
        if(this.$root.pictureUrl  != ''){
          this.currentEvent.image = this.$root.pictureUrl 
        }
        fetch(`/api/update-event`, {
          credentials: 'same-origin',  // параметр определяющий передвать ли разные сессионные данные вместе с запросом
          method: 'POST',              // метод POST 
          body: JSON.stringify(this.currentEvent),  // типа запрашиаемого документа
          headers: new Headers({
            'Content-Type': 'application/json',
            'Token': localStorage.hash
          }),
        }).then(res=>{
          console.log(res)
        })
      }
    },
    formHandler(){
      console.log('prevent')
    },
    fixTextareaSize() {
      var textareas = document.querySelectorAll('textarea')
      console.log(textareas)
      textareas.forEach((element, index) => {
        console.log(element.autocomplete)
        console.log(`${index} row count`, element.scrollHeight)
        element.style.height = 'auto'
        element.style.height = element.scrollHeight + 'px'
      });
    },
    deleteCurrentEvent(){
      this.currentEventRequests.deleteCurrentEvent(this.currentEvent.id)
      // var data = { id: Number } 
      // data.id = this.currentEvent.id
      //  fetch('/api/delete-event-by-id', {
      //     credentials: 'same-origin',  // параметр определяющий передвать ли разные сессионные данные вместе с запросом
      //     method: 'POST',              // метод POST 
      //     body: JSON.stringify(data),  // типа запрашиаемого документа
      //     headers: new Headers({
      //       'Content-Type': 'application/json'
      //     }),
      //   }).then(res=>{
      //     console.log(res)
      //     this.currentEvent.name = 'Событие не выбранно'
      //   })
    }

  },
  mounted(){
    this.currentEventRequests.getCurrentEvent().then(event=>{
      console.log('requested event', event)
       this.currentEvent = event;
       this.$root.currentEvent = event.id;
    })


    // this.getCurrentEvent()
    setTimeout(() => {
      this.fixTextareaSize()
    }, 500);
    this.$emit('input')
    this.$root.pictureUrl = this.currentEvent.image
  }
}
</script>

<style>


textarea {
  height: 100%;
  resize:none;
  white-space: normal;
}
.current-event_settings{
  display: flex;
}
.current-event_settings button{
  margin: 0 .2rem;
}

</style>
