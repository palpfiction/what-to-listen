export enum TimePeriod {
	OVERALL,
	SEVEN_DAYS,
	ONE_MONTH,
	THREE_MONTHS,
	SIX_MONTHS,
	TWELVE_MONTHS
}

type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

const labels: EnumDictionary<TimePeriod, String> = {
	[TimePeriod.OVERALL]: "Overall",
	[TimePeriod.SEVEN_DAYS]: "7 days",
	[TimePeriod.ONE_MONTH]: "1 month",
	[TimePeriod.THREE_MONTHS]: "3 months",
	[TimePeriod.SIX_MONTHS]: "6 months",
	[TimePeriod.TWELVE_MONTHS]: "12 months",
}

const values: EnumDictionary<TimePeriod, String> = {
	[TimePeriod.OVERALL]: "overall",
	[TimePeriod.SEVEN_DAYS]: "7day",
	[TimePeriod.ONE_MONTH]: "1month",
	[TimePeriod.THREE_MONTHS]: "3month",
	[TimePeriod.SIX_MONTHS]: "6month",
	[TimePeriod.TWELVE_MONTHS]: "12month",
}


export function timePeriodToLabel(timePeriod: TimePeriod ): String {
	return labels[timePeriod];
}

export function timePeriodToValue(timePeriod: TimePeriod ): String {
	return values[timePeriod];
}

export function parseTimePeriod(timePeriod: String): TimePeriod {
	return TimePeriod[timePeriod as keyof typeof TimePeriod];
}

export function getTimePeriods(): TimePeriod[] {
	return Object.keys(TimePeriod).filter(key => isNaN(Number(key))).map(string => parseTimePeriod(string));
}
