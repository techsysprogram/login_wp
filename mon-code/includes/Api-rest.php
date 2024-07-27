<?php

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}


// Inclure le fichier de clé API
include_once 'api-key.php';

class Mon_Plugin_API {

    private $api_key;

    public function __construct() {
        $this->api_key = MY_API_KEY;
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes() {
        register_rest_route('/v1', '/userid', array(
            'methods'  => 'GET',
            'callback' => array($this, 'hello_world'),
        ));
    }

    public function hello_world($request) {
        // Récupérer le paramètre 'username' de la requête
        $username = $request->get_param('username');

        if (empty($username)) {
            // Vérifier si le paramètre username est vide ou null
            $response = array('message' => 'username = null');
            return new WP_REST_Response($response, 200);
        }

        $user_info = $this->get_user_info_by_username($username);

        if ($user_info) {
            $response = array(
                'Username' => esc_html($username),
                'is_super_admin' => $user_info->is_super_admin,
                'user_id' => esc_html($user_info->id)
            );
        } else {
            $response = array('message' => 'User not found');
        }

        return new WP_REST_Response($response, 200);
    }

    private function get_user_info_by_username($username) {
        $url = "https://www.react.techsysprogram.com/wp-json/wp/v2/users?search=" . urlencode($username);

        // Configurez l'en-tête d'autorisation avec le jeton
        $args = array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $this->api_key
            )
        );

        $response = wp_remote_get($url, $args);

        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body);

        if (empty($data) || !is_array($data)) {
            return null;
        }

        // Assuming the first match is the user we want
        return (object) array(
            'id' => $data[0]->id,
            'is_super_admin' => (bool) $data[0]->is_super_admin
        );
    }
}

new Mon_Plugin_API();
