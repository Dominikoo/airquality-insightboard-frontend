export interface AirQualityDto {
    index: number;      // 0 - 500
    pm10: number;
    pm25: number;
    no2: number;
    so2: number;
    o3: number;
    updatedAt: string;  // ISO date
}
