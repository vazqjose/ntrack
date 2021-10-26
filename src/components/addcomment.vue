<template>
  <!-- Modal ADD COMMENT -->

  <div class="modal fade" id="modalAddComment" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <form class="modal-content mymodal" @submit.prevent="checkForm">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add a new comment</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <textarea
              id="txtNewComment"
              type="text"
              name="txtNewComment"
              class="form-control"
              rows="5"
              line
              placeholder="Write down your comment here"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            <i class="far fa-times-circle"></i> Close
          </button>
          <button
            id="btnAddComment"
            type="button"
            class="btn btn-dark"
            data-bs-dismiss="modal"
          >
            <i class="fas fa-comment-medical"></i> OK
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    name: 'addComment'
};
</script>

<style scoped></style>
