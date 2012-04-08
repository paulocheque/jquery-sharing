

(function($) {

	$.fn.Sharing = function(options) {
		var properties = $.extend({}, $.fn.Sharing.defaults, options);

		function add_text(div, text) {
			code = "<span class='sharing_text'>" + text + "</span>";
			div.append(code);
		}

		function add_link(div, name, link, image) {
			code = "<a href='" + link + "' class='sharing_link' target='_blank'>" +
						"<img src='" + image + "' title='" + name + "' alt='" + name + "' class='sharing_image'/>" +
					"</a>";
			div.append(code);
		}
		
		function configure_link(original_link, url, image, title) {
    		link = original_link.replace(/WEBSITE/, url);
    		link = link.replace(/IMAGE/, properties.image);
    		link = link.replace(/TITLE/, properties.title);
    		return link;
		}

        return this.each(function(index) {
        	div = $(this);
        	add_text(div, properties.text);
        	links = properties.links.split(',');

        	for(i = 0; i < links.length; i++) {
        		try {
	        		website = $.fn.Sharing.websites[links[i]];
	        		if(properties.url == '') {
	        			url = window.location;
	        		}
	        		else {
	        			url = properties.url;
	        		}
	        		original_link = website.link;
					link = configure_link(original_link, url, properties.image, properties.title);
	        		add_link(div, website.name, link, properties.image_dir + website.image);
	        	} catch(error) {
	        	}
        	}
        });

    }; 
    
	$.fn.Sharing.defaults = {
		'text': 'Sharing: ',
		'links': 'facebook,delicious,googlebookmarks,twitter,orkut,linkedin,digg,live',
		'image_dir': '/img/sharing/',
		'url': '', // default is the current url
		'image': '', // default is without image. Just some websites support images
		'title': '' // default is blank. Just some websites support titles
	};
	
	$.fn.Sharing.websites = {
	 	'facebook': { name: 'Facebook', image: 'facebook.gif', link: 'http://www.facebook.com/share.php?u=WEBSITE' },
		'delicious': { name: 'Del.icio.us', image: 'delicious.gif', link: 'http://del.icio.us/post?url=WEBSITE' },
		'googlebookmarks': { name: 'Google Bookmarks', image: 'google.gif', link: 'http://www.google.com/bookmarks/mark?op=edit&bkmk=WEBSITE&title=TITLE' },
		'twitter': { name: 'Twitter', image: 'twitter.gif', link: 'http://twitter.com/?status=TITLE:WEBSITE' },
		'orkut': { name: 'Orkut', image: 'orkut.gif', link: 'http://promote.orkut.com/preview?nt=orkut.com&du=WEBSITE&tn=IMAGE&tt=TITLE' },
		'linkedin': { name: 'LinkedIn', image: 'linkedin.gif', link: 'http://www.linkedin.com/shareArticle?mini=true&url=WEBSITE' },
		'digg': { name: 'Digg', image: 'digg.gif', link: 'http://digg.com/submit?phase=2&url=WEBSITE' },
		'yahoo': { name: 'Yahoo!', image: 'yahoo.gif', link: 'http://myweb2.search.yahoo.com/myresults/bookmarklet?u=WEBSITE' },
		'live': { name: 'Windows Live', image: 'live.gif', link: 'https://favorites.live.com/quickadd.aspx?marklet=1&mkt=en-us&url=WEBSITE' }
	}
    
})(jQuery);
