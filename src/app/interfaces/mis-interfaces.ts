
   
export interface Noticias {
  status: string;
  totalResults: number;
  articles: Articulos[];
}

export interface Articulos {
  source: Fuente;
  author: null | string;
  title: string;
  description: null | string;
  url: string;
  urlToImage: null | string;
  publishedAt: string;
  content: null | string;
}

export interface Fuente {
  id: null | string;
  name: string;
}


