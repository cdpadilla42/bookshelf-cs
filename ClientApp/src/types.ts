export interface Book {
  id: number;
  name: string;
  authorID: number;
  genreID: number;
  summary: string;
  rating: number;
  status?: null;
  image?: null;
  createdDateTime: Date;
}

export interface BookSubmitObject {
  id?: number;
  name: string;
  authorID: number;
  genreID?: number;
  summary: string;
  rating: number;
  status?: null;
  image?: null;
}
