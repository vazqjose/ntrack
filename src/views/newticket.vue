<template>
<div id="showTicket" class="container">

    <fieldset class="myform">
            <legend><span>Register a new ticket</span></legend>
            <div class="divider"></div>
      

        <form @submit.prevent="checkForm">                            
          
            <div class="row">
              <h3 class="clearwhite"><i class="fas fa-info-circle"></i> Enter a description of the service to be provided and ID of client</h3>
            </div>

            <!-------------------------- ALERTS SECTION START ------------------------>
            
            <div v-if="errors.length" class="alert alert-danger fade show" role="alert">
              <strong>Please correct the following error(s):</strong>              
                <ul>
                <li v-for="error in errors" :key="error.index">{{ error }}</li>
                </ul>
            </div>
            <div v-if="this.successMsg" class="alert alert-success alert-dismissible fade show" role="alert">
              {{ successMsg }}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

            <div class="row">
              <!--
                <div class="col-md-6">      
                  <div class="form-group">
                        <p class="control-label clearblack"><strong>Select a client:</strong></p>
                      
                        <select id="client-id" v-model="formData.client_id" class="form-select">
                            <option aria-selected="true" value="">Select a client</option>
                            <template v-for="client in clients" :key="client._id.$oid">
                                <option value={{ client._id.$oid }}>{{ client._id.$oid }} {{ client.last_name }} (Email:{{ client.email }})</option>
                            </template>                        
                        </select>
                     
                  </div> 
                </div>-->
                <div class="col-md-6">                  
                  <div class="form-group">
                      <p class="control-label clearblack"><strong>Description of issue:</strong> </p>
                      <textarea rows="2" id="description" class="form-control" v-model="formData.description" placeholder="Enter a brief summary of the service needed"></textarea>
                  </div>
                </div>
                <div class="col-md-6">                  
                  <div class="form-group">
                      <p class="control-label clearblack"><strong>ID of client:</strong></p>
                      <textarea rows="2" id="client_id" class="form-control" v-model="formData.client_id" placeholder="Paste the client ID here"></textarea>
                  </div>
                </div>                 
            </div>
            <div class="divider"></div>         
            <div class="row">
                  <div class="form-group">
                      <button class="btn btn-primary btn-outline-success newticket me-2 clearwhite">
                        <i class="fas fa-clipboard-check"></i> Create ticket
                      </button> 
                      
                      <router-link to='/newClient' class="btn btn-primary btn-outline-success newticket me-2 clearwhite">
                        <i class="fas fa-user-check"></i> Add a new client
                      </router-link>
                      <router-link to='/' class="btn btn-primary btn-outline-success newticket me-2 clearwhite">
                        <i class="far fa-arrow-alt-circle-left"></i> Go back
                      </router-link>
                  </div>
            </div>
          </form>
          </fieldset>

</div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'newTicket',
    created() {
        //this.loadClients()
    },
    data() {
        return {          
          errors: [],
          clients: [],
          errorMsg: '',
          successMsg: '',
          formData: {
              client_id: '',
              status: 'open',
              description: '',
              user_id: '616f4c9ff66c2a496d7e5bd3'
          }          
        }
    },
    methods: {
        checkForm: function() {

                if (this.formData.description) {
                    this.addTicket();
                    console.log('form passed');              
                }
                this.successMsg = '';
                this.errors = [];

                if (!this.formData.description) {
                    console.log('Form didnt pass');
                    this.errors.push('Description of the issue is required');
                }
            },
            addTicket() {
                 if (!this.formData.client_id) {
                       this.formData.client_id = '6170be1ace938dab7b685232';
                     }
                 axios.post('https://2ktpylu8p5.execute-api.us-east-2.amazonaws.com/dev/api/v1/tickets', this.formData)
                 .then(
                     response => {
                         console.log(response),
                         console.log(this.formData),
                         this.successMsg = 'New ticket added successfuly',
                         this.formData.client_id = '',
                         this.formData.description = '',
                         this.errors = []
                         return;
                     })
                 .catch(
                     error => {
                         console.log(error),
                         this.errorMsg = 'Error adding new ticket'
                     })
            },
            loadClients() {                   
                  axios.get('https://2ktpylu8p5.execute-api.us-east-2.amazonaws.com/dev/api/v1/clients')
                  .then((response) => {
                      console.log(response.data);
                      this.clients = response.data;
                  })
                  .catch((error) => {
                      console.log(error),
                      this.errorMsg = 'There was an error loading client list. Try again!'
                  })
            }
    }        
  }
  

</script>

<style scoped>
  .commentdesc {
    font-size: 12px;
    padding:10px;
    color:#ccc;
  }

  ul.commentlist
  {
    list-style: none;
    list-style-image: none;
    list-style-type: none;
    margin:0 !important;
    padding-inline-start: 0 !important;
  }

  ul.commentlist li
  {
    padding: 10px;
    border-bottom: 1px dotted #666;
  }

  ul.commentlist li:last-child
  {
    border: 0;
  }

 ul.commentlist li > p
  {
    margin: 0;
  }

   ul.commentlist li > p.comment
  {
    padding: 10px;
  }

  .myform {
    margin:auto;
  }

  .newticket {
    background: none;
  }

</style>