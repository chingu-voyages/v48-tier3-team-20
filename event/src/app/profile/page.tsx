'use client'
import { FormEvent } from 'react'



export default function Profile() {

  //Things needed possibly (change if necessary)...
  //Click profile picture to change it.
  //Edit profile bio / interests.
  //Display Bio / interests.
  //Display joined events.
  //Display hosted events.



  //One idea for editing text fields. Maybe it's a bad idea...
  var editable = false;
  if("user is the profile page owner"){
    editable = true;
  }

  async function handleImgSubmit(event: FormEvent<HTMLFormElement>) {
    //This function is to change profile image. 
    event.preventDefault()

  }



  return (
    //Not final form but just getting something written. Change freely.
    <>
      <form onSubmit={handleImgSubmit}>
        <input type="image" name="image" />
        <button type="submit">Login</button>
      </form>
    {/* 
    This bio thing can maybe be a component. Need to have props for the description. 
    Could also have a bit about interests (keywords used to suggest events). Could have
    an "edit" button or automatically detect if user is the profile page owner and have contenteditable="true"
    
    */}
      <div>
        <h1>Bio</h1>
        <p contentEditable = {editable}>Maybe have bio here...</p>
        <h2>Interests</h2>
        <p contentEditable = {editable}>Interests go here...</p>
      </div>
    </>
  )
}
