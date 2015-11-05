## Overview

Welcome to the the Tableau Style Guide! This style guide is a curated collection
of components used to build websites and pages with the Tableau corporate brand.
Explore the style guide with the navigation on the left to find working examples
of components as well as any variations (modifiers) and markup examples. 

Please note that this is a living style guide which automatically reflects
the latest updates and additions. Components will occasionally be updated, 
added, and possibly even removed. 

![](https://media.giphy.com/media/xTiTnHMbep19cuNnoY/giphy.gif)

## Installation

#### Download the Assets

Download a zip of the assets [here](/tableau-components.zip).

#### Include CSS in &lt;head&gt;

<div class="kss-markup">
<pre class="prettyprint lang-html"><code>&lt;link rel="stylesheet" href="/build/vendor/slick.js/slick/slick.css" media="all" /&gt;
&lt;link rel="stylesheet" href="/build/vendor/slick.js/slick/slick-theme.css" media="all" /&gt;
&lt;link rel="stylesheet" href="/build/css/style.css" media="all" /&gt;
</code></pre>
</div>

#### Other Requirements in &lt;head&gt;

<div class="kss-markup">
<pre class="prettyprint lang-html"><code>&lt;meta charset="UTF-8"&gt;
&lt;!-- Ensures proper page width and zoom level on mobile devices --&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1" /&gt;
&lt;!-- Tableau Sparkle favicon --&gt;
&lt;link rel="icon" href="/build/images/favicon.ico" type="image/x-icon" /&gt;
&lt;!-- Web Fonts - New domains will need to be requested to be whitelisted --&gt;
&lt;link href="//cloud.webtype.com/css/22656ecb-3391-46f0-80ba-dce1b9624199.css" rel="stylesheet" type="text/css" /&gt;
&lt;link href='//fonts.googleapis.com/css?family=Merriweather:300italic,300,700,700italic' rel='stylesheet' type='text/css'&gt;</code></pre>
</div>


#### Scripts at Bottom of HTML

We concatenate most of our third-party plugins and scripts into a `vendor.js` 
file, but keep jQuery and jQuery UI separate in case your system already 
includes them. 

<div class="kss-markup">
<pre class="prettyprint lang-html"><code>&lt;script src="build/vendor/jquery/dist/jquery.min.js"&gt;&lt;/script&gt;
&lt;script src="build/vendor/jquery-ui/jquery-ui.min.js"&gt;&lt;/script&gt;
&lt;script src="build/js/vendor.js"&gt;&lt;/script&gt;
&lt;script src="build/js/scripts.js"&gt;&lt;/script&gt;</code></pre>
</div>

## Usage

Once all the assets above are included on the page/site, all of the components
described in this style guide should work out of the box. If you're working with
static markup on a page, it's as simple as copying the markup example from the 
style guide and updating with your content. 

Applying styles to an existing 
system takes a bit more work, however. Essentially classes and DOM will need to 
be modified in any generated markup so that they match the structure and classes
of the component in the style guide. 

Alternatively, if the system being integrated doesn't easily allow for inserting
classes where needed or doesn't allow for manipulation of HTML output, there's 
some more involved options that involve customizing the component library. For
more information on this, see the Development section below and the linked 
developemnt documentation.

## Development
See the project [README](https://github.com/tableau-mkt/components#tableau-components)
for development guidelines for working with the style guide. If you don't have 
access, please request it from [marketing-webteam@tableau.com](mailto:marketing-webteam@tableau.com).
