// API For User info

//1 . About the user himself including no of points and tier and average score!
this.axios.get(`${import.meta.env.VITE_BACKEND}/user/${username}`)
//2 . Items a user likes
this.axios.get( `${import.meta.env.VITE_BACKEND}/items/liked`)
//3. Chat review
// after closing a trade, each user gets a review

this.axios.get( `${import.meta.env.VITE_BACKEND}/chatReview`)
// fetch COMPLETE reviews (by others) and INCOMPLETE reviews (by me)

this.axios.post(`${import.meta.env.VITE_BACKEND}/chatReview`, {
    textContent : ...,
    reviewId : ..., // see all the incomplete ones from the get command,
    rating : 3 //between 0 to 5
})

this.axios.get( `${import.meta.env.VITE_BACKEND}/reward`)
this.axios.get( `${import.meta.env.VITE_BACKEND}/reward/transactions`)
this.axios.post(`${import.meta.env.VITE_BACKEND}/reward/${rewardName}/`)
//get reward name from get /reward

// API for BUS STOP

// bus stop within radius from a pt
this.axios.get(`${import.meta.env.VITE_BACKEND}/busStop/radius`,{
    params : {
        latitude:...,
        longitude:...,
        radiusInKm:...,
    }
})

// IMPORTANT : FORCE users to set up a bus stop before calling these 2
this.axios.get(`${import.meta.env.VITE_BACKEND}/busStop/radius`,{
    params : {
        latitude:..., //optional otherwise use user pbs
        longitude:..., //optional otherwise use user pbs
        radiusInKm:..., //MUST GIVE
    }
})
this.axios.get(`${import.meta.env.VITE_BACKEND}/busStop/nearbyListingsRecommended`,{
    params : {
        latitude:..., //optional otherwise use user pbs
        longitude:..., //optional otherwise use user pbs
        radiusInKm:..., //MUST GIVE
    }
})


// API for searching items
this.axios.get(`${import.meta.env.VITE_BACKEND}/items/search/${seach_query}`,{
    params : {
        tags : [...], // array of tags
        category : "Electronics", // Electronics/Fashion/Furniture/Kitchenware
        condition : 'old', // old new
        itemType : 'Listed', // Listed or WishList (DEFAULT to listed)
        username : 'ok',
        traded : true/false,
        includeOwn : true/false //IF LOGGED IN choose to exclude self or not
    }
})

this.axios.get(`${import.meta.env.VITE_BACKEND}/items/popular`)
