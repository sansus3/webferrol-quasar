<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
    
      class="q-gutter-md"
    >
      <q-input
        
        v-model="store.user.email"
        label="Cuenta de Usuario*"
        :disable="true"
      />

      

     

     
    </q-form>


     <q-uploader
        
        style="max-width: 300px"
        @uploaded="uploaded"
        @failed="failed"
      />

  </div>
</template>

<script setup>
import { useStoreUsers } from 'src/stores/users';
const store = useStoreUsers();

const uploaded = () => {
    alert("jeje")
}
const failed = info => {
    console.log(info);
}
</script>