declare const registerTag: (tag: string) => void;
declare const isTagRegistered: (tag: string) => boolean;
declare const getAllRegisteredTags: () => string[];
declare const recordTagRegistrationFailure: (tag: string) => void;
export { registerTag, isTagRegistered, getAllRegisteredTags, recordTagRegistrationFailure, };
