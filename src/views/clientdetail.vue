<template>
<div id="showTicket" class="container">

    <fieldset class="myform" style="margin:auto;">
            <legend><span>Client details ({{ this.fullname }})</span></legend>
            <div class="divider"></div>
            
              <!-- ALERTS SECTION START ------------------------------------------>
            
            <div v-if="errorMsg" class="alert alert-danger alert-dismissible fade show" role="alert">
              {{ errorMsg }}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div v-if="successMsg" class="alert alert-success alert-dismissible fade show" role="alert">
              {{ successMsg }}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

              <!----------------------- GENERAL DETAILS --------------------------------------->
          <h3>{{ formData }}</h3>

        <form @submit.prevent="checkForm">                        
          <h3 class="clearwhite"><i class="fas fa-info-circle"></i> Modify general client details</h3>
            <div class="row">
                <div class="col-md-6">                  
                  <div class="form-group">
                    <p class="control-label clearblack">
                      <strong>First name:</strong> {{ client.name }}</p>                                        
                    <input type="text" v-model="formData.name" id="clientName" rows="1" class="form-control" placeholder="Enter a new value to be changed">
                  </div>
                </div>
                <div class="col-md-6">                  
                  <div class="form-group">
                    <p class="control-label clearblack"><strong>Last name:</strong> {{ client.last_name }}</p>                    
                    <input type="text" v-model="formData.last_name" id="last_name" class="form-control" placeholder = 'Enter a new value to be changed'>
                  </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <p class="control-label clearblack"><strong>Client phone number:</strong> {{ client.phone }}</p>
                    <input v-maska="'(###) ###-####'" type="text" v-model="formData.phone" id="phone" class="form-control" placeholder = '(999) 999-9999'>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <p class="control-label clearblack"><strong>Client email address:</strong> {{ client.email }}</p>
                    <input type="text" v-model="formData.email" id="email" class="form-control" placeholder = 'Enter a new value to be changed'>                                     
                  </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <button class="btn btn-primary"><i class="fas fa-user-check"></i> Update details</button>
                  </div>
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
    
    props: ['clientID'],
    directives: { maska },
    created() {
        this.loadClient(this.clientID)
    },
    methods: {
        checkForm: function() {

                if (this.formData.name && this.formData.last_name && this.formData.phone && this.formData.email) {
                    
                    console.log('form passed');
                    this.updateClient(this.clientID);           
                }
                this.successMsg = '';
                this.errors = [];

                if (!this.formData.name) {
                    console.log('Form didnt pass');
                    this.errors.push('First name is required');
                }
                if (!this.formData.last_name) {
                    console.log('Form didnt pass');
                    this.errors.push('Last name is required');
                }
                if (!this.formData.phone) {
                    console.log('Form didnt pass');
                    this.errors.push('Phone number is required');
                }
                if (!this.formData.email) {
                    console.log('Form didnt pass');
                    this.errors.push('A valid email address is required');
                }
        },
        updateClient(id) {
                 axios.put('https://2ktpylu8p5.execute-api.us-east-2.amazonaws.com/dev/api/v1/clients/' + id)
                 .then(
                     response => {
                         console.log(response),
                         console.log(this.formData),
                         this.successMsg = 'New ticket added successfuly',
                         this.errors = []
                         return;
                     })
                 .catch(
                     error => {
                         console.log(error),
                         this.errorMsg = 'Error adding new ticket'
                     })
        },
        loadClient(id) {                   
                  axios.get('https://2ktpylu8p5.execute-api.us-east-2.amazonaws.com/dev/api/v1/client/' + id)
                  .then((response) => {
                      console.log(response.data);
                      this.clients = response.data;
                  })
                  .catch((error) => {
                      console.log(error),
                      this.errorMsg = 'There was an error loading client list. Try again!'
                  })
            }
    },
    data() {
        return {
          client: [],
          formData: {
                _id: {
                  $oid: this.clientID
                },
                name: '',
                last_name: '',
                phone: '',
                email: ''
          },
          fullname: '',
          errorMsg: '',
          successMsg: ''
        }
    }
  }
  

</script>

<style scoped>
  

</style>