import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MuzixHttpService {

  public lastfmUrl = 'http://ws.audioscrobbler.com/2.0';
  public apiKey = 'ffc1d384c32d7366800ad90639beb855';

  public mongodbUrl = 'http://localhost:8091/api/v1/';
  public tracks;

  constructor(private httpclient: HttpClient) { }

  public searchTrack(trackName): any {
    this.tracks = this.httpclient.get(this.lastfmUrl + '/?method=track.search&track=' + trackName +
     '&api_key=' + this.apiKey + '&format=json');
    return this.tracks;
  }

  public saveTrack(trackinfo): any {
    const saveTrack = this.httpclient.post(this.mongodbUrl + 'track', trackinfo);
    return saveTrack;
  }

  public findtrack(mid): any {
    const trackinfo = this.httpclient.get(this.lastfmUrl + '/?method=track.getInfo&api_key=' + this.apiKey + '&mbid=' +
    mid + '&format=json');
    return trackinfo;
  }

  public getAllTracks(): any {
    const tracks = this.httpclient.get(this.mongodbUrl + 'tracks');
    return tracks;
  }

  public deleteTrack(mid): any {
    console.log('HERE : ' + mid);
    const track = this.httpclient.delete(this.mongodbUrl + 'track/' + mid);
    return track;
  }

  public updateTrack(trackinfo): any {
    console.log( trackinfo );
   const track = this.httpclient.put(this.mongodbUrl + 'track', trackinfo);
   return track;
}
}
