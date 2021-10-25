<template>
  <div class="container">
    <template v-if="tickets.length > 0">
      <h5 class="text-center clearblack">{{ tickets.length }} tickets in total</h5>
<!--
    <div class="dropdown text-end filterMenu">
      <a
        class="btn btn-dark dropdown-toggle font-weight-bold"
        href="#"
        role="button"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Total current tickets (12)
      </a>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <li><a class="dropdown-item" href="#">Open (15)</a></li>
        <li><a class="dropdown-item" href="#">In Progress (11)</a></li>
        <li><a class="dropdown-item" href="#">Closed (45)</a></li>
      </ul>
    </div>
-->
    <table class="table table-striped table-responsive ticketlist">
      <tr class="tableheading">
        <th width="5%">&nbsp;</th>
        <th width="10%">Ticket #</th>
        <th width="20%">Client name</th>
        <th width="10%">Status</th>
        <th>Description of issue</th>
        <th width="15%">Last Updated</th>
      </tr>
      
      <tr
        v-for="ticket in tickets" :key="ticket._id">        
        <td>

          <router-link :to="{ name: 'ticketDetail', params: { ticketID: ticket._id.$oid } }" class="btn btn-light whitehover">
            <i class="far fa-file-alt"></i>
          </router-link>
        </td>
        <td>{{ printTicketNumber(ticket._id.$oid) }}</td>
        <td>{{ ticket.client_id.name}} {{ ticket.client_id.last_name}}</td>
        <td>{{ ticket.status.toUpperCase() }}</td>
        <td>{{ ticket.description }}</td>
        <td>{{ ticket.updated_at.$date }}</td>
        </tr>

    </table>
    </template>
    <template v-else>
        <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
              <strong>Error </strong>retrieving list
            </div>
    </template>

  </div>
</template>

<script>    
    import axios from 'axios';

    export default 
    {
        name: 'ticketList',
        components: {
           
        },
        created() {
             this.listTickets()
        },
        data() {
            return {
                tickets: [],
                errorMsg: ''
            }
        },
        methods: {
            listTickets() {
                axios.get('https://2ktpylu8p5.execute-api.us-east-2.amazonaws.com/dev/api/v1/ticketsfull')
                .then((response) => {
                    console.log(response.data)
                    this.tickets = response.data
                })
                .catch((error) => {
                    console.log(error),
                    this.errorMsg = 'There was an error getting the list.  Try later!'
                })
            },
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
    }
</script>

<style scoped src="../assets/css/ticketlist.css"></style>
