<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 *
 */
class management extends CI_Controller
{

  function __construct()
  {
    parent::__construct();
    $this->load->model('management_model');
    error_reporting(1);
  }

  public function Dashboard()
  {
    $this->load->view('management/template', $this->management_model->ContentDashboard());
  }

  public function Profile()
  {
    $this->load->view('management/template', $this->management_model->ContentProfile());    
  }
}

 ?>
