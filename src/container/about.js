import React from 'react';
import _ from 'lodash';
class About extends React.Component{
    constructor(){
        super();
        this.state={
            people: _.sortBy([
                { name: "Kyle", _id: 2},
                { name: "Susan", _id: 1}
            ], '_id')
        }

    }

    sortBy(field) {
        this.setState({
            people: _.sortBy(this.state.people, field)
        });
    }

    render() {
        var peopleList = this.state.people.map( (person, index) => {
            return (<li key={index}>
                <span>{person.name}</span>
                <span>{person.id}</span>
            </li>);
        })

        return <div>
            <a onClick={this.sortBy.bind(this, '_id')}>Sort By Id</a> |
            <a onClick={this.sortBy.bind(this, 'name')}>Sort By Name</a>
            <ul>{peopleList}</ul>
        </div>;
    }
}
export default About;