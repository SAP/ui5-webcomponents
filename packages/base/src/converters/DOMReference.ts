const DOMReferenceConverter = {
    toAttribute(propertyValue: string | HTMLElement) {
        if (propertyValue instanceof HTMLElement) {
            return null;
        }

        return propertyValue;
    },
    fromAttribute(value: string | null) {
        return value;
    },
};

export default DOMReferenceConverter;