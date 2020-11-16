import React from 'react';
import axios from 'axios';

var URL = 'http://3.21.164.220/';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '',
      name: '',
      default_price: '',
      
      styles: [],
      currentStyle: ''
    }
  }

  componentDidMount() {
    this.getProduct(1);
    this.getStyle(1);
  }

  getProduct(id) {
    id = undefined || 1;

   // axios.get(`${URL}?page=1&count=1`)
    axios.get('http://3.21.164.220/products?page=1&count=1')
    .then((response) => {
      //console.log(response.data)
      this.setState({
        category: response.data[0].category,
        name: response.data[0].name,
        default_price: response.data[0].default_price
      })
    
    })
    .catch((err) => console.log(err));

  }

  getStyle(id) {
    id = undefined || 1;

   // axios.get(`${URL}?page=1&count=1`)
    axios.get(`http://3.21.164.220/products/${id}/styles`)
    .then((response) => {
      //console.log(response.data.results)
      this.setState({
        styles: response.data.results,
        currentStyle: response.data.results[0]
      })
    
    })
    .catch((err) => console.log(err));

  }

  render() {
    return (
      <div className = "overview-container">
         <div className="item grid-item1"> <Gallery currentStyle = {this.state.currentStyle}/></div>
         <div className="item grid-item2"> <ProductInfo category = {this.state.category} name = {this.state.name} default_price = {this.state.default_price}/> </div>
        <div className="item grid-item3">  <StyleSelector styles = {this.state.styles}/> </div>
        <div className="item grid-item4">  </div>
        <div className="item grid-item5">  </div>
        <div className="item grid-item6">  </div>
      </div>
    );
  }

}

let ProductInfo = ({category, name, default_price}) => {
  return (
    <div> 
      <div id = 'category'> {category} </div>
      <div id = 'expandedProductName'> {name} </div>
      <div id = 'price'> ${default_price} </div>
    </div>
  )

}



let StyleSelector = ({styles}) => {
  styles.map((x) => {
    //console.log(x.photos[0].thumbnail_url);
  })
  return (
    <div> 
      { styles.map((x, index) => {
        //console.log('index ', index)

        if ((index+1)%4 === 0) {
          return (
            <span key = {index+1}>
            <span className = 'styleSelectorDiv'> 
              <img src = {x.photos[0].thumbnail_url} className = 'styleSelectorThumbnail' />            
            </span>
            <br/>
            </span>
            )

        } else {
        return (
        <span className = 'styleSelectorDiv'  key = {index+1}> 
          <img src = {x.photos[0].thumbnail_url} className = 'styleSelectorThumbnail' />
        </span>
        )

        }
      }
      )
        }
    </div>
  )

}


class Gallery extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    //Is there a way to do this without conditional render? doesn't like img src
    if (this.props.currentStyle.photos === undefined) {
    return (
      <div> </div>
    )
    } else {
      return (
        <div>
           <img src = {this.props.currentStyle.photos[0].url} id = 'galleryImage'/>
           <div id = 'galleryThumbnailColumn'> 
           <ul> 
            {this.props.currentStyle.photos.map((x) => (
            <li>
              <span id = 'galleryThumbnailContainer'> 
               <img src = {x.thumbnail_url} id = 'galleryThumbnail'/> 
              </span>
            </li> 
            ))}

          </ul>
        </div>
           
        </div>
      )
    }
  }
}




export default Overview;