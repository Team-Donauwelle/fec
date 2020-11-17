import React from 'react';
import { Rating } from '@material-ui/lab';
import getLabel from '../../../utils/getLabel.js';
import capitalize from '../../../utils/capitalize.js';

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      recommend: null,
      size: null,
      width: null,
      comfort: null,
      quality: null,
      length: null,
      fit: null,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const characteristics = [
      'size', 'width', 'comfort', 'quality', 'length', 'fit'
    ];
    const { show, hideReview, product } = this.props;

    if (!show) {
      return null;
    }
    return (
      <div className="newReview">
        {console.log(this.state)}
        <h1>Write Your Review</h1>
        <h2>About the {product}</h2>
        <div>
          <h3>*Overall rating</h3>
          <Rating
            name="rating"
            value={this.state.value}
            onChange={(e) => this.handleSelect(e)}
          />
          {this.state.rating ? <span>
            {getLabel('rating', this.state.rating)}
          </span>: null}
        </div>
        <div>
          <h3>*Do you recommend this product?</h3>
          {['yes', 'no'].map((value, idx) => {
            return (<span key={idx}>
              <input
                type="radio"
                name="recommend"
                value={value}
                onClick={(e) => this.handleSelect(e)} />
              <label>{capitalize(value)}</label>
            </span>);
          })}
        </div>
        <div>
          <h3>*Characteristics</h3>
          {characteristics.map((property, idx) => {
            return (<CharacteristicEntry
              state={this.state[property]}
              property={property}
              handleSelect={this.handleSelect}
              key={idx}
            />);
          })}
        </div>
        <div>
          <button onClick={hideReview}>Close</button>
        </div>
      </div>
    );
  }
}

const CharacteristicEntry = ({ state, property, handleSelect }) => {
  return (
    <div>
      <h2>{capitalize(property)}</h2>
      {state ? <h3>
        {getLabel(property, state)}
      </h3> : <h3>none selected</h3>}
      {[1, 2, 3, 4, 5].map((value, idx) => {
        return (<span key={idx}>
          <input
            type="radio"
            name={property}
            value={value}
            onClick={(e) => handleSelect(e)}
          />
          <label>{value}</label>
        </span>);
      })}
    </div>
  );
}



export default NewReview;