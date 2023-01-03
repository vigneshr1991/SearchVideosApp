import Styled from "styled-components";

import ImageSliderNew from "../Shared/ImageSliderNew";

const Header = Styled.div`
  font-size: 40px;
  width: 100%;
  height: 123px;
  color: #ea5da4;
  text-align: center;
  font-family: cursive;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

export const SliderData = [
    {
      name: "name1",
      price: 10,
      category: "",
      image: 'https://images.unsplash.com/photo-1546535073-8c6ae0a98b5e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTJ8fHdvcmxkJTIwd29uZGVyc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      name: "name2",
      price: 10,
      category: "",
      image: 'https://images.unsplash.com/photo-1560200602-ae2e2e62225b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjJ8fHdvcmxkJTIwd29uZGVyc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      name: "name3",
      price: 10,
      category: "",
      image: 'https://images.unsplash.com/photo-1545662642-f43d39359d46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nzl8fHdvcmxkJTIwd29uZGVyc3xlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
      name: "name4",
      price: 10,
      category: "",
      image: 'https://images.unsplash.com/photo-1564053489984-317bbd824340?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDZ8fHNwYWNlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      name: "name5",
      price: 10,
      category: "",
      image: 'https://images.unsplash.com/photo-1582554457597-e07633fba044?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTEyfHx3b3JsZCUyMHdvbmRlcnN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      name: "name6",
      price: 10,
      category: "",
      image: 'https://images.unsplash.com/40/lUUnN7VGSoWZ3noefeH7_Baker%20Beach-12.jpg?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTE5fHx3b3JsZCUyMHdvbmRlcnN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      name: "name7",
      price: 10,
      category: "",
      image: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8c3BhY2V8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      name: "name8",
      price: 10,
      category: "",
      image: 'https://images.unsplash.com/photo-1517673626-d1fa13313145?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjR8fHN1cGVyJTIwaGVyb3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      name: "name9",
      price: 10,
      category: "",
      image: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8YXVyb3JhfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      name: "name10",
      price: 10,
      category: "",
      image: 'https://images.unsplash.com/photo-1541791135449-168d91a780a1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDB8fHdvcmxkJTIwd29uZGVyc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    }
];

const Products = (props) => {
    return(
        <>
          <Header>Featured Images</Header>
            <ImageSliderNew slides={SliderData} active={0}/>
        </>
    )
}

export default Products;