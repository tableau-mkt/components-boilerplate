# Tableau Components

A place to keep our library of reusable components for various web properties.

###[Style Guide Demo](http://tableau-mkt.github.io/components/styleguide/)

## Getting started
Install your local dependencies: we add susy and breakpoint-sass via bower and take care of sass-globbing via a grunt-task. This enables up to strip out all Compass and Ruby based dependencies.
```
$ npm install
$ bower install
```

### Develop
Starts up a grunt watch task by default.
```$ grunt```

In another shell, you can start a simple webserver, using `grunt connect:styleguide`.


### Finish
Produce the full style.css file, run it through css prefixer, and generate the kss-node based style guide.
```$ grunt build```

## Defining a Component

A component is a reusable bundle of styles, markup, javascript, and other static
resources used as the building blocks for a web page. Components have a
determined structure, but the style and interaction behaviors can potentially
vary from site to site.

## Anatomy of a Component

A component can consist of the following files:

* **SASS file** - Defines the visual styles of the component including any
modifiers as well as meta data about the component following the
[KSS](http://warpspire.com/kss/) syntax. See the example KSS comment below.
* **Handlebars template** - Defines the HTML structure and data fields that make
up the component.
* **JSON data** - Defines the schema for the data fields that fill the content
of the component and provides example data to populate the handlebars template.
* **Javascript file** - Defines any interactions required by the component.

## Example Component Structure:

```
┌ components
└─┬ component-name
  ├── _component-name.scss
  ├── component-name.hbs
  ├── component-name.json
  └── component-name.js
```

### Scaffold a component
If you haven't already done so, install [grunt-init](http://gruntjs.com/project-scaffolding).

Once grunt-init is installed, place this template in your `~/.grunt-init/` directory. It's recommended that you use git to clone this template into that directory, as follows:

```
git clone https://github.com/tableau-mkt/spawn-component.git ~/.grunt-init/component
```

#### Usage
At the command-line, cd into your local www7 components directory, run this command and follow the prompts.

```
$ cd [PATH-TO-YOUR-LOCAL-WWW7-COMPONENTS-REPO]
$ grunt-init component
```

## KSS Comment Example:

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

### Notes:

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

## Adding/Editing Components

1. Clone this repo:
`git clone git@github.com:tableau-mkt/components.git components`
2. Install the dependencies: `bundle install` and `npm install`
3. Watch for changes and automatically run built processes: `grunt watch`
4. OR manually build: `grunt build` or `grunt styleguide` for just kss build
without a compass compile.

## Other info

* The style guide generator used in this project is
[kss-node](https://github.com/kss-node/kss-node).
* The template used for kss-node is our custom-built
[kss-template](https://github.com/tableau-mkt/kss-template).
