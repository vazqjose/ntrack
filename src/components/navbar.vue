<template>
<div>
    <div class="navbar navbar-expand-lg clearwhite">
    <div class="container">
        <a class="navbar-brand textwhite" href="#">
          <p class='brandname'>NTrack</p>
          <p class="tagline">This is our awesome tagline</p>
        </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fas fa-sliders-h"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li><a class="btn btn-outline-success me-2 newticket" href="#">
                <i class="fas fa-clipboard-check"></i> Create new ticket</a>
              </li>
        </ul>
        <ul class="nav navbar-nav">
            <li>
                <div class="form-group has-search">
                    <span class="fa fa-search form-control-feedback"></span>
                    <input id="txtTicketID" type="text" class="form-control" placeholder="Search ticket number">
                  </div>
                </li>
                <li style='margin-right: 30px;'>&nbsp;</li>
            <li class="nav-item dropdown dropdown-menu-right">
                    <a class="nav-link dropdown-toggle btn btn-dark  textwhite" href="#" role="button" data-bs-toggle="dropdown">
                        <i class="fas fa-sliders-h"></i>
                    </a>
                    <ul class="dropdown-menu loggedUser">
                        <li>
                        <div class="userInfo">
                            <p class='name' id="loggedUser"><i class="fas fa-user"></i> Staff Name</p>
                            <p class='email' id="loggedEmail">user@somedomain.com</p>
                        </div>
                        </li>
                        <li><a class="dropdown-item" href="#">Admin settings</a></li>
                        <li><a class="dropdown-item" href="#">Manage staff accounts</a></li>         
                        <li><a class="dropdown-item" href="#">Profile settings</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#"><i class="fas fa-sign-out-alt"></i> Sign out</a></li>
                    </ul>
            </li>
        </ul>
        </div>
      </div>
</div>

</div>
</template>

<script>
    export default {
        name: 'navBar'
    }
</script>

<style scoped>

</style>