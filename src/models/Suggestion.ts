export interface Suggestion {
  value: string
  data: {
    geo_lat: number
    geo_lon: number
    city_with_type: string
    region_with_type: string
    settlement_with_type: string
    area_with_type: string
    area: string
    region: string
    city: string
    settlement: string
  }
}
