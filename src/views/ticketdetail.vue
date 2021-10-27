<template>
  <div id="showTicket" class="container">
    <fieldset class="myform" style="margin:auto;">
      <legend>
        <span>Ticket details</span>
      </legend>
      <div class="divider"></div>
      <h3><div class="row">
        <div class="col-md-6">{{ updateData }}</div><div class="col-md-6">{{ commentData }}</div>
      </div></h3>
      

      <!----------------------- GENERAL DETAILS --------------------------------------->

      <form>
        <div class="row">
          <div class="col-md-6">
            <h3 class="clearwhite">
              <i class="fas fa-info-circle"></i> General Details
            </h3>
            <div class="form-group">
              <p class="control-label clearblack">
                <strong>Ticket number:</strong>
                {{ printTicketNumber(this.ticket._id.$oid) }}
              </p>
              <p class="control-label clearblack">
                <strong>Created by:</strong> {{ ticket.created_by.name }}
                {{ ticket.created_by.last_name }}
              </p>
              <p class="control-label clearblack">
                <strong>Description:</strong> {{ ticket.description }}
              </p>
              <p class="control-label clearblack">
                <strong>Status: </strong> {{ ticket.status.toUpperCase() }}
              </p>

              <p class="control-label clearblack">
                <strong>Client name:</strong> {{ ticket.client_id.client_name }}
                {{ ticket.client_id.client_last_name }}
              </p>
              <p class="control-label clearblack">
                <strong>Client phone:</strong> {{ ticket.client_id.client_phone }}
              </p>
              <p class="control-label clearblack">
                <strong>Client email:</strong> {{ ticket.client_id.client_email }}
              </p>
            </div>

            <!----------------------- STATUS UPDATE BLOCK ----------------------------------->
            <div class="form-group">
              <h3 class="clearwhite">
                <i class="fas fa-history"></i> Status update history (
                {{ ticket.status_updates.length }})
              </h3>
                    <form class="form-group">

                      <div class="input-group">
                        <select v-model="this.updateData.status" class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                          <option selected value="">Select a new status for the ticket and press OK...</option>
                          <option value="Open">Open</option>
                          <option value="Progress">Progress</option>
                          <option value="Ready">Ready</option>
                          <option value="Closed">Closed</option>
                        </select>
                        <button class="btn btn-outline-secondary font-weight-bold" type="button">Ok</button>
                      </div>

                    </form>
              <table class="mytable table table-responsive clearblack">
                <tr>
                  <th>Status</th>
                  <th>Employee name</th>
                  <th>Date set</th>
                </tr>
                <tr v-for="statusline in ticket.status_updates"
                  :key="statusline.status">
                  <template v-if="statusline.status_change">
                    <td>{{ statusline.status_change }}</td>
                    <td>
                      {{ statusline.created_by.name }}
                      {{ statusline.created_by.last_name }}
                    </td>
                    <td>{{ statusline.created.$date }}</td>
                  </template>
                </tr>
              </table>

              
            </div>
          </div>
          <div class="col-md-6" style="padding-left:40px">
            <h3 class="clearwhite">
              <i class="far fa-comments"></i> Comments Log ({{

                ticket.status_updates.length
              }})
            </h3>
            
            <!--------------------- COMMENTS ADD FORM ------------------------------>
                <form class="form-group" @submit.prevent="addComment(this.ticketID)">
                  <textarea maxlength="200"
                      v-model="this.commentData.comment"
                      id="txtNewComment"                 
                      class="form-control"
                      rows="2"              
                      placeholder="Write the content for a new posted note here..."
                    />
                    <div class=" text-end control-label">
                      <button type="button" class="btn btn-outline-secondary font-weight-bold"><i class="fas fa-comment-alt"></i> Post note</button>
                    </div>
                </form>
       
            <!--------------------- COMMENTS LIST ------------------------------>
            <ul class="commentlist">
              <template
                class="clearblack control-label"
                v-for="commline in ticket.status_updates"
                :key="commline.created.$date">
                <div v-if="commline.comment">
                <li>
                    <p class="commentdesc clearblack">
                      <strong>{{ commline.created_by.name }}
                        {{ commline.created_by.last_name }}</strong> on {{ commline.created.$date }}
                    </p>
                    <p class="comment">{{ commline.comment }}</p>
                </li>
                </div>
              </template>
            </ul>

          </div>
        </div>
      </form>
    </fieldset>
  
 
  </div>
</template>
<script>
import axios from "axios";

export default {
  
  props: ["ticketID"],
  data() {
    return {
      ticket: [],
      updateData: {
        'status': ''
      },
      commentData: {
        'comment': ''
      },
      errorMsg: "",
      successMsg: "",
    }
  },
  created() {
      this.loadTicket(this.ticketID)
  },
  methods: 
  {
      printTicketNumber(id) {
        this.ticketNumber = "";
        this.i = 0;

        while (this.i < 7) {
          this.ticketNumber += id[this.i];
          this.i++;
        }
        return this.ticketNumber;
      },
      loadTicket(id) {
        axios
        .get(
          "https://2ktpylu8p5.execute-api.us-east-2.amazonaws.com/dev/api/v1/ticket_full/" +
            id
        )
        .then((response) => {
          console.log(response.data);
          this.ticket = response.data;
        })
        .catch((error) => {
          console.log(error),
            (this.errorMsg =
              "There was an error loading this ticket. Try again!");
        });
      },
      addComment(id)  {
        console.log('Comment passed');
        axios.put('https://2ktpylu8p5.execute-api.us-east-2.amazonaws.com/dev/api/v1/ticket/' + id, this.commentData)
                 .then(
                     response => {
                         console.log('Adding comment to #' + id + '...');
                         console.log(response);
                         console.log(this.commentData);                   
                         this.commentData.comment = '';
                         this.loadTicket(id);
                         return;
                     })
                 .catch(
                     error => {
                         console.log(error),
                         this.errorMsg = 'Error adding comment'
                     })
      }
  }
}

</script>

<style scoped>
.commentdesc {
  font-size: 12px;
  padding: 10px;
  color: #ccc;
}

ul.commentlist {
  list-style: none;
  list-style-image: none;
  list-style-type: none;
  margin: 0 !important;
  padding-inline-start: 0 !important;
  color: white;
}

ul.commentlist li {
  padding: 10px;
  border-bottom: 1px dotted #666;
}

ul.commentlist li:last-child {
  border: 0;
}

ul.commentlist li > p {
  margin: 0;
}

ul.commentlist li > p.comment {
  padding: 10px;
}

 .btn {
   color:white;
 }
</style>