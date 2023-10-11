<script setup>
    import {toRaw} from 'vue'
</script>

<template>
                    <div class="d-flex justify-content-center">
                  <input type="submit"
                    class="btn btn-success  btn-lg gradient-custom-4 text-white subtitle" 
                    :value="$slots.default()[0].children"> 
                </div>
</template>