# Tableau Components

A place to keep our library of reusable components for various web properties.

Check out these components in the generated style guide 
[here](http://tableau-mkt.github.io/components/styleguide/).

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

## Example structure
```
┌ component-name
├── _component-name.scss
├── component-name.hbs
├── component-name.json
└── component-name.js
```

## KSS comment example
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
