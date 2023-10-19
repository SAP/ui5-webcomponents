export type Privacy = "private" | "protected" | "public"

/**
 * The top-level interface of a custom elements manifest file.
 *
 * Because custom elements are JavaScript classes, describing a custom element
 * may require describing arbitrary JavaScript concepts like modules, classes,
 * functions, etc. So custom elements manifests are capable of documenting
 * the elements in a package, as well as those JavaScript concepts.
 *
 * The modules described in a package should be the public entrypoints that
 * other packages may import from. Multiple modules may export the same object
 * via re-exports, but in most cases a package should document the single
 * canonical export that should be used.
 */
export interface MySchema {
  /**
   * Whether the package is deprecated.
   * If the value is a string, it's the reason for the deprecation.
   */
  deprecated?: string | boolean
  /**
   * An array of the modules this package contains.
   */
  modules: JavaScriptModule[]
  /**
   * The Markdown to use for the main readme of this package.
   *
   * This can be used to override the readme used by Github or npm if that
   * file contains information irrelevant to custom element catalogs and
   * documentation viewers.
   */
  readme?: string
  /**
   * The version of the schema used in this file.
   */
  schemaVersion: string
}
export interface JavaScriptModule {
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  /**
   * The declarations of a module.
   *
   * For documentation purposes, all declarations that are reachable from
   * exports should be described here. Ie, functions and objects that may be
   * properties of exported objects, or passed as arguments to functions.
   */
  declarations?: (
    | ClassDeclaration
    | EnumDeclaration
    | InterfaceDeclaration
    | FunctionDeclaration
    | MixinDeclaration
    | VariableDeclaration
    | CustomElementDeclaration
    | CustomElementMixinDeclaration
  )[]
  /**
   * Whether the module is deprecated.
   * If the value is a string, it's the reason for the deprecation.
   */
  deprecated?: string | boolean
  /**
   * A markdown description of the module.
   */
  description?: string
  /**
   * The exports of a module. This includes JavaScript exports and
   * custom element definitions.
   */
  exports?: (JavaScriptExport | CustomElementExport)[]
  kind: "javascript-module"
  /**
   * Path to the javascript file needed to be imported.
   * (not the path for example to a typescript file.)
   */
  path: string
  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string
}
export interface ClassDeclaration {
  privacy: Privacy
  _ui5reference: Reference
  /**
   * Whether the class or mixin is deprecated.
   * If the value is a string, it's the reason for the deprecation.
   */
  deprecated?: string | boolean
  /**
   * A markdown description of the class.
   */
  description?: string
  /**
   * Marks when the field was
   */
  _ui5since?: string
  kind: "class"
  members?: (ClassField | ClassMethod)[]
  /**
   * Any class mixins applied in the extends clause of this class.
   *
   * If mixins are applied in the class definition, then the true superclass
   * of this class is the result of applying mixins in order to the superclass.
   *
   * Mixins must be listed in order of their application to the superclass or
   * previous mixin application. This means that the innermost mixin is listed
   * first. This may read backwards from the common order in JavaScript, but
   * matches the order of language used to describe mixin application, like
   * "S with A, B".
   */
  mixins?: Reference[]
  name: string
  source?: SourceReference
  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string
  /**
   * A reference to an export of a module.
   *
   * All references are required to be publically accessible, so the canonical
   * representation of a reference is the export it's available from.
   *
   * `package` should generally refer to an npm package name. If `package` is
   * undefined then the reference is local to this package. If `module` is
   * undefined the reference is local to the containing module.
   *
   * References to global symbols like `Array`, `HTMLElement`, or `Event` should
   * use a `package` name of `"global:"`.
   */
  superclass?: {
    /**
     * Marks when the field was introduced
     */
    _ui5since?: string
    module?: string
    name: string
    package?: string
  }
}
/**
 * A reference to an export of a module.
 *
 * All references are required to be publically accessible, so the canonical
 * representation of a reference is the export it's available from.
 *
 * `package` should generally refer to an npm package name. If `package` is
 * undefined then the reference is local to this package. If `module` is
 * undefined the reference is local to the containing module.
 *
 * References to global symbols like `Array`, `HTMLElement`, or `Event` should
 * use a `package` name of `"global:"`.
 */
export interface Reference {
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  module?: string
  name: string
  package?: string
}
export interface ClassField {
  _ui5formProperty?: boolean
  _ui5formEvents?: string
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  default: string
  /**
   * Whether the property is deprecated.
   * If the value is a string, it's the reason for the deprecation.
   */
  deprecated?: string | boolean
  /**
   * A markdown description of the field.
   */
  description?: string
  inheritedFrom?: Reference
  kind: "field"
  name: string
  privacy: Privacy
  /**
   * Whether the property is read-only.
   */
  readonly?: boolean
  source?: SourceReference
  static?: boolean
  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string
  type: Type
}
/**
 * A reference to the source of a declaration or member.
 */
export interface SourceReference {
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  /**
   * An absolute URL to the source (ie. a GitHub URL).
   */
  href: string
}
export interface Type {
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  /**
   * An array of references to the types in the type string.
   *
   * These references have optional indices into the type string so that tools
   * can understand the references in the type string independently of the type
   * system and syntax. For example, a documentation viewer could display the
   * type `Array<FooElement | BarElement>` with cross-references to `FooElement`
   * and `BarElement` without understanding arrays, generics, or union types.
   */
  references?: TypeReference[]
  source?: SourceReference
  /**
   * The full string representation of the type, in whatever type syntax is
   * used, such as JSDoc, Closure, or TypeScript.
   */
  text: string
}
/**
 * A reference that is associated with a type string and optionally a range
 * within the string.
 *
 * Start and end must both be present or not present. If they're present, they
 * are indices into the associated type string. If they are missing, the entire
 * type string is the symbol referenced and the name should match the type
 * string.
 */
export interface TypeReference {
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  end?: number
  module?: string
  name: string
  package?: string
  start?: number
}
export interface ClassMethod {
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  /**
   * Whether the function is deprecated.
   * If the value is a string, it's the reason for the deprecation.
   */
  deprecated?: string | boolean
  /**
   * A markdown description.
   */
  description?: string
  inheritedFrom?: Reference
  kind: "method"
  name: string
  parameters?: Parameter[]
  privacy: Privacy
  return: {
    /**
     * A markdown description.
     */
    description?: string
    /**
     * A markdown summary suitable for display in a listing.
     */
    summary?: string
    type?: Type
    [k: string]: unknown
  }
  source?: SourceReference
  static?: boolean
  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string
}
export interface Parameter {
  privacy: Privacy
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  default?: string
  /**
   * Whether the property is deprecated.
   * If the value is a string, it's the reason for the deprecation.
   */
  deprecated?: string | boolean
  /**
   * A markdown description of the field.
   */
  description?: string
  name: string
  /**
   * Whether the parameter is optional. Undefined implies non-optional.
   */
  optional?: boolean
  /**
   * Whether the property is read-only.
   */
  readonly?: boolean
  /**
   * Whether the parameter is a rest parameter. Only the last parameter may be a rest parameter.
   * Undefined implies single parameter.
   */
  rest?: boolean
  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string
  type: Type
}
export interface EnumDeclaration {
  privacy: Privacy
  _ui5reference: Reference
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  /**
   * Whether the class or mixin is deprecated.
   * If the value is a string, it's the reason for the deprecation.
   */
  deprecated?: string | boolean
  /**
   * A markdown description of the class.
   */
  description?: string
  kind: "enum"
  members?: ClassField[]
  /**
   * Any class mixins applied in the extends clause of this class.
   *
   * If mixins are applied in the class definition, then the true superclass
   * of this class is the result of applying mixins in order to the superclass.
   *
   * Mixins must be listed in order of their application to the superclass or
   * previous mixin application. This means that the innermost mixin is listed
   * first. This may read backwards from the common order in JavaScript, but
   * matches the order of language used to describe mixin application, like
   * "S with A, B".
   */
  mixins?: Reference[]
  name: string
  source?: SourceReference
  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string
  /**
   * A reference to an export of a module.
   *
   * All references are required to be publically accessible, so the canonical
   * representation of a reference is the export it's available from.
   *
   * `package` should generally refer to an npm package name. If `package` is
   * undefined then the reference is local to this package. If `module` is
   * undefined the reference is local to the containing module.
   *
   * References to global symbols like `Array`, `HTMLElement`, or `Event` should
   * use a `package` name of `"global:"`.
   */
  superclass?: {
    /**
     * Marks when the field was introduced
     */
    _ui5since?: string
    module?: string
    name: string
    package?: string
  }
}
export interface InterfaceDeclaration {
  privacy: Privacy
  _ui5reference: Reference
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  /**
   * Whether the class or mixin is deprecated.
   * If the value is a string, it's the reason for the deprecation.
   */
  deprecated?: string | boolean
  /**
   * A markdown description of the class.
   */
  description?: string
  kind: "interface"
  /**
   * Any class mixins applied in the extends clause of this class.
   *
   * If mixins are applied in the class definition, then the true superclass
   * of this class is the result of applying mixins in order to the superclass.
   *
   * Mixins must be listed in order of their application to the superclass or
   * previous mixin application. This means that the innermost mixin is listed
   * first. This may read backwards from the common order in JavaScript, but
   * matches the order of language used to describe mixin application, like
   * "S with A, B".
   */
  mixins?: Reference[]
  name: string
  source?: SourceReference
  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string
  /**
   * A reference to an export of a module.
   *
   * All references are required to be publically accessible, so the canonical
   * representation of a reference is the export it's available from.
   *
   * `package` should generally refer to an npm package name. If `package` is
   * undefined then the reference is local to this package. If `module` is
   * undefined the reference is local to the containing module.
   *
   * References to global symbols like `Array`, `HTMLElement`, or `Event` should
   * use a `package` name of `"global:"`.
   */
  superclass?: {
    /**
     * Marks when the field was introduced
     */
    _ui5since?: string
    module?: string
    name: string
    package?: string
  }
}
export interface FunctionDeclaration {
  _ui5reference: Reference
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  /**
   * Whether the function is deprecated.
   * If the value is a string, it's the reason for the deprecation.
   */
  deprecated?: string | boolean
  /**
   * A markdown description.
   */
  description?: string
  kind: "function"
  name: string
  parameters?: Parameter[]
  return?: {
    /**
     * A markdown description.
     */
    description?: string
    /**
     * A markdown summary suitable for display in a listing.
     */
    summary?: string
    type?: Type
    [k: string]: unknown
  }
  source?: SourceReference
  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string
}
/**
 * A description of a class mixin.
 *
 * Mixins are functions which generate a new subclass of a given superclass.
 * This interfaces describes the class and custom element features that
 * are added by the mixin. As such, it extends the CustomElement interface and
 * ClassLike interface.
 *
 * Since mixins are functions, it also extends the FunctionLike interface. This
 * means a mixin is callable, and has parameters and a return type.
 *
 * The return type is often hard or impossible to accurately describe in type
 * systems like TypeScript. It requires generics and an `extends` operator
 * that TypeScript lacks. Therefore it's recommended that the return type is
 * left empty. The most common form of a mixin function takes a single
 * argument, so consumers of this interface should assume that the return type
 * is the single argument subclassed by this declaration.
 *
 * A mixin should not have a superclass. If a mixins composes other mixins,
 * they should be listed in the `mixins` field.
 *
 * See [this article]{@link https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/}
 * for more information on the classmixin pattern in JavaScript.
 */
export interface MixinDeclaration {
  _ui5reference: Reference
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  /**
   * Whether the class or mixin is deprecated.
   * If the value is a string, it's the reason for the deprecation.
   */
  deprecated?: string | boolean
  /**
   * A markdown description of the class.
   */
  description?: string
  kind: "mixin"
  members?: (ClassField | ClassMethod)[]
  /**
   * Any class mixins applied in the extends clause of this class.
   *
   * If mixins are applied in the class definition, then the true superclass
   * of this class is the result of applying mixins in order to the superclass.
   *
   * Mixins must be listed in order of their application to the superclass or
   * previous mixin application. This means that the innermost mixin is listed
   * first. This may read backwards from the common order in JavaScript, but
   * matches the order of language used to describe mixin application, like
   * "S with A, B".
   */
  mixins?: Reference[]
  name: string
  parameters?: Parameter[]
  return?: {
    /**
     * A markdown description.
     */
    description?: string
    /**
     * A markdown summary suitable for display in a listing.
     */
    summary?: string
    type?: Type
    [k: string]: unknown
  }
  source?: SourceReference
  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string
  /**
   * A reference to an export of a module.
   *
   * All references are required to be publically accessible, so the canonical
   * representation of a reference is the export it's available from.
   *
   * `package` should generally refer to an npm package name. If `package` is
   * undefined then the reference is local to this package. If `module` is
   * undefined the reference is local to the containing module.
   *
   * References to global symbols like `Array`, `HTMLElement`, or `Event` should
   * use a `package` name of `"global:"`.
   */
  superclass?: {
    /**
     * Marks when the field was introduced
     */
    _ui5since?: string
    module?: string
    name: string
    package?: string
  }
}
export interface VariableDeclaration {
  _ui5reference: Reference
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  default?: string
  /**
   * Whether the property is deprecated.
   * If the value is a string, it's the reason for the deprecation.
   */
  deprecated?: string | boolean
  /**
   * A markdown description of the field.
   */
  description?: string
  kind: "variable"
  name: string
  /**
   * Whether the property is read-only.
   */
  readonly?: boolean
  source?: SourceReference
  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string
  type?: Type
}
/**
 * A description of a custom element class.
 *
 * Custom elements are JavaScript classes, so this extends from
 * `ClassDeclaration` and adds custom-element-specific features like
 * attributes, events, and slots.
 *
 * Note that `tagName` in this interface is optional. Tag names are not
 * neccessarily part of a custom element class, but belong to the definition
 * (often called the "registration") or the `customElements.define()` call.
 *
 * Because classes and tag names can only be registered once, there's a
 * one-to-one relationship between classes and tag names. For ease of use,
 * we allow the tag name here.
 *
 * Some packages define and register custom elements in separate modules. In
 * these cases one `Module` should contain the `CustomElement` without a
 * tagName, and another `Module` should contain the
 * `CustomElementExport`.
 */
export interface CustomElementDeclaration {
  _ui5abstract?: boolean
  privacy: Privacy
  _ui5reference: Reference
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  /**
   * The attributes that this element is known to understand.
   */
  attributes?: Attribute[]
  cssParts?: CssPart[]
  cssProperties?: CssCustomProperty[]
  /**
   * Distinguishes a regular JavaScript class from a
   * custom element class
   */
  customElement: true
  demos?: Demo[]
  /**
   * Whether the class or mixin is deprecated.
   * If the value is a string, it's the reason for the deprecation.
   */
  deprecated?: string | boolean
  /**
   * A markdown description of the class.
   */
  description?: string
  /**
   * The events that this element fires.
   */
  events?: Event[]
  kind: "class"
  members?: (ClassField | ClassMethod)[]
  /**
   * Any class mixins applied in the extends clause of this class.
   *
   * If mixins are applied in the class definition, then the true superclass
   * of this class is the result of applying mixins in order to the superclass.
   *
   * Mixins must be listed in order of their application to the superclass or
   * previous mixin application. This means that the innermost mixin is listed
   * first. This may read backwards from the common order in JavaScript, but
   * matches the order of language used to describe mixin application, like
   * "S with A, B".
   */
  mixins?: Reference[]
  name: string
  /**
   * The shadow dom content slots that this element accepts.
   */
  slots?: Slot[]
  source?: SourceReference
  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string
  /**
   * A reference to an export of a module.
   *
   * All references are required to be publically accessible, so the canonical
   * representation of a reference is the export it's available from.
   *
   * `package` should generally refer to an npm package name. If `package` is
   * undefined then the reference is local to this package. If `module` is
   * undefined the reference is local to the containing module.
   *
   * References to global symbols like `Array`, `HTMLElement`, or `Event` should
   * use a `package` name of `"global:"`.
   */
  superclass?: {
    /**
     * Marks when the field was introduced
     */
    _ui5since?: string
    module?: string
    name: string
    package?: string
  }
  /**
   * An optional tag name that should be specified if this is a
   * self-registering element.
   *
   * Self-registering elements must also include a CustomElementExport
   * in the module's exports.
   */
  tagName?: string
}
export interface Attribute {
  /**
   * The default value of the attribute, if any.
   *
   * As attributes are always strings, this is the actual value, not a human
   * readable description.
   */
  default?: string
  /**
   * Whether the attribute is deprecated.
   * If the value is a string, it's the reason for the deprecation.
   */
  deprecated?: string | boolean
  /**
   * A markdown description.
   */
  description?: string
  /**
   * The name of the field this attribute is associated with, if any.
   */
  fieldName?: string
  inheritedFrom?: Reference
  name: string
  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string
  /**
   * The type that the attribute will be serialized/deserialized as.
   */
  type?: {
    /**
     * Marks when the field was introduced
     */
    _ui5since?: string
    /**
     * An array of references to the types in the type string.
     *
     * These references have optional indices into the type string so that tools
     * can understand the references in the type string independently of the type
     * system and syntax. For example, a documentation viewer could display the
     * type `Array<FooElement | BarElement>` with cross-references to `FooElement`
     * and `BarElement` without understanding arrays, generics, or union types.
     */
    references?: TypeReference[]
    source?: SourceReference
    /**
     * The full string representation of the type, in whatever type syntax is
     * used, such as JSDoc, Closure, or TypeScript.
     */
    text: string
  }
}
/**
 * The description of a CSS Part
 */
export interface CssPart {
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  /**
   * Whether the CSS shadow part is deprecated.
   * If the value is a string, it's the reason for the deprecation.
   */
  deprecated?: string | boolean
  /**
   * A markdown description.
   */
  description?: string
  name: string
  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string
}
export interface CssCustomProperty {
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  default?: string
  /**
   * Whether the CSS custom property is deprecated.
   * If the value is a string, it's the reason for the deprecation.
   */
  deprecated?: string | boolean
  /**
   * A markdown description.
   */
  description?: string
  /**
   * The name of the property, including leading `--`.
   */
  name: string
  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string
  /**
   * The expected syntax of the defined property. Defaults to "*".
   *
   * The syntax must be a valid CSS [syntax string](https://developer.mozilla.org/en-US/docs/Web/CSS/@property/syntax)
   * as defined in the CSS Properties and Values API.
   *
   * Examples:
   *
   * "<color>": accepts a color
   * "<length> | <percentage>": accepts lengths or percentages but not calc expressions with a combination of the two
   * "small | medium | large": accepts one of these values set as custom idents.
   * "*": any valid token
   */
  syntax?: string
}
export interface Demo {
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  /**
   * A markdown description of the demo.
   */
  description?: string
  source?: SourceReference
  /**
   * Relative URL of the demo if it's published with the package. Absolute URL
   * if it's hosted.
   */
  url: string
}
export interface Event {
  params?: Parameter[]
  privacy: Privacy
  /**
   * Whether the parameter is optional. Undefined implies non-optional.
   */
  _ui5allowPreventDefault?: boolean
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  /**
   * Whether the event is deprecated.
   * If the value is a string, it's the reason for the deprecation.
   */
  deprecated?: string | boolean
  /**
   * A markdown description.
   */
  description?: string
  inheritedFrom?: Reference
  name: string
  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string
  /**
   * The type of the event object that's fired.
   */
  type: {
    /**
     * Marks when the field was introduced
     */
    _ui5since?: string
    /**
     * An array of references to the types in the type string.
     *
     * These references have optional indices into the type string so that tools
     * can understand the references in the type string independently of the type
     * system and syntax. For example, a documentation viewer could display the
     * type `Array<FooElement | BarElement>` with cross-references to `FooElement`
     * and `BarElement` without understanding arrays, generics, or union types.
     */
    references?: TypeReference[]
    source?: SourceReference
    /**
     * The full string representation of the type, in whatever type syntax is
     * used, such as JSDoc, Closure, or TypeScript.
     */
    text: string
  }
}
export interface Slot {
  type: Type
  privacy: Privacy
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  /**
   * Whether the slot is deprecated.
   * If the value is a string, it's the reason for the deprecation.
   */
  deprecated?: string | boolean
  /**
   * A markdown description.
   */
  description?: string
  /**
   * The slot name, or the empty string for an unnamed slot.
   */
  name: string
  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string
}
/**
 * A class mixin that also adds custom element related properties.
 */
export interface CustomElementMixinDeclaration {
  _ui5reference: Reference
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  /**
   * The attributes that this element is known to understand.
   */
  attributes?: Attribute[]
  cssParts?: CssPart[]
  cssProperties?: CssCustomProperty[]
  /**
   * Distinguishes a regular JavaScript class from a
   * custom element class
   */
  customElement: true
  demos?: Demo[]
  /**
   * Whether the class or mixin is deprecated.
   * If the value is a string, it's the reason for the deprecation.
   */
  deprecated?: string | boolean
  /**
   * A markdown description of the class.
   */
  description?: string
  /**
   * The events that this element fires.
   */
  events?: Event[]
  kind: "mixin"
  members?: (ClassField | ClassMethod)[]
  /**
   * Any class mixins applied in the extends clause of this class.
   *
   * If mixins are applied in the class definition, then the true superclass
   * of this class is the result of applying mixins in order to the superclass.
   *
   * Mixins must be listed in order of their application to the superclass or
   * previous mixin application. This means that the innermost mixin is listed
   * first. This may read backwards from the common order in JavaScript, but
   * matches the order of language used to describe mixin application, like
   * "S with A, B".
   */
  mixins?: Reference[]
  name: string
  parameters?: Parameter[]
  return?: {
    /**
     * A markdown description.
     */
    description?: string
    /**
     * A markdown summary suitable for display in a listing.
     */
    summary?: string
    type?: Type
    [k: string]: unknown
  }
  /**
   * The shadow dom content slots that this element accepts.
   */
  slots?: Slot[]
  source?: SourceReference
  /**
   * A markdown summary suitable for display in a listing.
   */
  summary?: string
  /**
   * A reference to an export of a module.
   *
   * All references are required to be publically accessible, so the canonical
   * representation of a reference is the export it's available from.
   *
   * `package` should generally refer to an npm package name. If `package` is
   * undefined then the reference is local to this package. If `module` is
   * undefined the reference is local to the containing module.
   *
   * References to global symbols like `Array`, `HTMLElement`, or `Event` should
   * use a `package` name of `"global:"`.
   */
  superclass?: {
    /**
     * Marks when the field was introduced
     */
    _ui5since?: string
    module?: string
    name: string
    package?: string
  }
  /**
   * An optional tag name that should be specified if this is a
   * self-registering element.
   *
   * Self-registering elements must also include a CustomElementExport
   * in the module's exports.
   */
  tagName?: string
}
export interface JavaScriptExport {
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  /**
   * A reference to an export of a module.
   *
   * All references are required to be publically accessible, so the canonical
   * representation of a reference is the export it's available from.
   *
   * `package` should generally refer to an npm package name. If `package` is
   * undefined then the reference is local to this package. If `module` is
   * undefined the reference is local to the containing module.
   *
   * References to global symbols like `Array`, `HTMLElement`, or `Event` should
   * use a `package` name of `"global:"`.
   */
  declaration: {
    /**
     * Marks when the field was introduced
     */
    _ui5since?: string
    module?: string
    name: string
    package?: string
  }
  /**
   * Whether the export is deprecated. For example, the name of the export was changed.
   * If the value is a string, it's the reason for the deprecation.
   */
  deprecated?: string | boolean
  kind: "js"
  /**
   * The name of the exported symbol.
   *
   * JavaScript has a number of ways to export objects which determine the
   * correct name to use.
   *
   * - Default exports must use the name "default".
   * - Named exports use the name that is exported. If the export is renamed
   *   with the "as" clause, use the exported name.
   * - Aggregating exports (`* from`) should use the name `*`
   */
  name: string
}
/**
 * A global custom element defintion, ie the result of a
 * `customElements.define()` call.
 *
 * This is represented as an export because a definition makes the element
 * available outside of the module it's defined it.
 */
export interface CustomElementExport {
  /**
   * Marks when the field was introduced
   */
  _ui5since?: string
  /**
   * A reference to an export of a module.
   *
   * All references are required to be publically accessible, so the canonical
   * representation of a reference is the export it's available from.
   *
   * `package` should generally refer to an npm package name. If `package` is
   * undefined then the reference is local to this package. If `module` is
   * undefined the reference is local to the containing module.
   *
   * References to global symbols like `Array`, `HTMLElement`, or `Event` should
   * use a `package` name of `"global:"`.
   */
  declaration: {
    /**
     * Marks when the field was introduced
     */
    _ui5since?: string
    module?: string
    name: string
    package?: string
  }
  /**
   * Whether the custom-element export is deprecated.
   * For example, a future version will not register the custom element in this file.
   * If the value is a string, it's the reason for the deprecation.
   */
  deprecated?: string | boolean
  kind: "custom-element-definition"
  /**
   * The tag name of the custom element.
   */
  name: string
}
