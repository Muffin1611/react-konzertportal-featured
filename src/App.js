import React, { Component } from 'react';

var axios = require('axios');

class App extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
            concerts: []
        }
    }

    componentDidMount() {
        var th = this;
        this.serverRequest =
            axios.get(this.props.source)
                .then(function(result) {
                    th.setState({
                        concerts: result.data.concerts
                    });
                })
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    render() {
        return (
            <div id="myCarousel" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                    <li data-target="#myCarousel" data-slide-to="3"></li>
                </ol>


                <div class="carousel-inner" role="listbox">
                    <div class="item active">
                        <img src={process.env.PUBLIC_URL + '/ny.jpg'} alt="New York"></img>
                        <div class="carousel-caption">
                            <h3>Featured</h3>
                        </div>
                    </div>
                    {this.state.concerts.map(function(concert) {
                        if(concert.featured) {
                            return (
                                <div class="item">
                                    <img src={process.env.PUBLIC_URL + '/' + concert.featuredImage} alt="Something"></img>
                                    <div class="carousel-caption">
                                        <h3>{concert.name}</h3>
                                    </div>
                                </div>
                            );}
                    })}
                </div>

                <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        )
    }
}

export default App;
