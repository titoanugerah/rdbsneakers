
$(document).ready(function() {
  var currentOrder = 0;
  var nextOrder = 'getProduct('+1+')';
  var previousOrder = 'getProduct('+0+')';
  console.log(previousOrder);
  $('.select2basic').select2();
  $('#table1').DataTable();
  $('#previousData').attr('onclick', previousOrder);
  $('#nextData').attr('onclick', nextOrder);
  getDeletedProduct();
  getProduct();
});

$( "#search" ).on('change', function() {
  getProduct(currentOrder);
});


function getDeletedProduct() {
  $.ajax({
    type: "POST",
    dataType : "JSON",
    data: {
      Keyword: ""
    },
    url: "getProduct",
    success: function(result) {
      console.log('deleted',result);
      var html='<option value="0" selected>Silahkan Pilih</option>';
      for(i=0; i<result.product.length; i++){
        if (result.product[i].IsExist==0) {
          html +=
          '<option value="'+result.product[i].Id+'">'+result.product[i].Name+'</option>';
        } else {
          continue;
        }

      }
      $('#idRecoverProduct').html(html);
    },
    error: function(result) {
      alert('error');
    }
  });
}


function getDetailProduct(id) {
  $.ajax({
    type: "POST",
    dataType : "JSON",
    data: {Id: id},
    url: "getDetailProduct",
    success: function(result) {
      console.log(result);
      $("#detailProduct").modal('show');
      $('#nameProduct').val(result.detail.Name);
      $('#idProduct').val(result.detail.Id);
      $('#descriptionProduct').val(result.detail.Description);
      var html;
      for(i=0; i<result.product.length; i++){
        html +=
        '<tr>'+
        '<td>'+result.product[i].Name+'</td>'+
        '</tr>';
      }
      $('#productTableList').html(html);
    },
    error: function(result) {
      alert('error');
    }
  });
}


function deleteProduct() {
  $("#detailProduct").modal('hide');
  $.ajax({
    type: "POST",
    dataType : "JSON",
    data : {
      Id: $('#idProduct').val(),
      Email : $('#emailUser').val()
    },
    url: "deleteProduct",
    success: function(result) {
      getProduct();
      getDeletedProduct();
      notify('fa fa-user', result.title, result.message, result.type);
    },
    error: function(result) {
      console.log(result);
      alert('err');
    }
  });
}

function updateProduct() {
  $("#detailProduct").modal('hide');
  $.ajax({
    type: "POST",
    dataType : "JSON",
    data : {
      Id: $('#idProduct').val(),
      Name: $('#nameProduct').val(),
      Description : $('#descriptionProduct').val()
    },
    url: "updateProduct",
    success: function(result) {
      getProduct();
      notify('fa fa-user', result.title, result.message, result.type);
    },
    error: function(result) {
      console.log(result);
      alert('err');
    }
  });
}

function proceedAddProduct() {
  var urls = 'addProduct';
  $.ajax({
    type: "POST",
    dataType : "JSON",
    url: urls,
    data : {
      Name : $("#addNameProduct").val(),
      Description : $("#addDescriptionProduct").val()
    },
    success: function(result) {
      notify('fa fa-user', result.title, result.message, result.status);
    },
    error: function(result) {
      console.log(result);
      alert('err');
    }
  });
}

function proceedRecoverProduct(){
  $("#addProduct").modal('hide');
  $.ajax({
    type: "POST",
    dataType : "JSON",
    data : {
      Id: $('#idRecoverProduct').val()
    },
    url: "recoverProduct",
    success: function(result) {
      getProduct();
      getDeletedProduct();
      notify('fa fa-user', result.title, result.message, result.type);
    },
    error: function(result) {
      console.log(result);
      alert('err');
    }
  });
}

function getProduct(currentOrder) {
  console.log(currentOrder);
  $.ajax({
    type: "POST",
    dataType : "JSON",
    data: {
      Keyword: $('#search').val(),
      Order: currentOrder
    },
    url: "getProduct",
    success: function(result) {
      $('#nextData').attr('onclick', 'getProduct('+(currentOrder++)+')');
      $('#previousData').attr('onclick', 'getProduct('+(currentOrder--)+')');
      var html='';
      for(i=0; i<result.product.length; i++){
        if (result.product[i].IsExist==1) {
          html +=
          '<div class="col-sm-6 col-lg-3">' +
          '<div class="card">' +
          '<div class="card-body pt-2">' +
          '<h4 class="mb-1 fw-bold">' +
          result.product[i].Name +
          '</h4>' +
          '<br>' +
          '<center>' +
          '<button type="button" class="btn btn-secondary btn-round" onclick="getDetailProduct('+result.product[i].Id+')">Detail</button>'+
          '</center>' +
          '</div>' +
          '</div>' +
          '</div>';
        } else {
          continue;
        }

      }
      $('#productList').html(html);
    },
    error: function(result) {
      alert('error');
    }
  });
}
