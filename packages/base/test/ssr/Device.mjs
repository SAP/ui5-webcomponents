import {assert} from "chai";
import * as Device from "../../dist/Device.js";

describe('SSR / Device', () => {

    it('all detections should return false', () => {
        assert.strictEqual(Device.supportsTouch(), false, `'supportsTouch' should be false`);
        assert.strictEqual(Device.isIE(), false, `'isIE' should be false`);
        assert.strictEqual(Device.isSafari(), false, `'isSafari' should be false`);
        assert.strictEqual(Device.isChrome(), false, `'isChrome' should be false`);
        assert.strictEqual(Device.isFirefox(), false, `'isFirefox' should be false`);
        assert.strictEqual(Device.isPhone(), false, `'isPhone' should be false`);
        assert.strictEqual(Device.isTablet(), false, `'isTablet' should be false`);
        assert.strictEqual(Device.isDesktop(), false, `'isDesktop' should be false`);
        assert.strictEqual(Device.isCombi(), false, `'isCombi' should be false`);
        assert.strictEqual(Device.isIOS(), false, `'isIOS' should be false`);
        assert.strictEqual(Device.isAndroid(), false, `'isAndroid' should be false`);
    })
})


