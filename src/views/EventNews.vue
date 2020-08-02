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

    <div class="event-card" v-for="(newsCard, index) in filteredNews" :key="newsCard.name">
      <hr class="event-card_hr">
      <div v-if="newsCard.image" class="event-card_img-container" v-on:click="setCurrentEvent(eventCard.id)">
        <img  :src="newsCard.image" alt="">
      </div>
      <!-- <div class="news-sm-avatar">

      </div> -->
      <div class="card-body">
        <div class="news-header">
          <h2>{{newsCard.name}}</h2>
          <button class="btn btn-outline-danger" @click="deleteNews(index)">delete</button>
        </div>
        <p class="news-card_description" :class="{'short-text' : !(pressedButtonIndex == index)}">{{newsCard.description}}</p>
        <button v-if="newsCard.description.length > 55" class="news-button-more"  v-on:click="expandThisNews(index)">
          More <svg class="feather" :class="{'rotate-news-arrow': pressedButtonIndex == index}">
                  <use xlink:href="@/assets/feather-sprite.svg#chevron-right"/>
              </svg>
        </button>
      </div>
    </div>
      </div>
</template>

<script>
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
      searchString: '',
      pressedButtonIndex: ''
    }
  },
  methods:{
      loadNews: function(){
            console.log('loading..')
            var currentEvent = this.$root.currentEvent;
            fetch(`/api/event-news?event_id=${currentEvent}`, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
            }).then(res=>{
              console.log('here news')
                  if(res.ok){
                      var data = res.json();
                      console.log(data);
                      return data;
                  }
                  else{
                      console.log('er get rooms :(');
                      throw new Error ('er');
                  }
              }).then(data=>{
                  console.log(data.data.objects);
                  this.newsCards = data.data.objects;
              })
        },
        expandThisNews(newsIndex){
            if (this.pressedButtonIndex == '') {
              this.pressedButtonIndex = newsIndex;
            }
            else{
              this.pressedButtonIndex = ''
            }

        },
        deleteNews(index){
          var answer = confirm()
          if (answer){
            var data ={
              id: this.newsCards[index].id
            }
            fetch(`/api/delete-event-news`, {
              credentials: 'same-origin',  // параметр определяющий передвать ли разные сессионные данные вместе с запросом
              method: 'POST',              // метод POST 
              body: JSON.stringify(data),  // типа запрашиаемого документа
              headers: new Headers({
                'Content-Type': 'application/json'
              }),
            }).then(res=>{
              return res.json()
            }).then(data=>{
              console.log(data)
              this.loadNews()
            })
          }
        },
        getCurrentEvent(){
// из currentEvent
      console.log('getting...')
      return new Promise((resolve, reject)=>{
        fetch('/api/get-current-event-by-id?user=admin').then(res=>{
              if(res.ok){
                  var data = res.json();
                  console.log('OK')
                  return data;
              }
              else{
                  console.log('er get rooms :(');
                  throw new Error ('er');
              }
          }).then(data=>{
              console.log('current event data',data.data.objects[0])
              this.currentEvent = data.data.objects[0];
              this.$root.currentEvent = data.data.objects[0].id;
              resolve('ok')
          }).catch(error=>{
            reject(error)
          })

      })
    }
  },
  mounted(){
    // alert('i am ready')
    this.getCurrentEvent().then(()=>{
      this.loadNews();
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
/* .news-sm-avatar{
  width: 80px;
  height: 80px;
  background-color: #ff004d;
  border-radius: 1.5rem;
} */
/* .card-body{
  background-color: #999;
} */
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

</style>
