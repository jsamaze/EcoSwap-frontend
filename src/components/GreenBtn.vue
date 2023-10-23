

<template>
<div ref="btn" data-bs-placement="top" class="d-flex justify-content-center py-3" data-bs-toggle="popover" data-bs-trigger="hover focus" 
    :data-bs-content="disabled && disabledPopover" tabindex="0">
    <button :disabled="disabled"  class="btn btn-success  btn-lg gradient-custom-4 text-white subtitle" >
        <slot></slot>
    </button>
</div>
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
        this.btn = new bootstrap.Popover(this.$refs.btn)
    }
}
</script>