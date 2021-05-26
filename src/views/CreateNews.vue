<template>
  <div class="createEvent">
    <div class="current-event">
        <!-- <form   action="/api/create-news" method="POST" id="createNewsForm" > -->
          <h2 class="current-event_header">
              <input type="text" v-model="createdNews.name" placeholder="Название новости" id="name">
          </h2>
          <div class="event-card_img-container">
              <!-- <input type="file" name="image" id="image"> -->
              <!-- <label for="photo">Выбирите фото</label> -->
              <img :src="createdNews.image" alt="">
          </div>
             <input type="text" name="image" id="image" v-model="createdNews.image">
          <p>{{createdNews.event_id}}</p>
          <h3 class="current-event_decription-header">Описание</h3>
          <textarea name="description" id="description" cols="30" rows="10" placeholder="Введите описание новости..." v-model="createdNews.description"></textarea>
          <!-- <input type="text" class="d-none" v-model="" name="event_id"> -->
          <button type="submit" class="btn btn-outline-danger btn-rounded" v-on:click="createNews()">Сохранить новость</button>
        <!-- </form> -->
    </div>
  </div>
</template>

<script>
import {postNews} from '../requests/eventNews'
import {getCurrentEvent} from '../requests/currentEvent'

export default {
  name: 'CreateEvent',
  components: {
   
  },
  data: function(){
    return{
      currentEvent: {},
      createdNews:{
        event_id: Number,
        name: "",
        description: "",
        image: "",
      },
      newsImage: ''
    }
  },
  methods:{
    createNews(){
      // взять данные с формы
      console.log('werwer')
      postNews(this.createdNews).then(data=>{
        console.log(data)
        this.$router.replace('eventNews')
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  mounted(){
    getCurrentEvent().then(data=>{
      console.log('Событие текущее записываем новости', data.data.objects[0]  )
      this.currentEvent = data.data.objects[0]
      this.createdNews.event_id = this.currentEvent.id
    }).catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style>
.current-event_header>input{
    border: none;
    width: 100%;
    background-color: white;
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
.current-event>form{
  padding-bottom: 2rem;
}
</style>
