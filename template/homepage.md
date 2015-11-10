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

All assets including styles, javascript, and other files are packaged up in a 
ZIP file. The ZIP will decompress into a `build` folder. If you rename this when
adding it to your environment, make sure to update all paths below to be 
relative to the renamed folder rather than `/build/`.

<p class="kss-example-preview">
  <a href="tableau-components.zip" class="cta">Download</a>
</p>

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
style guide and updating with your content. To get a basic page layout going, 
check out the [Basic Page Layout](section-layout.html#kssref-layout-basic-page)
component.

Applying styles to an existing system takes a bit more work, however. 
Essentially classes and DOM will need to be modified in any generated markup so 
that they match the structure and classes of the component in the style guide. 

Alternatively, if the system being integrated doesn't easily allow for inserting
classes where needed or doesn't allow for manipulation of HTML output, there's 
some more involved options that involve customizing the component library. For
more information on this, see the Development section below and the linked 
developemnt documentation.

## Release Notes & Bug Reports

When we release new features, bug fixes, or any other changes to this project,
we provide notes detailing all changes made. Use these to inform your testing
as you update to the latest version.  Release notes live in the [Release Notes]
(https://github.com/tableau-mkt/components/releases) section on GitHub.

All bug reports, feature requests, and issue tracking are handled through the 
[Issue Queue](https://github.com/tableau-mkt/components/issues) on GitHub. 
Please feel free to submit anything you find to the issue queue; we will 
monitor and provide fixes where needed.

If you don't have access to the GitHub repo yet, request it from 
[marketing-webteam@tableau.com](mailto:marketing-webteam@tableau.com?subject=COmponent%20Library%20Access).

## Development

See the project [README](https://github.com/tableau-mkt/components#tableau-components)
for development guidelines for working with the style guide. If you don't have 
access, please request it from [marketing-webteam@tableau.com](mailto:marketing-webteam@tableau.com?subject=COmponent%20Library%20Access).
