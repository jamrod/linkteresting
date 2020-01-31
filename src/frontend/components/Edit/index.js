import React, { useState } from 'react'
import './Edit.css'
import { Link, Redirect } from 'react-router-dom'
function Edit(props) {
  const [title, setTitle] = useState([])
  const [link, setLink] = useState([])
  const [done, setDone] = useState(false)
  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleChangeLink = (e) => {
    setLink(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      title: title,
      link: link
    }
    console.log(props.state.location.linkId)
    fetch(`https://www.list-links.herokuapp.com/api/link/${props.state.location.linkId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((res) => {
        props.refreshLinks(props.state.collectionId)
      })
      .then(() => {
        setDone(true)
      })
  }
  return (
    <>
      {/* what exactly is our header here??  */}
      <h4>Edit</h4>
      <form className="form" action="/action_page.php" onSubmit={handleSubmit} method="post">
        <label className="label">
          Title: <input className="text-box" type="text" onChange={handleChangeTitle} defaultValue={props.state.location.link.title} />
        </label>
        <br />
        <label className="label">
          Link: <input className="text-box" type="text" onChange={handleChangeLink} defaultValue={props.state.location.link.link} />
        </label>
        <br />
        <input className="button" type="submit" value="Submit" />
      </form>
      <Link to='/collection-details'>
        <button
          className="button"
          type="submit"
          value="Cancel"
        >Cancel
        </button>
      </Link>
      {done ? <Redirect push to='/collection-details' /> : null}
    </>
  )
}
export default Edit

