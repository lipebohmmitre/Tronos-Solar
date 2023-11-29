interface Item {
    product: {
        name: string;
        price: number;
        id: number;
        description: string;
        image: string;
        categories: [];
        createDate: string;
    };
    finalPrice: number;
    quantity: number;
  }

  export default Item;