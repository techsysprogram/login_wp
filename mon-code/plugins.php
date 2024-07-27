<?php
/*
Plugin Name: Api techsysprogram
Description: Créer des produits sur un autre site via l'API WooCommerce
Author: techsysprogram
Version: 1.1
Plugin URI: https://www.techsysprogram.com/
Author URI: https://www.techsysprogram.com/
*/

if (!defined('ABSPATH')) {
    exit;
}

/* require_once('wp/login.php'); */

// Inclure le fichier contenant les endpoints de l'API
require_once plugin_dir_path( __FILE__ ) . 'includes/Api-rest.php';

// Initialiser le plugin
function mon_plugin_api_init() {
    new Mon_Plugin_API();
}
add_action( 'plugins_loaded', 'mon_plugin_api_init' );


