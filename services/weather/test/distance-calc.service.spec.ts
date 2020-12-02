import { Test, TestingModule } from '@nestjs/testing';
import { DistanceUtilityService } from '../src/weather/services/distance-calc.service';

describe('distance calculater between two point based on(lng, lat)', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistanceUtilityService],
    }).compile();
  });

  it('getDistance() should return 0 for equal lat/lng pairs', async () => {
    // argumnets
    const args = {
      lat1: 55.5,
      lng1: 37.56,
      lat2: 55.5,
      lng2: 37.56,
      distance: 0,
    };
    expect(DistanceUtilityService.getDistance(args.lat1, args.lng2, args.lat2, args.lng2)).toBe(args.distance);
  });

  it('getDistance() should return correct distance for given lat/lng pairs', async () => {
    // argumnets
    const args = {
      lat1: 55.5,
      lng1: 37.56,
      lat2: 55.44,
      lng2: 37.49,
      distance: 6.671374617368737,
    };
    expect(DistanceUtilityService.getDistance(args.lat1, args.lng2, args.lat2, args.lng2)).toBe(args.distance);
  });
});
