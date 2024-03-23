import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileStorageResult } from '../models/file-storage-result';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File) {
    const formData: FormData = new FormData();

    formData.append('0', file, file.name);
    return this.http.post<FileStorageResult>('http://localhost:3000/upload', formData);
  }
}
