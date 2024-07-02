declare class F6Navigation {
    static _instance: F6Navigation;
    keydownHandler: (event: KeyboardEvent) => void;
    selectedGroup: HTMLElement | null;
    groups: Array<HTMLElement>;
    constructor();
    attachEventListeners(): void;
    groupElementToFocus(nextElement: HTMLElement): Promise<HTMLElement | undefined>;
    findNextFocusableGroupElement(currentIndex: number): Promise<HTMLElement | undefined>;
    findPreviousFocusableGroupElement(currentIndex: number): Promise<HTMLElement | undefined>;
    _keydownHandler(event: KeyboardEvent): Promise<void>;
    removeEventListeners(): void;
    updateGroups(): void;
    setSelectedGroup(root?: DocumentOrShadowRoot): void;
    deepActive(root: DocumentOrShadowRoot): Element | null;
    destroy(): void;
    static init(): F6Navigation;
}
export default F6Navigation;
