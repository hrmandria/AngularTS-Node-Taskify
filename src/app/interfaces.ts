

export interface CreatePost{
  title: string;
  details: string;
  colors: [string];
}

export interface UpdatePost{
  title?: string;
  details?: string;
  colors?: [string];
}

export interface CreateComment{
  content: string;
}
