

<template>

    <button :disabled="disabled"  class="my-3 btn btn-dark  btn-lg gradient-custom-4 text-white subtitle" >
        <slot></slot>
    </button>
</template>

<script>
import * as bootstrap from 'bootstrap';

export default {
    props: ['disabled', 'disabledPopover'],
    data(){
        return {
            btn : null
        }
    },
    mounted(){
        // this.btn = new bootstrap.Popover(this.$refs.btn)
    }
}
</script>