import React from 'react';

import Filters from './Filters';
import PetBrowser from './PetBrowser';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      adoptedPets: [],
      filters: {
        type: 'all',
      }
    };

    this.applyFilter =  this.applyFilter.bind(this)
    this.fetchPets =  this.fetchPets.bind(this)
    this.handleAdoptPet = this.handleAdoptPet.bind(this)
  }

  fetchPets(){
    let url = "/api/pets"

    if(this.state.filters.type !== 'all'){
      url += `?type=${this.state.filters.type}`
    }
    fetch(url)
    .then(result => result.json())
    .then(pets => this.setState({pets}))


  }

  applyFilter(type){
    this.setState({
      filters: {
        type: type
      }
    })
  }

  handleAdoptPet(petId){
    this.setState({
      adoptedPets: [...this.state.adoptedPets, petId]
    })
  }



  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters filters= {this.state.filters} onChangeType={this.applyFilter} onFindPetsClick={this.fetchPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} adoptedPets={this.state.adoptedPets} onAdoptPet={this.handleAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
