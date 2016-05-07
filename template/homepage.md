## Overview

Welcome to the the Style Guide! This style guide is a curated collection
of components used to build websites and pages with the a unified style and brand.
Explore the style guide with the navigation on the left to find working examples
of components as well as any variations (modifiers) and markup examples.

![](https://media.giphy.com/media/xTiTnHMbep19cuNnoY/giphy.gif)

## Installation

#### Download the Assets

All assets including styles, javascript, and other files are packaged up in a
ZIP file. The ZIP will decompress into a `build` folder. If you rename this when
adding it to your environment, make sure to update all paths below to be
relative to the renamed folder rather than `/build/`.

<p class="kss-example-preview">
  <a href="styleguide.zip" class="cta">Download</a>
</p>

#### Include CSS in &lt;head&gt;

<div class="kss-markup">
<pre class="prettyprint lang-html"><code>&lt;link rel="stylesheet" href="/build/vendor/slick.js/slick/slick.css" media="all" /&gt;
&lt;link rel="stylesheet" href="/build/css/style.min.css" media="all" /&gt;
</code></pre>
</div>

#### Other Requirements in &lt;head&gt;

<div class="kss-markup">
<pre class="prettyprint lang-html"><code>&lt;meta charset="UTF-8"&gt;
&lt;!-- Ensures proper page width and zoom level on mobile devices --&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1" /&gt;
&lt;!-- favicon --&gt;
&lt;link rel="icon" href="/build/images/favicon.ico" type="image/x-icon" /&gt;
</code></pre>
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
development documentation.

## Encapsulated styles

If, for some reason, the style guide styles interfere with existing base styles
on the platform the style guide is being integrated on and only certain regions
of the page use components from the style guide, the included
`styles.encapsulated.css` can be used. This will allow you to specify particular
regions of the site such as the global navigation area where style guide styles
are applied rather than including the styles globally on the site.

We strongly encourage integrating the full style guide as described above in
order to guarantee more consistency between platforms. This encapsulated version
should only be used when absolutely required in order not to break existing
styles that are still necessary.

### Usage
* Include the encapsulated stylesheet rather than the base style.css
<div class="kss-markup">
<pre class="prettyprint lang-html"><code>&lt;link rel="stylesheet" href="/build/css/style.encapsulated.min.css" media="all" /&gt;
</code></pre>
</div>
* If the components being used have a javascript component (such as global
navigation), include the javascript files above as well.
* In order to specify a region of the page that inherits style guide styles,
wrap the region in a div with a `encapsulated-styles` class. Example:
<div class="kss-markup">
<pre class="prettyprint lang-html"><code>&lt;div class="encapsulated-styles"&gt;
    &lt;div class="global-nav"&gt;
      &lt;!-- Global Nav Component markup here --&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code></pre>
</div>

**Note:** The `encapsulated-styles` wrapper must be a *wrapper around* any components
rather than a class added to a component itself.
