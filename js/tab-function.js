jQuery(document).ready(function(){
			jQuery('ul.k2b-tabs').each(function(){
			  // For each set of tabs, we want to keep track of
			  // which tab is active-k2b-tab and it's associated content
			  var $active, $content, $links = jQuery(this).find('a');
			
			  // If the location.hash matches one of the links, use that as the active-k2b-tab tab.
			  // If no match is found, use the first link as the initial active-k2b-tab tab.
			  $active = jQuery($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
			  $active.addClass('active-k2b-tab');
			  $content = jQuery($active.attr('href'));
			
			  // Hide the remaining content
			  $links.not($active).each(function () {
				jQuery(jQuery(this).attr('href')).hide();
			  });
			
			  // Bind the click event handler
			  jQuery(this).on('click', 'a', function(e){
			  
			  	// Make the old tab inactive.
				$active.removeClass('active-k2b-tab');
				$content.hide();
			
				// Update the variables with the new link and content
				$active = jQuery(this);
				$content = jQuery(jQuery(this).attr('href'));
			
				// Make the tab active.
				$active.addClass('active-k2b-tab');
				$content.fadeIn(800);
			
				// Prevent the anchor's default click action
				e.preventDefault();
			  });
			});
		});	