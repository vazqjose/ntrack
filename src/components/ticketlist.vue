<template>
  <div class="container" style='margin-top:3%'>


    <template v-if="tickets.length > 0">

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

    <table class="table table-striped table-responsive ticketlist">
      <tr>
        <th width="5%">&nbsp;</th>
        <th width="10%">Ticket #</th>
        <th width="20%">Client name</th>
        <th width="10%">Status</th>
        <th>Description of issue</th>
        <th width="15%">Last Updated</th>
      </tr>
      <tr
        v-for="ticket in tickets" :key="ticket.ticketID">
        
        <td>
          <button class="btn btn-light whitehover"
            ><i class="far fa-file-alt"></i></button>
        </td>
        <td>{{ ticket.ticketID }}</td>
        <td>{{ ticket.clientName }}</td>
        <td>{{ ticket.status }}</td>
        <td>{{ ticket.description }}</td>
        <td>{{ ticket.lastUpdated }}</td>
        </tr>
    </table>
    </template>
    <template v-else>
        <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
              No tickets have been entered yet <strong>yikes!</strong>              
            </div>
    </template>

  </div>
</template>

<script>
export default {
  name: "ticketList",
  data() {
      return {
          tickets: [
                {
                ticketID: "465456",
                clientName: "John Doe",
                status: "In progress",
                description: "Equipment does not connect",
                lastUpdated: "2/31/2021 6:00 PM",
                },
                {
                ticketID: "787999",
                clientName: "Some guy",
                status: "Open",
                description: "Routine maintenance",
                lastUpdated: "2/3/2021 6:00 PM",
                },
                {
                ticketID: "465456",
                clientName: "John Doe",
                status: "In progress",
                description: "Account issues",
                lastUpdated: "2/31/2021 6:00 PM",
                },
                {
                ticketID: "787999",
                clientName: "Some guy",
                status: "Open",
                description: "Routine maintenance",
                lastUpdated: "2/3/2021 6:00 PM",
                },
                {
                ticketID: "465456",
                clientName: "John Doe",
                status: "In progress",
                description: "Equipment does not connect",
                lastUpdated: "2/31/2021 6:00 PM",
                },
                {
                ticketID: "787999",
                clientName: "Some guy",
                status: "Open",
                description: "Routine maintenance",
                lastUpdated: "2/3/2021 6:00 PM",
                },
                {
                ticketID: "465456",
                clientName: "John Doe",
                status: "In progress",
                description: "Equipment does not connect",
                lastUpdated: "2/31/2021 6:00 PM",
                },
                {
                ticketID: "787999",
                clientName: "Some guy",
                status: "Open",
                description: "Routine maintenance",
                lastUpdated: "2/3/2021 6:00 PM",
                },
                {
                ticketID: "465456",
                clientName: "John Doe",
                status: "In progress",
                description: "Equipment does not connect",
                lastUpdated: "2/31/2021 6:00 PM",
                },
                {
                ticketID: "787999",
                clientName: "Some guy",
                status: "Open",
                description: "Routine maintenance",
                lastUpdated: "2/3/2021 6:00 PM",
                },
            ]  
      };
  }
  
};
</script>

<style scoped src="../assets/css/ticketlist.css"></style>
