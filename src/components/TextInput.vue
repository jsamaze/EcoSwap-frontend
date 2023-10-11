<template>
    <div class="form-outline mb-4">
        <label class="form-label subtitle" ><slot></slot></label>
        <input 
            :type="type" 
            class="form-control form-control-lg" 
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :required="required"
        />
    </div>
</template>

<script>
export default {
  props: ['modelValue', 'type',"required"],
  emits: ['update:modelValue']
}
</script>