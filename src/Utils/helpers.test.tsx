import {
  isTime1LaterThanTime2,
  convertArrToFromToObject,
  isNextDay,
  minutesDifference,
  checkPeakHours,
} from "./helpers";

describe("helpers - isTime1LaterThanTime2", () => {
  it("compare 2 time strings correctly", () => {
    const compare1 = isTime1LaterThanTime2("11:00", "09:34");
    expect(compare1).toBe(true);

    const compare2 = isTime1LaterThanTime2("00:01", "23:59");
    expect(compare2).toBe(true);

    const compare3 = isTime1LaterThanTime2("12:00", "12:00");
    expect(compare3).toBe(false);

    const compare4 = isTime1LaterThanTime2("11:00", "9:34");
    expect(compare4).toBeUndefined();
  });
});

describe("helpers - convertArrToFromToObject", () => {
  it("converts arr to objects", () => {
    const obj1 = convertArrToFromToObject(["PAD", "RDG", "THA"]);
    expect(obj1).toMatchObject({
      returnArr: [
        { from: "PAD", to: "RDG" },
        { from: "RDG", to: "THA" },
      ],
      destination: "THA",
    });

    const obj2 = convertArrToFromToObject(["PAD", "", "THA"]);
    expect(obj2).toMatchObject({
      returnArr: [{ from: "PAD", to: "THA" }],
      destination: "",
    });

    const obj3 = convertArrToFromToObject(["PAD", "", ""]);
    expect(obj3).toMatchObject({
      returnArr: [{ from: "PAD", to: "" }],
      destination: "",
    });

    const obj4 = convertArrToFromToObject(["", "", ""]);
    expect(obj4).toMatchObject({
      returnArr: [{ from: "", to: "" }],
      destination: "",
    });

    const obj5 = convertArrToFromToObject(["", "THA", ""]);
    expect(obj5).toMatchObject({
      returnArr: [{ from: "", to: "" }],
      destination: "",
    });
  });
});

describe("helpers - isNextDay", () => {
  it("correctly figure out if the time is for the next day", () => {
    const time1 = isNextDay("00:01");
    expect(time1).toBe(true);

    const time2 = isNextDay("23:59");
    expect(time2).toBe(false);
  });
});

describe("helpers - minutesDifference", () => {
  it("caculates the difference between two time strings", () => {
    const diff1 = minutesDifference("10:00", "10:30");
    expect(diff1).toBe("30m");

    const diff2 = minutesDifference("10:00", "12:30");
    expect(diff2).toBe(">1h");

    const diff3 = minutesDifference("23:59", "00:30");
    expect(diff3).toBe("31m");

    const diff4 = minutesDifference("23:59", "23:59");
    expect(diff4).toBe("0m");

    const diff5 = minutesDifference("23:58", "23:59");
    expect(diff5).toBe("1m");
  });
});

describe("helpers - checkPeakHours", () => {
  it("check whether it is peak hour", () => {
    jest.useFakeTimers();
    const fakeTime = new Date(
      "Fri Sep 09 2022 08:00:47 GMT+0100 (British Summer Time)"
    );
    jest.setSystemTime(fakeTime);

    const isPeakHour = checkPeakHours("PAD");
    expect(isPeakHour).toBe(true);

    const fakeTime2 = new Date(
      "Fri Sep 09 2022 17:00:47 GMT+0100 (British Summer Time)"
    );
    jest.setSystemTime(fakeTime2);

    const isPeakHour2 = checkPeakHours("PAD");
    expect(isPeakHour2).toBe(true);

    const isPeakHour3 = checkPeakHours("RDG");
    expect(isPeakHour3).toBe(false);

    const fakeTime4 = new Date(
      "Fri Sep 09 2022 22:00:47 GMT+0100 (British Summer Time)"
    );
    jest.setSystemTime(fakeTime4);

    const isPeakHour4 = checkPeakHours("PAD");
    expect(isPeakHour4).toBe(false);
  });
});
