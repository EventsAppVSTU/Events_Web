<template>
 <div>
   <h2>News</h2>
      <div class="events-toolbar">
        <input type="text" placeholder="Search News" v-model="searchString">
         <router-link to="/createNews" class="btn btn-outline-danger btn-rounded">+ Create</router-link>
      </div>

<div v-if="filteredNews == ''" class="message-empty-content">
  <h5>Нет новостей</h5>
  <p>Добавьте новость, нажав на кнопку "+ Create"</p>
</div>

    <div class="event-card" v-for="(newsCard, index) in filteredNews" :key="index">
      <hr class="event-card_hr">
      <div v-if="newsCard.image" class="event-card_img-container" >
        <img  :src="newsCard.image" alt="">
      </div>

      <div class="card-body">
        <div class="news-header">
          <h2>{{newsCard.name}}</h2>
          
          <button @click="deleteNews(index)" class="card-delete-button">
              <svg class="feather">
                  <use xlink:href="@/assets/feather-sprite.svg#trash"/>
              </svg>
            </button>
        </div>
        <p class="news-card_description" :class="{'short-text' : !(pressedButtonIndex === index)}">{{newsCard.description}}</p>
        <button v-if="newsCard.description.length > 55" class="news-button-more"  v-on:click="expandThisNews(index)">
          Подробнее <svg class="feather" :class="{'rotate-news-arrow': pressedButtonIndex === index}">
                  <use xlink:href="@/assets/feather-sprite.svg#chevron-right"/>
              </svg>
        </button>
      </div>
    </div>
      </div>
</template>

<script>
import {getNews, deleteNews} from '../requests/eventNews'
import {getCurrentEvent} from '../requests/currentEvent'
export default {
  name: 'EventNews',
  props: {
    msg: String
  },
  data: function(){
    return {
      newsCards:[{
        id: 1, 
        event_id: 1,
        name: '', 
        description: "Lorem ipsum dolor sit amet orem ipsum dolor sit amet orem ipsum dolor sit amet orem ipsum dolor sit amet.",
        image: "@/assets/nasa-Q1p7bh3SHj8-unsplash.jpg",
      },{
        id: 1, 
        event_id: 1,
        name: '', 
        description: "Lorem ipsum dolor sit amet orem ipsum dolor sit amet orem ipsum dolor sit amet orem ipsum dolor sit amet.",
        image: "@/assets/nasa-Q1p7bh3SHj8-unsplash.jpg",
      }],
      currentEvent: {},
      searchString: '',
      pressedButtonIndex: ''
    }
  },
  methods:{
      loadNews: function(){

          getNews(this.currentEvent.id).then(data=>{
            this.newsCards = data.data.objects
          }).catch(err=>{
            console.log(err)
          })
      },
      expandThisNews(newsIndex){
          if (this.pressedButtonIndex === '') {
            this.pressedButtonIndex = newsIndex;
          }
          else{
            this.pressedButtonIndex = ''
          }

      },
      deleteNews(index){
          
        var answer = confirm()
        if (answer){
          console.log('before deleted', this.filteredNews[index])
          deleteNews(this.filteredNews[index].id).then(()=>{
            console.log('Should be deleted')
            this.loadNews()
          }).catch(err=>{
            console.log(err)
          })
        }
      },
  },
  mounted(){

     getCurrentEvent().then(data=>{
        console.log('Событие текущее записываем новости', data.data.objects[0]  )
        this.currentEvent = data.data.objects[0]
        this.loadNews()
      }).catch(err=>{
        console.log(err)
      })
  },
  computed: {
    filteredNews: function(){
      var newsArray = this.newsCards;
      var searchString = this.searchString;

      if (!searchString) {
        return newsArray;
      }

      searchString = searchString.trim().toLowerCase();

      newsArray = newsArray.filter(function(item){
        if (item.name.toLowerCase().indexOf(searchString) !== -1) {
          return item;
        }
      })

      return newsArray;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

p.news-card_description{
  width: 80%;
}
.short-text{
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.news-button-more{
  border: none;
  color: #999;
  background: none;
  outline: none;
  font-size: 1rem;
  line-height: 1rem;
  padding: 0;
  margin: 0;
}
.news-button-more:hover{
  color: #848484;
}
.news-button-more:active, .news-button-more:focus{
  outline: none;
}
.rotate-news-arrow{
  transition: 1s;
  transform: rotate(-90deg);
}
.news-header{
  display: flex;
}
.news-header>h2{
  flex-grow: 1;
}
.news-header button{
  height: 2.5rem;
}
@media (max-width: 640px) {
  p.news-card_description{
    width: 100%;
  }
}

</style>
