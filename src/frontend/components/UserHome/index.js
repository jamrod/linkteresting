import React, { Component } from 'react'
import './UserHome.css'
import { Link } from 'react-router-dom';


class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      collections: [],
    }
  }

  fetchCollection = (id) => {
    fetch(`http://list-links.herokuapp.com/api/collection/${id}`)
      .then(res => res.json())
      .then(res => {
        console.log("fetching collections", res)
        this.setState({
          collections: this.state.collections.concat(res)
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  componentDidMount() {
    if (this.props.location.userDetails) {
      this.setState({
        user: this.props.location.userDetails
      })

    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.user !== prevState.user) {
      console.log("hello from component did update")
      this.state.user.collections.forEach(col => {
        console.log("Should be fetching")
        this.fetchCollection(col)
      })
    }
  }

  renderPage = () => {
    if (this.state.collections.length > 0) {
      console.log(this.state.collections)
      return (
        <>
          {this.state.collections.map(col => (

            <Link to="/collection-details" className="card-body" >
              <h2>
                {col.title}
              </h2>
              <h5>  </h5>
              <h4 className="card-text">
                {col.description}
              </h4>
              <Link to={`/delete-collection/${col._id}`} className="btn btn-dark btn-md mb-5">
                Delete A Collection
                </Link>
            </Link>
          ))}
        </>
      )

    } else return (<h2> Loading...</h2 >)
  }


  render() {
    return (
      <>
        {/* // map here, 
    // another return that will return this div
   */}
        {this.renderPage()}
        <div className="col-md-6">

          <div className="card mb-4 shadow-sm">



          </div>
        </div>


        {/*     TO INCORPORATE:
            <div className="UserHome">
                  {props.collection.map(collection => {
                return(
                  <div className="collection">
                    <div className="title">{props.location.userDetails.collections}</div>
                    <div className="description">{props.location.userDetails.collections}</div>
               </div>
                )
                })}
            </div> */}
      </>
    )
  }
}
export default UserHome

// {/* <Link to='/collection-details' className="card-body">
          //   <h2>
          //     {col.title}
          //   </h2>
          //   <h5>  </h5>
          //   <h4 className="card-text">
          //     {col.description}
          //   </h4>
          //   <Link to={`/delete-collection/${col._id}`} className="btn btn-dark btn-md mb-5">
          //     Delete A Collection
          // </Link>
          // </Link> */}