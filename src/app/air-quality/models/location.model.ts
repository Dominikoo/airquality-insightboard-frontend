import { AirQualityDto } from "./air-quality.model";

export interface LocationDto {
    id: string;
    name: string;
    countryCode: string;
    latitude: number;
    longitude: number;
    population: number;
    airQuality: AirQualityDto;
}
