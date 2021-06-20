<template>
  
  <div>
    <!-- <p>{{currentCategory}}</p> -->
    <select class="form-select circleButton" aria-label="Default select example" @change="changeSelectedOrganization($event)" :disabled="disabled">
      <!--   -->
        <option 
                :selected="organization.id == selectedOrganization"
                :value="organization.id" v-for="(organization) in organizations" 
                :key="organization.id"> 
                    {{organization.name}} {{organization.id}}
        </option>

    </select>
  </div>
  
</template>

<script>
import {getOrganizations} from '../requests/organizations'
//Нужны:
//Выбор категории

export default {
  name: 'OrganizationsComboBox',
  props: {
    currentOrganization: null,
    disabled: Boolean,
    index: null
  },
  data(){
    return {
      organizations: {},
      selectedOrganization: '',
    }
  },
  methods:{
    loadOptions(){
      console.log('get from component ', this.currentOrganization)

      getOrganizations().then(data=>{
          console.log(data.data.objects[0].id)
            this.organizations = data.data.objects;
            console.log('get organization ', this.currentOrganization)
            this.selectedOrganization = data.data.objects[0].id //было закоменченно
            this.$emit('organizationSelected', {organization: this.selectedOrganization})
        }).catch(err=>{
          console.log(err)
        })
    },
    changeSelectedOrganization(event){
      console.log('organizationId', event.target.options[event.target.options.selectedIndex].value)
      this.selectedOrganization = event.target.options[event.target.options.selectedIndex].value

      this.$emit('organizationSelected', {organization: this.selectedOrganization, index: this.index})
    }
  },
  mounted(){
    console.log('get from component ', this.currentOrganization)
    this.loadOptions()
    // if(this.currentCategory != undefined){
      //   console.log('definded')
    // }
    // console.log('Undefinded')
    setTimeout(() => {
      console.log(this.currentOrganization)
      this.selectedOrganization = this.currentOrganization
    }, 2000);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
select{
  padding: .5rem;
}
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
