import WCPolyfill from '../thirdparty/webcomponents-polyfill';
import * as PolymerGestures from "@polymer/polymer/lib/utils/gestures";
import {injectGesturesProvider} from "./DefaultGestures";

injectGesturesProvider(PolymerGestures);
