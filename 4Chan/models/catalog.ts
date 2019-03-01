
export interface Catalog {
    page: number;
    threads: Thread[];
  }
  
  export interface Thread {
    no: number;
    sticky?: number;
    closed?: number;
    now: string;
    name: string;
    sub?: string;
    com?: string;
    filename: string;
    ext: string;
    w: number;
    h: number;
    tn_w: number;
    tn_h: number;
    tim: number;
    time: number;
    md5: string;
    fsize: number;
    resto: number;
    capcode?: string;
    semantic_url: string;
    replies: number;
    images: number;
    last_replies: Lastreply[];
    last_modified: number;
    bumplimit?: number;
    imagelimit?: number;
    omitted_posts?: number;
    omitted_images?: number;
  }
  
  interface Lastreply {
    no: number;
    now: string;
    name: string;
    com?: string;
    time: number;
    resto: number;
    capcode?: string;
    filename?: string;
    ext?: string;
    w?: number;
    h?: number;
    tn_w?: number;
    tn_h?: number;
    tim?: number;
    md5?: string;
    fsize?: number;
  }