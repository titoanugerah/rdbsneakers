<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * General Controller are open for any users
 */
class General extends CI_Controller
{

  function __construct()
  {
    parent::__construct();
    $this->load->model('general_model');
    error_reporting(1);
  }

  public function index()
  {
//    var_dump($this->general_model->ContentHome());die;
    $this->load->view('general/home', $this->general_model->ContentHome());
  }

  public function login()
  {

  }

  public function logout()
  {
    $this->session->sess_destroy();
    redirect(base_url());
  }
}


 ?>
