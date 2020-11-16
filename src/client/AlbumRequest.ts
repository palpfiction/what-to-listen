import type { TimePeriod } from './TimePeriod';

export interface AlbumRequest {
        user: string;
        minPlayCount: number;
        period: TimePeriod;
    }
