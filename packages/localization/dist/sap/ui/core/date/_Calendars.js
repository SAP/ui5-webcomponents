var mRegistry = new Map();
var _Calendars = {
  get: function (sCalendarType) {
    if (!mRegistry.has(sCalendarType)) {
      throw new Error("Required calendar type: " + sCalendarType + " not loaded.");
    }
    return mRegistry.get(sCalendarType);
  },
  set: function (sCalendarType, CalendarClass) {
    mRegistry.set(sCalendarType, CalendarClass);
  }
};
export default _Calendars;
