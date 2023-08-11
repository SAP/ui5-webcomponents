import type { IApiReader, IComponentParsedAPI } from "../ApiReader";
import type { InputType as IArgType } from "@storybook/types";

export interface IGenerator {
    isMatch(dataParsed: IComponentParsedAPI): boolean;
    generate(dataParsed: IComponentParsedAPI, apiReader?: IApiReader): IArgType;
}