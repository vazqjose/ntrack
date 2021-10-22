<template>
<div class="container" style='margin-top:3%'>

    <fieldset class="myform" style="margin:auto;">
            <legend><span>Ticket details</span></legend>
            <div class="divider"></div>
             <!-- ALERTS SECTION START ------------------------------------------>
            
            <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
              There wass an <strong>error</strong> saving this data, please try again!
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div v-if="success" class="alert alert-success alert-dismissible fade show" role="alert">
              Ticket updated <strong>successfully!</strong>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <!-- ALERTS SECTION END --------------------------------------->

        <form method="post" enctype="multipart/form-data" id="myform" action="">                            
          
            <div class="row">
                <div class="col-md-6">
                  <h3 class="clearwhite"><i class="fas fa-info-circle"></i> General Details</h3>
                  <div class="form-group">
                    <p class="control-label clearblack"><strong>Ticket number:</strong> {{ticketNumber}}</p>
                    <p class="control-label clearblack"><strong>Created by:</strong> {{createdBy}} 	{{dateCreated}}</p>
                    <p class="control-label clearblack"><strong>Description:</strong> {{description}}</p>
                    <p class="control-label clearblack"><strong>Type of service:</strong> {{serviceType}}</p>
                  
                    <p class="control-label clearblack"><strong>Client name:</strong> {{clientName}}</p>
                    <p class="control-label clearblack"><strong>Client phone:</strong> {{clientPhone}}</p>
                    <p class="control-label clearblack"><strong>Client email:</strong> {{clientEmail}}</p>                                         
                  </div>
                  <p>&nbsp;</p>

                <div class="form-group">
                  <h3 class="clearwhite"><i class="fas fa-history"></i> Status update history </h3>
                  <table class="mytable table table-responsive clearblack">
                    <tr>
                        <th>Status</th>
                        <th>Employee name</th>
                        <th>Date set</th>
                    </tr>
                    <tr v-for="updateLine in updates" :key="updateLine.dateSet">  
                        <td>{{updateLine.status}}</td>
                        <td>{{updateLine.setBy}}</td>
                        <td>{{updateLine.dateUpdated}}</td> 
                    </tr>
                  </table>
                  <div class="row text-end"><a href='#' class='openPopup'  data-bs-toggle="modal" data-bs-target="#modalSetStatus"><i class="fas fa-plus-circle"></i>Set new status</a></div>          
                </div>
              </div>
                <div class="col-md-6" style='padding-left:40px'>
                  <h3 class="clearwhite"><i class="far fa-comments"></i> Comments Log (3)</h3>
                 
                  <div class="form-group" v-for="line in comments" :key="line.dateAdded">
                    <label class="control-label "><u>Comment added by <strong>{{line.commentBy}}</strong> on {{line.dateAdded}}</u></label>
                    <label class="control-label"><li>{{line.comment}}</li></label>                      
                  </div>
               
                    <div class="row text-end">
                    <a href='#' type='button' class='openPopup' data-bs-toggle="modal" data-bs-target="#modalAddComment">
                    <i class="fas fa-comment-medical"></i>Add new comment</a>
                    </div>
                </div>
              </div>          
          </form>
          </fieldset>

          <!-- Modal ADD COMMENT -->
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

            <!-- Modal CHANGE STATUS -->
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
                          <option value="2">Service type sample</option>
                          <option value="3">Service type sample</option>
                          <option value="3">Service type sample</option>
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


</div>
</template>
<script>
export default {
    name: 'ticketDetail',
    data() {
        return {
            success: false,
            error: false,
            ticketNumber: '50041',
            createdBy: 'Andres Morales',
            dateCreated: '12/31/69 6:00 PM',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac mauris pretium, ultricies eros et, tempor urna',
            serviceType: 'Diagnostic checkup',
            clientName: 'Bruce Wayne',
            clientPhone: '788-652-8977',
            clientEmail: 'me@somewhere.com',
            updates: [
                {
                    status: 'Open',
                    setBy: 'Andres Morales',
                    dateUpdated: '12/31/20 6:00 PM',                            
                },
                {
                    status: 'In progress',
                    setBy: 'Andres Morales',
                    dateUpdated: '05/1/21 3:20 PM',                            
                },
                {
                    status: 'Ready',
                    setBy: 'Andres Morales',
                    dateUpdated: '05/3/21 6:20 PM',                            
                },
            ], // status object object
            comments: [
                {
                    commentBy: 'Andres Morales',
                    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac mauris pretium, ultricies eros et, tempor urna',
                    dateAdded: '12/31/69 6:00 PM',
                },
                {
                    commentBy: 'Jose Vazquez',
                    comment: 'ris pretium, ultricies eros et, tempor urna',
                    dateAdded: '12/31/69 6:00 PM',
                },
                {
                    commentBy: 'Jose Vazquez',
                    comment: 'Lorem ipsum dolor sit amet, cons  Fusce ac mauris pretium, ultricies erectetur adipiscing elit. Fusce ac mauris pretium, ultricies eros et, tempor urna',
                    dateAdded: '1/77/25 2:00 PM',
                },
            ] // comments object
        }
    }
}

</script>

<style scoped>

</style>