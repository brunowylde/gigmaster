import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SpotifyService {

  private readonly CLIENT_ID = process.env.CLIENT_ID;
  private readonly CLIENT_SECRET = process.env.CLIENT_SECRET;

  constructor(private readonly httpService: HttpService) {}

  async getAccessToken(): Promise<string> {
    const response = await firstValueFrom(this.httpService.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
      }).toString(),
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    ));
    return response.data.access_token;
  }

  async searchTrack(query: string) {
    try {
      const token = await this.getAccessToken();
      const response = await firstValueFrom(this.httpService.get(
        `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(query)}&limit=1`,
        { headers: { 'Authorization': `Bearer ${token}` } },
      ));
      return response.data.tracks.items[0];
    } catch (err) {
      throw new Error('Failed to fetch track');
    }
  }

  async searchTrackFeatures(query: string) {
    try {
      const token = await this.getAccessToken();
      const response = await firstValueFrom(this.httpService.get(
        `https://api.spotify.com/v1/audio-features/${encodeURIComponent(query)}`,
        { headers: { 'Authorization': `Bearer ${token}` } },
      ));
      return response.data;
    } catch (err) {
      throw new Error('Failed to fetch track');
    }
  }
}
