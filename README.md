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

```$ grunt watch```

#### Live Reload
Grunt watch also provides live reload functionality to refresh your browser tab 
whenever grunt runs a task. To enable this in your workflow, grab the browser 
plugin for your browser of choice such as the [Google Chrole extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)
and follow the instructions to enable it in your working tab.

#### Final build
Once you are done with work on components and ready tyo commit changes, kill any
running `grunt watch` process with `Ctrl+C` and run the following:

```$ grunt build```

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
```
.the-component             # Component
.the-component__an-element # Sub-element
.the-component--modifier   # Modifier
.the-component:hover       # State
```

#### KSS Comments
We use KSS style comments in order to facilitate the automatic generation of the
style guide. Here is an example component declaration.

```
/*
Component Name

Description of the component. This can use HTML or github flavored markdown for
highlighting code snippets such as when mentioning a `.class-name`.

Markup: template-file.hbs

Weight: 1

.component--modifier - Description of this variation of the component
.component--modifier-two - Another description

Style guide: section.component
*/
```

##### Notes:

* The weight field is optional and is used solely used for ordering the
component within a generated style guide via kss-node.
* There can be as many modifiers as needed and the placeholder
`{{modifier_class}}` can be used in the handlebars template so that the
generated style guide displays each variation properly.
* The "Style guide" field determines the section and nesting in which the
component will be displayed in the generated style guide.
* To prevent the code exmaple from rendering for a component, add a 
`Nocode: true` tag to the KSS comment.
* To prevent the the default exmaple from rendering for a component, add a 
`Nodefault: true` tag to the KSS comment.
* To prevent the entire component from rendering in the style guide altogether, 
add a `Hidden: true` tag to the KSS comment. This is useful in cases where the 
component is not yet ready to be added to the style guide or when a handlebars 
template is needed as a partial, but doesn't correspond to an actual component.
* To alter the background color of an example, add a `Bgcolor: #333333` tag to 
the KSS comment where the value can be any CSS valid color (hexidecimal, rgb, or
color keyword). This is useful in the case that a component is meant to only be 
shown on a darker background, for instance.

### Scaffold a component
We've built a tool to help scafold out new components using [grunt-init](http://gruntjs.com/project-scaffolding)
See the [spawn-component](https://github.com/tableau-mkt/spawn-component) repo
to use this tool.

## Other info
* The style guide generator used in this project is [kss-node](https://github.com/kss-node/kss-node).
* The template used for kss-node is our custom-built [kss-template](https://github.com/tableau-mkt/kss-template).
