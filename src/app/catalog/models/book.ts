
/**
 * Contract of a Book
 * 
 * @export
 * @interface Book
 */
export interface Book {
    id: string;
    isbn10?: string;
    title: string;
    seats: number;
    price: number;
    pages?: number;
    rating?: number;
    votes?: number;
    image?: string;
    description?: string;
}

export function mockBook(): Book {
    return {
      id: '1',
      title: 'Clean code',
      seats: 1,
      price: 35.5,
      pages: 740,
      rating: 4,
      votes: 45,
      image: 'image',
      description: 'clean code is a ...'
  }
}