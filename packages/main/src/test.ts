class Button {
    design: "rounded" | "square" | "oval" = "rounded";
    optional?: "rounded" | "square" | "oval";
    _selectedColor?: string | undefined;
}

const button = new Button();
console.log(button.design);

type MyPartial<T> = {[K in keyof T]?: T[K]}
type MyPartial2<T> = {[K in keyof T]: Exclude<T[K], undefined>}

type ButtonProps = Partial<Button>;
// type ButtonProps = Button;

const a: ButtonProps = {};
// @ts-expect-error
a.design = undefined;
// @ts-expect-error
a.optional = undefined;
a._selectedColor = undefined;
