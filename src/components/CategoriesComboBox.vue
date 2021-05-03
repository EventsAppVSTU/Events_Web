<template>
  
  <div>
    <!-- <p>{{currentCategory}}</p> -->
    <select class="form-select circleButton" aria-label="Default select example" @change="changeSelectedCommunity($event)" :disabled="disabled">
      <!--   -->
        <option 
                :selected="category.id == selectedCategory"
                :value="category.id" v-for="(category) in categories" 
                :key="category.id"> 
                    {{category.name}} {{category.id}}
        </option>

    </select>
  </div>
  
</template>

<script>
import {getCategories} from '../requests/categories'
//Нужны:
//Выбор категории

export default {
  name: 'CategoriesComboBox',
  props: {
    msg: String,
    currentCategory: null,
    disabled: Boolean
  },
  data(){
    return {
      categories: {},
      selectedCategory: '',
    }
  },
  methods:{
    loadOptions(){
      console.log('get from component ', this.currentCategory)
      // // if(this.currentCategory != undefined){
      //   console.log('category id ', parseInt(this.currentCategory))
      //   this.selectedCategory = this.currentCategory
      // // }
      getCategories().then(data=>{
          console.log(data.data.objects[0].id)
            this.categories = data.data.objects;
            console.log('get current event ', this.currentCategory)
            // this.selectedCategory = data.data.objects[0].id
            this.$emit('categorySelected', {category: this.selectedCategory})
        }).catch(err=>{
          console.log(err)
        })
    },
    changeSelectedCommunity(event){
      console.log('communityId', event.target.options[event.target.options.selectedIndex].value)
      this.selectedCategory = event.target.options[event.target.options.selectedIndex].value

      this.$emit('categorySelected', {category: this.selectedCategory})
    }
  },
  mounted(){
    console.log('get from component ', this.currentCategory)
    this.loadOptions()
    // if(this.currentCategory != undefined){
      //   console.log('definded')
    // }
    // console.log('Undefinded')
    setTimeout(() => {
      console.log(this.currentCategory.category_id)
      this.selectedCategory = this.currentCategory.category_id
    }, 2000);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
