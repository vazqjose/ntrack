<template>
<div id="showTicket" class="container">

    <fieldset class="myform" style="margin:auto;">
           
            
      

      <!----------------------- GENERAL DETAILS --------------------------------------->          

        <form @submit.prevent="checkForm">                        
          <h3 class="clearwhite"><i class="fas fa-user-plus"></i> Register a new client</h3>

          <!--------- ALERTS SECTION START ------------------------------------------------> 
            <div v-if="errors.length" class="alert alert-danger fade show" role="alert">
              <strong>Please correct the following error(s):</strong>              
                <ul>
                  <li v-for="error in errors" :key="error.index">{{ error }}</li>
                </ul>
            </div>
            <div v-if="successMsg" class="alert alert-success alert-dismissible fade show" role="alert">
              {{ this.successMsg }}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div v-if="errorMsg" class="alert alert-danger alert-dismissible fade show" role="alert">
              {{ this.errorMsg }}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            
            <div class="row">
                <div class="col-md-6">                  
                  <div class="form-group">
                    <p class="control-label clearblack">
                      <strong>First name:</strong> {{ client.client_name }}</p>                                        
                    <input type="text" v-model="formData.client_name" id="clientName" rows="1" class="form-control" placeholder="Enter a new value to be changed">
                  </div>
                </div>
                <div class="col-md-6">                  
                  <div class="form-group">
                    <p class="control-label clearblack"><strong>Last name:</strong> {{ client.client_last_name }}</p>                    
                    <input type="text" v-model="formData.client_last_name" id="last_name" class="form-control" placeholder = 'Enter a new value to be changed'>
                  </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <p class="control-label clearblack"><strong>Client phone number:</strong> {{ client.client_phone }}</p>
                    <input v-maska="'(###) ###-####'" type="text" v-model="formData.client_phone" id="phone" class="form-control" placeholder = '(999) 999-9999'>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <p class="control-label clearblack"><strong>Client email address:</strong> {{ client.client_email }}</p>
                    <input type="text" v-model="formData.client_email" id="email" class="form-control" placeholder = 'Enter a new value to be changed'>                                     
                  </div>
                </div>
            </div>
            <div class="divider"></div>
            <div class="row">
                  <div class="form-group">
                      <button class="btn btn-primary btn-outline-success newticket me-2 clearwhite" role="button">
                        <i class="fas fa-user-check"></i> OK
                      </button> 
                      <router-link :to="{ name: 'clientList' }" class="btn btn-primary btn-outline-success newticket me-2 clearwhite">
                        <i class="far fa-arrow-alt-circle-left"></i> Go back
                      </router-link>
                  </div>
            </div>
            
          </form>
      
      </fieldset>

</div>
</template>
<script>
  import axios from 'axios';
  import { maska } from 'maska';

  export default {
    
    name: 'newClient',
    directives: { maska },
    data() {
        return {
          client: [],
          errors: [],
          formData: {
                client_name: '',
                client_last_name: '',
                client_phone: '',
                client_email: ''
          },
          fullname: '',
          errorMsg: '',
          successMsg: ''
        }
    },   
    created() {
        
    },
    methods: {
        checkForm: function() {
                this.successMsg = '';
                this.errors = [];

                if (this.formData.client_name && this.formData.client_last_name && 
                    this.formData.client_phone && this.formData.client_email) {                    
                    console.log(this.formData);
                    this.addClient();
                }
                
                if (!this.formData.client_name) {
                    this.errors.push('First name is required');
                }
                if (!this.formData.client_last_name) {                    
                    this.errors.push('Last name is required');
                }
                if (!this.formData.client_phone) {                    
                    this.errors.push('Phone number is required');
                }
                if (!this.formData.client_email) {
                    this.errors.push('A valid email address is required');
                }
        },
        addClient() {                   
                  axios.post('https://2ktpylu8p5.execute-api.us-east-2.amazonaws.com/dev/api/v1/clients/', this.formData)
                  .then((response) => {                                            
                      console.log(response),                         
                         this.successMsg = 'New client registered successfuly';
                         return;
                  })
                  .catch((error) => {
                      console.log(error),
                      this.errorMsg = 'There was an error adding this client. Try again!'
                  })
            }
    },
    
  }
  

</script>

<style scoped>
  

</style>