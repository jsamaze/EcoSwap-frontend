<template>
    <!-- Modal -->
<div class="modal fade " id="myModal" tabindex="-1" style="--bs-bg-opacity: .5;" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5 title text-center p-3 w-100" id="exampleModalLabel">
            <slot></slot>
        </h1>

        
      </div>
      
      <div class="modal-footer text-center justify-content-center">

          <button type="button" class="btn background-dark-green title text-white" data-bs-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>
</template>

<script>

</script>