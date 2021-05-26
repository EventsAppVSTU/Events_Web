<template>
 <div>
   <h2>Events</h2>
      <div class="events-toolbar">
      <input type="text" placeholder="Search Event" v-model="searchString">
      <router-link to="/createEvent" class="btn btn-outline-danger btn-rounded">+ Create</router-link>
      </div>
      <div v-if="filteredEvents == ''" class="message-empty-content">
          <h5>Нет событий</h5>
          <p>Добавьте события, нажав на кнопку "Созадать запись"</p>
      </div>

    <div class="event-card" v-for="eventCard in filteredEvents" :key="eventCard.name">
      <hr class="event-card_hr">
      <div class="event-card_img-container" v-on:click="setCurrentEvent(eventCard.id)">
        <!-- <div class="event-rating" >
          <div class="stars" v-for="i in 5" :key="i">
            <svg class="feather event-rating-star">
              <use xlink:href="@/assets/feather-sprite.svg#star"/>
            </svg>
          </div>          
        </div> -->
        <img :src="eventCard.image" alt="">
      </div>
      <p class="event-card_category">
        <svg class="feather" v-if="eventCard.private == 1">
          <use xlink:href="@/assets/feather-sprite.svg#lock"/>
        </svg>
        {{eventCard.category_name}}
      </p>
      <h2 class="event-card_header">{{eventCard.name}}</h2> 
      <span>
        
      </span>
      <p class="event-card_description">{{eventCard.description}}</p>
    </div>
      </div>
</template>

<script>
import { getEvets } from '../requests/events'
export default {
  name: 'Events',
  props: {
    msg: String
  },
  data: function(){
    return {
      eventCards:[{
        id: 1, 
        name: "Робоcr",
        description: "Lorem ipsum dolor sit amet orem ipsum dolor sit amet orem ipsum dolor sit amet orem ipsum dolor sit amet.",
        startDate: '',
        endDate: '',
        image: "@/assets/nasa-Q1p7bh3SHj8-unsplash.jpg",
        place: '',
        category_id: Number
      },{
        id: 1, 
        name: "Робо",
        description: "Lorem ipsum dolor sit amet orem ipsum dolor sit amet orem ipsum dolor sit amet orem ipsum dolor sit amet.",
        startDate: '',
        endDate: '',
        image: "@/assets/nasa-Q1p7bh3SHj8-unsplash.jpg",
        place: '',
        category_id: Number
      }],
      searchString: ''
    }
  },
  methods:{
    loadEvents: function(){
            console.log('loading..')
            if(localStorage.organizationId != undefined){
              getEvets(localStorage.organizationId).then(data=>{
                console.log(data.data.objects);
                    this.eventCards = data.data.objects;
              })
            }
            // fetch(`/api/events`, {
            // headers : { 
            //     'Content-Type': 'application/json',
            //     'Accept': 'application/json',
            //     'Token': localStorage.hash
            // }

            // }).then(res=>{
            //   console.log('here')
            //       if(res.ok){
            //           var data = res.json();
            //           console.log(data);
            //           return data;
            //       }
            //       else{
            //           console.log('er get rooms :(');
            //           throw new Error ('er');
            //       }
            //   }).then(data=>{
            //       console.log(data.data.objects);
            //       this.eventCards = data.data.objects;

            //       // id – уникальный номер;
            //       // name – название;
            //       // description – описание;
            //       // startDate – дата начала
            //       // endDate – дата окончания
            //       // image – путь к файлу с картинкой (ПРИ ДОБАВЛЕНИИ И РЕДАКТИРОВАНИИ ИГНОРИРУЕТСЯ, добавляется по-другому)
            //       // category_id – номер категории события
            //       // category_name - категория словами
                  
            //   })
          },
          getImgUrl(pic) {
            return require('../assets/' + pic);
          },
          setCurrentEvent(eventID){
            
            fetch(`/api/set-current-event-by-id?userId=${localStorage.userId}&event=${eventID}`, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Token': localStorage.hash
            }

            }).then(res=>{
              console.log('here')
                  if(res.ok){
                      // var data = res.json();
                      console.log(res);
                      return res;
                  }
                  else{
                      console.log('er get rooms :(');
                      throw new Error ('er');
                  }
              }).then(data=>{
                  console.log(data);
                  this.$eventBus.$emit('reloadApp')
                  // alert('событие установленно')
                  setTimeout(() => {
                    
                    this.$router.push('/currentEvent')
                  }, 500);

              })
          }
  },
  mounted(){
    // alert('i am ready')
        this.loadEvents();
  },
  computed: {
    filteredEvents: function(){
      var eventsArray = this.eventCards;
      var searchString = this.searchString;

      //фильтрация для отображения только тех событий, которые организации админа
      eventsArray = eventsArray.filter(function(item){
        if (item.organization_id == localStorage.organizationId) {
          return item;
        }
      })

      if (!searchString) {
        return eventsArray;
      }

      searchString = searchString.trim().toLowerCase();

      eventsArray = eventsArray.filter(function(item){
        if (item.name.toLowerCase().indexOf(searchString) !== -1) {
          return item;
        }
      })

      return eventsArray;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* Events */
.event-card{
    width: 100%;
}
.event-card_hr{
    border: 0.5px solid #d7d7d7;
    margin: 2rem 0;
}
@media(min-width: 800px){
  .event-card_img-container{
    height: 400px ;
  }
}
.event-card_img-container{
    width: 100%;
    margin: auto;
    overflow: hidden;
    border-radius: 1.5rem;
    margin-bottom: 2rem;
    background-color: #ff004d;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.event-card_img-container>img{
    object-fit: cover;
    width: 100%;
    height: 100%;
}
.event-rating{
  display: flex;
  position: absolute;
  bottom: 1rem;
  left: 1rem;
}
.event-rating-star{
  stroke: white;
}
.event-card_img-container>input{
    outline:0;
    opacity:0;
    cursor: pointer;
    position: absolute;
}
p.event-card_category{
  color: #aeaeae;
  margin: 0;
}
p.event-card_description{
  width: 80%;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.toolbar{
  padding: 0rem 1rem 3rem;
}
.events-toolbar>input{
    border-radius: 5rem;
    border: 1px solid #999;
    padding: .3rem 1.2rem;
    margin-right:  1rem;
    outline: none;
    /* background-color: #f2f2f2; */
}
.events-toolbar>input:active, .events-toolbar>input:focus{
    outline: none;
    border: 1px solid #ff004d;
}
@media(max-width:800px){
    .event-card_img-container{
      height: 200px;
    }
    #sidebar-nav{
        width: 100%;
        z-index: 10;
    }
    .s-hidden{
        display: none !important;
    }
    .s-open{
        display: block;
    }
    .signInBlock{
      padding: 7rem 0;
    }
    .signInBlock_form{
      width: 100%;
      margin: 0;
      padding: 2rem;
    }

    .events-toolbar>input{
      width: 60%;
      padding: .5rem 0 .5rem 1rem;
      margin-right:  .5rem;
      border-style:solid;
      border: 1px solid #d7d7d7 !important;
      outline: none;
      inset: none !important;
      background: white;
      box-shadow: none;
    }
}
</style>
