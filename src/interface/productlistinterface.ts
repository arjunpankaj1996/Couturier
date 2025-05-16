interface Size{
    small :number,
    medium : number,
    large : number,
    extralarge : number,
}
export interface product {
    id : number,
    name : string,
    gender : string,
    image1 : string,
    image2 : string,
    image3 : string,
    image4 : string,
    image5 : string,
    size : Size ,
    category : string,
    details : string,
    price : number,
}
export interface ProductState {
    item :product[],
    loading :boolean,
    error :string | null ,
}

export interface filterValues{
  category : string[],
  size : string[],
  price : string[],
  search : string,
}
export interface selectfilerValues  {
  selectedCategory : string[],
  selectedSize : string[],
  selectedPrice : string[],
  searchQuery : string
}