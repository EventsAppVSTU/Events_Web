<template>
  <div class="createEvent">
    <div class="current-event">
        <!-- <form   action="/api/create-new-event" method="POST" id="createEventForm" > -->
          <h2 class="current-event_header">
              <input type="text" value="" name="name" placeholder="Название" id="name" v-model="createdEvent.name">
          </h2>
          <div class="event-card_img-container">
              <!-- <input type="file" name="image" id="image"> -->
              <!-- <label for="photo">Выбирите фото</label> -->
              <img :src="$root.pictureUrl" alt="">
          </div>
          <div class="upload-image-container">
            <div class="upload-web-img-input">
              <h5>Загрузить фото по ссылке</h5>
              <input type="text" name="image" id="image" class="input-photo-link" placeholder="Link to the Photo" v-model="$root.pictureUrl">
            </div>
            <div class="upload-my-img-component">
              <h5>Загрузить свое фото</h5>
              <Upload/>
            </div>

            <div class="privateEvent-switch-block">
              <h5 class="device-block-headers">Приватное событие</h5>
              <!-- Rounded switch -->
              <label class="switch">
                <input type="checkbox" v-model="createdEvent.private">
                <span class="slider round"></span>
              </label>
              <h5 class="device-block-headers">Событие организации</h5>
              <!-- Rounded switch -->
              <label class="switch">
                <input type="checkbox" v-model="createdEvent.organization_event">
                <span class="slider round"></span>
              </label>
            </div>
          </div>
          <h3 class="current-event_decription-header">Описание</h3>
          <textarea name="description" id="description" cols="30" rows="6" placeholder="Напишите тут описание вашего события..." v-model="createdEvent.description"></textarea>
          <h3 class="current-event_decription-header">Начало события</h3>
          <textarea name="startDate" id="startDate" cols="30" rows="3" placeholder="ГГГГ-ММ-ДД" v-model="createdEvent.startDate"></textarea>
          <h3 class="current-event_decription-header">Конец события</h3>
          <textarea name="endDate" id="endDate" cols="30" rows="3" placeholder="ГГГГ-ММ-ДД" v-model="createdEvent.endDate"></textarea>
          <h3 class="current-event_decription-header">Место проведения</h3>
          <textarea name="place" id="place" cols="30" rows="3" placeholder="Укажите адрес места порведения мероприятия" v-model="createdEvent.place"></textarea>
          <h3 class="current-event_decription-header">  Категория</h3>
          <CategoriesComboBox @categorySelected="setCategory" />
          <!-- <textarea name="category_id" id="" cols="30" rows="3" placeholder="категория" v-model="createdEvent.category_id"></textarea> -->
          

          <!-- <div class="event-card_img-container">
              <img src="img/map.png" alt="">
          </div> -->
          <!-- <input type="submit" value="Save"> -->
          <div class="createEvent-buttons">
            <router-link to="/events" class="btn btn-outline-secondary btn-rounded">Отменить</router-link>
            <button type="submit" class="btn btn-outline-danger btn-rounded" v-on:click="createEvent($event)">Создать событие</button>
          </div>
        <!-- </form> -->
    </div>
  </div>
</template>

<script>
import Upload from '../components/Upload.vue'
import CategoriesComboBox from '../components/CategoriesComboBox'
import {postEvent} from '../requests/events'
export default {
  name: 'CreateEvent',
  components: {
   Upload,
   CategoriesComboBox
  },
  data(){
    return {
      createdEvent: {
        name: '',
        description: '',
        image: '',
        startDate: '',
        endDate: '',
        category_id: '',
        place: '',
        private: 0,
        organization_event: 0,
        organization_id: localStorage.organizationId,
        
      }
    }
  },
  methods:{
    createEvent(event){
      if (event) {
        event.preventDefault()
      }
      // взять данные с формы
      console.log('werwer')
      postEvent(this.createdEvent).then(data=>{
        console.log(data)
        this.$route.push('/')
      })
      // установить созданное событие как текущее
    },
    setCategory(params){
      console.log('cat', params.category)
      this.createdEvent.category_id = params.category
    }
  }
}
</script>

<style>
.createEvent-buttons{
  width: 100%;
  margin-bottom: 3rem;
  background-color: rgb(248, 246, 246);
  padding: 1rem;
  display: flex;
}
.createEvent-buttons>button{
 justify-content: center;
}
.createEvent-buttons>button:nth-child(even){
  margin: 0 1rem;
}
.current-event_header>input{
    border: none;
    width: 100%;
    background-color: white;
}
.input-photo-link{
  padding: .5rem;
  margin-right: 3rem;
  width: 100%;
  height: 3rem;
}
.current-event_header>input:disabled{
  color: #333333;
}
.current-event textarea{
  width: 100%;
  border: none;
  background-color: white;
}
.current-event>textarea{
    border: none;
}
.current-event>textarea:disabled{
  color: #ff0000;
  border: none;
  background: none;
}
.current-event p{
    width: 70%;
}
.current-event_header{
    display: flex;
}
.current-event_header input{
    flex-grow: 1;
}
.current-event_settings{
    /* display: inline-block; */
}
.upload-image-container{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  /* background: #2196F3; */
}
upload-web-img-input, .upload-my-img-component, .privateEvent-switch-block {
  width: 33.33%;
}
.upload-web-img-input{
  padding-right: 1rem;
}
.upload-my-img-component{
  padding: 0 1rem;
}
.privateEvent-switch-block{
  padding-left: 1rem;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #ff004d;/*#2196F3;*/
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
