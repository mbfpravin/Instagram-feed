<?php
/**
 * Plugin Name: Instagram Feeds
 * Plugin URI: https://sample.com/
 * Description: Display Instagram posts from your Instagram accounts.
 * Version: 1.0
 * Author: Pravin and Prakash
****/

     // create custom plugin settings menu
    add_action('admin_menu', 'insta_plugin_settings');
	function insta_plugin_settings() {
		$themepage = add_theme_page('Instagram settings', 'Instagram settings', 'administrator','insta-settings', 'insta_settings_form');
		
		//call register settings function
		add_action( 'admin_init', 'register_insta_plugin_settings' );
		add_action('admin_print_styles-' . $themepage, 'site_settings_admin_style');
	}
	function register_insta_plugin_settings(){
		$settings_val = array('insta_user_name');

		foreach($settings_val as $set )
			register_setting( 'common-settings-group', $set );
	}

	function site_settings_admin_style(){
		wp_enqueue_style('jquery-style', '//ajax.googleapis.com/ajax/libs/jqueryui/1.8.2/themes/smoothness/jquery-ui.css');
		wp_enqueue_style('farbtastic');
		wp_enqueue_style( 'wp-color-picker');
		wp_enqueue_style('thickbox');
		wp_enqueue_style( 'instagram_feed', plugin_dir_url( __FILE__ ) . '/css/admin-style.css' );
		wp_enqueue_script('jquery');
		wp_enqueue_script('media-upload');
		wp_enqueue_media();
	}


	function insta_settings_form(){

?>
		<div class="wrap">
		<p style="text-align: center;"><a href="javascript:void(0)" target="_blank"><img src="<?php echo plugins_url('instagram_feed/images/minions.jpg');?>" style="text-align: center;height: 83px!important;"></a></p>

		<form class="site-setting-form" method="post" id="point-settings" name="common-settings" action="options.php">
				<?php settings_fields('common-settings-group');?>
					<div class="settings-container">
						<ul class='k2b-tabs'>              
					 		<li><a href="#k2b-tab4"><span class="dashicons dashicons-businessman"></span> Settings</a></li>
						</ul>

						<div class="set_tab">
						<div id="k2b-tab4" class="tab-wrapper">
			              <h2>Admin mail</h2>
			              	<table class="form-table">
			                   <?php
			   							 echo get_plugin_input('text', 'insta_user_name', 'Instagram Username', get_option('insta_user_name'), '');
			                  ?>
			                </table>
			                <p class="submit" style=" text-align: center;"><input type="submit" class="button-primary" value="<?php _e('Save Changes') ?>" name="submit-settings" /></p>
							</div>
						</div>
				</div>
			</form>
<div id="instagram-feed" class="instagram_feed"> </div>

	</div>
<?php } 

if (!function_exists('get_plugin_input')) {
	function get_plugin_input($type = 'text', $name = '', $label = 'Label', $value = '', $help_words = '', $other_values = '', $inp_id = ''){
		$help = ($help_words != '')?'<br/><span class="description">('.$help_words.')</span>':'';
		$ins = ($inp_id != '')?'id="'.$inp_id.'"':'';
		$return = '';
		switch ($type) {
			case "text":
				$return .= '<tr valign="top"><th scope="row"><label>'.$label.'</label>'.$help.'</th><td><input class="regular-text" type="text" '.$ins.' name="'.$name.'"  value="'.$value.'"/></td></tr>';
			break;
			

			
			default:
				$return .= '<tr valign="top"><th scope="row"><label>'.$label.'</label>'.$help.'</th><td><input class="regular-text" type="text" name="'.$name.'"  value="'.$value.'"/></td></tr>';
			break;
		}
		return $return;
	}
}

?>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript">
$(function(e) {
    var l = {
        cors_proxy: "https://cors-anywhere.herokuapp.com/https://www.instagram.com/",
        username: "",
        container: "",
        display_profile: !0,
        display_biography: !0,
        display_gallery: !0,
        get_raw_json: !1,
        callback: null,
        styling: !0,
        items: 8,
        items_per_row: 4,
        margin: .5
    };
    e.instagramFeed = function(b) {
        b = e.fn.extend({}, l, b);
        "" == b.username && "" == b.tag ? console.log("Instagram Feed: Error, no username or tag found.") : b.get_raw_json || "" != b.container ? b.get_raw_json && null == b.callback ? console.log("Instagram Feed: Error, no callback defined to get the raw json") :
            e.ajax({
                url: b.cors_proxy + b.username,
                type: "GET",
                beforeSend: function(a) {
                    a.setRequestHeader("x-requested-with", "instagram.com")
                },
                success: function(a) {
                    a = a.split("window._sharedData = ");
                    a = a[1].split("\x3c/script>");
                    a = a[0];
                    a = a.substr(0, a.length - 1);
                    a = JSON.parse(a);
                    a = a.entry_data.ProfilePage[0].graphql.user;
                    if (b.get_raw_json) b.callback(JSON.stringify({
                        id: a.id,
                        username: a.username,
                        full_name: a.full_name,
                        is_private: a.is_private,
                        is_verified: a.is_verified,
                        biography: a.biography,
                        followed_by: a.edge_followed_by.count,
                        following: a.edge_follow.count,
                        images: a.edge_owner_to_timeline_media.edges
                    }));
                    else {
                        var d = "",
                            f = "",
                            g = "",
                            h = "",
                            k = "";
                        var c = "";

                        if (b.display_gallery)
                            if (a.is_private) c += "<p class='instagram_private'><strong>This profile is private</strong></p>";
                            else {
                                a = a.edge_owner_to_timeline_media.edges;
                                max = a.length > b.items ?
                                    b.items : a.length;
                                c += "<div>";
                                for (d = 0; d < max; d++) c += "<a href='https://www.instagram.com/p/" + a[d].node.shortcode + "' target='_blank'>", c += "\t<img src='" + a[d].node.thumbnail_src + "' alt='" + b.username + " instagram image " + d + "'" + k + " />", c += "</a>";
                                c += "</div>"
                            } e(b.container).html(c)
                    }
                }
            }) : console.log("Instagram Feed: Error, no container found.")
    }
});



</script>
  <script type="text/javascript">
    $(function($){
      $(window).on('load', function(){        
        $.instagramFeed({
          'cors_proxy': "https://cors-anywhere.herokuapp.com/https://www.instagram.com/",
          'username': 'ramzee_23',
          'container': "#instagram-feed",
          'display_gallery': true,
          'get_raw_json': false,
          'callback': null,
          'styling': true,
          'items': 8,
          'items_per_row': 4,
          'margin': 1
        }); 
        

      });
    });
  </script>
