/**
 * Different input types.
 * @public
 */
declare enum InputType {
    /**
     * Defines a one-line text input field:
     * @public
     */
    Text = "Text",
    /**
     * Used for input fields that must contain an e-mail address.
     * @public
     */
    Email = "Email",
    /**
     * Defines a numeric input field.
     * @public
     */
    Number = "Number",
    /**
     * Defines a password field.
     * @public
     */
    Password = "Password",
    /**
     * Used for input fields that should contain a telephone number.
     * @public
     */
    Tel = "Tel",
    /**
     * Used for input fields that should contain a URL address.
     * @public
     */
    URL = "URL"
}
export default InputType;
