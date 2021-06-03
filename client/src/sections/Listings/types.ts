export interface Listing {
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
  numOfBeds: number;
  numOfBaths: number;
  rating: number;
}

export interface Listings {
  listings: Listing[];
}

export interface DeleteListing {
  listing: Listing;
}

export interface DeleteListingVariables {
  id: string;
}
