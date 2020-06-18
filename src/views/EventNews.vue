<template>
 <div>
   <h2>News</h2>
      <div class="events-toolbar">
      <input type="text" placeholder="Search Event" v-model="searchString">
      <router-link to="/createNews" class="btn btn-outline-danger btn-rounded">+ Create</router-link>
      </div>

    <div class="event-card" v-for="newsCard in filteredNews" :key="newsCard.name">
      <hr class="event-card_hr">
      <div v-if="newsCard.image" class="event-card_img-container" v-on:click="setCurrentEvent(eventCard.id)">
        <img  :src="newsCard.image" alt="">
      </div>
      <div class="news-sm-avatar">

      </div>
      <div class="card-body">
        <h2 class="event-card_header">{{newsCard.name}}</h2>
        <p class="event-card_description">{{newsCard.description}}</p>
      </div>
      <!-- <p>{{eventCard.image}}</p> -->
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
      searchString: ''
    }
  },
  methods:{
    loadNews: function(){
            console.log('loading..')
            fetch(`/api/event-news`, {
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
          getImgUrl(pic) {
            return require('../assets/' + pic);
          },
          // setCurrentEvent(eventID){
          //   alert('событие установленно')
          //   fetch(`/api/set-current-event-by-id?user=admin&event=${eventID}`, {
          //   headers : { 
          //       'Content-Type': 'application/json',
          //       'Accept': 'application/json'
          //   }

          //   }).then(res=>{
          //     console.log('here')
          //         if(res.ok){
          //             // var data = res.json();
          //             console.log(res);
          //             return res;
          //         }
          //         else{
          //             console.log('er get rooms :(');
          //             throw new Error ('er');
          //         }
          //     }).then(data=>{
          //         console.log(data);
                  

          //     })
          // }
  },
  mounted(){
    // alert('i am ready')
        this.loadNews();
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
/* Events */
.event-card{
    /* background-color: #999; */
    width: 100%;
    /* padding-top: 1rem; */
    /* display: flex;  */
    /* flex because of news block */
}
.event-card_hr{
    border: 0.5px solid #d7d7d7;
    margin: 2rem 0;
}
.event-card_img-container{
    width: 100%;
    height: 400px;
    margin: auto;
    overflow: hidden;
    border-radius: 1.5rem;
    margin-bottom: 2rem;
    background-color: #ff004d;
    display: flex;
    align-items: center;
    justify-content: center;
}
.event-card_img-container>img{
    object-fit: cover;
    width: 100%;
    height: 100%;
}
.event-card_img-container>input{
    outline:0;
    opacity:0;
    cursor: pointer;
    position: absolute;
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

    /* background-color: #f2f2f2; */
}
@media(max-width:800px){
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
