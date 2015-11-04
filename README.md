# Tableau Components

A component library and automated style guide based on the Tableau corporate 
brand. This README focuses on development within the component library. See the 
overview page of the generated styleguide (demo below) for usage instructions
and guidelines.

### [Style Guide Demo](http://tableau-mkt.github.io/components/styleguide/)

## Getting started

Clone this repo (or a fork of it) to your local machine for development. Once
you have a local instance of the repo, install development and front-end 
dependencies
```
$ npm install
$ bower install
``` 

### Development workflow
This project uses Grunt to run build and setup process such as sass globbing and
building the kss-node style guide. While developing components, run grunt watch 
to have grunt listen to all file changes and run any necessary processes.

```
$ grunt watch
```

#### Live Reload
Grunt watch also provides live reload functionality to refresh your browser tab 
whenever grunt runs a task. To enable this in your workflow, grab the browser 
plugin for your browser of choice such as the [Google Chrole extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)
and follow the instructions to enable it in your working tab.

#### Final build
Once you are done with work on components and ready tyo commit changes, kill any
running `grunt watch` process with `Ctrl+C` and run the following command in 
order to run the build tasks with special options for optimization and better
browser support.

```
$ grunt build
```

## What is a Component?

**Component**

_noun_

1. A reusable bundle of styles, markup, javascript, and other static resources 
compiled together with other components to make up a webpage. 

## Components of... Components
A component can consist of the following files:

* **SASS file** - Defines the visual styles of the component including any
modifiers as well as meta data about the component following the
[KSS](http://warpspire.com/kss/) syntax. See the example KSS comment below.
* **Handlebars template** - Defines the HTML structure and data fields that make
up the component.
* **JSON data** - Defines the schema for the data fields that fill the content
of the component and provides example data to populate the handlebars template.
* **Javascript file** - Defines any interactions required by the component.

### Example Component Structure:

```
┌ components
└─┬ component-name
  ├── _component-name.scss
  ├── component-name.hbs
  ├── component-name.json
  ├── component-name.js
  └─┬ component-assets
    ├── component-icon.svg
    └── component-image.png
```

### The SASS

We use a flavor of the [BEM](https://en.bem.info/) methodology when structuring
components. A component may contain the following parts:

* Component
* Element
* Modifier
* State

#### Class Name Structure
``` css
.the-component             # Component
.the-component__an-element # Sub-element
.the-component--modifier   # Modifier
.the-component:hover       # State
```

#### KSS Comments
We use KSS style comments in order to facilitate the automatic generation of the
style guide. Here is an example component declaration. This comment block should
live at the top of the SASS file for a component and be followed by the SASS 
code.

``` scss
/*
Component Name

Description of the component. This can use HTML or Github flavored markdown for
highlighting code snippets such as when mentioning a `.class-name`.

Markup: template-file.hbs

Weight: 1

.component--modifier - Description of this variation of the component
.component--modifier-two - Another description

Style guide: section.component
*/
```

##### Notes:

* The weight field is used for ordering the component within the generated style
guide. This affects both navigation as well as the order in which the component
shows up on the corresponding page. Weights are relative to the section in which
the component lives.
* There can be as many modifiers as needed and each one will will be displayed 
as a separate example in the style guide.
* The "Style guide" field determines the section and nesting in which the
component will be displayed in the generated style guide.
* To prevent the code example from rendering for a component, add a 
`Nocode: true` tag to the KSS comment.
* To prevent the the default example from rendering for a component, add a 
`Nodefault: true` tag to the KSS comment.
* To prevent the entire component from rendering in the style guide altogether, 
add a `Hidden: true` tag to the KSS comment. This is useful in cases where the 
component is not yet ready to be added to the style guide or when a handlebars 
template is needed as a partial, but doesn't correspond to an actual component.
* To alter the background color of an example, add a `Bgcolor: #333333` tag to 
the KSS comment where the value can be any CSS valid color (hexadecimal, rgb, or
color keyword). This is useful in the case that a component is meant to only be 
shown on a darker background, for instance.

### The Handlebars Template

Each component has a [handlebars template](http://handlebarsjs.com/) to define 
the HTML structure of the component. Templates will have the corresponding JSON
file as the context so all content and objects in the JSON is readily available
to the template. Additionally, all templates have a special `{{modifier_class}}`
placeholder available that KSS uses when creating each example of a component 
with all available modifiers. This placeholder should always be injected as a 
class on the component wrapper element.

#### Example:
``` handlebars
<div class="the-component {{modifier_class}}">
  {{#with name}}
    <h3 class="the-component__an-element">{{ name }}</h3>
  {{/with}}
  {{#with src}}
    <p>
      <img src="{{ src }}">
    </p>
  {{/with}}
  {{#if items}}
    <ul class="the-component__another-element">
      {{#each items}}
        <li>{{ label }}</li>
      {{/each}}
    </ul>
  {{/if}}
</div>
```

### The JSON

Each component has a JSON file that serves two purposes. First, it defines the 
data structure of the component which can be consumed by external systems to 
discover the structure of how to populate the template. Secondly, it also 
provides the style guide with example content to populate the rendered component
with. We're pretty fond of [placecage.com](http://www.placecage.com/) for 
placeholder images.

#### Example:
``` json
{
  "name": "Nicolas Cage",
  "src": "http://www.placecage.com/200/300"
  "items": [
    {
      "label": "Ghost Rider"
    },
    {
      "label": "Face/Off"
    },
    {
      "label": "National Treasure"
    }
  ]
}
```

### The Javascript

Some components may require javascript in order to implement interaction or 
other special functionality. Any `.js` files within a component will get 
concatenated into a single `scripts.js` file. 

## Helpers

We have an handful of helper SCSS and JS that is made globally available within
all components as well as some helper JS plug-ins and CSS classes that could 
also be used outside of components on whatever system the component library is
being used on (they are included in the compiled CSS and aggregated JS files).

The code for all of these helpers lives  within several folders prefixed with
underscores within the `/components/` folder. 

### Base

### Colors

### Functions, Mixins, Variables

### Helper Classes & Placeholders

Lots of handy placeholders and helper classes are made available in the 
[_helpers.scss](/components/_helpers/_helpers.scss) and 
[_placeholders.scss](/components/_helpers/_placeholders.scss) files. Rather than 
listing them all out here, take a look in the folders to check out what's 
available for `@extend`'ing within components or including as classes within the
component markup. The helper classes can also prove very handy when building out
content on pages with static markup such as within a page in a CMS.

### Breakpoints

We use [breakpoint-sass](http://breakpoint-sass.com/) to handle media 
queries/breakpoints within components to support variations in components on
different screen sizes. We utilize the following breakpoints:

* Mobile - <940px
* Tablet - 640px - 960px
* Desktop - >960px

And we have the following SASS variables set so that we don't have to remember 
these ranges when we need to set up a breakpoint:

* `$mobile-max` or `$mobile-only` - Will only trigger on the Mobile breakpoint
* `$tablet-min` - Will trigger on the Tablet and Desktop breakpoints
* `$tablet-max` - Will trigger on the Tablet and Mobile breakpoints
* `$tablet-only` - Will only trigger on the Tablet breakpoint
* `$desktop-min` or `$desktop-only` - Will only trigger on the Desktop breakpoint

#### Example Usage
``` scss
.the-component {
  color: #f00;
  margin: 3em;

  // Reduce margin on Tablet and Mobile
  @include breakpoint($tablet-max) {
    margin: 2em;
  }

  // Change text color on Mobile
  @include breakpoint($mobile-only) {
    color: #0f0;
  }
}
```

### JS Plug-ins/helpers


## Scaffold a component
We've built a tool to help scaffold out new components using [grunt-init](http://gruntjs.com/project-scaffolding)
See the [spawn-component](https://github.com/tableau-mkt/spawn-component) repo
to use this tool.

## Other info
* The style guide generator used in this project is [kss-node](https://github.com/kss-node/kss-node).
* The template used for kss-node is our custom-built [kss-template](https://github.com/tableau-mkt/kss-template).
