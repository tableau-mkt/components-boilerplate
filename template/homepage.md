## Overview

Welcome to the the Tableau Style Guide! This style guide is a curated collection
of components used to build websites and pages with the Tableau corporate brand.
Explore the style guide with the navigation on the left to find working examples
of components as well as any variations (modifiers) and markup examples. 

Please note that this is a living style guide which automatically reflects
the latest updates and additions. Components will occasionally be updated, 
added, and possibly even removed. 

![](https://media.giphy.com/media/xTiTnHMbep19cuNnoY/giphy.gif)

## Usage

### Initial Setup

In order to start using the styles and components available in the style guide, 
the following need to be included on each page:

##### HTML &lt;head&gt;

<div class="kss-markup">
<pre class="prettyprint lang-html"><code>&lt;meta charset="UTF-8"&gt;
&lt;!-- Ensures proper page width and zoom level on mobile devices --&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1" /&gt;
&lt;!-- CSS assets. Slick stylesheets are only required for slideshows --&gt;
&lt;link rel="stylesheet" href="/build/bower/slick.js/slick/slick.css" media="all" /&gt;
&lt;link rel="stylesheet" href="/build/bower/slick.js/slick/slick-theme.css" media="all" /&gt;
&lt;link rel="stylesheet" href="/build/css/style.css" media="all" /&gt;
&lt;!-- Tableau Sparkle favicon --&gt;
&lt;link rel="icon" href="/build/images/favicon.ico" type="image/x-icon" /&gt;
&lt;!-- Web Fonts - New domains will need to be requested to be whitelisted --&gt;
&lt;link href="//cloud.webtype.com/css/22656ecb-3391-46f0-80ba-dce1b9624199.css" rel="stylesheet" type="text/css" /&gt;
&lt;link href='//fonts.googleapis.com/css?family=Merriweather:300italic,300,700,700italic' rel='stylesheet' type='text/css'&gt;</code></pre>
</div>


##### Bottom of HTML document

The following libraries and scripts are needed for specific interactive 
conponents to function properly. `jquery.min.js` and `scripts.js` are required
as these are necessary for much of the basic interactive functionality.

<div class="kss-markup">
<pre class="prettyprint lang-html"><code>&lt;script src="build/bower/jquery/dist/jquery.min.js"&gt;&lt;/script&gt;
&lt;script src="build/bower/jquery-ui/jquery-ui.min.js"&gt;&lt;/script&gt;
&lt;script src="build/bower/slick.js/slick/slick.min.js"&gt;&lt;/script&gt;
&lt;script src="build/bower/hoverintent/jquery.hoverIntent.js"&gt;&lt;/script&gt;
&lt;script src="build/bower/waypoints/lib/jquery.waypoints.min.js"&gt;&lt;/script&gt;
&lt;script src="build/bower/waypoints/lib/shortcuts/sticky.min.js"&gt;&lt;/script&gt;
&lt;script src="build/bower/waypoints/lib/shortcuts/inview.min.js"&gt;&lt;/script&gt;
&lt;script src="build/bower/matchMedia/matchMedia.js"&gt;&lt;/script&gt;
&lt;script src="build/bower/underscore/underscore-min.js"&gt;&lt;/script&gt;
&lt;script src="build/js/scripts.js"&gt;&lt;/script&gt;</code></pre>
</div>

### Using Components
# @TODO this section


## Development
See the project [README](https://github.com/tableau-mkt/components#tableau-components)
for development guidelines for working with the style guide. If you don't have 
access, please request it from [marketing-webteam@tableau.com](mailto:marketing-webteam@tableau.com).
