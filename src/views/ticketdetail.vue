<template>
<div id="showTicket" class="container">

    <fieldset class="myform" style="margin:auto;">
            <legend><span>Ticket details ({{ ticket.client_id.name }} {{ ticket.client_id.last_name }})</span></legend>
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

        <form method="post" enctype="multipart/form-data" id="myform" action="">                            
          
            <div class="row">
                <div class="col-md-6">
                  <h3 class="clearwhite"><i class="fas fa-info-circle"></i> General Details</h3>
                  <div class="form-group">
                    <p class="control-label clearblack"><strong>Ticket number:</strong> {{ printTicketNumber(ticket._id.$oid) }}</p>
                    <p class="control-label clearblack"><strong>Created by:</strong> {{ ticket.created_by.name }} {{ ticket.created_by.last_name }}</p>
                    <p class="control-label clearblack"><strong>Description:</strong> {{ ticket.description }}</p>
                    <p class="control-label clearblack"><strong>Status: </strong> {{ ticket.status.toUpperCase() }}</p>
                  
                    <p class="control-label clearblack"><strong>Client name:</strong> {{ ticket.client_id.name }} {{ ticket.client_id.last_name }}</p>
                    <p class="control-label clearblack"><strong>Client phone:</strong> {{ ticket.client_id.phone }}</p>
                    <p class="control-label clearblack"><strong>Client email:</strong> {{ ticket.client_id.email }}</p>                                      
                  </div>
                  
                  
                <!-------------------------------------- STATUS UPDATE BLOCK ----------------------------------->
                <div class="form-group">
                  <h3 class="clearwhite"><i class="fas fa-history"></i> Status update history </h3>
                  <table class="mytable table table-responsive clearblack">
                    <tr>
                        <th>Status</th>
                        <th>Employee name</th>
                        <th>Date set</th>
                    </tr>
                    <tr v-for="statusline in ticket.status_updates" :key="statusline.status">
                        <td>{{ statusline.status_change }}</td>
                        <td>{{ statusline.created_by.name }} {{ statusline.created_by.last_name }}</td>
                        <td>{{ statusline.created.$date }}</td> 
                    </tr>
                  </table>
<!--                  
                  <div class="row text-end"><a href='#' class='openPopup'  data-bs-toggle="modal" data-bs-target="#modalSetStatus"><i class="fas fa-plus-circle"></i>Set new status</a></div>          
-->                  
                </div>
              </div>
                <div class="col-md-6" style='padding-left:40px'>
                  <h3 class="clearwhite"><i class="far fa-comments"></i> Comments Log</h3>

                 <!------------------------------------- COMMENTS BLOCK ------------------------------->
                  <div v-for="commline in ticket.status_updates" :key="commline.created.$date" class="form-group">
                    <label class="control-label">Comment added by <strong>{{ commline.created_by.name }} {{ commline.created_by.last_name }}</strong> on {{ commline.created.$date }}</label>
                    <ul class="control-label">
                          <li v-if="commline.comment">{{ commline.comment }}</li>
                          <li v-else><i>No comment added</i></li>                  
                    </ul>
                    <div class="divider"></div>
                  </div>
<!--               
                    <div class="row text-end">
                    <a href='#' type='button' class='openPopup' data-bs-toggle="modal" data-bs-target="#modalAddComment">
                    <i class="fas fa-comment-medical"></i>Add new comment</a>
                    </div>
-->                    
                </div>
              </div>          
          </form>
          </fieldset>

          <!-- Modal ADD COMMENT -->
<!--          
            <div class="modal fade" id="modalAddComment" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content mymodal">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add a new comment</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                        <div class="form-group">
                        <textarea id="txtNewComment" type="text" name="txtNewComment" class="form-control" rows='5' line placeholder="Write down your comment here"/>
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="far fa-times-circle"></i> Close</button>
                    <button id="btnAddComment" type="button" class="btn btn-dark" data-bs-dismiss="modal"><i class="fas fa-comment-medical"></i> OK</button>
                </div>
                </div>
            </div>
            </div>
-->
            <!-- Modal CHANGE STATUS -->
<!--            
            <div class="modal fade" id="modalSetStatus" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content mymodal">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Set a new status</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="form-group">          
                        <select id="selStatus" name="selStatus" class="form-select">
                          <option value="" selected="selected">--Select a new status to set--</option>                                                    
                          <option value="1">Service type sample</option>
                        </select>              
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="far fa-times-circle"></i> Close</button>
                    <button id="btnSetStatus" type="button" class="btn btn-dark" data-bs-dismiss="modal"><i class="fas fa-comment-medical"></i> OK</button>
                  </div>
                </div>
              </div>
            </div>
-->

</div>
</template>
<script>
  import axios from 'axios';
  export default {
    props: ['ticketID'],
    methods: {
        printTicketNumber(id)
            {
                this.ticketNumber = '';
                this.i = 0;                

                while (this.i < 7)
                {
                  this.ticketNumber += id[this.i];
                  this.i++;
                }
                return this.ticketNumber;
            }
    },
    data() {
      return {
        ticket: [],
        errorMsg: '',
        successMsg: ''
      }
    },
    created() {
        axios.get('https://2ktpylu8p5.execute-api.us-east-2.amazonaws.com/dev/api/v1/ticket_full/6170be1ace938dab7b685231')
        .then((response) => {
            console.log(response.data);
            this.ticket = response.data;
        })
        .catch((error) => {
            console.log(error),
            this.errorMsg = 'There was an error loading this ticket. Try again!'
        })
    }
  }

</script>

<style scoped>

</style>