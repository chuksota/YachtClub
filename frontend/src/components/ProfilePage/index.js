import './profilePage.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getDestinations } from '../../store/destinations'
import { NavLink } from 'react-router-dom'
import { getUserInformation } from '../../store/profile'
import {deleteAListing} from '../../store/listings'
import {useHistory} from 'react-router-dom'
function ProfilePage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const destinations = useSelector(state => state.destination)
  const user = useSelector(state => state.session.user)
  const userInfo = useSelector(state => state.userInfo.all)
  const deleteListing =async (id)=> {
    dispatch(deleteAListing(id))
  }
  const goToReviews=(id)=>{
    history.push(`listing/${id}`)
  }
  useEffect(() => {
    dispatch(getDestinations())
    dispatch(getUserInformation(user.id))
  }, [dispatch, user.id])

  return (
    <main className="index__dashboard">
      <div className="profile_info">
        <h1>Welcome back {user.username}! </h1>
      </div>

      <div className='profile_content'>
      <div className='all__listings'>
        <h1> Your current listings</h1>
        {userInfo.map(listing => (
          <div key={listing.id} className={`dashboard__listingCard`}>
            <p>{listing.description}</p>
           <button  onClick={()=>goToReviews(listing.id)}key={listing.id} className='see-reviews'>See reviews</button>
           <button onClick={()=> deleteListing(listing.id)}>Delete Listing</button>
          </div>
        ))}
      </div>
      <div className='about'>
      <h1>Check out some beautiful spots</h1>
      {
        destinations.map(destination => (
          <NavLink key={destination.id} to={`/destinations/${destination.id}/listings`}>
            <section key={destination.id} className={`dashboardLocationCards`}>
              {`${destination.city}, ${destination.country}`}
            </section>
          </NavLink>
        ))}
        </div>
        </div>
    </main>
  )
}

export default ProfilePage
