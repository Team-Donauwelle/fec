import React from 'react';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      selectedStyle: ''
    }

    this.updateStyle = this.updateStyle.bind(this);


  }

  updateStyle(x) {
    console.log('hi');
    console.log(x);
    this.props.setCurrentStyle(x, x.original_price, x.sale_price);
    //this.state.
  }

  componentDidUpdate() {

  }
  render () {
  
    return (
      <div> 
        { this.props.styles.map((x, index) => {
          //console.log('index ', index)
  
          if ((index+1)%4 === 0) {
            return (
              <span key = {index+1}>
              <span className = 'styleSelectorDiv' onClick = {()=>this.updateStyle(x)}> 
                <img src = {x.photos[0].thumbnail_url} className = 'styleSelectorThumbnail' />            
              </span>
              <br/>
              </span>
              )
  
          } else {
          return (
          <span className = 'styleSelectorDiv' onClick = {()=>this.updateStyle(x)} key = {index+1}> 
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



}

export default StyleSelector;