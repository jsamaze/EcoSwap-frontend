<script setup>
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate';
</script>

<template>
      <div class="form-outline mb-4">
        <label class="form-label subtitle" >{{ title}}</label>
        <Field :as="as" :rows="7" :rules="rules" :name="name" :type="name.toLowerCase().includes('password')? 'password' : 'text'" class="form-control form-control-lg"/>
        <ErrorMessage :name="name" class="text-danger"/>
      </div>
</template>

<script>
export default {
    props:['name','rules','as'],

    created(){
    },

    computed : {
        nameProper(){
            return  this.name.charAt(0).toUpperCase() + this.name.substr(1).toLowerCase()

        },
        title () {
            return this.$slots.default ? this.$slots.default()[0].children.trim() :this.nameProper
        }
    }
}
</script>